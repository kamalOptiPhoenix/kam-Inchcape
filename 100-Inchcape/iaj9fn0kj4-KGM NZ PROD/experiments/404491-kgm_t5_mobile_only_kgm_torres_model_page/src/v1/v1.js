/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import config from '../assets/config.js';
import { initGallerySwiper } from '../assets/initGallery.js';

(function kamKgmt5V1() {
    function initSection7Carousel() {
        const scrollEl = document.querySelector('.kgmt5-sec7-scroll');
        const prevBtn = document.querySelector('.kgmt5-sec7-arrow--prev');
        const nextBtn = document.querySelector('.kgmt5-sec7-arrow--next');

        if (!scrollEl || !prevBtn || !nextBtn) return;

        const getScrollStep = () => {
            const card = scrollEl.querySelector('.kgmt5-sec7-card');
            if (!card) return scrollEl.clientWidth;
            const gap = parseInt(window.getComputedStyle(scrollEl).columnGap || window.getComputedStyle(scrollEl).gap, 10) || 20;
            return card.offsetWidth + gap;
        };

        const updateArrowStates = () => {
            const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
            const atStart = scrollEl.scrollLeft <= 1;
            const atEnd = scrollEl.scrollLeft >= maxScroll - 1;

            prevBtn.classList.toggle('is-disabled', atStart);
            prevBtn.disabled = atStart;
            nextBtn.classList.toggle('is-disabled', atEnd);
            nextBtn.disabled = atEnd;
        };

        Kameleoon.API.Utils.addEventListener(prevBtn, 'click', () => {
            scrollEl.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });

        Kameleoon.API.Utils.addEventListener(nextBtn, 'click', () => {
            scrollEl.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });

        Kameleoon.API.Utils.addEventListener(scrollEl, 'scroll', updateArrowStates, { passive: true });
        Kameleoon.API.Utils.addEventListener(window, 'resize', updateArrowStates);
        updateArrowStates();
    }

    function init() {
        console.log('%c **** KGM T5 - [MOBILE ONLY] KGM Torres Model Page ****', 'background: blue; font-weight: bold; padding: 4px; color: white;');
        document.body.classList.add('KGMT5');
        config.restylePage();
        initSection7Carousel();
        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.Swiper !== 'undefined' && document.querySelector('.kgmt5-gallery-swiper'),
            initGallerySwiper,
        );
    }

    Kameleoon.API.Core.runWhenElementPresent('#Gallery', init);
}());
