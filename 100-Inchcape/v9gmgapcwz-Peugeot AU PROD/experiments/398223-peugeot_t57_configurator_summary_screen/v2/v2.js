/* eslint-disable no-console */
(function kamT57V2() {
    function kamT57V2Init() {
        console.log('%c *** V2 Peugeot T57 - Configurator Summary Screen ***', 'background-color: blue');
    }

    if (window.__kamT57V2Initialized) {
        return;
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.querySelector('body.build-buy-summary') !== null
            && document.querySelector('.promotionBox') !== null,
        () => {
            if (window.__kamT57V2Initialized) {
                return;
            }
            window.__kamT57V2Initialized = true;
            kamT57V2Init();
        }
    );
}());
