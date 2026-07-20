import { CONFIG, BUTTER_BAR_HTML } from './config.js';

function isMobile() {
    return window.innerWidth <= 768;
}

export default function initButterBar() {
    if (isMobile()) {
        const scndFunction = document.getElementById('scnd_function');
        if (scndFunction) {
            const parentContainer = scndFunction.parentElement;
            parentContainer.classList.add('parent-container');
            scndFunction.insertAdjacentHTML('afterend', BUTTER_BAR_HTML);
        }
    } else {
        const stickyDivs = document.querySelectorAll('.sticky.top-0');
        if (stickyDivs.length) {
            const lastDiv = stickyDivs[stickyDivs.length - 1];
            lastDiv.insertAdjacentHTML('beforeend', BUTTER_BAR_HTML);
            const butterBar = document.getElementById(CONFIG.butterBarId);
            if (butterBar) {
                butterBar.classList.add('visible');
            }
        }
    }
}
