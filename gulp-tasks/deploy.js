/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const { build } = require('./build');

const kamCredentialsName = '.credentials';
const customerCredentialsName = 'credentials.json';
const deployedDirName = '_deployed';
const globalIndexFileName = `index.js`;
const buildDirName = '_built';
const globalDirName = `global`;
const experimentDirName = `experiments`;
const persoDirName = `personalizations`;
const tergetingFileName = `targeting.js`;
const commonFileName = `common`;
const liveStatus = 'active';
const idRegExp = /\d{4,}-/;
const authTokenUrl = 'https://api.kameleoon.com/oauth/token';

let bearerToken;
let errorFile;

let actualRequestData;
let actualExperimentData;
let actualSegmentData;

const getSiteDataURL = (sitecod) => `https://api.kameleoon.com/sites/byCode/${sitecod}`;
const getVariationURL = (variationId) => `https://api.kameleoon.com/variations/${variationId}`;
const getExperimentUrl = (experimentId) => `https://api.kameleoon.com/experiments/${experimentId}?optionalFields=goals`;
const getPersonalizationUrl = (persoId) => `https://api.kameleoon.com/personalizations/${persoId}?optionalFields=goals`;
const getSiteEditURl = (siteID) => `https://api.kameleoon.com/sites/${siteID}`;
const getSegmentURL = (segmentId) => `https://api.kameleoon.com/segments/${segmentId}`;
const getConditionSegmentURL = (segmentId, conditionId) => `https://api.kameleoon.com/segments/${segmentId}/conditions/${conditionId}`;

const getExperimentFiles = (requestData) => {
    const nameVariationDir = requestData.experimentID ? experimentDirName : persoDirName;
    const idOfExperiment = requestData.experimentID ? requestData.experimentID : requestData.personalizationId;
    const sitesList = fs.readdirSync(requestData.clientDir);
    const siteCodeDirName = sitesList.find((site) => new RegExp(`${requestData.siteCode}`).test(site));
    if (!siteCodeDirName) throw new Error(`Not found the siteCode in ${requestData.siteCode}`);

    const dirWithExperimentssPath = path.join(requestData.clientDir, siteCodeDirName, nameVariationDir);
    const listFolders = fs.readdirSync(dirWithExperimentssPath);
    const experimentIdnameName = listFolders.find((dir) => new RegExp(`${idOfExperiment}`).test(dir));
    if (!experimentIdnameName) throw new Error(`Not found the Experiment/Personalization ${idOfExperiment} in ${dirWithExperimentssPath}`);

    const fileExperimentList = fs.readdirSync(path.join(dirWithExperimentssPath, experimentIdnameName));
    return fileExperimentList;
};

const getVariationsIdList = (fileExperimentList) => {
    const allVariationsList = fileExperimentList.filter((variant) => idRegExp.test(variant));
    const variationsIdList = Array.from(new Set(allVariationsList.map((name) => name.replace(/-.*$/, ''))));
    return variationsIdList;
};

const getDirectory = (dir, contains, errorString, deployed) => {
    const files = fs.readdirSync(dir);
    const folder = files.find((file) => new RegExp(`${contains}`).test(file));
    if (folder || deployed) {
        return folder ? path.join(dir, folder) : folder;
    }
    throw new Error(`No directory found for ${errorString}: ${contains}`);

};

const getAccessToken = (clientCredentials) => {
    const { client_id: clientId, client_secret: clientSecret } = JSON.parse(clientCredentials);
    const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        }).toString(),
    };
    return fetch(authTokenUrl, postOptions)
        .then((postResponse) => postResponse.json());
};

const getActualPlatformData = (url, token) => fetch(url, { headers: { Authorization: token } })
    .then((getResponse) => {
        if (getResponse.ok) {
            return getResponse.json();
        }
        throw new Error(`statusText: ${getResponse.statusText}, status: ${getResponse.status}`);

    });

const getActualGlobalData = (platformData) => {
    actualRequestData = platformData;
    return {
        platformGlobalCode: platformData.trackingScript,
    };
};

