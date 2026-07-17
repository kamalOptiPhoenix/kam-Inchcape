"use strict";

(function () {
  /* eslint-disable no-console */

  const EMAIL_KEY = 'kamT139EmailCollected';
  const FIRED_KEY = 'kamT139DigitalDataFired';
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
      console.log('%c *** T139 digitalData - email my configuration submitted ***', 'color:red;background:white');
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
    console.log('%c *** T139 email stored ***', 'color:red;background:white');
    tryFireDigitalData();
  }
  function kamT139InitLeadsCaptured() {
    if (window.__kamT139LeadsCapturedBound) {
      return;
    }
    window.__kamT139LeadsCapturedBound = true;
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
        const nextInit = {
          ...init,
          body: injectTemperature(init.body)
        };
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
  function kamT139InterceptTemperature() {
    if (window.__kamT139TemperatureBound) {
      return;
    }
    window.__kamT139TemperatureBound = true;
    patchFetch();
    patchXhr();
  }

  /* eslint-disable no-console */

  (function kamT139SubaruStag3V2() {
    function init() {
      if (document.body.classList.contains('subt139v2')) {
        return;
      }
      console.log('%c *** Subaru T139 V2 - Turn Save my Build Leads into HOT', 'color:red;background:white');
      document.body.classList.add('subt139v2');
      kamT139InterceptTemperature();
      kamT139InitLeadsCaptured();
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