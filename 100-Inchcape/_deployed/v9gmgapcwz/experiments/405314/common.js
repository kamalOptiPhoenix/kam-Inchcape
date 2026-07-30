"use strict";

(function () {
  const goals = {
    brochure_contact_details_t56: 423910,
    brochure_download_success_t56: null,
    Email_Addresses_Collected: null,
    Brochure_Downloads: 423919
  };
  const kamT56Config = {
    goalIds: goals
  };
  const GOAL_DEDUP_MS = 5000;
  function kamT56ProcessGoal(goalName) {
    const goalId = kamT56Config.goalIds[goalName];
    if (!goalId || !Kameleoon?.API?.Goals?.processConversion) {
      return;
    }
    const dedupeStore = window.__kamT56GoalDedupe || (window.__kamT56GoalDedupe = {});
    const now = Date.now();
    const lastFired = dedupeStore[goalName];
    if (lastFired && now - lastFired < GOAL_DEDUP_MS) {
      return;
    }
    dedupeStore[goalName] = now;
    Kameleoon.API.Goals.processConversion(goalId);
  }

  /* eslint-disable prefer-destructuring */

  function kamT56IsValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return false;
    if (email.includes('..')) return false;
    return true;
  }
  function kamT56HandleFormMessage(event) {
    if (event.origin !== 'https://peugeotforms.inchcape.com.au') {
      return;
    }
    if (event.data && event.data.type === 'FORM_SUBMITTING') {
      const email = event.data.email || '';
      if (email && kamT56IsValidEmail(email)) {
        kamT56ProcessGoal('brochure_contact_details_t56');
      }
    }
    if (event.data && event.data.type === 'FORM_SUBMIT_SUCCESS') {
      const email = event.data.email || '';
      if (email && kamT56IsValidEmail(email)) {
        kamT56ProcessGoal('brochure_download_success_t56');
      }
    }
  }
  (function kamPcat56Shared() {
    if (window.__kam405314SharedInitialized) {
      return;
    }
    window.__kam405314SharedInitialized = true;
    Kameleoon.API.Utils.addEventListener(window, 'message', kamT56HandleFormMessage);
  })();
})();