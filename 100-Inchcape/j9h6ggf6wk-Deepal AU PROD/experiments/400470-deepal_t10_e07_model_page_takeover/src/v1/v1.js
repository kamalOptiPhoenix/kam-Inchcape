/* eslint-disable import/extensions */
import kamT10DeepalConfig from '../assets/config.js';
import createDepalT10Modal from '../assets/createDepalT10Modal.js';

(function kamT10DeepalV1() {
    if (window.deepalV1Start || localStorage.getItem(kamT10DeepalConfig.sessionKey)) {
        return;
    }
    window.deepalV1Start = true;

    function kamT10DeepalInit() {
        document.body.classList.add('deet10');
        createDepalT10Modal();
    }

    Kameleoon.API.Core.runWhenElementPresent(
        kamT10DeepalConfig.selectors.triggerSelector,
        kamT10DeepalInit,
    );
}());

 