const getActualVariantData = (platformData, url) => {
    const isLive = platformData.experimentStatus === liveStatus;
    return getActualPlatformData(url, bearerToken)
        .then((response) => {
            actualRequestData = response;
            return {
                isLive,
                platformCSS: response.cssCode,
                platformJS: response.jsCode,
            };
        });
};

const getActualCommonData = (platformData) => {
    const isLive = platformData.experimentStatus === liveStatus;
    actualRequestData = platformData;
    return {
        isLive,
        platformCSS: platformData.commonCssCode,
        platformJS: platformData.commonJavaScriptCode,
    };
};

const getActualPersoData = (platformData) => {
    const isLive = platformData.status === liveStatus;
    actualRequestData = platformData;
    return {
        isLive,
        platformCSS: platformData.cssCode,
        platformJS: platformData.javaScriptCode,
    };
};

const getActualTargetingData = (actualJSCondition, experimentData) => {
    const isLive = experimentData.experimentStatus === liveStatus;
    return {
        isLive,
        platformJs: actualJSCondition.jsCode,
    };
};

const getActualDataWithPath = (actualData, requestData) => {

    const dirName = requestData.experimentID ? experimentDirName : persoDirName;
    const experimentIDDirName = requestData.experimentID ? requestData.experimentID : requestData.personalizationId;

    if (requestData.isTargeting) {
        const experimentDeployedDir = path.join(requestData.deployedSiteCodeDir, dirName, `${experimentIDDirName}`);
        !fs.existsSync(experimentDeployedDir) && fs.mkdirSync(experimentDeployedDir);
        const experimentTargetingDepFile = path.join(experimentDeployedDir, tergetingFileName);

        const experimentBuiltDir = path.join(requestData.builtSiecodeDir, dirName, `${experimentIDDirName}`);
        if (!fs.existsSync(experimentBuiltDir)) throw new Error(`No built file in ${experimentBuiltDir}`);
        const experimentTargetingBuiltFile = path.join(experimentBuiltDir, tergetingFileName);
        if (!fs.existsSync(experimentTargetingBuiltFile)) throw new Error(`No built file in ${experimentTargetingBuiltFile}`);

        actualData.deployedPath = experimentTargetingDepFile;
        actualData.builtPath = experimentTargetingBuiltFile;

        return actualData;
    }

    if (requestData.isGlobal) {
        const globalDeployedPath = path.join(requestData.deployedSiteCodeDir, globalDirName);
        !fs.existsSync(globalDeployedPath) && fs.mkdirSync(globalDeployedPath);
        const globalDeployedFilePath = path.join(globalDeployedPath, globalIndexFileName);

        const globalBuiltPath = path.join(requestData.builtSiecodeDir, globalDirName);
        if (!fs.existsSync(globalBuiltPath)) throw new Error(`No built file in ${globalBuiltPath}`);
        const globalBuiltFilePath = path.join(globalBuiltPath, globalIndexFileName);

        actualData.deployedPath = globalDeployedFilePath;
        actualData.builtPath = globalBuiltFilePath;

        return actualData;
    }

    if (requestData.isCommon) {
        const experimentDeployedPath = path.join(requestData.deployedSiteCodeDir, dirName);
        !fs.existsSync(experimentDeployedPath) && fs.mkdirSync(experimentDeployedPath);
        const experimentDeployedFilePath = path.join(experimentDeployedPath, `${experimentIDDirName}`);

        !fs.existsSync(experimentDeployedFilePath) && fs.mkdirSync(experimentDeployedFilePath);
        const commonDeployedFileJSPath = path.join(experimentDeployedFilePath, `${commonFileName}.js`);
        const commonDeployedFileCSSPath = path.join(experimentDeployedFilePath, `${commonFileName}.css`);

        const experimentBuiltPath = path.join(requestData.builtSiecodeDir, dirName);
        if (!fs.existsSync(experimentBuiltPath)) throw new Error(`No built file in ${experimentBuiltPath}`);
        const experimentBuiltFilePath = path.join(experimentBuiltPath, `${experimentIDDirName}`);
        if (!fs.existsSync(experimentBuiltPath)) throw new Error(`No built file in ${experimentBuiltFilePath}`);
        const commonBuiltFileJSPath = path.join(experimentBuiltFilePath, `${commonFileName}.js`);
        const commonBuiltFileCSSPath = path.join(experimentBuiltFilePath, `${commonFileName}.css`);

        actualData.deployedPathJS = commonDeployedFileJSPath;
        actualData.deployedPathCSS = commonDeployedFileCSSPath;
        actualData.builtPathCSS = commonBuiltFileCSSPath;
        actualData.builtPathJS = commonBuiltFileJSPath;

        return actualData;
    }
    if (requestData.personalizationId) {
        const experimentDeployedPath = path.join(requestData.deployedSiteCodeDir, dirName);
        !fs.existsSync(experimentDeployedPath) && fs.mkdirSync(experimentDeployedPath);
        const experimentDeployedFilePath = path.join(experimentDeployedPath, `${experimentIDDirName}`);

        !fs.existsSync(experimentDeployedFilePath) && fs.mkdirSync(experimentDeployedFilePath);
        const deployedFileJSPath = path.join(experimentDeployedFilePath, `${requestData.variationId}.js`);
        const dployedFileCSSPath = path.join(experimentDeployedFilePath, `${requestData.variationId}.css`);

        const experimentBuiltPath = path.join(requestData.builtSiecodeDir, dirName);
        if (!fs.existsSync(experimentBuiltPath)) throw new Error(`No built file in ${experimentBuiltPath}`);
        const experimentBuiltFilePath = path.join(experimentBuiltPath, `${experimentIDDirName}`);
        if (!fs.existsSync(experimentBuiltPath)) throw new Error(`No built file in ${experimentBuiltFilePath}`);
        const builtFileJSPath = path.join(experimentBuiltFilePath, `${requestData.variationId}.js`);
        const builtFileCSSPath = path.join(experimentBuiltFilePath, `${requestData.variationId}.css`);

        actualData.deployedPathJS = deployedFileJSPath;
        actualData.deployedPathCSS = dployedFileCSSPath;
        actualData.builtPathCSS = builtFileCSSPath;
        actualData.builtPathJS = builtFileJSPath;

        return actualData;
    }

    if (requestData.variationId) {

        const experimentDeployedPath = path.join(`${requestData.deployedSiteCodeDir}`, dirName);
        !fs.existsSync(experimentDeployedPath) && fs.mkdirSync(experimentDeployedPath);
        const experimentDeployedFilePath = path.join(experimentDeployedPath, `${experimentIDDirName}`);

        !fs.existsSync(experimentDeployedFilePath) && fs.mkdirSync(experimentDeployedFilePath);
        const variationDeployedFileJSPath = path.join(experimentDeployedFilePath, `${requestData.variationId}.js`);
        const variationDeployedFileCSSPath = path.join(experimentDeployedFilePath, `${requestData.variationId}.css`);

        const experimentBuiltPath = path.join(requestData.builtSiecodeDir, dirName);
        if (!fs.existsSync(experimentBuiltPath)) throw new Error(`No built file in ${experimentBuiltPath}`);
        const experimentBuiltFilePath = path.join(experimentBuiltPath, `${experimentIDDirName}`);
        if (!fs.existsSync(experimentBuiltPath)) throw new Error(`No built file in ${experimentBuiltFilePath}`);
        const variationBuiltFileJSPath = path.join(experimentBuiltFilePath, `${requestData.variationId}.js`);
        const variationBuiltFileCSSPath = path.join(experimentBuiltFilePath, `${requestData.variationId}.css`);

        actualData.deployedPathJS = variationDeployedFileJSPath;
        actualData.deployedPathCSS = variationDeployedFileCSSPath;
        actualData.builtPathCSS = variationBuiltFileCSSPath;
        actualData.builtPathJS = variationBuiltFileJSPath;

        return actualData;
    }
};

