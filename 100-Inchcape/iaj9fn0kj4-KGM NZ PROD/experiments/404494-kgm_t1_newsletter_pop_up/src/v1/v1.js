/* eslint-disable import/extensions */
import init from '../assets/init.js';

(function kamKgmt1V1() {
    if (!window.t1Start) {
        window.t1Start = true;
        Kameleoon.API.Core.runWhenElementPresent('body', init);
    }
}());
