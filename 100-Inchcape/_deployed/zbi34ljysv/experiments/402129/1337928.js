"use strict";

(function () {
  function kamSubnzT7ModalHtml() {
    const leadCaptureModal = `<div class="lead-capture-overlay" id="leadCaptureModal">
<div class="lead-capture-modal">
<div class="lead-capture-modal-img">
<img src="//cdn.optimizely.com/img/15841360337/d5a100adb2c646e398a44aa9f0025f1e.png" alt="car-img" />
</div>
  <div class="lead-capture-modal-form">
  <div class="lead-capture-modal-form-content">
    <h2>Lets get some details</h2>
    <p class="desktop-only">Enter your first name and email address to receive Subaru news, special offers and promotions direct to your inbox.</p>
    <p class="mob-only">Please enter your first name and email address to receive Subaru news, special offers and promotions direct to your inbox.</p>
    <div id="leadCaptureForm">
    
    <div class="form-actions">
      <button type="button" id="skipButton">Skip</button>
      <button id="lead-capture-SubmitButton">Submit</button>
    </div>
    </div>
  <div id="skipConfirmation" class="skip-confirm hidden">
    <div class="skip-message">
      <p>Don't miss out! Enter your details to receive Subaru news, special offers and promotions.</p>
      <button id="skipAnyway">Skip Anyway</button>
    </div>
  </div>
  </div>
</div>

</div>
</div>`;
    document.querySelectorAll('#leadCaptureModal').forEach(el => el.remove());
    document.body.insertAdjacentHTML('afterbegin', leadCaptureModal);
  }
  const goals = {
    'Contact Details Captured': 422374,
    'Configurator Completions T1': 422481
  };
  function kamSubnzT7ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable max-len */

  function unlockAntibotKey(key) {
    // Mirrors Drupal antibot.js unlockForms key transform.
    return key.split('').reverse().join('').match(/.{1,2}/g).map(value => value.split('').reverse().join('')).join('');
  }
  function kamSubnzT7AppendLeadCaptureForm() {
    const redirectToStoredUrl = () => {
      const pendingUrl = sessionStorage.getItem('leadCapture_redirect_url');
      if (pendingUrl) {
        sessionStorage.removeItem('leadCapture_redirect_url');
        window.location.href = pendingUrl;
      }
    };
    fetch('/about/keep-me-informed', {
      credentials: 'same-origin'
    }).then(response => response.text()).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const form = doc.querySelector('form.webform-submission-form');
      const scriptTag = doc.querySelector('script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
      const settingsData = JSON.parse(scriptTag.textContent);
      const antibotKey = unlockAntibotKey(settingsData.antibot.forms['webform-submission-keep-me-informed-node-917-add-form'].key);
      const antibotInput = form.querySelector('input[name="antibot_key"]');
      if (antibotInput) {
        antibotInput.value = antibotKey;
      }

      // Antibot locks action to /antibot until unlocked; use data-action.
      form.action = form.getAttribute('data-action') || '/about/keep-me-informed';
      const container = document.getElementById('leadCaptureForm');
      if (!container.querySelector('form')) {
        container.insertAdjacentElement('afterbegin', form);
      }
      const emailLabel = document.querySelector('#leadCaptureForm label[for="edit-email-address"]');
      if (emailLabel) {
        emailLabel.innerHTML = 'Email';
      }
      const getFormData = formElement => {
        const formData = new FormData(formElement);
        const data = new URLSearchParams();
        formData.forEach((value, key) => {
          data.append(key, value);
        });
        if (!data.has('antibot_key')) {
          data.append('antibot_key', antibotKey);
        }
        return data;
      };
      form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = getFormData(form);
        fetch(form.action, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        }).then(response => response.text()).then(responseHTML => {
          const responseDoc = new DOMParser().parseFromString(responseHTML, 'text/html');
          const confirmationEl = responseDoc.querySelector('.webform-confirmation, .webform-confirmation__message, [data-drupal-messages] .messages--status');
          const responseText = responseDoc.body && responseDoc.body.textContent || '';
          const textSuccess = /Thanks for your interest in Subaru/i.test(responseText);
          console.log('[SUBNZT7] form submit response', {
            confirmationEl: !!confirmationEl,
            textSuccess,
            hasSubmissionFailed: /Submission failed/i.test(responseText)
          });
          if (confirmationEl || textSuccess) {
            document.body.classList.remove('leadCapture-Show');
            localStorage.removeItem('leadCapture_skipped');
            localStorage.setItem('leadCaptured', 'true');
            console.log('*** contact_details_collected goal triggerd ***');
            kamSubnzT7ProcessGoal('Contact Details Captured');
            redirectToStoredUrl();
          } else {
            const errorEl = responseDoc.querySelector('.messages--error, .messages.messages--error, .webform-error-message, .form-item--error-message, [role="alert"]');
            const errorText = errorEl && errorEl.textContent && errorEl.textContent.trim();
            console.log('[SUBNZT7] form submit failed', errorText);
            alert(errorText ? `Form not submitted: ${errorText}` : 'Form not submitted successfully.');
          }
        }).catch(error => {
          console.error('Error submitting form:', error);
        });
      });
    }).catch(error => {
      console.error('Error fetching the page:', error);
    });
  }

  /* eslint-disable no-console */
  function kamSubnzT7ClickBind() {
    const triggerSelector = 'div[data-test="container:cars"] a[href*="/configure/trim-levels"]';
    const redirectStorageKey = 'leadCapture_redirect_url';
    const shouldShowModal = () => localStorage.getItem('leadCaptured') === null || localStorage.getItem('leadCapture_skipped') === 'true';
    const redirectToStoredUrl = () => {
      const pendingUrl = sessionStorage.getItem(redirectStorageKey);
      console.log('[SUBNZT7] redirectToStoredUrl', pendingUrl);
      if (pendingUrl) {
        sessionStorage.removeItem(redirectStorageKey);
        window.location.href = pendingUrl;
      }
    };
    console.log('[SUBNZT7] clickBind attached', {
      triggerCount: document.querySelectorAll(triggerSelector).length,
      leadCaptured: localStorage.getItem('leadCaptured'),
      leadCaptureSkipped: localStorage.getItem('leadCapture_skipped'),
      leadCaptureShown: sessionStorage.getItem('leadCaptureShown'),
      modalPresent: !!document.getElementById('leadCaptureModal')
    });
    document.addEventListener('click', event => {
      const triggerLink = event.target.closest(triggerSelector);
      if (triggerLink) {
        const showModal = shouldShowModal();
        const leadCaptureShown = sessionStorage.getItem('leadCaptureShown');
        console.log('[SUBNZT7] trigger link clicked', {
          href: triggerLink.href,
          showModal,
          leadCaptureShown,
          leadCaptured: localStorage.getItem('leadCaptured'),
          leadCaptureSkipped: localStorage.getItem('leadCapture_skipped'),
          target: event.target
        });
        if (showModal && leadCaptureShown === null) {
          console.log('[SUBNZT7] showing lead capture modal');
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          sessionStorage.setItem('leadCaptureShown', 'true');
          sessionStorage.setItem(redirectStorageKey, triggerLink.href);
          const skipConfirmation = document.getElementById('skipConfirmation');
          if (skipConfirmation) {
            skipConfirmation.classList.add('hidden');
          }
          document.body.classList.add('leadCapture-Show');
          console.log('[SUBNZT7] body class after show', document.body.className);
          return;
        }
        console.log('[SUBNZT7] modal skipped — allowing navigation');
      }
      if (event.target.closest('#skipButton')) {
        console.log('[SUBNZT7] skip button clicked');
        document.getElementById('skipConfirmation').classList.remove('hidden');
      }
      if (event.target.closest('#lead-capture-SubmitButton')) {
        console.log('[SUBNZT7] submit button clicked');
        document.querySelector('#leadCaptureForm .webform-button--submit').click();
      }
      if (event.target.closest('#skipAnyway')) {
        console.log('[SUBNZT7] skip anyway clicked');
        document.body.classList.remove('leadCapture-Show');
        localStorage.setItem('leadCapture_skipped', 'true');
        redirectToStoredUrl();
      }
    }, true);
  }

  /* eslint-disable no-console */

  (function kamSubnzT7V1() {
    function init() {
      console.log('*** T1 Subaru NZ - Configurator Upfront Lead Capture V1***');
      document.body.classList.add('subtnz01');
      kamSubnzT7ModalHtml();
      kamSubnzT7AppendLeadCaptureForm();
      kamSubnzT7ClickBind();
    }
    if (!window.kamSubnzT7Start) {
      window.kamSubnzT7Start = true;
      console.log('[SUBNZT7] waiting for body + jQuery');
      Kameleoon.API.Core.runWhenConditionTrue(() => document.body != null && typeof jQuery === 'function', init);
    } else {
      console.log('[SUBNZT7] init skipped — kamSubnzT7Start already set');
    }
  })();
})();