const setNewDeployed = (newData, oldCodeData) => {

    if (oldCodeData.isTargeting) {
        newData.jsCode && fs.writeFileSync(oldCodeData.deployedPathJS, newData.jsCode);

    } else if (oldCodeData.isGlobal) {
        newData.trackingScript && fs.writeFileSync(oldCodeData.deployedPath, newData.trackingScript);

    } else if (oldCodeData.personalizationId) {
        newData.cssCode && fs.writeFileSync(oldCodeData.deployedPathCSS, newData.cssCode);
        newData.javaScriptCode && fs.writeFileSync(oldCodeData.deployedPathJS, newData.javaScriptCode);

    } else if (oldCodeData.isCommon) {
        newData.commonCssCode && fs.writeFileSync(oldCodeData.deployedPathCSS, newData.commonCssCode);
        newData.commonJavaScriptCode && fs.writeFileSync(oldCodeData.deployedPathJS, newData.commonJavaScriptCode);

    } else {
        newData.cssCode && fs.writeFileSync(oldCodeData.deployedPathCSS, newData.cssCode);
        newData.jsCode && fs.writeFileSync(oldCodeData.deployedPathJS, newData.jsCode);
    }
};

const comparePlatformAndDeployed = (data) => {
    if (
        (!data.platformCSS && fs.existsSync(data.deployedPathCSS))
        || (data.platformCSS && !fs.existsSync(data.deployedPathCSS))
        || ((data.platformCSS && fs.existsSync(data.deployedPathCSS)) && fs.readFileSync(data.deployedPathCSS).toString().trim() !== data.platformCSS.trim())
    ) {
        errorFile = data.deployedPathCSS;
        data.isSame = false;
        return data;
    } if (
        (!data.platformJS && fs.existsSync(data.deployedPathJS))
        || (data.platformJS && !fs.existsSync(data.deployedPathJS))
        || ((data.platformJS && fs.existsSync(data.deployedPathJS)) && fs.readFileSync(data.deployedPathJS).toString().trim() !== data.platformJS.trim())
    ) {
        errorFile = data.deployedPathJS;
        data.isSame = false;
        return data;
    }
    data.isSame = true;
    return data;

};

