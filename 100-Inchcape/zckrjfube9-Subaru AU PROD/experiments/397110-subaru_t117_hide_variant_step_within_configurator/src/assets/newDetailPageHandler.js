import { getTooltipHTML } from './config.js';

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

    document.querySelectorAll('.variant-tooltip').forEach((tooltip) => tooltip.remove());

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
        document.addEventListener('click', (e) => {
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
            const button = accordion.querySelector('div.Mui-expanded[role="button"][data-test*="container:variants_section:"]')
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

export default function newDetailPageHandler() {
   
   
    window.optiReady('[data-test^="container:variants_section:"].SPC_WIDGET-MuiAccordion-root', () => {
        if (!window.isRun) {
            window.isRun = true;
            if (!sessionStorage.getItem('T117TooltipShowed')) {
                handleAccordions();
            }
            
        }
    });




   
}
