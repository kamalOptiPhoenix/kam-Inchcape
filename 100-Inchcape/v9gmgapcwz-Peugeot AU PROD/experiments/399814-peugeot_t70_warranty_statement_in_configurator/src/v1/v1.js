/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamPcat70WarrantyConfig from '../assets/kamPcat70WarrantyConfig.js';

(function kamPcat70V1() {
    function init() {
        console.log('**** PCAT70 Running ****');
        document.body.classList.add('pcat70');
        kamPcat70WarrantyConfig();

        const listingWrapper = document.querySelector('#listing-wrapper');
        if (listingWrapper) {
            const observer = new MutationObserver(() => {
                kamPcat70WarrantyConfig();
            });

            observer.observe(listingWrapper, {
                childList: true,
                subtree: true
            });
        }
    }

    if (!window.v1Start) {
        window.v1Start = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelector('#listing-wrapper')
                || document.querySelector('.trimDetailsOfferBox'),
            init,
        );
    }
}());
