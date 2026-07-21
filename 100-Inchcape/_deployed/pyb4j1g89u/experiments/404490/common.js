"use strict";

(function () {
  const goals = {
    'Pop-up appearances T4': 423589,
    'Newsletter conversions T4': 423587
  };

  /* eslint-disable no-console */

  (function kamLdvt4Common() {
    function kamLdvt4ProcessGoal(goalName) {
      const goalId = goals[goalName];
      if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
      }
    }
    function init() {
      Kameleoon.API.Utils.addEventListener(document, 'submit', event => {
        if (event.target && event.target.closest && event.target.closest('#popUpForm form')) {
          sessionStorage.setItem('FormSubmitEvent', true);
        }
      });
      setTimeout(() => {
        // Control Tracking
        if (sessionStorage.getItem('isShowed') !== null && !document.querySelector('body').classList.contains('ldvt4')) {
          kamLdvt4ProcessGoal('Pop-up appearances T4');
        }
      }, 2000);
    }
    if (window.location.pathname.includes('/thank-you') && sessionStorage.getItem('FormSubmitEvent') !== null) {
      kamLdvt4ProcessGoal('Newsletter conversions T4');
    }
    sessionStorage.removeItem('FormSubmitEvent');
    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function', init);
  })();
})();