const compareGlobalPlatformAndDeployed = (data) => {

    if (
        (!data.platformGlobalCode && fs.existsSync(data.deployedPath))
        || (data.platformGlobalCode && !fs.existsSync(data.deployedPath))
        || ((data.platformGlobalCode && fs.existsSync(data.deployedPath)) && fs.readFileSync(data.deployedPath).toString().trim() !== data.platformGlobalCode.trim())
    ) {
        errorFile = data.deployedPath;
        data.isSame = false;
        return data;
    }
    data.isSame = true;
    return data;

};

const compareTargetingPlatformAndDeployed = (data) => {

    if (
        (!data.platformJs && fs.existsSync(data.deployedPath))
        || (data.platformJs && !fs.existsSync(data.deployedPath))
        || ((data.platformJs && fs.existsSync(data.deployedPath)) && fs.readFileSync(data.deployedPath).toString().trim() !== data.platformJs.trim())
    ) {
        errorFile = data.deployedPath;
        data.isSame = false;
        return data;
    }
    data.isSame = true;
    return data;

};

const deployCodeToPlatform = (newData, url, token, startData) => {
    const method = (startData.isCommon || (startData.personalizationId && !startData.isTargeting) || startData.patchRequest) ? 'PATCH' : 'PUT';

    const putOptions = {
        method,
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    };
    return fetch(url, putOptions)
        .then((putResponse) => {
            if (putResponse.ok) {
                return putResponse.json();
            }
            console.log(putResponse);
            throw new Error(`Error Platform response`);

        })
        .then((newPlatformCodeData) => {

            setNewDeployed(newPlatformCodeData, startData);

            const experimentNameId = startData.experimentID ? `experiment ${startData.experimentID}` : `personalization ${startData.personalizationId}`;

            if (startData.isGlobal) {
                console.log(`Global script for sitecode ${startData.siteCode} deployed to Kameleoon.`);
            } else if (startData.isCommon) {
                console.log(`Common of experiment ${startData.experimentID} deployed to Kameleoon`);
            } else if (startData.isTargeting) {
                console.log(`Targeting of ${experimentNameId} deployed to Kameleoon`);
            } else if (startData.personalizationId) {
                console.log(`${experimentNameId} deployed to Kameleoon.`);
            } else {
                console.log(`Variation ${startData.variationId} of ${experimentNameId} deployed to Kameleoon.`);
            }
            return true;
        })
        .catch((error) => console.error(error));
};

