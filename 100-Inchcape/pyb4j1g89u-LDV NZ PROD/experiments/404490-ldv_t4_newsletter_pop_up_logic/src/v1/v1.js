/* eslint-disable no-console */
/* eslint-disable import/extensions */
import config from '../assets/config.js';

(function kamLdvt4V1() {
    function init() {
        console.log('*** LDV T4 - Newsletter Pop-up Logic ***');
        sessionStorage.setItem('isShowed', true);
        document.body.classList.add('ldvt4');
        config.modules.addPopup();
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function',
        init,
    );
}());
