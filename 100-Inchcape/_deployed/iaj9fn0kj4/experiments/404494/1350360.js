"use strict";

(function () {
  const goals = {
    'Pop-up appearances T1': 423716,
    'Newsletter conversions T1': 423715
  };
  function kamKgmt1ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable no-console */

  function validateForm() {
    const form = document.querySelector('#popUpForm.KGMT1-form form');
    if (!form) return;
    Kameleoon.API.Utils.addEventListener(form, 'submit', e => {
      e.preventDefault(); // stop default submit
      let isValid = true;

      // Validate first name
      const firstName = form.querySelector('#firstName');
      const firstNameFeedback = firstName.nextElementSibling;
      if (!firstName.value.trim().match(/^[A-Za-z\s]+$/)) {
        firstNameFeedback.textContent = 'Please enter a valid first name.';
        firstName.classList.add('border-red-500');
        isValid = false;
      } else {
        firstNameFeedback.textContent = '';
        firstName.classList.remove('border-red-500');
      }

      // Validate last name
      const lastName = form.querySelector('#lastName');
      const lastNameFeedback = lastName.nextElementSibling;
      if (!lastName.value.trim().match(/^[A-Za-z\s]+$/)) {
        lastNameFeedback.textContent = 'Please enter a valid last name.';
        lastName.classList.add('border-red-500');
        isValid = false;
      } else {
        lastNameFeedback.textContent = '';
        lastName.classList.remove('border-red-500');
      }

      // Validate email
      const email = form.querySelector('#email');
      const emailFeedback = email.nextElementSibling;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      if (!email.value.trim().match(emailPattern)) {
        emailFeedback.textContent = 'Please enter a valid email address.';
        email.classList.add('border-red-500');
        isValid = false;
      } else {
        emailFeedback.textContent = '';
        email.classList.remove('border-red-500');
      }

      // Validate checkbox
      const checkbox = form.querySelector('#customCheckBox');
      const checkboxFeedback = form.querySelector('#customCheckBox').parentElement.querySelector('.invalid-feedback');
      if (!checkbox.checked) {
        checkboxFeedback.textContent = 'Please accept the privacy policy.';
        isValid = false;
      } else {
        checkboxFeedback.textContent = '';
      }

      // Submit if valid
      if (isValid) {
        console.log('*** t1_newsletter_conversions goal triggered ***');
        kamKgmt1ProcessGoal('Newsletter conversions T1');
        form.submit();
      }
    });
  }
  function preparePopupForm(popupForm) {
    if (popupForm.classList.contains('KGMT1-form')) return;
    popupForm.classList.add('KGMT1-form');
    validateForm();
    console.log('*** Pop-up form prepared successfully.');
  }
  function appendForm() {
    Kameleoon.API.Core.runWhenElementPresent('#popUpForm', ([popupForm]) => {
      preparePopupForm(popupForm);
    });
  }

  /* eslint-disable no-console */

  function revealModal() {
    sessionStorage.setItem('KGMT1Shown', 'true');
    setTimeout(() => {
      const popupForm = document.querySelector('#popUpForm.KGMT1-form');
      if (popupForm) {
        popupForm.classList.remove('hidden');
      }
      document.body.classList.add('t1-Modal-Show');
    }, 500);
    console.log('*** t1_pop-up_appearances goal triggered ***');
    kamKgmt1ProcessGoal('Pop-up appearances T1');
  }
  function showModal() {
    if (document.querySelector('#popUpForm.KGMT1-form')) {
      revealModal();
      return;
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('#popUpForm.KGMT1-form'), revealModal);
  }
  function mobileScrollEvent() {
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
      if (sessionStorage.getItem('scrolledHalfDocV1') === null) {
        sessionStorage.setItem('scrolledHalfDocV1', 'false');
      }
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      if (window.oldScroll > window.scrollY) {
        // Scrolling up
        if (sessionStorage.getItem('scrolledHalfDocV1') === 'true' && sessionStorage.getItem('KGMT1Shown') === null) {
          showModal();
        }
      } else if (scrollTop > documentHeight / 2) {
        sessionStorage.setItem('scrolledHalfDocV1', 'true');
      }
      window.oldScroll = window.scrollY;
    });
  }
  function triggerForm() {
    if (window.innerWidth < 768) {
      mobileScrollEvent();
    } else {
      Kameleoon.API.Utils.addEventListener(document, 'mouseout', e => {
        if (e.clientY < 5 && !document.body.classList.contains('t1-Modal-Show') && sessionStorage.getItem('KGMT1Shown') === null) {
          console.log('*** show exit intent modal', e.clientY);
          showModal();
        }
      });
    }
  }
  function closeModalClick() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({
      target
    }) => {
      const isCloseBtn = target.closest('.form_modalClose');
      const isOverLay = target.closest('.KGMT1-form') && target.closest('.form_modal-content') === null;
      if (isCloseBtn || isOverLay) {
        document.body.classList.remove('t1-Modal-Show');
      }
    });
  }

  /* eslint-disable no-console */

  function init() {
    console.log('*** KGM T1 - Newsletter Pop-up ***');
    document.body.classList.add('KGMT1');
    appendForm();
    triggerForm();
    closeModalClick();
  }

  /* eslint-disable import/extensions */

  (function kamKgmt1V1() {
    if (!window.t1Start) {
      window.t1Start = true;
      Kameleoon.API.Core.runWhenElementPresent('body', init);
    }
  })();
})();