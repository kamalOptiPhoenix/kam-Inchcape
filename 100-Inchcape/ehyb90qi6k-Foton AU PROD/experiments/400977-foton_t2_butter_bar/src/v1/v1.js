/* eslint-disable import/extensions */
import butterBarHtml from '../assets/butterBarHtml.js';
import scrollHandler from '../assets/scrollHandelr.js';
import kamT2FotonConfig from '../assets/config.js';

(function kamT2FotonV1() {
    function insertButterBar() {
        if (!document.getElementById('fott2-butter-bar')) {
            const html = butterBarHtml();
            const header = document.querySelector('header.header-wrapper');

            if (header) {
                header.insertAdjacentHTML('afterend', html);

                const butterBar = document.getElementById('fott2-butter-bar');
                if (butterBar) {
                    const updateButterBarPosition = () => {
                        const headerRect = header.getBoundingClientRect();
                        const headerHeight = headerRect.height > 0 ? headerRect.height : header.offsetHeight;

                        if (headerHeight > 0) {
                            butterBar.style.setProperty('--butter-bar-top', `${headerHeight}px`);
                        }
                    };

                    requestAnimationFrame(() => {
                        updateButterBarPosition();
                        setTimeout(updateButterBarPosition, 100);
                        setTimeout(updateButterBarPosition, 300);
                        setTimeout(updateButterBarPosition, 500);
                    });

                    Kameleoon.API.Utils.addEventListener(window, 'scroll', updateButterBarPosition, { passive: true });
                    Kameleoon.API.Utils.addEventListener(window, 'resize', updateButterBarPosition, { passive: true });
                }

                const scrollHandlerInstance = scrollHandler();
                scrollHandlerInstance.init();
            }
        }
    }

    function init() {
        console.log('*** Foton T2 - Butter Bar ***');
        document.body.classList.add('fott2');

        insertButterBar();
    }

    if (!window.fott2start) {
        window.fott2start = true;
        Kameleoon.API.Core.runWhenElementPresent(
            kamT2FotonConfig.selectors.headerWrapper,
            init,
        );
    }
}());
