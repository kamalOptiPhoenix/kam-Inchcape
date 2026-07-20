/* eslint-disable no-use-before-define */
export default function scrollHandler() {
    let lastScrollTop = 0;
    let isScrollingDown = false;

    function showButterBar() {
        const el = document.getElementById('butter_bar_ldvt9');
        if (el) {
            el.classList.remove('hidden_ldvt9');
            el.classList.add('visible_ldvt9');
        }
    }

    function hideButterBar() {
        const el = document.getElementById('butter_bar_ldvt9');
        if (el) {
            el.classList.remove('visible_ldvt9');
            el.classList.add('hidden_ldvt9');
        }
    }

    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const butterBar = document.getElementById('butter_bar_ldvt9');
        if (!butterBar) return;

        isScrollingDown = currentScrollTop > lastScrollTop;

        if (isScrollingDown) {
            hideButterBar();
        } else {
            showButterBar();
        }

        lastScrollTop = currentScrollTop;
    }

    function init() {
        showButterBar();
        Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll, { passive: true });
    }

    return { init };
}
