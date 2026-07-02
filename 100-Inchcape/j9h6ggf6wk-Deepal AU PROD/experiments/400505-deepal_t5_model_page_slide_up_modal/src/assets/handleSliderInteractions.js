function closeSlider() {
    const overlay = document.querySelector('.t5-slider-overlay');
    if (overlay) {
        overlay.classList.add('slide-out');
        setTimeout(() => {
            document.body.classList.remove('t5-slide-up-animation');
            overlay.remove();
        }, 500);
    }
}

export default function handleSliderInteractions() {
    Kameleoon.API.Utils.addEventListener(document, 'click', (event) => {
        const { target } = event;

        const isCloseBtn = target.closest('.t5-close-slider');
        const isOverlayClick = target.closest('.t5-slider-overlay') && !target.closest('.t5-slider-container');

        if (isCloseBtn || isOverlayClick) {
            closeSlider();
            return;
        }

        const actionLink = target.closest('.t5-slider-action-block.Download_Brochure_link');
        if (actionLink) {
            const href = actionLink.getAttribute('href') || '';
            const isBrochurePdf = href.indexOf('.pdf') !== -1;
            if (isBrochurePdf) {
                closeSlider();
            } else {
                event.preventDefault();
                const financingLink = document.querySelector('a.version_wrapper__financing');
                if (financingLink) {
                    financingLink.click();
                    closeSlider();
                }
            }
        }
    });
}
