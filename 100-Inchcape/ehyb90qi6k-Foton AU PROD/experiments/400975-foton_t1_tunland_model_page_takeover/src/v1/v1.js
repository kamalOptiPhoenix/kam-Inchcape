/* eslint-disable import/extensions */
import kamT1FotonConfig from '../assets/config.js';
import createFotonT1Modal from '../assets/createFotonT1Modal.js';

(function kamT1FotonV1() {
    const modalShownThisSession = sessionStorage.getItem(kamT1FotonConfig.sessionKey);

    if (modalShownThisSession) {
        return;
    }

    function kamT1FotonInit() {
        console.log('*** Foton T1 - Tunland Model Page Takeover ***');
        document.body.classList.add('fott1');
        createFotonT1Modal();
    }

    Kameleoon.API.Core.runWhenElementPresent(
        kamT1FotonConfig.selectors.triggerSelector,
        kamT1FotonInit,
    );
}());
