/* eslint-disable no-use-before-define */
let scrollInitialized = false;
let lastScrollTop = 0;

export default function scrollHandler() {
    function showButterBar() {
        const el = document.getElementById('butter_bar_ldvt9');
        if (el) {
            el.classList.remove('hidden_ldvt9');
            el.classList.add('visible_ldvt9');
            lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
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

        if (currentScrollTop > lastScrollTop) {
            hideButterBar();
        } else {
            showButterBar();
        }

        lastScrollTop = currentScrollTop;
    }

    function init() {
        showButterBar();

        if (!scrollInitialized) {
            Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll, { passive: true });
            scrollInitialized = true;
        }
    }

    return { init, showButterBar };
}
