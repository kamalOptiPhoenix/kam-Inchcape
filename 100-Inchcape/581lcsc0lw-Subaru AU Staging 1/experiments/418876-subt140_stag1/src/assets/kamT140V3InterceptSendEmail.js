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
const SUBMITTED_AT_KEY = 'kamT140V3LeadSubmittedAt';
const PENDING_BODY_KEY = 'kamT140V3PendingBody';
const PENDING_URL_KEY = 'kamT140V3SendEmailUrl';
const EMAIL_LOCAL_KEY = 'kamT140V3EmailCollected';
const SUMMARY_SELECTOR = '#customise_summary';
// Only used when summary is visible but content has not painted yet.
const SUMMARY_SETTLE_RETRY_MS = 100;
const SUBMIT_RETRY_GUARD_MS = 8000;
const CHECKOUT_BUTTON_SELECTOR = 'button[data-test="customise:summary:continuetocheckoutv4"]';
const EMAIL_KEYS = ['kamT140EmailCollected', 'T37EmailCollected', EMAIL_LOCAL_KEY];

function kamT140V3StorageGet(key) {
    try {
        return sessionStorage.getItem(key) || localStorage.getItem(key) || '';
    } catch (error) {
        return '';
    }
}

function kamT140V3StorageSet(key, value) {
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        // sessionStorage may be unavailable
    }

    try {
        localStorage.setItem(key, value);
    } catch (error) {
        // localStorage may be unavailable
    }
}

function kamT140V3StorageRemove(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        // ignore
    }

    try {
        localStorage.removeItem(key);
    } catch (error) {
        // ignore
    }
}

function kamT140V3WasRecentlySubmitted() {
    const submittedAt = Number(kamT140V3StorageGet(SUBMITTED_AT_KEY) || 0);
    if (!submittedAt) {
        // Legacy SUBMITTED flag without timestamp — do not block new sessions forever.
        return false;
    }

    return (Date.now() - submittedAt) < SUBMIT_RETRY_GUARD_MS;
}

function kamT140V3MarkSubmitted() {
    kamT140V3StorageSet(SUBMITTED_KEY, 'true');
    kamT140V3StorageSet(SUBMITTED_AT_KEY, String(Date.now()));
}

function kamT140V3ClearSubmitted() {
    kamT140V3StorageRemove(SUBMITTED_KEY);
    kamT140V3StorageRemove(SUBMITTED_AT_KEY);
}

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

    if (kamT140V3WasRecentlySubmitted()) {
        return Promise.resolve();
    }

    return kamT140V3PrepareRequestBody(pending.body, temperature).then((prepared) => {
        const nextBody = typeof prepared === 'string' ? prepared : prepared.body;
        const headers = pending.headers || { 'Content-Type': 'application/json' };

        kamT140V3MarkSubmitted();
        window.__kamT140V3BypassIntercept = true;

        return window.fetch(pending.url, {
            method: pending.method || 'POST',
            headers,
            body: nextBody,
            credentials: pending.credentials || 'same-origin',
        }).finally(() => {
            window.__kamT140V3BypassIntercept = false;
            window[PENDING_KEY] = null;
            kamT140V3StorageRemove(PENDING_BODY_KEY);
            kamT140V3StorageRemove(PENDING_URL_KEY);
        });
    });
}

function kamT140V3EmailFromPendingBody(body) {
    if (typeof body !== 'string') {
        return '';
    }

    try {
        const parsed = JSON.parse(body);
        return (parsed && parsed.toEmail) ? String(parsed.toEmail).trim() : '';
    } catch (error) {
        return '';
    }
}

function kamT140V3GetCollectedEmail() {
    for (let index = 0; index < EMAIL_KEYS.length; index += 1) {
        const email = kamT140V3StorageGet(EMAIL_KEYS[index]);
        if (email && email.trim()) {
            return email.trim();
        }
    }

    const pending = window[PENDING_KEY] || null;
    const fromPending = kamT140V3EmailFromPendingBody(pending && pending.body);
    if (fromPending) {
        return fromPending;
    }

    return kamT140V3EmailFromPendingBody(kamT140V3StorageGet(PENDING_BODY_KEY));
}

