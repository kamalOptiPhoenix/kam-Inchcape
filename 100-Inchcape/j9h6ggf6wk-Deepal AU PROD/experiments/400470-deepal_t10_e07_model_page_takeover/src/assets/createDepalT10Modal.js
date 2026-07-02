import kamT10DeepalConfig from './config.js';
import kamT10DeepalProcessGoal from './kamT10DeepalProcessGoal.js';
import {
    preloadGif, loadVimeoScript, updateVideoVisibility, initializeVimeoPlayers,
} from './initializeVimeoPlayers.js';

function kamT10DeepalCloseModal(modal) {
    modal.style.display = 'none';
    localStorage.setItem(kamT10DeepalConfig.sessionKey, 'true');
}

function createDepalT10Modal() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = kamT10DeepalConfig.modalHTML.trim();
    const modal = wrapper.firstChild;
    document.body.appendChild(modal);

    updateVideoVisibility(modal);
    Kameleoon.API.Utils.addEventListener(window, 'resize', () => updateVideoVisibility(modal));

    const desktopIframe = modal.querySelector('#vimeo-player-desktop');
    const mobileIframe = modal.querySelector('#vimeo-player-mobile');
    const multitruckGif = modal.querySelector('#multitruck-gif');

    Promise.all([preloadGif(), loadVimeoScript()])
        .then(() => initializeVimeoPlayers(desktopIframe, mobileIframe))
        .then(() => {
            localStorage.setItem(kamT10DeepalConfig.sessionKey, 'true');
            console.log('🔒 DEET10: Modal shown, localStorage set');

            modal.style.display = 'flex';
            setTimeout(() => multitruckGif.classList.add('show'), 5000);
        })
        .catch(() => {
            localStorage.setItem(kamT10DeepalConfig.sessionKey, 'true');
            console.log('🔒 DEET10: Modal shown (fallback), localStorage set');

            modal.style.display = 'flex';
        });

    const closeButton = modal.querySelector('.deepal-modal-close');
    if (closeButton) {
        Kameleoon.API.Utils.addEventListener(closeButton, 'click', () => {
            kamT10DeepalProcessGoal('Close Modal click T10');
            kamT10DeepalCloseModal(modal);
        });
    }

    const exploreButton = modal.querySelector('.deepal-cta.secondary');
    if (exploreButton) {
        Kameleoon.API.Utils.addEventListener(exploreButton, 'click', () => {
            kamT10DeepalProcessGoal('Explore the E07 click T10');
            kamT10DeepalCloseModal(modal);
        });
    }

    const testDriveCta = modal.querySelector('.deepal-cta.primary');
    if (testDriveCta) {
        Kameleoon.API.Utils.addEventListener(testDriveCta, 'click', () => {
            kamT10DeepalProcessGoal('Book a Test Drive click T10');
        });
    }

    Kameleoon.API.Utils.addEventListener(modal, 'click', (event) => {
        if (event.target === modal) {
            kamT10DeepalCloseModal(modal);
        }
    });
}

export default createDepalT10Modal;
