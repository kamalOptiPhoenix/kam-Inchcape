"use strict";

(function () {
  /* eslint-disable no-console */

  const EMAIL_KEY = 'kamT140EmailCollected';
  const FIRED_KEY = 'kamT140DigitalDataFired';
  function hashEmailSha256(email) {
    const normalized = email.trim().toLowerCase();
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized)).then(buffer => Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join(''));
  }
  function pushDigitalData(emailHashed) {
    const payload = {
      event: '_formNavigate',
      form: {
        name: 'configurator',
        stage: 'email my configuration submitted'
      },
      user: {
        emailHashed
      }
    };
    if (window.digitalData && window.digitalData.events && typeof window.digitalData.events.pushAndUpdate === 'function') {
      window.digitalData.events.pushAndUpdate(payload);
      return;
    }
    if (window.digitalData && typeof window.digitalData.pushAndUpdate === 'function') {
      window.digitalData.pushAndUpdate(payload);
    }
  }
  function isSummaryInViewport() {
    const summary = document.querySelector('#customise_summary');
    if (!summary) {
      return false;
    }
    const rect = summary.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }
  function tryFireDigitalData() {
    if (sessionStorage.getItem(FIRED_KEY) === 'true') {
      return;
    }
    const email = sessionStorage.getItem(EMAIL_KEY);
    if (!email || !isSummaryInViewport()) {
      return;
    }
    sessionStorage.setItem(FIRED_KEY, 'true');
    hashEmailSha256(email).then(emailHashed => {
      pushDigitalData(emailHashed);
      console.log('%c *** T140 digitalData - email my configuration submitted ***', 'color:red;background:white');
    }).catch(() => {
      sessionStorage.removeItem(FIRED_KEY);
    });
  }
  function storeEmailFromLeadModal() {
    const emailInput = document.querySelector('[data-test="modal:leadCapture"] input[data-test="input:email"]');
    if (!emailInput) {
      return;
    }
    sessionStorage.setItem(EMAIL_KEY, emailInput.value.trim());
    console.log('%c *** T140 email stored ***', 'color:red;background:white');
    tryFireDigitalData();
  }
  function kamT140InitLeadsCaptured() {
    if (window.__kamT140LeadsCapturedBound) {
      return;
    }
    window.__kamT140LeadsCapturedBound = true;
    document.addEventListener('click', event => {
      const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
      if (!el || !el.closest || !el.closest('[data-test="button:personalDetails:next"]')) {
        return;
      }
      storeEmailFromLeadModal();
    }, true);
    window.addEventListener('scroll', () => {
      if (!document.querySelector('#customise_summary')) {
        return;
      }
      window.setTimeout(tryFireDigitalData, 3000);
    }, {
      passive: true
    });
  }

  /* eslint-disable no-console */

  // Paste your deployed Google Apps Script web app URL here after setup.
  const GOOGLE_SHEET_LOG_URL = 'https://script.google.com/macros/s/AKfycbyspbjis5LbPquhEsFAVSBruChpvvRZgA2Yz99WPXbdaiIXYdVJN-YswAu2fuqQir-d/exec';
  function kamT140LogToGoogleSheet(logEntry) {
    fetch(GOOGLE_SHEET_LOG_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        timestamp: logEntry.timestamp,
        toEmail: logEntry.toEmail,
        firstName: logEntry.firstName,
        lastName: logEntry.lastName,
        modelName: logEntry.modelName,
        variantName: logEntry.variantName,
        configUrl: logEntry.configUrl,
        postCode: logEntry.postCode,
        temperature: logEntry.temperature
      })
    }).catch(() => {
      console.warn('*** T140 Google Sheet log failed ***');
    });
  }

  /* eslint-disable no-console */

  const TARGET_ENDPOINT = 'sendEmailWithNames';
  const TEMPERATURE_VALUE = 'HOT';
  const PAYLOAD_LOG_KEY = 'kamT140HotLeadPayloadLogs';
  const PAYLOAD_LOG_LIMIT = 20;
  const PAYLOAD_LOG_WINDOW_KEY = '__kamT140HotLeadPayloadLogs';
  function kamT140StoreHotLeadPayload(parsed) {
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
      payload: parsed
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
    console.log('%c *** T140 HOT lead payload ***', 'color:#fff;background:#c00;font-weight:bold', logEntry);
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
      kamT140StoreHotLeadPayload(parsed);
      return JSON.stringify(parsed);
    } catch (error) {
      return body;
    }
  }
  function patchFetch() {
    const originalFetch = window.fetch;
    if (typeof originalFetch !== 'function' || originalFetch.__kamT140Patched) {
      return;
    }
    const patchedFetch = function kamT140Fetch(input, init) {
      const url = getUrlString(input);
      if (isTargetUrl(url) && init && typeof init.body === 'string') {
        const nextInit = {
          ...init,
          body: injectTemperature(init.body)
        };
        return originalFetch.call(this, input, nextInit);
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
        return originalSend.call(this, injectTemperature(body));
      }
      return originalSend.call(this, body);
    };
    XhrProto.__kamT140Patched = true;
  }
  function kamT140InterceptTemperature() {
    if (window.__kamT140TemperatureBound) {
      return;
    }
    window.__kamT140TemperatureBound = true;
    patchFetch();
    patchXhr();
  }

  /* eslint-disable no-console */

  (function kamT140SubaruV2() {
    function init() {
      if (document.body.classList.contains('subt140v2')) {
        return;
      }
      console.log('%c *** Subaru T140 V2 - Turn Save my Build Leads into HOT', 'color:red;background:white');
      document.body.classList.add('subt140v2');
      kamT140InterceptTemperature();
      kamT140InitLeadsCaptured();
    }
    if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core) {
      init();
      return;
    }
    const waitForKam = window.setInterval(() => {
      if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core) {
        window.clearInterval(waitForKam);
        init();
      }
    }, 100);
  })();
})();