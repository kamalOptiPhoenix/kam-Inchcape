/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const gulp = require('gulp');
const path = require('path');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const fs = require('fs');

let accessToken;

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
    const { access_token } = await fetch('https://api.kameleoon.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id,
            client_secret,
        }).toString(),
    }).then((r) => r.json());
    return access_token;
};

const getSimulationLink = async (type, experiemntId) => fetch(`https://api.kameleoon.com/${type}/simulate/${experiemntId}`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
}).then((r) => r.text()).then((data) => data).catch(console.log);

const sim = async (done) => {
    const paths = args.path.split('/');
    const [clientFolder, siteCodeFolder, typeFolder, projectFolder] = paths;
    const siteCode = siteCodeFolder?.split('-')?.[0];
    const experimentId = projectFolder?.split('-')?.[0];

    if (!siteCode) throw new Error(`No site code found in ${clientFolder}/${siteCodeFolder}`);
    if (!fs.existsSync(`${clientFolder}/.credentials`)) {
        throw new Error(`No credentials files found in ${clientFolder}`);
    }
    if (!/(personalizations)|(experiments)/i.test(typeFolder)) {
        throw new Error(`Folder "${typeFolder}" could not be identified as a experiment or personalization`);
    }

    accessToken = await getAccessToken(clientFolder);
    const link = await getSimulationLink(typeFolder, experimentId);
    console.log('\n', 'Generated simulate Link:', '\x1b[47m\x1b[30m', link, '\x1b[0m', '\n');

    done();
};

exports.sim = sim;
