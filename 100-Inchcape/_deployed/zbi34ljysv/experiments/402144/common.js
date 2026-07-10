"use strict";

(function () {
  const goals = {
    'Brochure form conversion': 422378
  };
  function kamSubnzT4ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable no-console */

  (function kamSubnzT4Shared() {
    function initGoal() {
      console.log('*** Brochure form conversion primary goal triggered ***');
      kamSubnzT4ProcessGoal('Brochure form conversion');
    }
    Kameleoon.API.Core.runWhenElementPresent('div.ui-dialog.ui-widget-content', initGoal);
  })();
})();