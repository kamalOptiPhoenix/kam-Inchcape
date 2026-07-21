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
    function fireBrochureFormConversionGoal() {
      if (window.kamSubnzT4BrochureFormConversionFired) {
        return;
      }
      if (!Kameleoon?.API?.Goals?.processConversion) {
        return;
      }
      window.kamSubnzT4BrochureFormConversionFired = true;
      console.log('*** Brochure form conversion primary goal triggered ***');
      kamSubnzT4ProcessGoal('Brochure form conversion');
    }
    function initGoal() {
      fireBrochureFormConversionGoal();
    }
    Kameleoon.API.Core.runWhenElementPresent('div.ui-dialog.ui-widget-content', initGoal);
  })();
})();