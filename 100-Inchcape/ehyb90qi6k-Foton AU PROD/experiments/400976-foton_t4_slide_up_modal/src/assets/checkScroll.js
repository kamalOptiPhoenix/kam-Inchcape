let modalTriggered = false;

function getModelName() {
    const titleElement = document.querySelector('.boxHome .title');
    if (!titleElement) {
        return null;
    }

    const titleText = titleElement.textContent.trim().toUpperCase();

    if (titleText.includes('FOTON TUNLAND') || titleText.includes('TUNLAND')) {
        return 'TUNLAND';
    }

    if (titleText.includes('AUMARK S') || titleText.includes('AUMARK')) {
        return 'AUMARK';
    }

    return null;
}

export default function checkScroll(showSlider, scrollHandler) {
    if (modalTriggered) {
        return;
    }

    const modelName = getModelName();

    if (!modelName) {
        return;
    }

    let targetHeadlineText = '';
    if (modelName === 'AUMARK') {
        targetHeadlineText = 'Powered by Cummins';
    } else if (modelName === 'TUNLAND') {
        targetHeadlineText = 'POWER TO MOVE THINGS';
    }

    if (!targetHeadlineText) {
        return;
    }

    const targetHeadline = Array.from(document.querySelectorAll('h2')).find(
        (h2) => h2.textContent.trim() === targetHeadlineText,
    );

    if (!targetHeadline) {
        return;
    }

    const rect = targetHeadline.getBoundingClientRect();
    const isInViewport = rect.top >= 0
    && rect.top < (window.innerHeight || document.documentElement.clientHeight)
    && rect.left >= 0
    && rect.left < (window.innerWidth || document.documentElement.clientWidth);

    if (isInViewport) {
        modalTriggered = true;
        window.removeEventListener('scroll', scrollHandler);
        showSlider();
    }
}
