/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import config from '../assets/config.js';
import exitIntent from '../assets/exitIntent.js';

const TARGET_SELECTOR = '.gXRHtZp55h .Q7fRqbxtJd';

(function v1() {
    let initialized = false;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function init() {
        if (initialized) return;
        initialized = true;

        console.log('%c *** SUBT136 Subaru T136 - Mobile Variation ***', 'color: #000; background-color: #fff; ');
        document.body.classList.add('subt136_m');
        config.restructureUI();
        exitIntent.init();
    }

    function tryInit() {
        if (initialized || !isMobile()) return;
        if (!document.querySelector(TARGET_SELECTOR)) return;
        init();
    }

    Kameleoon.API.Core.runWhenElementPresent(TARGET_SELECTOR, tryInit);

    Kameleoon.API.Utils.addEventListener(window, 'resize', () => {
        if (!initialized) {
            tryInit();
        }
    });
}());
