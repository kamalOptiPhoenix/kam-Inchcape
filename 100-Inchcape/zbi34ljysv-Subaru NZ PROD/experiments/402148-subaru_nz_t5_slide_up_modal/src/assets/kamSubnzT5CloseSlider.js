export default function kamSubnzT5CloseSlider() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
        const isCloseBtn = target.closest('.subtnz5-close-slider');
        const isOverLay = target.closest('.subtnz5-slider-overlay')
        && target.closest('.subtnz5-slider-container') === null;
        if (isCloseBtn || isOverLay) {
            const overlay = document.querySelector('.subtnz5-slider-overlay');
            if (overlay) {
                document.body.classList.remove('subtnz5-slide-up-animation');
                overlay.remove();
            }
        }
    });
}
