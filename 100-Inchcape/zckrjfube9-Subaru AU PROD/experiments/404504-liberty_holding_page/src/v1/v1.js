/* eslint-disable no-console */
/* eslint-disable import/extensions */
import configHTML from '../assets/config.js';

(function libertyHoldingPage() {
    function init() {
        configHTML.buildPage();
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.getElementById('clientFooter')
            && document.getElementById('mega-nav'),
        init
    );
}());
