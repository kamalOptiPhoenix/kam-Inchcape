/* eslint-disable max-len */
/* eslint-disable no-console */
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
                        }
                    }
                }, 3000);
            }
        });

        Kameleoon.API.Utils.addEventListener(document, 'click', (event) => {
            if (event.target.closest('button[data-test="customise:summary:enquire"]')) {
                console.log('*** configurator_completions_t1 goal triggerd ***');
            }
        });
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function',
        initGoals,
    );
}());
