export default function closeSlider() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
        const isCloseBtn = target.closest('.t3-close-slider');
        const isOverLay = target.closest('.t3-slider-overlay')
        && target.closest('.t3-slider-container') === null;
        if (isCloseBtn || isOverLay) {
            const overlay = document.querySelector('.t3-slider-overlay');
            if (overlay) {
                document.body.classList.remove('t3-slide-up-animation');
                overlay.remove();
            }
        }
    });
}
