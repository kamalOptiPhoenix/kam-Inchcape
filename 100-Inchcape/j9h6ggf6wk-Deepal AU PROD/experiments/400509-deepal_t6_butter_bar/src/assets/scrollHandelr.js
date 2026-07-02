/* eslint-disable no-use-before-define */
export default function scrollHandler() {
    let lastScrollTop = 0;
    let isScrollingDown = false;
    let targetElement = null;
    let isButterBarVisible = true;
    let ticking = false;
    let lastToggleTime = 0;

    function init() {
        const butterBar = document.getElementById('deet6-butter-bar');
        if (!butterBar) {
            setTimeout(init, 100);
            return;
        }

        targetElement = document.querySelector('h1') || document.querySelector('h2');

        if (!targetElement) {
            console.warn('DEET6: No H1 or H2 element found for scroll detection');
            return;
        }

        const targetRect = targetElement.getBoundingClientRect();
        const targetBottom = targetRect.bottom;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop === 0 || targetBottom > 0) {
            showButterBar();
            isButterBarVisible = true;
        } else {
            hideButterBar();
            isButterBarVisible = false;
        }

        Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll, { passive: true });
    }

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateButterBar();
                ticking = false;
            });
            ticking = true;
        }
    }

    function updateButterBar() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const butterBar = document.getElementById('deet6-butter-bar');

        if (!butterBar || !targetElement) return;

        const now = Date.now();
        if (now - lastToggleTime < 50) {
            return;
        }

        const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);
        if (scrollDiff < 10 && currentScrollTop !== 0) {
            return;
        }

        isScrollingDown = currentScrollTop > lastScrollTop;

        const targetRect = targetElement.getBoundingClientRect();
        const targetBottom = targetRect.bottom;

        const isPastTarget = targetBottom < -10;

        const actuallyVisible = butterBar.classList.contains('deet6-butter-bar-visible');
        if (actuallyVisible !== isButterBarVisible) {
            isButterBarVisible = actuallyVisible;
        }

        if (isScrollingDown) {
            if (isPastTarget && isButterBarVisible) {
                hideButterBar();
                isButterBarVisible = false;
                lastToggleTime = now;
            }
        } else if (!isButterBarVisible) {
            showButterBar();
            isButterBarVisible = true;
            lastToggleTime = now;
        }

        lastScrollTop = currentScrollTop;
    }

    function showButterBar() {
        const butterBar = document.getElementById('deet6-butter-bar');
        if (butterBar && butterBar.classList.contains('deet6-butter-bar-hidden')) {
            butterBar.classList.remove('deet6-butter-bar-hidden');
            butterBar.classList.add('deet6-butter-bar-visible');
        }
    }

    function hideButterBar() {
        const butterBar = document.getElementById('deet6-butter-bar');
        if (butterBar && butterBar.classList.contains('deet6-butter-bar-visible')) {
            butterBar.classList.remove('deet6-butter-bar-visible');
            butterBar.classList.add('deet6-butter-bar-hidden');
        }
    }

    return {
        init,
    };
}