const checkComparedCode = (comparedData, requestData) => {
    const id = requestData.experimentID ? requestData.experimentID : requestData.personalizationId;

    if (!comparedData.isSame && (!requestData.isForceOverwrite && !requestData.isForceLive)) {
        const isLive = (comparedData.isLive) ? `\nAnd Experiment/Personalization: ${id} is active` : ``;
        throw new Error(`DEPLOYMENT ABORTED: code in platform does not match previously deployed version (${errorFile}). Check manually if the code was modified in platform.${isLive} Use ${'\x1b[33m'}--force-overwrite${'\x1b[0m'} in your gulp deploy command to overwrite code on the platform`);
    } else if (comparedData.isSame && requestData.isForceOverwrite && comparedData.isLive) {
        throw new Error(`Experiment/Personalization: ${id} is active.`);
    } else {
        return comparedData;
    }
};

const createNewSegment = (token, actualTest, requestData) => {
    const dirName = requestData.experimentID ? experimentDirName : persoDirName;
    const dirIdName = requestData.experimentID ? requestData.experimentID : requestData.personalizationId;
    const builtFileTargeting = path.join(requestData.builtSiecodeDir, `${dirName}`, `${dirIdName}`, `${tergetingFileName}`);
    if (fs.existsSync(builtFileTargeting)) {
        requestData.newTargetingCodeJS = fs.readFileSync(builtFileTargeting).toString();

        const newSegment = {
            name: actualTest.name,
            siteId: actualTest.siteId,
            audienceTracking: false,
            audienceTrackingEditable: false,
            isFavorite: false,
            conditionsData: {
                firstLevelOrOperators: [false],
                firstLevel: [{
                    conditions: [{
                        targetingType: 'JS_CODE',
                        jsCode: requestData.newTargetingCodeJS,
                        applied: 'IMMEDIATE',
                    }],
                }],
            },
        };

        const putOptions = {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSegment),
        };
        return fetch('https://api.kameleoon.com/segments', putOptions)
            .then((segmentCreateResponse) => {
                if (segmentCreateResponse.ok) {
                    return segmentCreateResponse.json();
                }
                throw new Error(`Create New Segment error - statusText: ${segmentCreateResponse.statusText}, status: ${segmentCreateResponse.status}`);

            });
    }
    throw new Error(`No built file exist in ${builtFileTargeting}`);

};

const updateTargetingSegment = (actualSegment, requestData) => {
    requestData.actualSegmentDataId = actualSegment.id;
    const jsCodeTargetinCondition = actualSegment.conditionsData.firstLevel[0].conditions.find((it) => it.targetingType === 'JS_CODE');

    const idDirName = requestData.experimentID ? requestData.experimentID : requestData.personalizationId;
    const dirName = requestData.experimentID ? experimentDirName : persoDirName;

    if (jsCodeTargetinCondition) {
        const actualData = getActualTargetingData(jsCodeTargetinCondition, actualExperimentData);
        const targetingDeployedFile = getActualDataWithPath(actualData, requestData);
        requestData.conditionJsId = jsCodeTargetinCondition.id;

        const comparedData = compareTargetingPlatformAndDeployed(targetingDeployedFile);
        const checkedComparedCode = checkComparedCode(comparedData, requestData);
        const updatedConditionData = {
            targetingType: 'JS_CODE',
            id: requestData.conditionJsId,
        };
        if (fs.existsSync(checkedComparedCode.builtPath)) {
            updatedConditionData.jsCode = fs.readFileSync(checkedComparedCode.builtPath).toString();
        }
        requestData.deployedPathJS = checkedComparedCode.deployedPath;
        requestData.newTargetingCodeJS = fs.readFileSync(checkedComparedCode.builtPath).toString();
        const segmentConditionURl = getConditionSegmentURL(requestData.actualSegmentDataId, requestData.conditionJsId);
        return deployCodeToPlatform(updatedConditionData, segmentConditionURl, bearerToken, requestData);
    }
    const deployedFileTargeting = path.join(requestData.deployedSiteCodeDir, `${dirName}`, `${idDirName}`, `${tergetingFileName}`);
    if (fs.existsSync(deployedFileTargeting)) {
        throw new Error(`Custom JavaScript Condition does not exist in segment, but deployed file exist in ${deployedFileTargeting}`);
    } else {
        requestData.deployedPathJS = deployedFileTargeting;
        const builtFileTargeting = path.join(requestData.builtSiecodeDir, `${dirName}`, `${idDirName}`, `${tergetingFileName}`);
        if (!fs.existsSync(builtFileTargeting)) {
            throw new Error(`No built file exist in ${builtFileTargeting}`);
        } else {
            requestData.newTargetingCodeJS = fs.readFileSync(builtFileTargeting).toString();
            const newCondition = {
                targetingType: 'JS_CODE',
                jsCode: fs.readFileSync(builtFileTargeting).toString(),
                applied: 'IMMEDIATE',
            };
            actualSegment.conditionsData.firstLevel[0].conditions.push(newCondition);
            actualSegment.conditionsData.firstLevel[0].orOperators.push(false);
            const segmentURL = getSegmentURL(actualSegment.id);
            return deployCodeToPlatform(actualSegment, segmentURL, bearerToken, requestData);
        }
    }

};

