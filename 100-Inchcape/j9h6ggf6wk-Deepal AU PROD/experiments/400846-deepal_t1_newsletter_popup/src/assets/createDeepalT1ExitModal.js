/* global gtag */
import kamT1DeepalConfig from './config.js';
import kamT1DeepalProcessGoal from './kamT1DeepalProcessGoal.js';

function kamT1DeepalTrackGa4() {
    try {
        if (typeof gtag === 'function') {
            gtag('event', 'deepal_exit_intent_cta_click', {
                event_category: 'Engagement',
                event_label: 'Join the Deepal Community Modal',
                value: 1,
            });
        }
    } catch (e) {
        console.warn('GA4 tracking error:', e);
    }
}

function kamT1DeepalTrackOptimizely() {
    try {
        if (window.optimizely && typeof window.optimizely.push === 'function') {
            window.optimizely.push({
                type: 'event',
                eventName: 'deepal_exit_intent_cta_click',
            });
        }
    } catch (e) {
        console.warn('Optimizely tracking error:', e);
    }
}

function createDeepalT1ExitModal() {
    document.body.insertAdjacentHTML('beforeend', kamT1DeepalConfig.modalHTML);

    const overlay = document.getElementById('deepal-exit-modal-overlay');
    const closeBtn = document.getElementById('deepal-exit-modal-close');
    const ctaBtn = document.getElementById('deepal-exit-modal-btn');

    function kamT1DeepalShowModal() {
        if (sessionStorage.getItem(kamT1DeepalConfig.sessionKey)) return;
        overlay.style.display = 'flex';
        sessionStorage.setItem(kamT1DeepalConfig.sessionKey, 'true');
        kamT1DeepalProcessGoal('Newsletter pop-up page views T1');
    }

    function kamT1DeepalCloseModal() {
        overlay.style.display = 'none';
    }

    Kameleoon.API.Utils.addEventListener(closeBtn, 'click', kamT1DeepalCloseModal);

    Kameleoon.API.Utils.addEventListener(overlay, 'click', (e) => {
        if (e.target === overlay) kamT1DeepalCloseModal();
    });

    Kameleoon.API.Utils.addEventListener(ctaBtn, 'click', () => {
        kamT1DeepalTrackGa4();
        kamT1DeepalTrackOptimizely();
        kamT1DeepalProcessGoal('exit intent cta_click T1');
        kamT1DeepalCloseModal();
        window.location.href = kamT1DeepalConfig.ctaUrl;
    });

    Kameleoon.API.Utils.addEventListener(document, 'mouseleave', (e) => {
        if (e.clientY <= 0) kamT1DeepalShowModal();
    });

    let lastScroll = 0;
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        const current = window.scrollY;
        if (current < lastScroll - kamT1DeepalConfig.scrollThreshold) {
            kamT1DeepalShowModal();
        }
        lastScroll = current;
    });
}

export default createDeepalT1ExitModal;
