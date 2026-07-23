"use strict";

(function () {
  const goals = {
    'Brochure Contact Details T56': 423910
    // 'Brochure Download Success T56': null,
    // 'Email_Addresses_Collected': null,
    // 'Brochure_Downloads': null,
  };
  const kamT56Config = {
    goalIds: goals
  };
  function kamT56ProcessGoal(goalName) {
    const goalId = kamT56Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
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
    console.log('T56: postMessage received from iframe: Local', event.data);
    if (event.data && event.data.type === 'FORM_SUBMITTING') {
      const email = event.data.email || '';
      const model = event.data.model || '';
      console.log('T56: Form submitting. Email:', email, 'Model:', model);
      if (email && kamT56IsValidEmail(email)) {
        console.log('T56: Valid email. Firing event...');
        kamT56ProcessGoal('Brochure Contact Details T56');
      } else {
        console.log('T56: Invalid email, event not fired. Email value:', email);
      }
    }
    if (event.data && event.data.type === 'FORM_SUBMIT_SUCCESS') {
      const email = event.data.email || '';
      const model = event.data.model || '';
      console.log('T56: Form submit success. Email:', email, 'Model:', model);
      if (email && kamT56IsValidEmail(email)) {
        console.log('T56: Valid email on success. Firing confirmation event...');
        kamT56ProcessGoal('Brochure Download Success T56');
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