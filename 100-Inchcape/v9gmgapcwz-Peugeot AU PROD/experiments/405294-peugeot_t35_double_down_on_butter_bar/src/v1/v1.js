/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT35DatalayerPushOnClick from '../assets/kamT35DatalayerPushOnClick.js';
import kamT35ScrollFunction from '../assets/kamT35ScrollFunction.js';
import kamT35ButterBarHtmlV1 from '../assets/kamT35ButterBarHtmlV1.js';

(function kamPcat35V1() {
    function init() {
        jQuery('body').addClass('pcat23');
        jQuery('body').addClass('pcat23v1');
        console.log('**** PCAT35 V1 ****');
        kamT35ScrollFunction();
        kamT35ButterBarHtmlV1();
        jQuery(window).scrollTop(0);
        kamT35DatalayerPushOnClick();
    }

    if (!window.__kam405294Initialized) {
        window.__kam405294Initialized = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.jQuery === 'function'
                && document.querySelectorAll('#main > div > .aem-Grid').length > 0,
            init,
        );
    }
}());
