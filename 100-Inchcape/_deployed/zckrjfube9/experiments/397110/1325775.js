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
`;

  /* eslint-disable import/extensions */

  function handleDetailPage() {
    const showTooltip = accordion => {
      // Only show if not already shown or closed this session
      if (sessionStorage.getItem('T117TooltipShowed')) {
        return;
      }
      // Remove existing tooltips
      document.querySelectorAll('.variant-tooltip').forEach(t => t.remove());

      // Get first name
      let firstName = '';
      try {
        // Try sessionStorage first
        firstName = sessionStorage.getItem('T38FNameCollected') || '';
        if (firstName && firstName.trim().length > 0) {
          // Save to localStorage for cross-tab use
          localStorage.setItem('T117NameCollected', firstName);
        } else {
          // If not in session, try localStorage
          firstName = localStorage.getItem('T117NameCollected') || '';
        }
        // Clean up: if still empty or whitespace, fallback
        if (!firstName || firstName.trim().length === 0) {
          firstName = '';
        }
        // Truncate if too long
        if (firstName.length > 12) firstName = firstName.substring(0, 12);
      } catch (e) {
        firstName = '';
      }
      const greeting = firstName ? `${firstName}!` : 'there!';
      const tooltip = document.createElement('div');
      tooltip.classList.add('variant-tooltip');
      tooltip.innerHTML = getTooltipHTML(greeting);

      // For both mobile and desktop, append tooltip afterbegin to [data-test="specPack:list"]
      const specList = document.querySelector('[data-test="specPack:list"]');
      if (specList) {
        specList.insertAdjacentElement('afterbegin', tooltip);
        sessionStorage.setItem('T117TooltipShowed', 'shown');
      }

      // Close tooltip functionality
      const closeTooltip = () => {
        tooltip.classList.add('tooltip-hidden');
        sessionStorage.setItem('T117TooltipShowed', 'closed');
        // Remove blue class from the currently blue accordion
        const blueAccordion = document.querySelector('.SPC_WIDGET-MuiAccordion-root.accordion-closed-blue');
        if (blueAccordion) {
          blueAccordion.classList.remove('accordion-closed-blue');
        }
      };

      // Close on X click
      const closeBtn = tooltip.querySelector('button');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeTooltip);
      }

      // Close on outside click
      const handleOutsideClick = e => {
        if (!tooltip.contains(e.target)) {
          closeTooltip();
        }
      };
      setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 100);
    };
    Kameleoon.API.Core.runWhenElementPresent('.SPC_WIDGET-MuiGrid-grid-md-8 img', () => {
      if (window.innerWidth < 960) {
        const mobileAccordions = [...document.querySelectorAll('[data-test^="container:variants_section:"].SPC_WIDGET-MuiAccordion-root')];
        if (mobileAccordions.length > 0) {
          showTooltip();
        } else {
          console.warn('⚠️ No accordions found to attach tooltip.');
        }
      } else {
        console.log('🖥️ Not a mobile viewport — skipping tooltip.');
      }
    });
    const accordions = [...document.querySelectorAll('[data-test^="container:variants_section:"].SPC_WIDGET-MuiAccordion-root')];
    if (accordions.length === 0) {
      return;
    }
    let lastClosedAccordion = null;
    let isProcessing = false;
    const applyClosedStyles = accordion => {
      if (isProcessing) return;
      accordion.classList.add('accordion-closed');
      accordion.classList.remove('accordion-open');

      // Reset all SVG icon states
      document.querySelectorAll('.SPC_WIDGET-MuiSvgIcon-root[data-test$=":expand_button"]').forEach(svg => {
        svg.classList.remove('svg-closed');
      });

      // Apply to current accordion
      const svg = accordion.querySelector('.SPC_WIDGET-MuiSvgIcon-root[data-test$=":expand_button"]');
      if (svg) {
        svg.classList.add('svg-closed');
      }
    };
    const updateAccordionState = () => {
      const allAccordions = document.querySelectorAll('.SPC_WIDGET-MuiAccordion-root');
      let newLastClosed = null;
      allAccordions.forEach(accordion => {
        accordion.classList.remove('accordion-opened', 'accordion-closed', 'accordion-closed-blue');
        if (accordion.classList.contains('Mui-expanded')) {
          accordion.classList.add('accordion-opened');
        } else {
          accordion.classList.add('accordion-closed');
          newLastClosed = accordion; // The last one in the DOM order that is closed
        }
      });

      // Remove blue from all, then add to only the last closed (after user interaction)
      allAccordions.forEach(acc => acc.classList.remove('accordion-closed-blue'));
      if (newLastClosed) {
        newLastClosed.classList.add('accordion-closed-blue');
        lastClosedAccordion = newLastClosed;
      }
    };

    // Attach click listener to update styles correctly
    const bindAccordionClickHandlers = () => {
      const allAccordions = document.querySelectorAll('.SPC_WIDGET-MuiAccordion-root');
      allAccordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
          // Slight delay to allow MUI to update its classes
          setTimeout(updateAccordionState, 20);
        });
      });
    };

    // Initialize on load
    bindAccordionClickHandlers();
    const resetToDefaultStyles = accordion => {
      if (isProcessing) return;
      accordion.classList.remove('accordion-open', 'accordion-closed');

      // Reset current SVG icon color
      const svg = accordion.querySelector('.SPC_WIDGET-MuiSvgIcon-root[data-test$=":expand_button"]');
      if (svg) svg.classList.remove('svg-closed');
    };

    // Initial Setup
    let firstClosedSet = false;
    accordions.forEach((accordion, index) => {
      const collapse = accordion.querySelector('.SPC_WIDGET-MuiCollapse-root');
      if (!collapse) {
        return;
      }
      collapse.style.display = 'none';
      accordion.classList.remove('accordion-closed-blue');

      // Only the first closed accordion gets blue background on load
      if (!firstClosedSet) {
        isProcessing = true;
        applyClosedStyles(accordion);

        // Remove Mui-expanded from the expand icon button inside this accordion
        const expandIconBtn = accordion.querySelector('.SPC_WIDGET-MuiAccordionSummary-expandIcon');
        if (expandIconBtn && expandIconBtn.classList.contains('Mui-expanded')) {
          expandIconBtn.classList.remove('Mui-expanded');
        }

        // Always rotate the SVG
        const svg = accordion.querySelector('svg');
        if (svg) {
          svg.classList.add('svg-rotated');
        }
        // Only add blue if tooltip is not closed for this session
        if (sessionStorage.getItem('T117TooltipShowed') !== 'closed') {
          accordion.classList.add('accordion-closed-blue');
        }
        isProcessing = false;
        lastClosedAccordion = accordion;
        showTooltip();
        firstClosedSet = true;
      } else {
        isProcessing = true;
        resetToDefaultStyles(accordion);
        isProcessing = false;
      }
    });
    // After initial setup, if tooltip is not present, remove blue class from any accordion
    if (!document.querySelector('.variant-tooltip')) {
      const blueAccordion = document.querySelector('.SPC_WIDGET-MuiAccordion-root.accordion-closed-blue');
      if (blueAccordion) {
        blueAccordion.classList.remove('accordion-closed-blue');
      }
    }

    // Mutation Observers
    accordions.forEach((accordion, i) => {
      const observer = new MutationObserver(mutations => {
        if (isProcessing) return;
        const expandedMutation = mutations.find(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target.classList.contains('Mui-expanded') !== mutation.oldValue.includes('Mui-expanded'));
        if (!expandedMutation) return;
        const isExpanded = accordion.classList.contains('Mui-expanded');
        const collapse = accordion.querySelector('.SPC_WIDGET-MuiCollapse-root');
        if (!collapse) {
          return;
        }
        isProcessing = true;
        if (isExpanded) {
          collapse.style.display = '';
          // applyOpenStyles(accordion); // Always add .accordion-open when expanded
          // highlightAccordion(null); // Remove highlight while expanded
          if (lastClosedAccordion && lastClosedAccordion !== accordion) {
            resetToDefaultStyles(lastClosedAccordion);
          }
          lastClosedAccordion = null;
        } else {
          collapse.style.display = 'none';
          if (lastClosedAccordion && lastClosedAccordion !== accordion) {
            resetToDefaultStyles(lastClosedAccordion);
          }
          applyClosedStyles(accordion); // Always add .accordion-closed when collapsed
          // highlightAccordion(accordion);
          lastClosedAccordion = accordion;
        }
        isProcessing = false;
      });
      observer.observe(accordion, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true
      });
    });

    // Highlight selected spec
    const selectedSpec = document.querySelector('[data-test^="specPack:selector:"][data-selected="true"]');
    if (selectedSpec) {
      selectedSpec.classList.add('highlight-selected-spec');
    } else {
      console.log('ℹ️ No spec selected on page');
    }
  }

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

  /* eslint-disable import/extensions */

  const INIT_SELECTOR = 'div[data-test="container:models"] div[data-test="container:cars"] > div.SPC_WIDGET-MuiGrid-root, [data-test^="container:variants_section:"].SPC_WIDGET-MuiAccordion-root, .SPC_WIDGET-MuiGrid-grid-md-8';
  (function v1() {
    function init() {
      document.body.classList.add('subt117');
      if (window.location.pathname.startsWith('/configure/models')) {
        handleListPage();
      }
      if (window.location.pathname.startsWith('/configure/configure')) {
        handleDetailPage();
      }
    }
    watchElement(INIT_SELECTOR, init);
  })();
})();