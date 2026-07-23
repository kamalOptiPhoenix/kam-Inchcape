/* eslint-disable import/extensions */
import initHomepageButterBar from '../assets/initHomepageButterBar.js';
import scrollHandler from '../assets/scrollHandler.js';

(function kamLdvt9V1() {
    const scrollHandlerInstance = scrollHandler();

    function initScrollHandler() {
        Kameleoon.API.Core.runWhenElementPresent('#butter_bar_ldvt9', () => {
            scrollHandlerInstance.init();
        });
    }

    function init() {
        document.body.classList.add('LDVT9');

        if (!initHomepageButterBar()) {
            return;
        }

        initScrollHandler();
    }

    function observeHeader() {
        const header = document.querySelector('header');
        if (!header) {
            return;
        }

        const observer = new MutationObserver(() => {
            if (initHomepageButterBar()) {
                scrollHandlerInstance.showButterBar();
            }
        });

        observer.observe(header, { childList: true, subtree: true });
    }

    if (!window.ldvt9Start) {
        window.ldvt9Start = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelector('header .sticky-header'),
            () => {
                init();
                observeHeader();
            },
        );
    }
}());
