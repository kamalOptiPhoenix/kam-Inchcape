import kamT5FotonConfig from './config.js';
import kamT5FotonProcessGoal from './kamT5FotonProcessGoal.js';

function trackCtaClick() {
    try {
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'foton_exit_intent_cta_click', {
                event_category: 'Engagement',
                event_label: 'Join the Foton Community Modal',
                value: 1,
            });
        }
    } catch (error) {
        console.warn('GA4 tracking error:', error);
    }

    kamT5FotonProcessGoal('Foton Exit Intent CTA click T5');
}

export default function createFotonT5ExitModal() {
    document.body.insertAdjacentHTML('beforeend', kamT5FotonConfig.modalHTML);

    const overlay = document.getElementById('deepal-exit-modal-overlay');
    const closeBtn = document.getElementById('deepal-exit-modal-close');
    const ctaBtn = document.getElementById('deepal-exit-modal-btn');

    function showModal() {
        if (sessionStorage.getItem(kamT5FotonConfig.sessionKey)) return;
        overlay.style.display = 'flex';
        sessionStorage.setItem(kamT5FotonConfig.sessionKey, 'true');
    }

    function closeModal() {
        overlay.style.display = 'none';
    }

    function handleCtaClick() {
        trackCtaClick();
        closeModal();
        window.location.href = kamT5FotonConfig.formUrl;
    }

    Kameleoon.API.Utils.addEventListener(closeBtn, 'click', closeModal);
    Kameleoon.API.Utils.addEventListener(overlay, 'click', (event) => {
        if (event.target === overlay) closeModal();
    });
    Kameleoon.API.Utils.addEventListener(ctaBtn, 'click', handleCtaClick);

    Kameleoon.API.Utils.addEventListener(document, 'mouseleave', (event) => {
        if (event.clientY <= 0) showModal();
    });

    let lastScroll = 0;
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        const current = window.scrollY;
        if (current < lastScroll - 60) {
            showModal();
        }
        lastScroll = current;
    });
}
