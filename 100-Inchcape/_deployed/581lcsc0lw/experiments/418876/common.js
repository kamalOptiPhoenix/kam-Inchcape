"use strict";

(function () {
  /* eslint-disable no-console */

  /**
   * Leads Captured — fires when Step 2 personal details are provided
   * and Summary is in viewport (or checkout CTA is clicked).
   *
   * Leads Captured goal ID stays null until a staging goal exists.
   *
   */
  (function kamT140LeadsCapturedCommon() {
    const LEAD_DETAILS_KEY = 'kamLeadDetailsCaptured';
    function processLeadsCapturedGoal() {
      console.warn('*** T140 Leads Captured goal ID is not set in common.js ***');
    }
    function isSummaryInViewport() {
      const summary = document.querySelector('#customise_summary');
      if (!summary) {
        return false;
      }
      const rect = summary.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }
    function markLeadDetailsCaptured() {
      sessionStorage.setItem(LEAD_DETAILS_KEY, 'true');
      console.log('%c *** T140 lead details captured (Step 2 Next) ***', 'color:red;background:white');
    }
    function init() {
      if (window.__kamT140LeadsCapturedGoalBound) {
        return;
      }
      window.__kamT140LeadsCapturedGoalBound = true;
      console.log('*** T140 Leads Captured Tracking (common) ***');
      let leadsCapturedFlag = true;
      function tryFireLeadsCaptured() {
        if (!leadsCapturedFlag || sessionStorage.getItem(LEAD_DETAILS_KEY) !== 'true') {
          return;
        }
        if (!isSummaryInViewport()) {
          return;
        }
        leadsCapturedFlag = false;
        console.log('%c *** Leads Captured Tracked ***', 'color:green;background:white');
        processLeadsCapturedGoal();
      }
      document.addEventListener('click', event => {
        const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
        if (!el || !el.closest) {
          return;
        }
        if (el.closest('[data-test="button:personalDetails:next"]')) {
          markLeadDetailsCaptured();
          tryFireLeadsCaptured();
        }
        if (el.closest('button[data-test="customise:summary:continuetocheckoutv4"]')) {
          if (leadsCapturedFlag && sessionStorage.getItem(LEAD_DETAILS_KEY) === 'true') {
            leadsCapturedFlag = false;
            console.log('%c *** Leads Captured Tracked ***', 'color:green;background:white');
            processLeadsCapturedGoal();
          }
        }
      }, true);
      window.addEventListener('scroll', () => {
        if (!document.querySelector('#customise_summary')) {
          return;
        }
        window.setTimeout(tryFireLeadsCaptured, 3000);
      }, {
        passive: true
      });
    }
    if (window.location.pathname.indexOf('/configure') === -1) {
      return;
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