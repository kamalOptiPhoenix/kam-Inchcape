/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamSubnzT7ProcessGoal from './src/assets/kamSubnzT7ProcessGoal.js';
(function kamSubnzT7Shared() {
    function initGoals() {
        let summaryFlag = true;

        Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
            if (document.querySelector('#customise_summary')) {
                setTimeout(() => {
                    const headerPosition = document.querySelector('#customise_summary').getBoundingClientRect();
                    const headerOnScreen = (headerPosition.top < window.innerHeight && headerPosition.bottom >= 0);
                    if (headerOnScreen) {
                        if (summaryFlag) {
                            summaryFlag = false;
                            console.log('*** configurator_completions_t1 goal triggerd ***');
                            kamSubnzT7ProcessGoal('Configurator Completions T1');
                        }
                    }
                }, 3000);
            }
        });

        Kameleoon.API.Utils.addEventListener(document, 'click', (event) => {
            if (event.target.closest('button[data-test="customise:summary:enquire"]')) {
                console.log('*** configurator_completions_t1 goal triggerd ***');
                kamSubnzT7ProcessGoal('Configurator Completions T1');
            }
        });
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function',
        initGoals,
    );
}());
