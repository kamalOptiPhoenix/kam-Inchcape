/* eslint-disable import/extensions */
import init from '../assets/init.js';

const HEADER_SELECTOR = 'body > main > section.sticky.top-0.max-\\[768px\\]\\:relative';

(function kamLdvt3V1() {
    if (!window.t3Start) {
        window.t3Start = true;
        Kameleoon.API.Core.runWhenElementPresent(HEADER_SELECTOR, (elements) => {
            init(elements[0], 'v1');
        });
    }
}());
