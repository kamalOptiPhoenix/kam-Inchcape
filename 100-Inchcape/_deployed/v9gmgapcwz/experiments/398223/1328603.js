"use strict";

(function () {
  /* eslint-disable no-console */
  (function kamT57V1() {
    function kamT57V1Init() {
      console.log('%c *** V1 Peugeot T57 - Configurator Summary Screen ***', 'background-color: green');
    }
    if (window.__kamT57V1Initialized) {
      return;
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('body.build-buy-summary') !== null && document.querySelector('.promotionBox') !== null, () => {
      if (window.__kamT57V1Initialized) {
        return;
      }
      window.__kamT57V1Initialized = true;
      kamT57V1Init();
    });
  })();
})();