// deploy function

const deployPersonalization = (persoUrl, requestData) => getActualPlatformData(persoUrl, bearerToken)
    .then((platformPersoData) => getActualPersoData(platformPersoData))
    .then((actualData) => getActualDataWithPath(actualData, requestData))
    .then((actualDataWithPath) => comparePlatformAndDeployed(actualDataWithPath))
    .then((comparedData) => checkComparedCode(comparedData, requestData))
    .then((comparedData) => {

        if (fs.existsSync(comparedData.builtPathJS)) {
            actualRequestData.javaScriptCode = fs.readFileSync(comparedData.builtPathJS).toString();
        }
        if (fs.existsSync(comparedData.builtPathCSS)) {
            actualRequestData.cssCode = fs.readFileSync(comparedData.builtPathCSS).toString();
        }

        requestData.deployedPathJS = comparedData.deployedPathJS;
        requestData.deployedPathCSS = comparedData.deployedPathCSS;

        return deployCodeToPlatform(actualRequestData, persoUrl, bearerToken, requestData);
    });

const deployCommon = (experimentUrl, requestData) => getActualPlatformData(experimentUrl, bearerToken)
    .then((platformExperimentData) => getActualCommonData(platformExperimentData))
    .then((actualData) => getActualDataWithPath(actualData, requestData))
    .then((actualDataWithPath) => comparePlatformAndDeployed(actualDataWithPath))
    .then((comparedData) => checkComparedCode(comparedData, requestData))
    .then((comparedData) => {

        if (fs.existsSync(comparedData.builtPathJS)) {
            actualRequestData.commonJavaScriptCode = fs.readFileSync(comparedData.builtPathJS).toString();
        }
        if (fs.existsSync(comparedData.builtPathCSS)) {
            actualRequestData.commonCssCode = fs.readFileSync(comparedData.builtPathCSS).toString();
        }

        requestData.deployedPathJS = comparedData.deployedPathJS;
        requestData.deployedPathCSS = comparedData.deployedPathCSS;

        return deployCodeToPlatform(actualRequestData, experimentUrl, bearerToken, requestData);
    });

const deployVariation = (experimentUrl, requestData) => {
    const variationUrl = getVariationURL(requestData.variationId);
    return getActualPlatformData(experimentUrl, bearerToken)
        .then((platformVarianData) => getActualVariantData(platformVarianData, variationUrl))
        .then((actualData) => getActualDataWithPath(actualData, requestData))
        .then((actualDataWithPath) => comparePlatformAndDeployed(actualDataWithPath))
        .then((comparedData) => checkComparedCode(comparedData, requestData))
        .then((comparedData) => {

            if (fs.existsSync(comparedData.builtPathJS)) {
                actualRequestData.jsCode = fs.readFileSync(comparedData.builtPathJS).toString();
            }

            if (fs.existsSync(comparedData.builtPathCSS)) {
                actualRequestData.cssCode = fs.readFileSync(comparedData.builtPathCSS).toString();
            }

            requestData.deployedPathJS = comparedData.deployedPathJS;
            requestData.deployedPathCSS = comparedData.deployedPathCSS;

            return deployCodeToPlatform(actualRequestData, variationUrl, bearerToken, requestData);
        });
};

