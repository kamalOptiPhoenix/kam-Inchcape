/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamSubnzT4ProcessGoal from './src/assets/kamSubnzT4ProcessGoal.js';

(function kamSubnzT4Shared() {
    function initGoal() {
        console.log('*** Brochure form conversion primary goal triggered ***');
        kamSubnzT4ProcessGoal('Brochure form conversion');
    }

    Kameleoon.API.Core.runWhenElementPresent(
        'div.ui-dialog.webform-confirmation-modal',
        initGoal,
    );
}());
