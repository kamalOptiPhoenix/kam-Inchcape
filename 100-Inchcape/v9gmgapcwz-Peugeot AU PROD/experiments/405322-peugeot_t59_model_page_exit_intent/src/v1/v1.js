/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamPcat59Config from '../assets/kamPcat59Config.js';

(function kamPcat59V1() {
    function init() {
        console.log('*** Peugeot T59 - Model Page Exit Intent ***');
        document.body.classList.add('PCAT59');

        kamPcat59Config.preloadImage();

        const isMobile = window.innerWidth < 768;
        console.log('Device type:', isMobile ? 'Mobile' : 'Desktop');

        if (isMobile) {
            console.log('Initializing mobile scroll event...');
            kamPcat59Config.mobileScrollEvent();
        } else {
            console.log('Initializing desktop exit intent...');
            kamPcat59Config.desktopExitIntent();
        }
    }

    if (!window.t59Start) {
        window.t59Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.jQuery === 'function',
            init,
        );
    }
}());
