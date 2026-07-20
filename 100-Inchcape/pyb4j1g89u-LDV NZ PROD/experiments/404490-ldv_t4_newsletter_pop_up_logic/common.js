/* eslint-disable no-console */
/* eslint-disable camelcase */
import { goals } from './goals.js';

(function kamLdvt4Common() {
    function kamLdvt4ProcessGoal(goalName) {
        const goalId = goals[goalName];
        if (goalId && Kameleoon?.API?.Goals?.processConversion) {
            Kameleoon.API.Goals.processConversion(goalId);
        }
    }

    function init() {
        Kameleoon.API.Utils.addEventListener(document, 'submit', (event) => {
            if (event.target && event.target.closest && event.target.closest('#popUpForm form')) {
                sessionStorage.setItem('FormSubmitEvent', true);
            }
        });

        setTimeout(() => {
            // Control Tracking
            if (sessionStorage.getItem('isShowed') !== null && !document.querySelector('body').classList.contains('ldvt4')) {
                kamLdvt4ProcessGoal('newsletter_pop-up_appearances');
            }
        }, 2000);
    }

    if (window.location.pathname.includes('/thank-you') && sessionStorage.getItem('FormSubmitEvent') !== null) {
        kamLdvt4ProcessGoal('newsletter_conversions');
    }

    sessionStorage.removeItem('FormSubmitEvent');

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function',
        init,
    );
}());
