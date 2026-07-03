/* eslint-disable import/extensions */
import butterBarHtmlV2 from '../assets/butterBarHtmlV2.js';
import scrollHandler from '../assets/scrollHandelr.js';
import kamT6DeepalConfig from '../assets/config.js';

(function kamT6DeepalV2() {
    function insertButterBar() {
        if (!document.getElementById('deet6-butter-bar')) {
            const html = butterBarHtmlV2();
            const header = document.querySelector('header.header-wrapper');

            if (header) {
                header.insertAdjacentHTML('afterend', html);

                const butterBar = document.getElementById('deet6-butter-bar');
                if (butterBar) {
                    const updateButterBarPosition = () => {
                        const isMobile = window.innerWidth <= 768;

                        const defaultStickyBannerHeight = isMobile ? 170 : 56;
                        const defaultHeaderHeight = isMobile ? 50 : 82;

                        let stickyBannerHeight = 0;
                        const stickyBanner = document.querySelector('.T4_sticky-banner');
                        if (stickyBanner && !stickyBanner.classList.contains('T4_banner-hidden')) {
                            stickyBannerHeight = stickyBanner.offsetHeight > 0
                                ? stickyBanner.offsetHeight
                                : defaultStickyBannerHeight;
                        }

                        const headerHeight = header.offsetHeight > 0
                            ? header.offsetHeight
                            : defaultHeaderHeight;

                        const totalHeight = headerHeight + stickyBannerHeight;
                        butterBar.style.setProperty('--butter-bar-top', `${totalHeight}px`);
                    };

                    requestAnimationFrame(() => {
                        updateButterBarPosition();
                        setTimeout(updateButterBarPosition, 100);
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
        console.log('*** Deepal T6 - Butter Bar he ***');
        document.body.classList.add('deet6');

        insertButterBar();

        const observer = new MutationObserver(() => {
            insertButterBar();
        });

        const headerWrapper = document.querySelector('.header-wrapper').parentNode;
        if (headerWrapper) {
            observer.observe(headerWrapper, { childList: true, subtree: true });
        }
    }

    if (!window.deet6start) {
        window.deet6start = true;
        Kameleoon.API.Core.runWhenElementPresent(
            kamT6DeepalConfig.selectors.headerWrapper,
            init,
        );
    }
}());
