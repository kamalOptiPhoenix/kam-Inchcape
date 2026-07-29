/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamPcat72Config from '../assets/kamPcat72Config.js';

(function kamPcat72V1() {
    function init() {
        console.log('%c *** Peugeot T72 - Model Page Finance Calculator ***', 'background: #16b271; color: #fff; padding: 4px;');
        document.body.classList.add('pcat72');
        kamPcat72Config.insertHTML();
    }

    if (!window.__kam406803Initialized) {
        window.__kam406803Initialized = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => {
                const modelSlug = kamPcat72Config.getModelFromUrl();

                return modelSlug && kamPcat72Config.getTargetElement(modelSlug);
            },
            init,
        );
    }
}());