function kamT140V3PersistPending(pending) {
    window[PENDING_KEY] = pending;

    kamT140V3StorageSet(PENDING_BODY_KEY, pending.body);
    kamT140V3StorageSet(PENDING_URL_KEY, pending.url);

    const emailFromBody = kamT140V3EmailFromPendingBody(pending.body);
    if (emailFromBody) {
        kamT140V3StorageSet(EMAIL_LOCAL_KEY, emailFromBody);
        try {
            sessionStorage.setItem('kamT140EmailCollected', emailFromBody);
            sessionStorage.setItem('T37EmailCollected', emailFromBody);
        } catch (error) {
            // ignore
        }
    }
}

function kamT140V3RestorePendingFromSession() {
    if (window[PENDING_KEY]) {
        return window[PENDING_KEY];
    }

    const body = kamT140V3StorageGet(PENDING_BODY_KEY);
    const url = kamT140V3StorageGet(PENDING_URL_KEY);

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
        firstName: kamT140V3StorageGet('T38FNameCollected') || '',
        lastName: kamT140V3StorageGet('T38LNameCollected') || '',
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

    const url = kamT140V3StorageGet(PENDING_URL_KEY);
    if (!url) {
        return Promise.resolve(false);
    }

    const payload = kamT140V3BuildFallbackPayload();
    if (!payload.toEmail) {
        return Promise.resolve(false);
    }

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

    if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
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
    if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
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

        if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
            return;
        }

        console.log('%c *** T140 V3 summary in viewport — showing popup ***', 'color:#fff;background:#1637A0');
        kamT140V3OpenPopup();
    });
}

function kamT140V3ScheduleSummaryCheck() {
    window.clearTimeout(window.__kamT140V3SummaryCheckTimer);

    // Settled → show on next tick (coalesces scroll spam, no perceptible delay).
    // Not settled → brief retry while summary content paints.
    const delayMs = kamT140V3IsSummarySettled() ? 0 : SUMMARY_SETTLE_RETRY_MS;

    window.__kamT140V3SummaryCheckTimer = window.setTimeout(
        kamT140V3TryShowPopup,
        delayMs
    );
}

function kamT140V3StorePendingRequest(url, init, body) {
    // Native sendEmail again = new session opportunity (control also fires again).
    kamT140V3ClearSubmitted();

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

    const maybeSchedule = () => {
        if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
            return;
        }

        if (!document.querySelector(SUMMARY_SELECTOR) || !kamT140V3GetCollectedEmail()) {
            return;
        }

        kamT140V3ScheduleSummaryCheck();
    };

    window.addEventListener('scroll', maybeSchedule, { passive: true });

    // Another tab may hold sendEmail first (fake 200). Restore shared pending here.
    window.addEventListener('storage', (event) => {
        if (event.key !== PENDING_BODY_KEY && event.key !== PENDING_URL_KEY) {
            return;
        }

        if (!event.newValue) {
            return;
        }

        window[PENDING_KEY] = null;
        kamT140V3RestorePendingFromSession();
        maybeSchedule();
    });

    if (typeof IntersectionObserver === 'function') {
        const observeSummary = (summarySection) => {
            if (!summarySection || summarySection.__kamT140V3Observed) {
                return;
            }

            summarySection.__kamT140V3Observed = true;
            const observer = new IntersectionObserver((entries) => {
                const visible = entries.some((entry) => entry.isIntersecting);
                if (visible) {
                    maybeSchedule();
                }
            }, { threshold: 0.15 });

            observer.observe(summarySection);
        };

        if (
            typeof Kameleoon !== 'undefined'
            && Kameleoon.API
            && Kameleoon.API.Core
            && typeof Kameleoon.API.Core.runWhenElementPresent === 'function'
        ) {
            Kameleoon.API.Core.runWhenElementPresent(SUMMARY_SELECTOR, (elements) => {
                const summarySection = Array.isArray(elements) ? elements[0] : elements;
                observeSummary(summarySection);
            });
        } else {
            observeSummary(document.querySelector(SUMMARY_SELECTOR));
        }
    }

    document.addEventListener('click', (event) => {
        if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
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

function kamT140V3ShouldSwallowSendEmail() {
    // Only block while the popup is open. A fresh native sendEmail means a new
    // session (same as control) and must be held again — even in another tab.
    return Boolean(window.__kamT140V3PopupOpen);
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

        if (kamT140V3ShouldSwallowSendEmail()) {
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

        if (kamT140V3ShouldSwallowSendEmail()) {
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
