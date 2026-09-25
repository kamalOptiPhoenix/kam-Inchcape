/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT140InitLeadsCaptured from '../assets/kamT140InitLeadsCaptured.js';
import kamT140V3InterceptSendEmail from '../assets/kamT140V3InterceptSendEmail.js';

(function kamT140SubaruV3() {
    function init() {
        if (document.body.classList.contains('subt140v3')) {
            return;
        }

        console.log('%c *** Subaru T140 V3 - Share Build popup (HOT / WARM) ***', 'color:red;background:white');
        document.body.classList.add('subt140v3');
        kamT140V3InterceptSendEmail();
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
