/*eslint-disable*/
const gulp = require('gulp');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint-new');

// debugging
const plumber = require('gulp-plumber');

// css
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');

// javascript
const rollupJson = require('rollup-plugin-json');
const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const ts = require('rollup-plugin-typescript2');
const rename = require('gulp-rename');

//minifier
const terser = require('gulp-terser');

const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));

const minifier = argv['minifier'];

const slash = process.platform === 'win32' ? '\\' : '/';

const emptyFileOurput = "(function () {\n\n}());\n"

const build = async () => {
    //change argv for deploy_remote task
    if (argv.path) {
        const paths = argv.path.split('/');
        const [clientFolder, siteCodeFolder, typeFolder, projectFolder] = paths;
        const siteCode = siteCodeFolder?.split('-')?.[0];
        const clientId = clientFolder?.split('-')?.[0];
        const projectID = projectFolder?.split('-')?.[0];

        argv['customer-id'] = +clientId;
        argv.sitecode = siteCode;

        if (/experiments/i.test(typeFolder)) {
            argv['experiment-id'] = +projectID;
        } else if (/personalizations/i.test(typeFolder)) {
            argv['personalization-id'] = +projectID;
        }
    }

    const path = findDeepDir();
    let customerDir = '.' + slash;

    if (argv['customer-id']) {
        customerDir = findDir('.' + slash, argv['customer-id'], 'Customer Id');
    }

    let buildPath = customerDir + '_built' + slash + argv['sitecode'] + slash;

    if (
        argv['experiment-id'] ||
        argv['personalization-id'] ||
        argv['variation-id'] ||
        argv['common'] ||
        argv['targeting']
    ) {
        if (argv['experiment-id']) {
            buildPath += 'experiments' + slash;
            buildPath += argv['experiment-id'] + slash;
        } else {
            buildPath += 'personalizations' + slash;
            buildPath += argv['personalization-id'] + slash;
        }
    }

    if (argv['variation-id']) {
        await buildFiles(findFiles(path, argv['variation-id']), buildPath);
    } else if (argv['common']) {
        await buildFiles(findFiles(path, 'common.'), buildPath);
    } else if (argv['targeting']) {
        await buildFiles(findFiles(path, 'targeting.'), buildPath);
    } else if ((argv['experiment-id'] || argv['personalization-id']) && !argv['variation-id'] && !argv['common'] && !argv['targeting']) {
        await buildFiles(findFiles(path, /^[0-9]+/g), buildPath);
        await buildFiles(findFiles(path, 'common.'), buildPath);
        await buildFiles(findFiles(path, 'targeting.'), buildPath);
    } else if (argv['global']) {
        buildPath += 'global' + slash;
        await buildFiles(findFiles(path, 'index.'), buildPath);
    } else if (argv['template-id']) {
        buildPath += 'templates' + slash;
        buildPath += argv['template-id'] + slash;
        let templatePath = path;
        templatePath += fs.readdirSync(path).filter((file) => {
            if (file.indexOf(argv['template-id'] + '-') != -1) {
                return true;
            }
            return false;
        })[0];
        templatePath += slash;

        await buildFiles(findFiles(templatePath, 'index.'), buildPath);
    }

    return gulp.src('.', { allowEmpty: true });
};

function findFiles(base, contains) {
    const file = fs.readdirSync(base).filter((file) => {
        if (file.match(contains)) {
            return true;
        }
        return false;
    });
    if (file.length > 0) {
        return file.map((file) => {
            return {
                path: base,
                name: file,
                nameWithoutExt: file.match(contains)[0].toString().replace('.', ''),
            };
        });
    }
    return [];
}

function findDir(base, contains, errorString) {
    const file = fs.readdirSync(base).find((file) => {
        if (file.match(contains)) {
            return true;
        }
        return false;
    });
    if (file) {
        return file + slash;
    } else {
        throw new Error(`No directory found for ${errorString}: ${contains}`);
    }
}

function findDeepDir() {
    let path = '.' + slash;
    if (argv['customer-id']) {
        path += findDir(path, argv['customer-id'], 'Customer Id');
    }
    path += findDir(path, argv['sitecode'], 'Site code');
    if (argv['experiment-id']) {
        path += findDir(path, 'experiments', 'experiments');
        path += findDir(path, argv['experiment-id'], 'Experiment Id');
    }
    if (argv['personalization-id']) {
        path += findDir(path, 'personalizations', 'personalizations');
        path += findDir(path, argv['personalization-id'], 'Personalization Id');
    }
    if (argv['global']) {
        path += findDir(path, 'global', 'Global');
    }
    if (argv['template-id']) {
        path += findDir(path, 'templates', 'Templates');
    }
    return path;
}

