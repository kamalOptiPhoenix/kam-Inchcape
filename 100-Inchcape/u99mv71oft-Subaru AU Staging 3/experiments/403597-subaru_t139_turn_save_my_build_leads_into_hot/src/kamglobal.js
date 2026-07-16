/* eslint-disable no-console */
// Configurator Tracking Starts

(function kamConfiguratorTrackingGlobal() {
    const KAM_GOALS = {
        'Configurator Completions': 423089,
        'Leads Captured': 422993,
    };

    const LEAD_DETAILS_KEY = 'kamLeadDetailsCaptured';

    function push_API_only(nameOfEvent) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName: nameOfEvent,
        });
        console.log('%c *** Optimizely Event Fired ***', 'background:#fff;color:#000', nameOfEvent);
    }

    function processKamGoal(goalName) {
        const goalId = KAM_GOALS[goalName];
        if (
            goalId
            && typeof Kameleoon !== 'undefined'
            && Kameleoon.API
            && Kameleoon.API.Goals
            && Kameleoon.API.Goals.processConversion
        ) {
            Kameleoon.API.Goals.processConversion(goalId);
            console.log(
                '%c *** Kameleoon Goal Processed ***',
                'background:#fff;color:#000',
                goalName,
                goalId
            );
        }
    }

    function isSummaryInViewport() {
        const summary = document.querySelector('#customise_summary');
        if (!summary) {
            return false;
        }

        const rect = summary.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    function markLeadDetailsCaptured() {
        sessionStorage.setItem(LEAD_DETAILS_KEY, 'true');
        console.log('%c *** Lead details captured (Step 2 Next) ***', 'color:red;background:white');
    }

    function initGoalsConfigurator() {
        if (window.__kamConfiguratorTrackingBound) {
            return;
        }

        window.__kamConfiguratorTrackingBound = true;
        console.log('*** OPTI / KAM Configurator Tracking Code ***');

        let summaryFlag = true;
        let leadsCapturedFlag = true;

        // Step 2 Next = first name + email + privacy (button stays disabled until valid)
        document.addEventListener('click', (event) => {
            const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
            if (!el || !el.closest) {
                return;
            }

            if (el.closest('[data-test="button:personalDetails:next"]')) {
                markLeadDetailsCaptured();
            }
        }, true);

        window.addEventListener('scroll', () => {
            if (!document.querySelector('#customise_summary')) {
                return;
            }

            window.setTimeout(() => {
                if (!isSummaryInViewport()) {
                    return;
                }

                // Goal: Configurator Completions — Summary in viewport
                if (summaryFlag) {
                    summaryFlag = false;
                    console.log('%c *** configurator_completions_global Tracked ***', 'color:green;background:white');
                    push_API_only('configurator_completions_global');
                    processKamGoal('Configurator Completions');
                }

                // Goal: Leads Captured — Step 2 details provided + Summary in viewport
                if (leadsCapturedFlag && sessionStorage.getItem(LEAD_DETAILS_KEY) === 'true') {
                    leadsCapturedFlag = false;
                    console.log('%c *** Leads Captured Tracked ***', 'color:green;background:white');
                    processKamGoal('Leads Captured');
                }
            }, 3000);
        });

        // Checkout CTA also counts as configurator completion (Optimizely + Kameleoon)
        if (typeof window.jQuery === 'function') {
            window.jQuery(document).on(
                'click',
                'button[data-test="customise:summary:continuetocheckoutv4"]',
                () => {
                    console.log('%c *** configurator_completions_global Tracked ***', 'color:green;background:white');
                    push_API_only('configurator_completions_global');
                    processKamGoal('Configurator Completions');

                    if (sessionStorage.getItem(LEAD_DETAILS_KEY) === 'true') {
                        console.log('%c *** Leads Captured Tracked ***', 'color:green;background:white');
                        processKamGoal('Leads Captured');
                    }
                }
            );
        }
    }

    if (window.location.pathname.indexOf('/configure') !== -1) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.jQuery === 'function',
            initGoalsConfigurator
        );
    }
}());

// Configurator Tracking Ends
