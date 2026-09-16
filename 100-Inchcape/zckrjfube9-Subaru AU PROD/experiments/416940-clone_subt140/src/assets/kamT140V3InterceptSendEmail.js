/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT140FillMissingModelData, {
    kamT140NeedsModelFallback,
    kamT140WaitForVariantInDom,
} from './kamT140FillMissingModelData.js';
import { kamT140GetPreferredPhone } from './kamT140AddPreferredPhone.js';
import kamT140LogToGoogleSheet from './kamT140LogToGoogleSheet.js';
import kamT140V3ShowShareBuildPopup, {
    kamT140V3ClosePopup,
    kamT140V3ShowConfirmation,
} from './kamT140V3ShareBuildPopup.js';

const TARGET_ENDPOINT = 'sendEmailWithNames';
const PAYLOAD_LOG_KEY = 'kamT140HotLeadPayloadLogs';
const PAYLOAD_LOG_LIMIT = 20;
const PAYLOAD_LOG_WINDOW_KEY = '__kamT140HotLeadPayloadLogs';
const PENDING_KEY = '__kamT140V3PendingRequest';
const SUBMITTED_KEY = 'kamT140V3LeadSubmitted';
const PENDING_BODY_KEY = 'kamT140V3PendingBody';
const PENDING_URL_KEY = 'kamT140V3SendEmailUrl';
const SUMMARY_SELECTOR = '#customise_summary';
const SUMMARY_VIEWPORT_DELAY_MS = 3000;
const CHECKOUT_BUTTON_SELECTOR = 'button[data-test="customise:summary:continuetocheckoutv4"]';
const EMAIL_KEYS = ['kamT140EmailCollected', 'T37EmailCollected'];

function kamT140V3StoreLeadPayload(parsed, modelFromDom) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        toEmail: parsed.toEmail || '',
        firstName: parsed.firstName || '',
        lastName: parsed.lastName || '',
        modelName: parsed.modelName || '',
        variantName: parsed.variantName || '',
        configUrl: parsed.configUrl || '',
        postCode: parsed.postCode || parsed.postcode || '',
        mobile: parsed.mobile || '',
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
        `%c *** T140 V3 ${parsed.temperature || ''} lead payload ***`,
        'color:#fff;background:#1637A0;font-weight:bold',
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

function kamT140V3FakeSuccessResponse() {
    return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

function kamT140V3PrepareRequestBody(body, temperature) {
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
        parsed.temperature = temperature;

        const preferredPhone = kamT140GetPreferredPhone();
        if (preferredPhone) {
            parsed.mobile = preferredPhone;
        }

        kamT140V3StoreLeadPayload(parsed, fillResult.modelFromDom);

        return {
            body: JSON.stringify(parsed),
            modelName: parsed.modelName || '',
        };
    }));
}

function kamT140V3SendPendingLead(temperature) {
    const pending = window[PENDING_KEY];

    if (!pending || typeof pending.body !== 'string') {
        return Promise.resolve();
    }

    if (sessionStorage.getItem(SUBMITTED_KEY) === 'true') {
        return Promise.resolve();
    }

    return kamT140V3PrepareRequestBody(pending.body, temperature).then((prepared) => {
        const nextBody = typeof prepared === 'string' ? prepared : prepared.body;
        const headers = pending.headers || { 'Content-Type': 'application/json' };

        sessionStorage.setItem(SUBMITTED_KEY, 'true');
        window.__kamT140V3BypassIntercept = true;

        return window.fetch(pending.url, {
            method: pending.method || 'POST',
            headers,
            body: nextBody,
            credentials: pending.credentials || 'same-origin',
        }).finally(() => {
            window.__kamT140V3BypassIntercept = false;
            window[PENDING_KEY] = null;
            sessionStorage.removeItem(PENDING_BODY_KEY);
        });
    });
}

function kamT140V3GetCollectedEmail() {
    for (let index = 0; index < EMAIL_KEYS.length; index += 1) {
        const email = sessionStorage.getItem(EMAIL_KEYS[index]);
        if (email && email.trim()) {
            return email.trim();
        }
    }

    return '';
}

function kamT140V3PersistPending(pending) {
    window[PENDING_KEY] = pending;

    try {
        sessionStorage.setItem(PENDING_BODY_KEY, pending.body);
        sessionStorage.setItem(PENDING_URL_KEY, pending.url);
    } catch (error) {
        // sessionStorage may be unavailable
    }
}

function kamT140V3RestorePendingFromSession() {
    if (window[PENDING_KEY]) {
        return window[PENDING_KEY];
    }

    const body = sessionStorage.getItem(PENDING_BODY_KEY);
    const url = sessionStorage.getItem(PENDING_URL_KEY);

    if (body && url) {
        window[PENDING_KEY] = {
            url,
            body,
            method: 'POST',
        };
    }

    return window[PENDING_KEY];
}

