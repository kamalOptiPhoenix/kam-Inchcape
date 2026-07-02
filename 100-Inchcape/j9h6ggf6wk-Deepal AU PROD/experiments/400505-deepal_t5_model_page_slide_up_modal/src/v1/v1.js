/* eslint-disable import/extensions */
import checkScroll from '../assets/checkScroll.js';
import handleSliderInteractions from '../assets/handleSliderInteractions.js';
import checkExitIntent from '../assets/checkExitIntent.js';

(function kamT5DeepalV1() {
    function init(variation) {
        console.log(`*** Deepal T5 - Model Page Slide Up Modal ${variation} ***`);
        document.body.classList.add('deet5');
        if (variation === 'v1') {
            window.addEventListener('scroll', checkScroll);
        } else if (variation === 'v2') {
            checkExitIntent();
        }

        handleSliderInteractions();
    }

    if (!window.deet5newstart) {
        window.deet5newstart = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.getElementById('tecnologiaVehiculos_Design') || document.getElementById('tecnologiaVehiculos_Interior'),
            () => init('v1'),
        );
    }
}());
