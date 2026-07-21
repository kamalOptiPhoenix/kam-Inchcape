/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamSubnzT4ProcessGoal from './src/assets/kamSubnzT4ProcessGoal.js';

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

    Kameleoon.API.Core.runWhenElementPresent(
        'div.ui-dialog.ui-widget-content',
        initGoal,
    );
}());
