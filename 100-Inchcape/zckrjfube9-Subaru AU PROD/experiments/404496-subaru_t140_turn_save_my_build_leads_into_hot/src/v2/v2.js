/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT140InitLeadsCaptured from '../assets/kamT140InitLeadsCaptured.js';
import kamT140InterceptTemperature from '../assets/kamT140InterceptTemperature.js';

(function kamT140SubaruV2() {
    function init() {
        if (document.body.classList.contains('subt140v2')) {
            return;
        }

        console.log('%c *** Subaru T140 V2 - Turn Save my Build Leads into HOT', 'color:red;background:white');
        document.body.classList.add('subt140v2');
        kamT140InterceptTemperature();
        kamT140InitLeadsCaptured();
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