function kamT140V3BuildFallbackPayload() {
    const postCode = new URLSearchParams(window.location.search).get('postcode') || '';

    return {
        toEmail: kamT140V3GetCollectedEmail(),
        firstName: sessionStorage.getItem('T38FNameCollected') || '',
        lastName: sessionStorage.getItem('T38LNameCollected') || '',
        configUrl: window.location.href,
        postCode,
        postcode: postCode,
        modelName: '',
        variantName: '',
    };
}

function kamT140V3EnsurePendingRequest() {
    kamT140V3RestorePendingFromSession();

    if (window[PENDING_KEY]) {
        return Promise.resolve(true);
    }

    const url = sessionStorage.getItem(PENDING_URL_KEY);
    if (!url) {
        return Promise.resolve(false);
    }

    const payload = kamT140V3BuildFallbackPayload();

    return kamT140FillMissingModelData(payload).then(() => {
        kamT140V3PersistPending({
            url,
            body: JSON.stringify(payload),
            method: 'POST',
        });

        console.log('%c *** T140 V3 fallback sendEmail payload built ***', 'color:#fff;background:#1637A0');
        return true;
    });
}

function kamT140V3GetModelNameFromBody(body) {
    if (typeof body !== 'string') {
        return '';
    }

    try {
        const parsed = JSON.parse(body);
        return (parsed && parsed.modelName) ? parsed.modelName : '';
    } catch (error) {
        return '';
    }
}

