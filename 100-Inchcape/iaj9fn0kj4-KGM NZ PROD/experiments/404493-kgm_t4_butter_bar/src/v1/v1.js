/* eslint-disable no-console */
/* eslint-disable import/extensions */
import initButterBar from '../assets/initButterBar.js';

(function kamKgmt4V1() {
    function init() {
        console.log('**** KGMT4 Started 10:26 ****');
        document.body.classList.add('KGMT4');
        initButterBar();
    }

    Kameleoon.API.Core.runWhenElementPresent('body', init);
}());
