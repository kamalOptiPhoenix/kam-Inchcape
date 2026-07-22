"use strict";

(function () {
  const goals = {
    'Pop-up appearances T1': 423716,
    'Newsletter conversions T1': 423715
  };

  /* eslint-disable prefer-destructuring, no-restricted-syntax, no-console, camelcase */

  (function kamKgmt1Control() {
    function kamKgmt1ProcessGoal(goalName) {
      const goalId = goals[goalName];
      if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
      }
    }
    function validateForm(originalPopupForm) {
      if (!originalPopupForm) return;
      Kameleoon.API.Utils.addEventListener(originalPopupForm, 'submit', e => {
        e.preventDefault();
        let isValid = true;
        const firstName = originalPopupForm.querySelector('#firstName');
        if (!firstName.value.trim().match(/^[A-Za-z\s]+$/)) isValid = false;
        const lastName = originalPopupForm.querySelector('#lastName');
        if (!lastName.value.trim().match(/^[A-Za-z\s]+$/)) isValid = false;
        const email = originalPopupForm.querySelector('#email');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!email.value.trim().match(emailPattern)) isValid = false;
        const checkbox = originalPopupForm.querySelector('#customCheckBox');
        if (!checkbox.checked) isValid = false;
        if (isValid) {
          console.log('*** t1_newsletter_conversions Valid form submitted control');
          kamKgmt1ProcessGoal('Newsletter conversions T1');
          originalPopupForm.submit(); // Actually submit the form
        }
      });
    }
    function watchPopupVisibility(popupEl) {
      if (!popupEl) return;
      const displayObserver = new MutationObserver(() => {
        const display = popupEl.style.display;
        if (display === 'block') {
          console.log('*** t1_pop-up_appearances goal triggered control ***');
          kamKgmt1ProcessGoal('Pop-up appearances T1');
          displayObserver.disconnect();
        }
      });
      displayObserver.observe(popupEl, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    // 🔄 Observe body for dynamically added #popUpForm
    const popupObserver = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && node.matches && node.matches('#popUpForm')) {
            watchPopupVisibility(node);
            validateForm();
          }
        }
      }
    });
    popupObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also handle if already present
    Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelectorAll('#popUpForm').length > 0, () => {
      const originalPopupForms = Array.from(document.querySelectorAll('#popUpForm')).filter(el => !Array.from(el.classList).some(cls => cls.toLowerCase().startsWith('kgmt')));
      originalPopupForms.forEach(popupForm => {
        watchPopupVisibility(popupForm);
        validateForm(popupForm);
      });
    });
  })();
})();