function kamT140V3IsSummaryInViewport() {
    const summarySection = document.querySelector(SUMMARY_SELECTOR);
    if (!summarySection) {
        return false;
    }

    const rect = summarySection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

function kamT140V3IsSummarySettled() {
    const summarySection = document.querySelector(SUMMARY_SELECTOR);
    if (!summarySection || !kamT140V3IsSummaryInViewport()) {
        return false;
    }

    return Boolean(
        summarySection.querySelector('[data-test="title:variantName"], [data-test="title:model"]')
        || summarySection.querySelector('img[src*="inchcosy"], img[src*="subaruauasset"]')
    );
}

function kamT140V3OpenPopup() {
    const pending = window[PENDING_KEY];
    if (!pending || typeof pending.body !== 'string') {
        return;
    }

    if (sessionStorage.getItem(SUBMITTED_KEY) === 'true' || window.__kamT140V3PopupOpen) {
        return;
    }

    kamT140V3ShowShareBuildPopup({
        modelName: kamT140V3GetModelNameFromBody(pending.body),
        onShareBuild: () => kamT140V3SendPendingLead('HOT').then(() => {
            kamT140V3ShowConfirmation();
        }),
        onKeepCustomising: () => kamT140V3SendPendingLead('WARM').then(() => {
            kamT140V3ClosePopup();
        }),
        onClose: () => kamT140V3SendPendingLead('WARM').then(() => {
            kamT140V3ClosePopup();
        }),
    });
}

function kamT140V3TryShowPopup() {
    if (sessionStorage.getItem(SUBMITTED_KEY) === 'true' || window.__kamT140V3PopupOpen) {
        return;
    }

    if (!kamT140V3GetCollectedEmail()) {
        return;
    }

    if (!kamT140V3IsSummarySettled()) {
        return;
    }

    kamT140V3EnsurePendingRequest().then((hasPending) => {
        if (!hasPending) {
            console.log(
                '%c *** T140 V3 summary ready — waiting for sendEmail payload ***',
                'color:#fff;background:#1637A0'
            );
            return;
        }

        if (sessionStorage.getItem(SUBMITTED_KEY) === 'true' || window.__kamT140V3PopupOpen) {
            return;
        }

        console.log('%c *** T140 V3 summary in viewport — showing popup ***', 'color:#fff;background:#1637A0');
        kamT140V3OpenPopup();
    });
}

function kamT140V3ScheduleSummaryCheck() {
    window.setTimeout(kamT140V3TryShowPopup, SUMMARY_VIEWPORT_DELAY_MS);
}

function kamT140V3StorePendingRequest(url, init, body) {
    kamT140V3PersistPending({
        url,
        body,
        method: (init && init.method) ? init.method : 'POST',
        headers: init && init.headers,
        credentials: init && init.credentials,
    });

    kamT140V3ScheduleSummaryCheck();
}

function kamT140V3BindSummaryViewportWatchers() {
    if (window.__kamT140V3SummaryWatchBound) {
        return;
    }

    window.__kamT140V3SummaryWatchBound = true;

    window.addEventListener('scroll', () => {
        if (sessionStorage.getItem(SUBMITTED_KEY) === 'true' || window.__kamT140V3PopupOpen) {
            return;
        }

        if (!document.querySelector(SUMMARY_SELECTOR) || !kamT140V3GetCollectedEmail()) {
            return;
        }

        kamT140V3ScheduleSummaryCheck();
    }, { passive: true });

    document.addEventListener('click', (event) => {
        if (sessionStorage.getItem(SUBMITTED_KEY) === 'true' || window.__kamT140V3PopupOpen) {
            return;
        }

        if (!kamT140V3GetCollectedEmail()) {
            return;
        }

        const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
        if (!el || !el.closest) {
            return;
        }

        const checkoutButton = el.closest(CHECKOUT_BUTTON_SELECTOR);
        const clickedButton = el.closest('button, a, [role="button"]');
        const label = clickedButton
            ? (clickedButton.innerText || clickedButton.textContent || '').replace(/\s+/g, ' ').trim()
            : '';
        const isSummaryTab = clickedButton && /^summary$/i.test(label);

        if (!checkoutButton && !isSummaryTab) {
            return;
        }

        kamT140V3ScheduleSummaryCheck();
    }, true);
}

function patchFetch() {
    const originalFetch = window.fetch;
    if (typeof originalFetch !== 'function' || originalFetch.__kamT140V3Patched) {
        return;
    }

    const patchedFetch = function kamT140V3Fetch(input, init) {
        const url = getUrlString(input);

        if (window.__kamT140V3BypassIntercept) {
            return originalFetch.call(this, input, init);
        }

        if (!isTargetUrl(url) || !init || typeof init.body !== 'string') {
            return originalFetch.call(this, input, init);
        }

        // Already submitted via popup — swallow duplicate site retries.
        if (sessionStorage.getItem(SUBMITTED_KEY) === 'true') {
            return Promise.resolve(kamT140V3FakeSuccessResponse());
        }

        // Popup already open — ignore duplicate calls.
        if (window.__kamT140V3PopupOpen) {
            return Promise.resolve(kamT140V3FakeSuccessResponse());
        }

        // Hold payload; popup opens only after settled summary is in viewport.
        kamT140V3StorePendingRequest(url, init, init.body);
        return Promise.resolve(kamT140V3FakeSuccessResponse());
    };


    patchedFetch.__kamT140V3Patched = true;
    window.fetch = patchedFetch;
}

function kamT140V3FakeXhrSuccess(xhr) {
    window.setTimeout(() => {
        try {
            Object.defineProperty(xhr, 'readyState', { configurable: true, get: () => 4 });
            Object.defineProperty(xhr, 'status', { configurable: true, get: () => 200 });
            Object.defineProperty(xhr, 'responseText', { configurable: true, get: () => '{}' });
            Object.defineProperty(xhr, 'response', { configurable: true, get: () => '{}' });
        } catch (error) {
            // Some browsers may already have these set.
        }

        if (typeof xhr.onreadystatechange === 'function') {
            xhr.onreadystatechange();
        }
        if (typeof xhr.onload === 'function') {
            xhr.onload();
        }
    }, 0);
}

function patchXhr() {
    const XhrProto = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
    if (!XhrProto || XhrProto.__kamT140V3Patched) {
        return;
    }

    const originalOpen = XhrProto.open;
    const originalSend = XhrProto.send;

    XhrProto.open = function kamT140V3Open(method, url, ...rest) {
        this.__kamT140V3IsTarget = isTargetUrl(url);
        this.__kamT140V3Url = url;
        this.__kamT140V3Method = method;
        return originalOpen.call(this, method, url, ...rest);
    };

    XhrProto.send = function kamT140V3Send(body) {
        if (window.__kamT140V3BypassIntercept || !this.__kamT140V3IsTarget || typeof body !== 'string') {
            return originalSend.call(this, body);
        }

        if (sessionStorage.getItem(SUBMITTED_KEY) === 'true' || window.__kamT140V3PopupOpen) {
            kamT140V3FakeXhrSuccess(this);
            return undefined;
        }

        kamT140V3StorePendingRequest(this.__kamT140V3Url, {
            method: this.__kamT140V3Method || 'POST',
            body,
        }, body);

        kamT140V3FakeXhrSuccess(this);
        return undefined;
    };

    XhrProto.__kamT140V3Patched = true;
}

export default function kamT140V3InterceptSendEmail() {
    if (window.__kamT140V3InterceptBound) {
        return;
    }

    window.__kamT140V3InterceptBound = true;

    patchFetch();
    patchXhr();
    kamT140V3RestorePendingFromSession();
    kamT140V3BindSummaryViewportWatchers();

    if (kamT140V3GetCollectedEmail() && document.querySelector(SUMMARY_SELECTOR)) {
        kamT140V3ScheduleSummaryCheck();
    }
}
