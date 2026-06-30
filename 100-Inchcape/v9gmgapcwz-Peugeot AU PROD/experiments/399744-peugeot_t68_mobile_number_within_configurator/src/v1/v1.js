/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamPcat68Config from '../assets/kamPcat68Config.js';

(function kamPcat68V1() {
    if (!window.t68Start) {
        window.t68Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelector('body.build-buy-summary') !== null
                && document.querySelector('.trimDetailsWrapper .trimDetailsSecondaryColumn') !== null,
            () => {
                console.log('*** Initializing PCAT68 variation: v1 ***');
                kamPcat68Config.init('v1');
            },
        );
    }
}());
