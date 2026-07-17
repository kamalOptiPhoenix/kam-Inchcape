/* eslint-disable no-console */

const TARGET_ENDPOINT = 'sendEmailWithNames';
const TEMPERATURE_VALUE = 'HOT';

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

function injectTemperature(body) {
    if (typeof body !== 'string') {
        return body;
    }

    try {
        const parsed = JSON.parse(body);

        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            return body;
        }

        parsed.temperature = TEMPERATURE_VALUE;
        console.log('%c *** T139 temperature injected (HOT) ***', 'color:red;background:white');

        return JSON.stringify(parsed);
    } catch (error) {
        return body;
    }
}

function patchFetch() {
    const originalFetch = window.fetch;
    if (typeof originalFetch !== 'function' || originalFetch.__kamT139Patched) {
        return;
    }

    const patchedFetch = function kamT139Fetch(input, init) {
        const url = getUrlString(input);

        if (isTargetUrl(url) && init && typeof init.body === 'string') {
            const nextInit = Object.assign({}, init, { body: injectTemperature(init.body) });
            return originalFetch.call(this, input, nextInit);
        }

        return originalFetch.call(this, input, init);
    };

    patchedFetch.__kamT139Patched = true;
    window.fetch = patchedFetch;
}

function patchXhr() {
    const XhrProto = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
    if (!XhrProto || XhrProto.__kamT139Patched) {
        return;
    }

    const originalOpen = XhrProto.open;
    const originalSend = XhrProto.send;

    XhrProto.open = function kamT139Open(method, url, ...rest) {
        this.__kamT139IsTarget = isTargetUrl(url);
        return originalOpen.call(this, method, url, ...rest);
    };

    XhrProto.send = function kamT139Send(body) {
        if (this.__kamT139IsTarget && typeof body === 'string') {
            return originalSend.call(this, injectTemperature(body));
        }

        return originalSend.call(this, body);
    };

    XhrProto.__kamT139Patched = true;
}

export default function kamT139InterceptTemperature() {
    if (window.__kamT139TemperatureBound) {
        return;
    }

    window.__kamT139TemperatureBound = true;

    patchFetch();
    patchXhr();
}
