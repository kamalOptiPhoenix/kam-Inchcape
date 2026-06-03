/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const gulp = require('gulp');
const path = require('path');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const fs = require('fs');

let accessToken;

const delay = (time) => new Promise((resolve) => { setTimeout(resolve, time); });

const authHeaders = () => ({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
});

const apiJson = async (url, options = {}) => {
    const response = await fetch(url, options);
    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : {};
    } catch (e) {
        throw new Error(`Kameleoon API non-JSON (${response.status}) ${url}: ${text.slice(0, 500)}`);
    }
    if (!response.ok) {
        throw new Error(
            `Kameleoon API ${response.status} ${response.statusText} — ${url}: ${JSON.stringify(data)}`,
        );
    }
    return data;
};

const getVariationId = (variation) => (
    typeof variation === 'object' && variation != null ? variation.id : variation
);

const readCredentials = (clientFolder) => new Promise((resolve, reject) => {
    fs.readFile(`${clientFolder}/.credentials`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject();
        }
        resolve(JSON.parse(data));
    });
});

const readConfig = (projectFolder) => new Promise((resolve, reject) => {
    fs.readFile(`${projectFolder}/config.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject();
        }
        resolve(JSON.parse(data));
    });
});

const getAccessToken = async (clientFolder) => {
    const { client_id, client_secret } = await readCredentials(clientFolder);
    const data = await apiJson('https://api.kameleoon.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id,
            client_secret,
        }).toString(),
    });
    if (!data.access_token) {
        throw new Error(`OAuth failed — no access_token: ${JSON.stringify(data)}`);
    }
    return data.access_token;
};

const getSiteByCode = async (siteCode) => apiJson(`https://api.kameleoon.com/sites/byCode/${siteCode}`, {
    method: 'GET',
    headers: authHeaders(),
});

const getExperimentById = async (experimentId) => apiJson(
    `https://api.kameleoon.com/experiments/${experimentId}?optionalFields=variations`,
    { method: 'GET', headers: authHeaders() },
);

const createNewExperiment = async (requestBody) => apiJson('https://api.kameleoon.com/experiments', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(requestBody),
});

const createNewVariation = async (name, siteId, color) => {
    const data = await apiJson('https://api.kameleoon.com/v1/graphql', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
            query: `
                mutation createVariation($variation: VariationInput!) {
                    createVariation(variation: $variation) {
                        id
                        name
                    }
                }
            `,
            variables: {
                variation: {
                    name,
                    siteId,
                    color,
                },
            },
        }),
    });
    if (data.errors?.length) {
        throw new Error(`GraphQL createVariation: ${JSON.stringify(data.errors)}`);
    }
    return data;
};

const createNewPersonalization = async (requestBody) => apiJson('https://api.kameleoon.com/personalizations', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(requestBody),
});

const updatePersonalization = async (personalizationId, requestBody) => apiJson(
    `https://api.kameleoon.com/personalizations/${personalizationId}`,
    {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(requestBody),
    },
);

const createNewGoal = async (requestBody, index) => {
    await delay(index * 200);
    return apiJson('https://api.kameleoon.com/goals', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(requestBody),
    });
};

const updateExperiment = async (experimentId, requestBody) => apiJson(
    `https://api.kameleoon.com/experiments/${experimentId}`,
    {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(requestBody),
    },
);

const updateExperimentGQL = async (experimentId, requestBody) => apiJson('https://api.kameleoon.com/v1/graphql', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
        query: `
            mutation updateExperiment($id: ID!, $experiment: ExperimentInput!) {
                updateExperiment(id: $id, experiment: $experiment) {
                    id
                }
            }
        `,
        variables: {
            id: experimentId,
            experiment: requestBody,
        },
    }),
});

const updateVariation = async (variationId, requestBody, index) => {
    await delay(index * 500);
    return apiJson(`https://api.kameleoon.com/variations/${variationId}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(requestBody),
    });
};

const deleteVariation = async (variationId) => apiJson(`https://api.kameleoon.com/variations/${variationId}`, {
    method: 'DELETE',
    headers: authHeaders(),
});

