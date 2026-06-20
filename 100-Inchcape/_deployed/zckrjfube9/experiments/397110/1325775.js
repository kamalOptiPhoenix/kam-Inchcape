"use strict";

(function () {
  const hrefMap = {
    '/configure/trim-levels/AUIMP2026': 'https://www.subaru.com.au/configure/configure/AUIMP2026?carCode=AUGU7CKAL&selectedFeatures=AU_EC_1X&selectedFeatures=AU_IO_209&specificationPack=AUGU7CKAL',
    '/configure/trim-levels/AUCT2026': 'https://www.subaru.com.au/configure/configure/AUCT2026?specificationPack=AUGU7CKML&fuelType=engine-petrol&carCode=AUGU7CKML',
    '/configure/trim-levels/AUFOR26': 'https://www.subaru.com.au/configure/configure/AUFOR26?specificationPack=AUSL9BKCL&fuelType=engine-petrol&carCode=AUSL9BKCL',
    '/configure/trim-levels/AUOUT': 'https://www.subaru.com.au/configure/configure/AUOUT?specificationPack=AUBT9EKDL&carCode=AUBT9EKDL',
    '/configure/trim-levels/AUOUT2026': 'https://www.subaru.com.au/configure/configure/AUOUT2026?carCode=AUBUAAKL8&selectedFeatures=AU_EC_1X&selectedFeatures=AU_IO_311&specificationPack=AUBUAAKL8',
    '/configure/trim-levels/AUBRZ2026': 'https://www.subaru.com.au/configure/configure/AUBRZ2026?carCode=AUZD8EKH8&marketingCategory=Manual&specificationPack=AUZD8EKH8&transmissionType=gearbox-manual',
    '/configure/trim-levels/AUWRX2026': 'https://www.subaru.com.au/configure/configure/AUWRX2026?carCode=AUVBHFKL6&marketingCategory=Sedan&selectedFeatures=AU_EC_6Y&selectedFeatures=AU_IO_306&specificationPack=AUVBHFKL6&transmissionType=gearbox-manual',
    '/configure/trim-levels/AUSOL': 'https://www.subaru.com.au/configure/configure/AUSOL?carCode=AUEW2DKBV&selectedFeatures=AU_EC_XG&selectedFeatures=AU_IO_213&specificationPack=AUEW2DKBV',
    '/configure/trim-levels/AUTS2026': 'https://www.subaru.com.au/configure/configure/AUTS2026?carCode=AUHD2ANBV&selectedFeatures=AU_EC_1X&selectedFeatures=AU_IO_213&specificationPack=AUHD2ANBV'
  };
  const getTooltipHTML = greeting => `
<div class="variant-tooltip">
    <div class="tooltip-inner">
        <button class="tooltip-close" aria-label="Close tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="2.5" y1="15.4891" x2="16.2325" y2="1.75655" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="2.50605" y1="1.74316" x2="16.2386" y2="15.4757" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
        </button>
        <div class="tooltip-heading">Hi ${greeting}</div>
        <div>Don't forget you can choose another model variant here.</div>
            <div class="tooltip-arrow" id="tooltip-arrow"></div>
        </div>
    </div>
`;

  /* eslint-disable import/extensions */

  function handleListPage() {
    function handleRedirect(event, anchorElement) {
      const matchedEntry = Object.entries(hrefMap).sort(([a], [b]) => b.length - a.length).find(([key]) => anchorElement.href.includes(key));
      if (matchedEntry) {
        event.preventDefault();
        event.stopPropagation();
        const [, redirectUrl] = matchedEntry;
        window.location.href = redirectUrl;
      }
    }
    function handleClick(event) {
      const button = event.target.closest('a.SPC_WIDGET-MuiButton-root');
      const image = event.target.closest('.SPC_WIDGET-MuiBox-root img');
      if (button) {
        handleRedirect(event, button);
      } else if (image) {
        const anchor = image.closest('a');
        if (anchor) {
          handleRedirect(event, anchor);
        }
      }
    }
    Kameleoon.API.Utils.addEventListener(document, 'click', handleClick, true);
  }
  function watchElement(selector, callback) {
    const runCallback = node => {
      callback(node);
    };
    document.querySelectorAll(selector).forEach(runCallback);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.matches?.(selector)) {
            runCallback(node);
          }
          node.querySelectorAll?.(selector).forEach(runCallback);
        });
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    return observer;
  }
  function defineOptiReady() {
    const listeners = [];
    const doc = window.document;
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let observer;
    function check() {
      // Check the DOM for elements matching a stored selector
      for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
        listener = listeners[i];
        // Query for elements matching the specified selector
        elements = doc.querySelectorAll(listener.selector);
        for (let j = 0, jLen = elements.length, element; j < jLen; j++) {
          element = elements[j];
          if (!element.ready) {
            element.ready = [];
          }
          // Make sure the callback isn't invoked with the
          // same listener more than once
          // due to other mutations
          if (!element.ready[i]) {
            element.ready[i] = true;
            // Invoke the callback with the element
            listener.fn.call(element, element);
          }
        }
      }
    }
    function ready(selector, fn) {
      // Store the selector and callback to be monitored
      listeners.push({
        selector,
        fn
      });
      if (!observer) {
        // Watch for changes in the document
        observer = new MutationObserver(check);
        observer.observe(doc.documentElement, {
          childList: true,
          subtree: true
        });
      }
      // Check if the element is currently in the DOM
      check();
    }

    // Expose 'ready'
    window.optiReady = ready;
  }
  defineOptiReady();

  // showtooltip function
  function showTooltip() {
    if (sessionStorage.getItem('T117TooltipShowed')) {
      return;
    }
    document.querySelectorAll('.variant-tooltip').forEach(tooltip => tooltip.remove());
    let firstName = '';
    try {
      firstName = sessionStorage.getItem('T38FNameCollected') || '';
      if (firstName && firstName.trim().length > 0) {
        localStorage.setItem('T117NameCollected', firstName);
      } else {
        firstName = localStorage.getItem('T117NameCollected') || '';
      }
      if (!firstName || firstName.trim().length === 0) {
        firstName = '';
      }
      if (firstName.length > 12) firstName = firstName.substring(0, 12);
    } catch (e) {
      firstName = '';
    }
    const greeting = firstName ? `${firstName}!` : 'there!';
    const specList = document.querySelector('[data-test="specPack:list"]');
    if (!specList) {
      return;
    }
    const template = document.createElement('div');
    template.innerHTML = getTooltipHTML(greeting).trim();
    const tooltip = template.firstElementChild;
    if (!tooltip) {
      return;
    }
    specList.insertAdjacentElement('afterbegin', tooltip);
    sessionStorage.setItem('T117TooltipShowed', 'shown');
    const closeTooltip = () => {
      tooltip.classList.add('tooltip-hidden');
      sessionStorage.setItem('T117TooltipShowed', 'closed');
      const blueAccordion = document.querySelector('.SPC_WIDGET-MuiAccordion-root.accordion-closed-blue');
      if (blueAccordion) {
        blueAccordion.classList.remove('accordion-closed-blue');
      }
    };
    const closeBtn = tooltip.querySelector('button');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeTooltip);
    }
    setTimeout(() => {
      document.addEventListener('click', e => {
        if (!tooltip.contains(e.target)) {
          closeTooltip();
        }
      });
    }, 100);
  }
  function handleAccordions() {
    // close accordian if it is open
    const accordions = document.querySelectorAll('[data-test^="specPack:selector:"].SPC_WIDGET-MuiBox-root');
    accordions.forEach(accordion => {
      if (accordion.getAttribute('data-selected') === 'true') {
        const button = accordion.querySelector('div.Mui-expanded[role="button"][data-test*="container:variants_section:"]');
        if (button) {
          button.click();
        }
      }
    });

    // make 1st accordion blue background
    // make it blue background
    accordions[0].querySelector('div[data-test^="container:variants_section:"]').classList.add('accordion-closed-blue');
    showTooltip();
  }
  function newDetailPageHandler() {
    window.optiReady('[data-test^="container:variants_section:"].SPC_WIDGET-MuiAccordion-root', () => {
      if (!window.isRun) {
        window.isRun = true;
        if (!sessionStorage.getItem('T117TooltipShowed')) {
          handleAccordions();
        }
      }
    });
  }

  /* eslint-disable import/extensions */

  const INIT_SELECTOR = 'div[data-test="container:models"] div[data-test="container:cars"] > div.SPC_WIDGET-MuiGrid-root, div[data-test="specPack:list"]';
  (function v1() {
    function init() {
      document.body.classList.add('subt117');
      if (window.location.pathname.startsWith('/configure/models')) {
        handleListPage();
      }
      if (window.location.pathname.startsWith('/configure/configure')) {
        // handleDetailPage();
        newDetailPageHandler();
      }
    }
    watchElement(INIT_SELECTOR, init);
  })();
})();