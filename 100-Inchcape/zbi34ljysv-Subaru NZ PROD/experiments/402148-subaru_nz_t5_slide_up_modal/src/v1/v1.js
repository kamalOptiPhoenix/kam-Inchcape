/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamSubnzT5CheckScroll from '../assets/kamSubnzT5CheckScroll.js';
import kamSubnzT5CloseSlider from '../assets/kamSubnzT5CloseSlider.js';
import kamSubnzT5ShowSlider from '../assets/kamSubnzT5ShowSlider.js';

(function kamSubnzT5V1() {
    function init() {
        document.body.classList.add('subtnz5');
        console.log('*** Subaru NZ T5 - Slide Up Modal ***');
        const scrollHandler = () => kamSubnzT5CheckScroll(kamSubnzT5ShowSlider, scrollHandler);

        Kameleoon.API.Utils.addEventListener(window, 'scroll', scrollHandler);
        kamSubnzT5CloseSlider();
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.querySelector('body') !== null,
        init,
    );
}());
