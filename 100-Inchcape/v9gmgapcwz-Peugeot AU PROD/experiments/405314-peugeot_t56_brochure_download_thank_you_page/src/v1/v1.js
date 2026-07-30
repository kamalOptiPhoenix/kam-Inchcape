/* eslint-disable import/extensions */
import kamT56ClickEventBind from '../assets/kamT56ClickEventBind.js';

(function kamPcat56V1() {
    function init() {
        const { body } = document;
        body.classList.add('pcat56');
        kamT56ClickEventBind();
    }

    if (!window.__kam405314Initialized) {
        window.__kam405314Initialized = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelectorAll('div[data-current-page="download-brochure"]').length > 0,
            init,
        );
    }
}());
