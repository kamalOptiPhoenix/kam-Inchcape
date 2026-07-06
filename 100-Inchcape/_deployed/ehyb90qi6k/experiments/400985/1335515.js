"use strict";

(function () {
  const kamT5FotonConfig = {
    sessionKey: 'deepal_exit_modal_shown',
    formUrl: 'https://www.fotonaustralia.com.au/#form',
    goalIds: {
      'Foton Exit Intent CTA click T5': 0
    },
    modalHTML: `
        <div id="deepal-exit-modal-overlay" role="dialog" aria-modal="true">
            <div id="deepal-exit-modal">
                <div id="deepal-exit-modal-header"></div>
                <span id="deepal-exit-modal-close" aria-label="Close modal">×</span>
                <div id="deepal-exit-modal-content">
                    <h2 class="home_noticias_header_h1">JOIN THE FOTON COMMUNITY</h2>
                    <p>Become connected with FOTON Australia and receive the latest information on our commercial vehicle range, special offers, and upcoming events.</p>
                    <a href="https://www.fotonaustralia.com.au/#form"><button id="deepal-exit-modal-btn">JOIN NOW</button></a>
                </div>
            </div>
        </div>
    `
  };
  function kamT5FotonProcessGoal(goalName) {
    const goalId = kamT5FotonConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }
  function trackCtaClick() {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'foton_exit_intent_cta_click', {
          event_category: 'Engagement',
          event_label: 'Join the Foton Community Modal',
          value: 1
        });
      }
    } catch (error) {
      console.warn('GA4 tracking error:', error);
    }
    kamT5FotonProcessGoal('Foton Exit Intent CTA click T5');
  }
  function createFotonT5ExitModal() {
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
    Kameleoon.API.Utils.addEventListener(overlay, 'click', event => {
      if (event.target === overlay) closeModal();
    });
    Kameleoon.API.Utils.addEventListener(ctaBtn, 'click', handleCtaClick);
    Kameleoon.API.Utils.addEventListener(document, 'mouseleave', event => {
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

  /* eslint-disable import/extensions */

  (function kamT5FotonV1() {
    if (sessionStorage.getItem(kamT5FotonConfig.sessionKey)) {
      return;
    }
    function init() {
      createFotonT5ExitModal();
    }
    if (!window.fott5ExitIntentStart) {
      window.fott5ExitIntentStart = true;
      Kameleoon.API.Core.runWhenElementPresent('body', init);
    }
  })();
})();