/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamPcat66Config from '../assets/kamPcat66Config.js';

(function kamPcat66V1() {
    function init() {
        console.log('*** Peugeot T66 - Model Header Menu ***');
        document.body.classList.add('PCAT66', 'PCAT66-desktop');
        kamPcat66Config.init();
    }

    function initMobile() {
        console.log('*** Peugeot T66 - Model Header Menu ***');
        document.body.classList.add('PCAT66', 'PCAT66-mobile');
        kamPcat66Config.initMobile();
    }

    if (!window.t66Start) {
        window.t66Start = true;

        if (window.innerWidth < 1081) {
            Kameleoon.API.Core.runWhenElementPresent(
                '.q-nav-offcanvas__scroller > ul.off-canvas-list',
                initMobile,
            );
        } else {
            Kameleoon.API.Core.runWhenElementPresent(
                '.nav-flyout .content-container .flyout-content',
                init,
            );
        }
    }
}());