const deployGlobal = (requestData) => {
    getActualPlatformData(getSiteDataURL(requestData.siteCode), bearerToken)
        .then((actualPlatformData) => getActualGlobalData(actualPlatformData, requestData.siteCode))
        .then((actualData) => getActualDataWithPath(actualData, requestData))
        .then((actualDataWithPath) => compareGlobalPlatformAndDeployed(actualDataWithPath))
        .then((comparedData) => checkComparedCode(comparedData, requestData))
        .then((comparedData) => {

            if (fs.existsSync(comparedData.builtPath)) {
                actualRequestData.trackingScript = fs.readFileSync(comparedData.builtPath).toString();
            }
            const siteEditURl = getSiteEditURl(actualRequestData.id);
            requestData.deployedPath = comparedData.deployedPath;
            return deployCodeToPlatform(actualRequestData, siteEditURl, bearerToken, requestData);
        })
        .catch((error) => {
            console.error(`ERROR: ${error}`);
        });
};

const deployTargeting = (experimentUrl, requestData) => getActualPlatformData(experimentUrl, bearerToken)
    .then((actualPlatformData) => {
        actualExperimentData = actualPlatformData;
        const segmentURl = getSegmentURL(actualPlatformData.targetingSegmentId);
        const idName = requestData.experimentID ? requestData.experimentID : requestData.personalizationId;
        const dirName = requestData.experimentID ? experimentDirName : persoDirName;

        if (actualPlatformData.targetingSegmentId) {
            return getActualPlatformData(segmentURl, bearerToken)
                .then((actualSegment) => updateTargetingSegment(actualSegment, requestData));
        }
        const deployedFileTargeting = path.join(requestData.deployedSiteCodeDir, `${dirName}`, `${idName}`, `${tergetingFileName}`);
        if (fs.existsSync(deployedFileTargeting)) {
            throw new Error(`Custom JavaScript Condition does not exist in segment, but deployed file exist in ${deployedFileTargeting}`);
        } else {
            requestData.deployedPathJS = deployedFileTargeting;
            return createNewSegment(bearerToken, actualPlatformData, requestData)
                .then((createdSegment) => {
                    actualPlatformData.targetingSegmentId = createdSegment.id;
                    actualPlatformData.targetingConfiguration = 'SAVED_TEMPLATE';
                    requestData.patchRequest = true;
                    return deployCodeToPlatform(actualPlatformData, experimentUrl, bearerToken, requestData);
                });
        }

    });

const deployExperiment = (experimentUrl, requestData) => {
    const experimentFileList = getExperimentFiles(requestData);
    const isCommonFile = experimentFileList.find((file) => /common./.test(file));
    const isTargetingFile = experimentFileList.find((file) => /targeting/.test(file));
    const variationsIdList = getVariationsIdList(experimentFileList);

    const waitingDeployVariation = (id) => {
        const variationRequestData = { ...requestData };
        variationRequestData.variationId = id;
        requestData.variationId = id;
        return new Promise((resolve) => {
            resolve(deployVariation(experimentUrl, variationRequestData));
        });
    };

    const waitingDeployPerso = () => {
        const persoRequestData = { ...requestData };
        persoRequestData.variationId = variationsIdList[0];
        return new Promise((resolve) => {
            resolve(deployPersonalization(experimentUrl, persoRequestData));
        });
    };

    const waitinDeployCommon = () => {
        const commonRequestData = { ...requestData };
        commonRequestData.isCommon = true;
        return new Promise((resolve) => {
            resolve(deployCommon(experimentUrl, commonRequestData));
        });
    };

    const waitingDeployTargeting = () => {
        const commonRequestData = { ...requestData };
        commonRequestData.isTargeting = true;
        return new Promise((resolve) => {
            resolve(deployTargeting(experimentUrl, commonRequestData));
        });

    };
    const deployedFiles = requestData.personalizationId ? [waitingDeployPerso()] : variationsIdList.map(waitingDeployVariation);

    if (isCommonFile) {
        deployedFiles.push(waitinDeployCommon());
    }
    if (isTargetingFile) {
        deployedFiles.push(waitingDeployTargeting());
    }

    return Promise.all(deployedFiles);

};

