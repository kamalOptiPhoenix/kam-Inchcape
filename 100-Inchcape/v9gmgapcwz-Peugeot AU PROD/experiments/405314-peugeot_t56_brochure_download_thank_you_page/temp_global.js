import { goals } from './goals.js';

(function kamPcat56TempGlobal() {
    function getCookie(name) {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return '';
    }

    function checkCookieDuration(name) {
        const value = getCookie(name);
        if (value !== '') {
            return true;
        }
        return false;
    }

    function processGoal(goalName) {
        const goalId = goals[goalName];
        if (goalId && Kameleoon?.API?.Goals?.processConversion) {
            Kameleoon.API.Goals.processConversion(goalId);
        }
    }

    function trackMetric() {
        jQuery('#main .q-modal-content .aem-Grid a[data-gtm-event-category="d1-content::Content"]').click(() => {
            if (jQuery('.pcat56').length === 0) {
                console.log('**** t56 Brochure Downloads Control ****');
                processGoal('Brochure_Downloads');
            } else if (checkCookieDuration('t56EmailCollected')) {
                console.log('**** t56 Brochure Downloads V1 ****');
                processGoal('Brochure_Downloads');
            }
        });
    }

    if (window.__kam405314GlobalInitialized) {
        return;
    }
    window.__kam405314GlobalInitialized = true;

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function',
        () => {
            console.log('**** t56 Global Script ****');
            trackMetric();
        },
    );
}());
