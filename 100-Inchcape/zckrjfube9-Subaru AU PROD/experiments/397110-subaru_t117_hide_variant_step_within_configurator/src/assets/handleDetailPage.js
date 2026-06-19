/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { getTooltipHTML } from './config.js';

export default function handleDetailPage() {
    const showTooltip = (accordion) => {
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
        const handleOutsideClick = (e) => {
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
                    showTooltip(mobileAccordions[0]);
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

    const applyClosedStyles = (accordion) => {
        if (isProcessing) return;
        accordion.classList.add('accordion-closed');
        accordion.classList.remove('accordion-open');

        // Reset all SVG icon states
        document.querySelectorAll('.SPC_WIDGET-MuiSvgIcon-root[data-test$=":expand_button"]').forEach((svg) => {
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

        allAccordions.forEach((accordion) => {
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

        allAccordions.forEach((accordion) => {
            accordion.addEventListener('click', () => {
            // Slight delay to allow MUI to update its classes
                setTimeout(updateAccordionState, 20);
            });
        });
    };

    // Initialize on load
    bindAccordionClickHandlers();
    const resetToDefaultStyles = (accordion) => {
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
            showTooltip(accordion);
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
        const observer = new MutationObserver((mutations) => {
            if (isProcessing) return;

            const expandedMutation = mutations.find(mutation => mutation.type === 'attributes'
                && mutation.attributeName === 'class'
                && (mutation.target.classList.contains('Mui-expanded') !== mutation.oldValue.includes('Mui-expanded')));

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
