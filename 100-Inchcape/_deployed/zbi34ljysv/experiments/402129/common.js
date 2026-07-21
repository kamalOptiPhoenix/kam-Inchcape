"use strict";

(function () {
  const goals = {
    'Contact Details Captured': 422374,
    'Configurator Completions T1': 422481
  };
  function kamSubnzT7ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable max-len */
  (function kamSubnzT7Shared() {
    function fireConfiguratorCompletionsGoal() {
      if (window.kamSubnzT7ConfiguratorCompletionsFired) {
        return;
      }
      if (!Kameleoon?.API?.Goals?.processConversion) {
        return;
      }
      window.kamSubnzT7ConfiguratorCompletionsFired = true;
      console.log('*** configurator_completions_t1 goal triggerd ***');
      kamSubnzT7ProcessGoal('Configurator Completions T1');
    }
    function initGoals() {
      let summaryFlag = true;
      Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        if (document.querySelector('#customise_summary')) {
          setTimeout(() => {
            const headerPosition = document.querySelector('#customise_summary').getBoundingClientRect();
            const headerOnScreen = headerPosition.top < window.innerHeight && headerPosition.bottom >= 0;
            if (headerOnScreen) {
              if (summaryFlag) {
                summaryFlag = false;
                fireConfiguratorCompletionsGoal();
              }
            }
          }, 3000);
        }
      });
      Kameleoon.API.Utils.addEventListener(document, 'click', event => {
        if (event.target.closest('button[data-test="customise:summary:enquire"]')) {
          fireConfiguratorCompletionsGoal();
        }
      });
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function', initGoals);
  })();
})();