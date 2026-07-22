/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamPcat71Config from '../assets/kamPcat71Config.js';

(function kamPcat71V1() {
    function init() {
        console.log('%c *** PCAT71 Started local running *** ***', 'background: #16b271; color: #fff; padding: 4px;');
        document.body.classList.add('pcat71');
        kamPcat71Config.insertHTML();
        kamPcat71Config.setupMobileCarousel();
        kamPcat71Config.setupInfoTipFixedPositioning();
    }

    if (!window.__kam405277Initialized) {
        window.__kam405277Initialized = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelector('.main-section .q-modal-content .canvas'),
            init,
        );
    }
}());
