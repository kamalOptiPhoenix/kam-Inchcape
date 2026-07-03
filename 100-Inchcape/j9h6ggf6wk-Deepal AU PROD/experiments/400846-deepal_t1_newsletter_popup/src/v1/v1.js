/* eslint-disable import/extensions */
import kamT1DeepalConfig from '../assets/config.js';
import createDeepalT1ExitModal from '../assets/createDeepalT1ExitModal.js';

(function kamT1DeepalV1() {
    if (window.__kam400846Initialized) return;
    if (sessionStorage.getItem(kamT1DeepalConfig.sessionKey)) return;
    window.__kam400846Initialized = true;

    function kamT1DeepalInit() {
        createDeepalT1ExitModal();
    }

    Kameleoon.API.Core.runWhenElementPresent(
        kamT1DeepalConfig.selectors.body,
        kamT1DeepalInit,
    );
}());
