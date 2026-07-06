import kamT1FotonConfig from './config.js';
import {
    loadVimeoScript, updateVideoVisibility, initializeVimeoPlayers,
} from './initializeVimeoPlayers.js';

function createFotonT1Modal() {
    document.body.insertAdjacentHTML('beforeend', kamT1FotonConfig.modalHTML);

    const modal = document.getElementById('foton-modal');

    updateVideoVisibility(modal);
    Kameleoon.API.Utils.addEventListener(window, 'resize', () => {
        updateVideoVisibility(modal);
    });

    const desktopIframe = modal.querySelector('#vimeo-player-desktop');
    const mobileIframe = modal.querySelector('#vimeo-player-mobile');

    loadVimeoScript()
        .then(() => initializeVimeoPlayers(desktopIframe, mobileIframe))
        .then(() => {
            modal.classList.add('foton-modal-visible');
            sessionStorage.setItem(kamT1FotonConfig.sessionKey, 'true');
        })
        .catch(() => {
            modal.classList.add('foton-modal-visible');
            sessionStorage.setItem(kamT1FotonConfig.sessionKey, 'true');
        });

    const closeBtn = modal.querySelector('.fott1-close-btn');
    if (closeBtn) {
        Kameleoon.API.Utils.addEventListener(closeBtn, 'click', () => {
            modal.classList.remove('foton-modal-visible');
        });
    }

    const exploreTunlandBtn = modal.querySelector('.fott1-explore-btn');
    if (exploreTunlandBtn) {
        Kameleoon.API.Utils.addEventListener(exploreTunlandBtn, 'click', (e) => {
            e.preventDefault();

            modal.classList.remove('foton-modal-visible');

            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection) {
                showcaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    Kameleoon.API.Utils.addEventListener(modal, 'click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('foton-modal-visible');
        }
    });
}

export default createFotonT1Modal;
