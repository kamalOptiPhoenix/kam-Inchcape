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

  (function kamT139SubaruStag3V2() {
    function init() {
      if (document.body.classList.contains('subt139v2')) {
        return;
      }
      console.log('%c *** Subaru T139 V2 - Turn Save my Build Leads into HOT', 'color:red;background:white');
      document.body.classList.add('subt139v2');
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