function buildFiles(files, buildPath) {
    return Promise.all(
        files.map(async (file) => {
            if (file.name.indexOf('.ts') !== -1) {
                return compileTS(file, buildPath);
            }
            if (file.name.indexOf('.js') !== -1) {
                return compileJS(file, buildPath);
            }
            if (file.name.indexOf('.css') !== -1 || file.name.indexOf('.scss') !== -1) {
                return compileCSS(file, buildPath);
            }
            return new Promise((resolve) => resolve());
        })
    );
}

function compileTS(file, buildPath) {
    return new Promise((res, reject) => {
        try {
            let options = {};

            const outPutParams = {
                format: 'iife',
                strict: false,
                output: { extend: true },
            };

            if (file.name.match('targeting.ts$')) {
                options.errorHandler = (error) => {
                    if (error.message.indexOf("A 'return' statement can only be used within a function body.") === -1) {
                        throw new Error(error);
                    }
                };
            }
            gulp.src(file.path + file.name)
                .pipe(plumber(options))
                .pipe(rollup({ plugins: [resolve(), ts({ noEmit: true }), commonjs(), rollupJson()] }, outPutParams))
                .pipe(plumber.stop())
                .pipe(
                    rename(function (path) {
                        path.extname = '.js';
                        path.basename = file.nameWithoutExt;
                        if (process.platform === 'win32') {
                            path.dirname = buildPath;
                        }
                    })
                )
                .pipe(gulpif(minifier, terser()))
                .pipe(gulp.dest(process.platform === 'win32' ? '.' + slash : buildPath))
                .pipe(
                    gulp.dest((path) => {
                        if (process.platform === 'win32') {
                            path.dirname = 'sourse_js';
                        }
                        return process.platform === 'win32' ? file.path : `${file.path}/sourse_js`;
                    })
                )
                .on('end', () => {
                    // console.log(`build ${file.path + file.name}`);
                    res();
                });
        } catch (error) {
            reject(error);
        }
    });
}

function compileJS(file, buildPath) {
    return new Promise((res, reject) => {
        try {
            let emptyFile = false;
            const condition = (args) => {
                emptyFile = args.eslint.output === emptyFileOurput
                return true;
            }

            function escapeSting(str) {
                const escapeMap = {
                    '\\': '\\\\',
                    ':': '\\:',
                    '*': '\\*',
                    '?': '\\?',
                    '"': '\\"',
                    '<': '\\<',
                    '>': '\\>',
                    '|': '\\|'
                };
                const escapedStr = str.replace(/[\\:*?"<>|]/g, match => escapeMap[match]);
                return escapedStr;
            }


            const outPutParams = {
                format: 'iife',
                output: {
                    extend: true
                }
            };

            let options = {};
            gulp.src(escapeSting(file.path) + file.name)
                .pipe(plumber(options))
                .pipe(rollup({ plugins: [resolve(), commonjs(), rollupJson()] }, outPutParams))
                .pipe(
                    eslint({
                        fix: true,
                        overrideConfig: {
                            rules: {
                                'no-shadow': 0,
                                'max-len': 0,
                                'default-case': 1,
                                'func-names': 0
                            },
                        },
                    })
                )
                .pipe(eslint.format())
                .pipe(babel({
                    presets: ['@babel/env'],
                })
                )
                .pipe(gulpif(condition, plumber.stop()))
                .pipe(
                    rename(function (path) {
                        path.basename = file.nameWithoutExt;
                        if (process.platform === 'win32') {
                            path.dirname = buildPath;
                        }
                    })
                )
                .pipe(gulpif(minifier, terser()))
                .pipe(gulp.dest(process.platform === 'win32' ? '.' + slash : buildPath))
                .on('end', () => {
                    if (emptyFile) fs.writeFileSync(buildPath + file.nameWithoutExt + '.js', '');
                    res();
                });
        } catch (error) {
            reject(error);
        }
    });
}

function compileCSS(file, buildPath) {
    new Promise((res, reject) => {
        try {
            return gulp
                .src(file.path + file.name)
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({ grid: true, cascade: true }))
                .pipe(concatCss(file.name))
                .pipe(
                    rename(function (path) {
                        path.extname = '.css';
                        path.basename = file.nameWithoutExt;
                    })
                )
                .pipe(gulp.dest(buildPath))
                .on('end', () => {
                    // console.log(`build ${file.path + file.name}`);
                    res();
                });
        } catch (error) {
            reject(error);
        }
    });
}

exports.build = build;
