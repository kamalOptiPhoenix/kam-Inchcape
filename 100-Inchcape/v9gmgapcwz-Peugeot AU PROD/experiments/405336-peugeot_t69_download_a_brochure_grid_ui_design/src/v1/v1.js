/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT69InitCarSelection from '../assets/kamT69InitCarSelection.js';
// import kamT69FormValidation from '../assets/kamT69FormValidation.js';

(function kamPcat69V1() {
    function init() {
        console.log('*** *** PCAT69 Started local running *** ***');
        kamT69InitCarSelection();
        // kamT69FormValidation();
    }

    if (!window.v1Start) {
        window.v1Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.body !== null,
            init,
        );
    }
}());
