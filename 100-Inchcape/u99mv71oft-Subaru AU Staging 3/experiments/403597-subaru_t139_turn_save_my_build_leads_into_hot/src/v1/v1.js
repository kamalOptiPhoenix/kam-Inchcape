/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT139InitLeadsCaptured from '../assets/kamT139InitLeadsCaptured.js';
import kamT139InterceptTemperature from '../assets/kamT139InterceptTemperature.js';

(function kamT139SubaruStag3V1() {
    function init() {
        if (document.body.classList.contains('subt139')) {
            return;
        }

        console.log('%c *** Subaru T139 V1 - Turn Save my Build Leads into HOT', 'color:red;background:white');
        document.body.classList.add('subt139');
        kamT139InterceptTemperature();
        kamT139InitLeadsCaptured();
    }

    if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core) {
        init();
        return;
    }

    const waitForKam = window.setInterval(() => {
        if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core) {
            window.clearInterval(waitForKam);
            init();
        }
    }, 100);
}());
