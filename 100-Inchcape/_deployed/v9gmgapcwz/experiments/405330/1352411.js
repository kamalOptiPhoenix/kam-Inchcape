"use strict";

(function () {
  /**
  * Gets model name from URL path using regex pattern
  */

  /**
  * Maps URL model names to form model values
  */
  function mapModelNameToValue(modelName) {
    if (!modelName) return null;
    const modelNameLower = modelName.toLowerCase();

    // Mapping from URL model names to form values
    const modelMap = {
      '2008-hybrid-suv': '2008 Hybrid',
      '2008-suv': '2008 Hybrid',
      // Default 2008 to Hybrid
      '3008-suv': '3008 Hybrid',
      '5008-hybrid-suv': '5008 Hybrid',
      '308-hybrid': '308 Hybrid',
      '408-hybrid': '408 Hybrid',
      'partner-van': 'Partner Van',
      'new-e-partner-van': 'New E-Partner Van',
      'diesel-expert-van': 'Expert Van',
      'e-expert': 'E-Expert Van',
      // For /models/expert-van/e-expert.html
      'expert-van': 'Expert Van',
      'boxer-van': 'Boxer Van'
    };
    return modelMap[modelNameLower] || null;
  }

  /**
  * Maps URL paths to model values
  * Can be used in both parent and iframe
  */
  function getModelFromUrl(url) {
    // Extract pathname from URL
    let pathname;
    try {
      const urlObj = new URL(url);
      pathname = urlObj.pathname;
    } catch (e) {
      // If URL parsing fails, try to extract pathname manually
      const match = url.match(/\/models\/[^?#]*/i);
      pathname = match ? match[0] : '';
    }

    // Handle special case: /models/expert-van/e-expert.html
    if (pathname.includes('/models/expert-van/e-expert')) {
      return 'E-Expert Van';
    }

    // Extract model name from path using regex
    const match = pathname.match(/\/models\/([^\/]+)\.html/);
    if (match && match[1]) {
      const modelName = match[1].trim();
      return mapModelNameToValue(modelName);
    }

    // Fallback to old pattern matching for edge cases
    const pathnameLower = pathname.toLowerCase();

    // Expert Van - check e-expert first (most specific)
    if (pathnameLower.includes('/models/expert-van/e-expert')) {
      return 'E-Expert Van';
    }

    // 2008 - check hybrid-suv before suv
    if (pathnameLower.includes('/models/2008-hybrid-suv')) {
      return '2008 Hybrid';
    }
    if (pathnameLower.includes('/models/2008-suv')) {
      return '2008 Hybrid';
    }

    // 3008
    if (pathnameLower.includes('/models/3008-suv')) {
      return '3008 Hybrid';
    }

    // 5008 - check hybrid-suv first
    if (pathnameLower.includes('/models/5008-hybrid-suv')) {
      return '5008 Hybrid';
    }

    // 308 - check hybrid first
    if (pathnameLower.includes('/models/308-hybrid')) {
      return '308 Hybrid';
    }
    if (pathnameLower.includes('/models/308')) {
      return '308 Hybrid';
    }

    // 408 - check hybrid first
    if (pathnameLower.includes('/models/408-hybrid')) {
      return '408 Hybrid';
    }
    if (pathnameLower.includes('/models/408')) {
      return '408 Hybrid';
    }

    // Partner Van - check new-e-partner first
    if (pathnameLower.includes('/models/new-e-partner-van')) {
      return 'New E-Partner Van';
    }
    if (pathnameLower.includes('/models/partner-van')) {
      return 'Partner Van';
    }

    // Expert Van - check diesel-expert first
    if (pathnameLower.includes('/models/diesel-expert-van')) {
      return 'Expert Van';
    }
    if (pathnameLower.includes('/models/expert-van')) {
      return 'Expert Van';
    }

    // Boxer Van
    if (pathnameLower.includes('/models/boxer-van')) {
      return 'Boxer Van';
    }
    return null;
  }

  /**
  * Sends current page URL to iframe so it can select model accordingly (for parent window)
  */
  function sendUrlToIframe() {
    console.log('***** sendUrlToIframe');
    const currentUrl = window.location.href;
    // Derive model from current URL once at source so we can send it directly
    const currentModelValue = getModelFromUrl(currentUrl);
    console.log('*****  currentModelValue', currentModelValue);
    // Find the iframe
    const iframe = document.querySelector('iframe.T64Iframe');
    if (!iframe) {
      // Retry after a short delay
      setTimeout(() => sendUrlToIframe(), 500);
      return;
    }

    // Function to send the message
    function sendMessage() {
      try {
        const iframeOrigin = 'https://peugeotforms.inchcape.com.au';
        console.log('***** parent: attempting to send message to iframe');
        console.log('***** parent: iframe.contentWindow exists?', !!iframe.contentWindow);
        console.log('***** parent: sending modelValue', currentModelValue);
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'PCAT64_SELECT_MODEL_FROM_URL',
            url: currentUrl,
            // Send explicit model value so iframe does not need to re-derive it
            modelValue: currentModelValue || null
          }, iframeOrigin);
          console.log('***** parent: message sent successfully');
        } else {
          console.log('***** parent: iframe.contentWindow is null, cannot send message');
        }
      } catch (e) {
        console.log('***** parent: error sending message to iframe', e);
      }
    }

    // Wait for iframe to be ready
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      // Iframe is already loaded
      sendMessage();
    } else {
      // Wait for iframe to load
      Kameleoon.API.Utils.addEventListener(iframe, 'load', () => {
        setTimeout(sendMessage, 500);
      });

      // Also try immediately in case iframe is already loaded
      sendMessage();
    }
  }
  const goals = {
    'enquire now embedded form conversions T64': 424414,
    'Enquire now conversion global': 424164
  };
  const kamT64Config = {
    goalIds: goals
  };
  function kamT64ProcessGoal(goalName) {
    const goalId = kamT64Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }
  function kamT64InitParent() {
    console.log('*** Peugeot T64 - Embedded Enquiry Form ***');
    document.body.classList.add('PCAT64');
    const testDriveUrlWithTest64 = 'https://peugeotforms.inchcape.com.au/webforms/make-an-enquiry/?Test64kam=true';
    const allIframes = document.querySelectorAll('iframe');
    let existingTestDriveIframe = null;
    allIframes.forEach(iframe => {
      const src = iframe.getAttribute('src') || '';
      if (src.includes('peugeotforms.inchcape.com.au/webforms/make-an-enquiry')) {
        existingTestDriveIframe = iframe;
        if (!src.includes('Test64kam=true')) {
          iframe.src = testDriveUrlWithTest64;
        }
        if (!iframe.classList.contains('T64Iframe')) {
          iframe.classList.add('T64Iframe');
        }
      }
    });
    if (!existingTestDriveIframe) {
      const Footer = document.querySelector('footer');
      if (Footer && !document.querySelector('.T64Iframe')) {
        Footer.insertAdjacentHTML('beforebegin', `<iframe class="T64Iframe t64-iframe-responsive" scrolling="no" height="100%" width="100%" data-responsive="true" src="${testDriveUrlWithTest64}"></iframe>`);
      }
    }
    let retryCount = 0;
    const maxRetries = 10;
    function sendUrlWithRetry() {
      sendUrlToIframe();
      retryCount += 1;
      if (retryCount < maxRetries) {
        setTimeout(sendUrlWithRetry, 2000);
      } else {
        console.log('***** parent: max retries reached, iframe may not be loaded');
      }
    }
    setTimeout(sendUrlWithRetry, 2000);
    let cachedIframe = document.querySelector('iframe.T64Iframe');
    let t64StyleElement = document.getElementById('t64-iframe-height-style');
    if (!t64StyleElement) {
      document.head.insertAdjacentHTML('beforeend', '<style id="t64-iframe-height-style"></style>');
      t64StyleElement = document.getElementById('t64-iframe-height-style');
    }
    function updateIframeHeight(height) {
      if (cachedIframe && height) {
        cachedIframe.setAttribute('data-height', height);
        cachedIframe.classList.add('t64-iframe-height-set');
        t64StyleElement.textContent = `.t64-iframe-height-set[data-height="${height}"] { height: ${height}px !important; }`;
      }
    }
    Kameleoon.API.Utils.addEventListener(window, 'message', event => {
      if (event.origin !== 'https://peugeotforms.inchcape.com.au') {
        return;
      }
      const messageData = event.data;
      if (messageData && messageData.type === 'PCAT64_IFRAME_READY') {
        console.log('***** parent: received iframe ready signal');
        setTimeout(() => sendUrlToIframe(), 100);
        return;
      }
      if (messageData && messageData.mainStepName === 'confirmation' && messageData.formsLeadID === 'PCAT64') {
        console.log('*** form submitted PCAT64 goal fired ***');
        kamT64ProcessGoal('enquire now embedded form conversions T64');
        kamT64ProcessGoal('Enquire now conversion global');
      }
      if (!cachedIframe) {
        cachedIframe = document.querySelector('iframe.T64Iframe');
      }
      if (!cachedIframe) {
        return;
      }
      if (messageData && messageData.type === 'PCAT64_IFRAME_HEIGHT' && messageData.height) {
        updateIframeHeight(messageData.height);
        return;
      }
      if (messageData && typeof messageData.indexOf === 'function' && messageData.indexOf('T64StylingHeight') !== -1) {
        const height = parseInt(messageData.split('-')[1], 10);
        updateIframeHeight(height);
      }
    });
    if (cachedIframe) {
      Kameleoon.API.Utils.addEventListener(cachedIframe, 'load', () => {
        setTimeout(() => {
          sendUrlToIframe();
        }, 500);
      });
    }
  }

  /* eslint-disable import/extensions */

  (function kamPcat64V1() {
    if (!window.t64Start) {
      window.t64Start = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('footer') || document.querySelector('iframe[src*="peugeotforms.inchcape.com.au/webforms/make-an-enquiry"]'), kamT64InitParent);
    }
  })();
})();