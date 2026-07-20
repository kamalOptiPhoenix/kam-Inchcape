/* eslint-disable import/extensions */
import initHomepageButterBar from '../assets/initHomepageButterBar.js';
import scrollHandler from '../assets/scrollHandler.js';

(function kamLdvt9V1() {
    function init() {
        document.body.classList.add('LDVT9');
        initHomepageButterBar();

        Kameleoon.API.Core.runWhenElementPresent('#butter_bar_ldvt9', () => {
            scrollHandler().init();
        });
    }

    Kameleoon.API.Core.runWhenElementPresent('body', init);
}());
