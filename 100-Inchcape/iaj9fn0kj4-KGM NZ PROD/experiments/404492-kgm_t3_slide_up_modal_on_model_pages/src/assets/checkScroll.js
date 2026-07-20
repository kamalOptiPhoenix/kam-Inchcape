/* eslint-disable no-restricted-syntax */
function isAssertStyleEle() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    let elements;

    if (screenWidth <= 991) {
        elements = document.querySelectorAll('.q-headline > div span.font-22');
    } else {
        elements = document.querySelectorAll('.q-headline > div span.font-36');
    }

    // Loop through elements and check the text content
    for (const element of elements) {
        if (element.textContent.trim() === 'ASSERT YOUR STYLE') {
            return element;
        }
    }

    return null;
}
export default function checkScroll(showSlider, scrollHandler) {
    const specsElement = document.querySelector('#Feature\\ Header')
    || document.querySelector('#Specs')
    || document.querySelector('#Specs\\ Header');
    const assertStyleElement = isAssertStyleEle();
    const viewportHeight = window.innerHeight;

    // Check if specsElement is halfway into the viewport
    if (specsElement) {
        const specsRect = specsElement.getBoundingClientRect();
        if (specsRect.top <= viewportHeight / 2) {
            showSlider();
            // console.log('show slider for specsElement');
            window.removeEventListener('scroll', scrollHandler);
            return; // Stop further execution
        }
    }

    // Check if assertStyleElement is fully or partially in the viewport
    if (assertStyleElement) {
        const assertRect = assertStyleElement.getBoundingClientRect();
        if (assertRect.top >= 0 && assertRect.bottom <= viewportHeight) {
            showSlider();
            // console.log('show slider for assertStyleElement');
            window.removeEventListener('scroll', scrollHandler);
        }
    }
}
