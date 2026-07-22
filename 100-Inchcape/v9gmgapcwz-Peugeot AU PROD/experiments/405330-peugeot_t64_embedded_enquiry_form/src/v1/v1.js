/* eslint-disable import/extensions */
import kamT64InitParent from '../assets/kamT64InitParent.js';

(function kamPcat64V1() {
    if (!window.t64Start) {
        window.t64Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelector('footer')
                || document.querySelector('iframe[src*="peugeotforms.inchcape.com.au/webforms/make-an-enquiry"]'),
            kamT64InitParent,
        );
    }
}());
