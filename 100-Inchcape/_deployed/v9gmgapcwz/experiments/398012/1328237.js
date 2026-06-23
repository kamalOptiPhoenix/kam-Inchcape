"use strict";

(function () {
  /* eslint-disable max-len */
  const kamPcat38FormData = {
    model: null,
    email: null
  };
  function kamPcat38SetFormValues() {
    const modelInput = document.querySelector('#model');
    if (modelInput && kamPcat38FormData.model) {
      modelInput.value = kamPcat38FormData.model;
    }
    const emailInput = document.querySelector('#userEmail');
    if (emailInput && kamPcat38FormData.email) {
      emailInput.value = kamPcat38FormData.email;
    }
    const checkbox = document.querySelector('#privacyPolicy\\.checkbox');
    if (checkbox) {
      checkbox.checked = true;
    }
  }
  function kamPcat38HandleFormReady() {
    document.body.classList.add('pcat38-iframe');
    kamPcat38SetFormValues();
  }
  function kamPcat38HandleSuccess([successDiv]) {
    if (successDiv.classList.contains('t38-success-modified')) {
      return;
    }
    successDiv.classList.add('t38-success-modified');

    // get email from form

    const emailInput = document.querySelector('#userEmail');
    const email = emailInput ? emailInput.value : '';

    // Trigger goal and notify parent to show success message
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          event: 'updatevirtualpath',
          formsLeadType: 'cold lead',
          formsName: 'download brochure',
          formsLeadID: 'PCAT38',
          mainStepIndicator: '1',
          mainStepName: 'confirmation'
        }, 'https://configurator.peugeot.com.au');
        // Send message to show success overlay and hide modal
        window.parent.postMessage({
          type: 'PCAT38_FORM_SUCCESS',
          action: 'showSuccessAndCloseModal',
          email
        }, 'https://configurator.peugeot.com.au');
      }
    } catch (postMessageError) {
      // Error sending message to parent
    }
  }
  function kamPcat38HandleMessage(event) {
    if (event.origin !== 'https://configurator.peugeot.com.au' && event.origin !== 'https://www.peugeot.com.au') {
      return;
    }
    if (event.data && event.data.type === 'SET_FORM_DATA') {
      kamPcat38FormData.model = event.data.model;
      kamPcat38FormData.email = event.data.email;
      kamPcat38SetFormValues();
    }
  }
  (function kamPcat38Iframe() {
    if (window.__kamPcat38iframeInitialized) {
      return;
    }
    window.__kamPcat38iframeInitialized = true;
    Kameleoon.API.Utils.addEventListener(window, 'message', kamPcat38HandleMessage);
    Kameleoon.API.Core.runWhenElementPresent('#download_brochure_form', kamPcat38HandleFormReady);
    Kameleoon.API.Core.runWhenElementPresent('.success', kamPcat38HandleSuccess);
  })();
})();