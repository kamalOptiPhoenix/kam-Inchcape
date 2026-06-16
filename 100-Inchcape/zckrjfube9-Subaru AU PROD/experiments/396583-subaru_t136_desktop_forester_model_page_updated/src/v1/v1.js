/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import config from '../assets/config.js';
import exitIntent from '../assets/exitIntent.js';

const TARGET_SELECTOR = '.gXRHtZp55h .Q7fRqbxtJd';

(function v1() {
    function init() {
        console.log('*** SUBT136 Subaru T136 - Forester Model Page Updated ***');
        document.body.classList.add('subt136');
        config.restructureUI();
        exitIntent.init();
    }

    if (!window.subt136Start) {
        window.subt136Start = true;
        Kameleoon.API.Core.runWhenElementPresent(TARGET_SELECTOR, init);
    }
}());