const homogenizeName = (originalString) => originalString
    .replace(/(?:\[.*\||\[)([a-zA-Z]{1,}-?[\d]{1,}).*\]/g, (match, projectCode) => `${projectCode}_`)
    .replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();

const toCamleCase = (originalString) => originalString.replace(/([-_].)/g, (match) => match.slice(-1).toUpperCase());

const create = async (done) => {
    const paths = args.path.split('/');
    const [clientFolder, siteCodeFolder, typeFolder, projectFolder] = paths;
    const siteCode = siteCodeFolder?.split('-')?.[0];

    if (!siteCode) throw new Error(`No site code found in ${clientFolder}/${siteCodeFolder}`);
    if (!fs.existsSync(`${clientFolder}/.credentials`)) {
        throw new Error(`No credentials files found in ${clientFolder}`);
    }
    if (!fs.existsSync(`${args.path}/config.json`)) {
        throw new Error(`No config files found in ${args.path}`);
    }
    const config = await readConfig(args.path);

    accessToken = await getAccessToken(clientFolder);
    const site = await getSiteByCode(siteCode);
    if (!site?.id) {
        throw new Error(`No matching site for code "${siteCode}": ${JSON.stringify(site)}`);
    }

    const siteId = site.id;
    const baseURL = site.url || site.baseURL;

    const createdGoals = await Promise.all(config.goalsToCreate.map((name, index) => createNewGoal({
        name, siteId, type: 'CUSTOM', hasMultipleConversions: true,
    }, index)));
    createdGoals.forEach((goal, index) => {
        if (!goal?.id) {
            throw new Error(`Goal creation failed for "${config.goalsToCreate[index]}": ${JSON.stringify(goal)}`);
        }
    });
    const createdGoalsIds = createdGoals.map(({ id }) => id);
    createdGoals.forEach(({ id, name }) => console.log(`goals created: "${name}" (${id})`));

    const goalsObj = {};
    createdGoals.forEach(({ name, id }) => {
        goalsObj[name] = id;
    });

    const totalGoals = [...createdGoalsIds, ...config.goalsToAdd];
    let mainGoalId = config.primaryGoal;
    if (typeof mainGoalId === 'string' && goalsObj[mainGoalId]) {
        mainGoalId = goalsObj[mainGoalId];
    }
    if (!mainGoalId && totalGoals.length) {
        mainGoalId = totalGoals[0];
    }

    if (!config.variations?.length || !config.projectName?.length) {
        throw new Error(`No project or variation names found inside the config file`);
    }

    let createdProject;
    let intialVariation;
    let updatedVariations = [];

    if (/experiments/i.test(typeFolder)) {
        let createdExperiement = await createNewExperiment({
            siteId, name: config.projectName, siteCode, baseURL, type: 'DEVELOPER',
        });
        if (!createdExperiement?.id) {
            throw new Error(`Experiment creation failed: ${JSON.stringify(createdExperiement)}`);
        }
        if (!createdExperiement.variations?.length) {
            createdExperiement = await getExperimentById(createdExperiement.id);
        }
        console.log(`experiment created: "${createdExperiement.name}" (${createdExperiement.id})`);
        createdProject = createdExperiement;

        const firstVariationId = getVariationId(createdExperiement.variations[0]);
        if (!firstVariationId) {
            throw new Error(`Experiment has no variations: ${JSON.stringify(createdExperiement.variations)}`);
        }

        intialVariation = await updateVariation(firstVariationId, {
            experimentId: createdExperiement.id,
            name: config.variations.shift(),
        });

        const additionalVariations = await Promise.all(config.variations.map((name, index) => createNewVariation(name, siteId, index + 2)));

        const additionalVariationsIds = additionalVariations.map(({ data: { createVariation: { id } } }) => id);
        updatedVariations = await Promise.all(additionalVariationsIds.map((id, index) => updateVariation(id, { experimentId: createdExperiement.id }, index)));

        const totalVariations = [intialVariation.id, ...additionalVariationsIds];
        [intialVariation, ...updatedVariations].forEach(({ id, name }) => console.log(`variation created: "${name}" (${id})`));

        const evenAllocation = Math.ceil((1 / (totalVariations.length + 1)) * 100000000) / 100000000;
        const deviations = {
            origin: evenAllocation,
        };

        totalVariations.forEach((id) => {
            deviations[id] = evenAllocation;
        });

        await updateExperiment(createdExperiement.id, { deviations, goals: totalGoals, mainGoalId });
        // await updateExperiment(createdExperiement.id, { deviations });
        // await updateExperimentGQL(createdExperiement.id, { goals: totalGoals, mainGoalId });
    } else if (/personalizations/i.test(typeFolder)) {
        const createdPersonalization = await createNewPersonalization({
            siteId, name: config.projectName,
        });
        createdProject = createdPersonalization;
        intialVariation = {
            name: 'personalization',
            id: createdPersonalization.variationId,
        };
        await updatePersonalization(createdPersonalization.id, { goals: totalGoals, mainGoalId });
    } else {
        throw new Error(`Project needs to be inside the experiments or personalizations folder`);
    }

    try {
        if (config.goalsToCreate.length) {
            fs.writeFileSync(`${args.path}/goals.js`, `export const goals = ${JSON.stringify(goalsObj, null, 4)};`);
        }

        [intialVariation, ...updatedVariations].forEach(({ name, id }) => {
            fs.writeFileSync(`${args.path}/${id}-${homogenizeName(name)}.js`, ``);
            fs.writeFileSync(`${args.path}/${id}-${homogenizeName(name)}.scss`, ``);
        });

        fs.writeFileSync(`${args.path}/common.js`, ``);
        fs.writeFileSync(
            `${clientFolder}/${siteCodeFolder}/global/module-${createdProject.id}_${homogenizeName(createdProject.name)}.js`,
            `export const ${toCamleCase(homogenizeName(createdProject.name))} = () => {\n\n};\n`
        );

        fs.renameSync(args.path, `${clientFolder}/${siteCodeFolder}/${typeFolder}/${createdProject.id}-${homogenizeName(createdProject.name)}`);
    } catch (err) {
        console.error(err);
    }

    done();
};

exports.create = create;
