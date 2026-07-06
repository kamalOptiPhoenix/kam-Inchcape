/* eslint-disable import/extensions */
import checkScroll from '../assets/checkScroll.js';
import closeSlider from '../assets/closeSlider.js';
import showSlider from '../assets/showSlider.js';

(function kamT4FotonV1() {
    function init() {
        document.body.classList.add('fott4');
        console.log('*** Foton T4 - Slide Up Modal ***');
        const scrollHandler = () => checkScroll(showSlider, scrollHandler);

        window.addEventListener('scroll', scrollHandler);
        closeSlider();
    }

    Kameleoon.API.Core.runWhenElementPresent('body', init);
}());
