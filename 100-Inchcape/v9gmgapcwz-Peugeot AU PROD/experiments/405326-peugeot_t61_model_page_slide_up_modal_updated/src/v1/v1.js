/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT61CheckScroll from '../assets/kamT61CheckScroll.js';
import kamT61CloseSlider from '../assets/kamT61CloseSlider.js';
import kamT61ShowSlider from '../assets/kamT61ShowSlider.js';

(function kamPcat61V1() {
    function init() {
        document.body.classList.add('t61');
        console.log('*** Peugeot T61 - Model Page Slide-Up Modal Updated ***');
        const scrollHandler = () => kamT61CheckScroll(kamT61ShowSlider, scrollHandler);

        Kameleoon.API.Utils.addEventListener(window, 'scroll', scrollHandler);
        kamT61CloseSlider();
    }

    if (!window.t61Start) {
        window.t61Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.jQuery === 'function',
            init,
        );
    }
}());
