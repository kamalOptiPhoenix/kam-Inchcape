export default function closeSlider() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
        const isCloseBtn = target.closest('.fott4-close-slider');
        const isOverLay = target.closest('.fott4-slider-overlay')
      && target.closest('.fott4-slider-container') === null;
        if (isCloseBtn || isOverLay) {
            const overlay = document.querySelector('.fott4-slider-overlay');
            if (overlay) {
                document.body.classList.remove('fott4-slide-up-animation');
                overlay.remove();
            }
        }
    });
}
