/* eslint-disable import/extensions */
import kamT5FotonConfig from '../assets/config.js';
import createFotonT5ExitModal from '../assets/createFotonT5ExitModal.js';

(function kamT5FotonV1() {
    if (sessionStorage.getItem(kamT5FotonConfig.sessionKey)) {
        return;
    }

    function init() {
        createFotonT5ExitModal();
    }

    if (!window.fott5ExitIntentStart) {
        window.fott5ExitIntentStart = true;
        Kameleoon.API.Core.runWhenElementPresent('body', init);
    }
}());