async function deploy(done) {
    if (args.path) {
        const paths = args.path.split('/');
        const [clientFolder, siteCodeFolder, typeFolder, projectFolder] = paths;
        const siteCodeFromPath = siteCodeFolder?.split('-')?.[0];
        const clientIdFromPath = clientFolder?.split('-')?.[0];
        const projectID = projectFolder?.split('-')?.[0];

        if (clientIdFromPath) {
            args['customer-id'] = +clientIdFromPath;
        }
        if (siteCodeFromPath) {
            args.sitecode = siteCodeFromPath;
        }
        if (/experiments/i.test(typeFolder) && projectID) {
            args['experiment-id'] = +projectID;
        } else if (/personalizations/i.test(typeFolder) && projectID) {
            args['personalization-id'] = +projectID;
        }
    }

    await build();
    // args
    const clientId = args['customer-id'];
    const variationId = args['variation-id'];
    const experimentID = args['experiment-id'];
    const personalizationId = args['personalization-id'];
    const siteCode = args.sitecode;
    // flags
    const isGlobal = args.global;
    const isCommon = args.common;
    const isTargeting = args.targeting;
    const isForceOverwrite = args['force-overwrite'];
    const isForceLive = args['force-live'];
    // paths
    const mainDirectory = path.dirname(__dirname);
    let clientDirectory = mainDirectory;
    if (clientId) {
        clientDirectory = getDirectory(mainDirectory, clientId, 'Client Id');
    }
    const clientDeployedPath = path.join(clientDirectory, deployedDirName);
    const clientBuiltPath = path.join(clientDirectory, buildDirName);
    if (!fs.existsSync(clientDeployedPath)) {
        fs.mkdirSync(clientDeployedPath);
    }
    const deployedSiteCodeDirectoryPath = getDirectory(clientDeployedPath, siteCode, 'siteCode', true);
    if (!deployedSiteCodeDirectoryPath) {
        fs.mkdirSync(path.join(clientDeployedPath, siteCode));
    }
    const deployedSiteCodeDirectory = path.join(clientDeployedPath, siteCode);
    const builtSiteCodeDirectory = path.join(clientBuiltPath, siteCode);

    // credentials
    const credentialsFileName = clientId ? kamCredentialsName : customerCredentialsName;
    const clientCredentialsFile = path.join(clientDirectory, credentialsFileName);
    if (!fs.existsSync(clientCredentialsFile)) {
        throw new Error(`No credentials files found in ${clientCredentialsFile}`);
    }
    const clientCredentials = fs.readFileSync(clientCredentialsFile);

    const requestData = {
        clientDir: clientDirectory,
        deployedSiteCodeDir: deployedSiteCodeDirectory,
        builtSiecodeDir: builtSiteCodeDirectory,
        personalizationId,
        variationId,
        experimentID,
        siteCode,
        isGlobal,
        isCommon,
        isTargeting,

        isForceOverwrite,
        isForceLive,
    };

    if (clientCredentials) {
        getAccessToken(clientCredentials)
            .then((token) => {
                bearerToken = `Bearer ${token.access_token}`;
                const experimentUrl = requestData.experimentID ? getExperimentUrl(requestData.experimentID) : getPersonalizationUrl(requestData.personalizationId);
                if (requestData.isGlobal) {

                    return deployGlobal(requestData);

                } if (requestData.isCommon) {

                    return deployCommon(experimentUrl, requestData);

                } if (requestData.personalizationId && requestData.variationId) {

                    return deployPersonalization(experimentUrl, requestData);

                } if (requestData.isTargeting) {

                    return deployTargeting(experimentUrl, requestData);

                } if (requestData.variationId) {
                    return deployVariation(experimentUrl, requestData);
                }
                return deployExperiment(experimentUrl, requestData);

            })
            .then(() => {
                done();
            })
            .catch((error) => {
                done();
                console.log(error);
            });
    }
}

exports.deploy = deploy;
