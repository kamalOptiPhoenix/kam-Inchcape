/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT140FillMissingModelData, {
    kamT140NeedsModelFallback,
    kamT140WaitForVariantInDom,
} from './kamT140FillMissingModelData.js';
import kamT140LogToGoogleSheet from './kamT140LogToGoogleSheet.js';

const TARGET_ENDPOINT = 'sendEmailWithNames';
const TEMPERATURE_VALUE = 'HOT';
const PAYLOAD_LOG_KEY = 'kamT140HotLeadPayloadLogs';
const PAYLOAD_LOG_LIMIT = 20;
const PAYLOAD_LOG_WINDOW_KEY = '__kamT140HotLeadPayloadLogs';

function kamT140StoreHotLeadPayload(parsed, modelFromDom) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        toEmail: parsed.toEmail || '',
        firstName: parsed.firstName || '',
        lastName: parsed.lastName || '',
        modelName: parsed.modelName || '',
        variantName: parsed.variantName || '',
        configUrl: parsed.configUrl || '',
        postCode: parsed.postCode || parsed.postcode || '',
        temperature: parsed.temperature || '',
        modelFromDom: modelFromDom || 'No',
        payload: parsed,
    };

    let logs = [];

    try {
        logs = JSON.parse(sessionStorage.getItem(PAYLOAD_LOG_KEY) || '[]');
    } catch (error) {
        logs = [];
    }

    logs.push(logEntry);

    if (logs.length > PAYLOAD_LOG_LIMIT) {
        logs = logs.slice(logs.length - PAYLOAD_LOG_LIMIT);
    }

    sessionStorage.setItem(PAYLOAD_LOG_KEY, JSON.stringify(logs));
    window[PAYLOAD_LOG_WINDOW_KEY] = logs;

    console.log(
        '%c *** T140 HOT lead payload ***',
        'color:#fff;background:#c00;font-weight:bold',
        logEntry
    );

    kamT140LogToGoogleSheet(logEntry);
}

function getUrlString(input) {
    if (typeof input === 'string') {
        return input;
    }

    if (input && typeof input.url === 'string') {
        return input.url;
    }

    return '';
}

function isTargetUrl(url) {
    return typeof url === 'string' && url.indexOf(TARGET_ENDPOINT) !== -1;
}

function kamT140PrepareRequestBody(body) {
    if (typeof body !== 'string') {
        return Promise.resolve(body);
    }

    let parsed;

    try {
        parsed = JSON.parse(body);
    } catch (error) {
        return Promise.resolve(body);
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return Promise.resolve(body);
    }

    const waitPromise = kamT140NeedsModelFallback(parsed)
        ? kamT140WaitForVariantInDom(3000)
        : Promise.resolve();

    return waitPromise.then(() => kamT140FillMissingModelData(parsed).then((fillResult) => {
        parsed.temperature = TEMPERATURE_VALUE;
        kamT140StoreHotLeadPayload(parsed, fillResult.modelFromDom);

        return JSON.stringify(parsed);
    }));
}

function patchFetch() {
    const originalFetch = window.fetch;
    if (typeof originalFetch !== 'function' || originalFetch.__kamT140Patched) {
        return;
    }

    const patchedFetch = function kamT140Fetch(input, init) {
        const url = getUrlString(input);

        if (isTargetUrl(url) && init && typeof init.body === 'string') {
            return kamT140PrepareRequestBody(init.body).then((nextBody) => {
                const nextInit = Object.assign({}, init, { body: nextBody });
                return originalFetch.call(this, input, nextInit);
            });
        }

        return originalFetch.call(this, input, init);
    };

    patchedFetch.__kamT140Patched = true;
    window.fetch = patchedFetch;
}

function patchXhr() {
    const XhrProto = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
    if (!XhrProto || XhrProto.__kamT140Patched) {
        return;
    }

    const originalOpen = XhrProto.open;
    const originalSend = XhrProto.send;

    XhrProto.open = function kamT140Open(method, url, ...rest) {
        this.__kamT140IsTarget = isTargetUrl(url);
        return originalOpen.call(this, method, url, ...rest);
    };

    XhrProto.send = function kamT140Send(body) {
        if (this.__kamT140IsTarget && typeof body === 'string') {
            const xhr = this;

            kamT140PrepareRequestBody(body).then((nextBody) => {
                originalSend.call(xhr, nextBody);
            });

            return;
        }

        return originalSend.call(this, body);
    };

    XhrProto.__kamT140Patched = true;
}

export default function kamT140InterceptTemperature() {
    if (window.__kamT140TemperatureBound) {
        return;
    }

    window.__kamT140TemperatureBound = true;

    patchFetch();
    patchXhr();
}
