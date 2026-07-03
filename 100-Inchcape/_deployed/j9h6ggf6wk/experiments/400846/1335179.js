"use strict";

(function () {
  const kamT1DeepalConfig = {
    sessionKey: 'deepal_exit_modal_shown',
    ctaUrl: 'https://www.deepal.com.au/#HomeSubscriptionForm',
    scrollThreshold: 60,
    selectors: {
      body: 'body'
    },
    goalIds: {
      'Newsletter pop-up page views T1': 421770,
      'exit intent cta_click T1': 421771
    },
    modalHTML: `
        <div id="deepal-exit-modal-overlay" role="dialog" aria-modal="true">
            <div id="deepal-exit-modal">
                <div id="deepal-exit-modal-header"></div>
                <span id="deepal-exit-modal-close" aria-label="Close modal">×</span>
                <div id="deepal-exit-modal-content">
                    <h2 class="home_noticias_header_h1">JOIN THE DEEPAL COMMUNITY</h2>
                    <p>Become connected with DEEPAL Australia and receive the latest information on our exciting range, special offers, and upcoming events.</p>
                    <a href="https://www.deepal.com.au/#HomeSubscriptionForm"><button id="deepal-exit-modal-btn">JOIN NOW</button></a>
                </div>
            </div>
        </div>
    `
  };
  function kamT1DeepalProcessGoal(goalName) {
    const goalId = kamT1DeepalConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* global gtag */

  function kamT1DeepalTrackGa4() {
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'deepal_exit_intent_cta_click', {
          event_category: 'Engagement',
          event_label: 'Join the Deepal Community Modal',
          value: 1
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
          eventName: 'deepal_exit_intent_cta_click'
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
    Kameleoon.API.Utils.addEventListener(overlay, 'click', e => {
      if (e.target === overlay) kamT1DeepalCloseModal();
    });
    Kameleoon.API.Utils.addEventListener(ctaBtn, 'click', () => {
      kamT1DeepalTrackGa4();
      kamT1DeepalTrackOptimizely();
      kamT1DeepalProcessGoal('exit intent cta_click T1');
      kamT1DeepalCloseModal();
      window.location.href = kamT1DeepalConfig.ctaUrl;
    });
    Kameleoon.API.Utils.addEventListener(document, 'mouseleave', e => {
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

  /* eslint-disable import/extensions */

  (function kamT1DeepalV1() {
    if (window.__kam400846Initialized) return;
    if (sessionStorage.getItem(kamT1DeepalConfig.sessionKey)) return;
    window.__kam400846Initialized = true;
    function kamT1DeepalInit() {
      createDeepalT1ExitModal();
    }
    Kameleoon.API.Core.runWhenElementPresent(kamT1DeepalConfig.selectors.body, kamT1DeepalInit);
  })();
})();