/* eslint-disable no-console */
/* eslint-disable import/extensions */
import initButterBar from '../assets/initButterBar.js';

(function kamKgmt4V1() {
    function getInsertionTarget() {
        if (window.innerWidth <= 768) {
            return document.getElementById('scnd_function');
        }
        const stickyDivs = document.querySelectorAll('.sticky.top-0');
        return stickyDivs.length ? stickyDivs[stickyDivs.length - 1] : null;
    }

    function init() {
        if (document.getElementById('kgm-butter-bar_T4')) return;

        console.log('**** KGMT4 Started ****');
        document.body.classList.add('KGMT4');
        initButterBar();
    }

    Kameleoon.API.Core.runWhenConditionTrue(getInsertionTarget, init);
}());
