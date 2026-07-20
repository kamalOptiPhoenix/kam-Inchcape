/* eslint-disable no-console */
/* eslint-disable import/extensions */
import checkScroll from '../assets/checkScroll.js';
import closeSlider from '../assets/closeSlider.js';
import showSlider from '../assets/showSlider.js';

(function kamKgmt3V1() {
    function init() {
        document.body.classList.add('t3');
        console.log('*** KGM T3 - Model Page Slide-Up Modal Updated ***');
        const scrollHandler = () => checkScroll(showSlider, scrollHandler);

        // Raw listener kept so removeEventListener pairs correctly
        window.addEventListener('scroll', scrollHandler);
        closeSlider();
    }

    Kameleoon.API.Core.runWhenElementPresent('body', init);
}());
