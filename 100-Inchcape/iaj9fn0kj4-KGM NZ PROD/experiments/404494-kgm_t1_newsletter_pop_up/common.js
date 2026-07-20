/* eslint-disable prefer-destructuring, no-restricted-syntax, no-console */
import { goals } from './goals.js';

(function kamKgmt1Common() {
    function kamKgmt1ProcessGoal(goalName) {
        const goalId = goals[goalName];
        if (goalId && Kameleoon?.API?.Goals?.processConversion) {
            Kameleoon.API.Goals.processConversion(goalId);
        }
    }

    function validateForm() {
        const allPopupForms = Array.from(document.querySelectorAll('#popUpForm')).filter(
            el => !Array.from(el.classList).some(cls => cls.toLowerCase().startsWith('kgm') && cls !== 'KGMT1-form')
        );

        allPopupForms.forEach((popupForm) => {
            const form = popupForm.querySelector('form');
            if (!form) return;

            Kameleoon.API.Utils.addEventListener(form, 'submit', (e) => {
                e.preventDefault();
                let isValid = true;

                const firstName = form.querySelector('#firstName');
                if (!firstName.value.trim().match(/^[A-Za-z\s]+$/)) isValid = false;

                const lastName = form.querySelector('#lastName');
                if (!lastName.value.trim().match(/^[A-Za-z\s]+$/)) isValid = false;

                const email = form.querySelector('#email');
                const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
                if (!email.value.trim().match(emailPattern)) isValid = false;

                const checkbox = form.querySelector('#customCheckBox');
                if (!checkbox.checked) isValid = false;

                if (isValid) {
                    console.log('✅ Valid form submitted');
                    kamKgmt1ProcessGoal('t1_newsletter_conversions');
                    form.submit(); // Actually submit the form
                }
            });
        });
    }

    function watchPopupVisibility(popupEl) {
        if (
            !popupEl
            || Array.from(popupEl.classList).some(cls => cls.toLowerCase().startsWith('kgm'))
        ) return;

        const displayObserver = new MutationObserver(() => {
            const display = popupEl.style.display;
            if (display === 'block') {
                console.log('*** t1_pop-up_appearances goal triggered ***');
                kamKgmt1ProcessGoal('t1_pop-up_appearances');
                displayObserver.disconnect();
            }
        });

        displayObserver.observe(popupEl, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    // 🔄 Observe body for dynamically added #popUpForm
    const popupObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                if (
                    node.nodeType === 1
                    && node.matches
                    && node.matches('#popUpForm')
                ) {
                    watchPopupVisibility(node);
                    validateForm();
                }
            }
        }
    });

    popupObserver.observe(document.body, { childList: true, subtree: true });

    // Also handle if already present
    Kameleoon.API.Core.runWhenElementPresent('#popUpForm', (elements) => {
        watchPopupVisibility(elements[0]);
        validateForm();
    });
}());
