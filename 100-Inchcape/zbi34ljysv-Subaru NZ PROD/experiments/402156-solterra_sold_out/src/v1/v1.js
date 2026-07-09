/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { goals } from '../../goals.js';

(function () {
  const modalId = 'subaruForesterModal';
  const cookieName = 'subaruModalSeen';

  function processGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  function setCookie(name, value, minutes) {
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value};path=/;expires=${expiresAt.toUTCString()}`;
  }

  function getCookie(name) {
    const parts = document.cookie.split('; ');
    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i].split('=');
      if (part[0] === name) return part[1];
    }
    return null;
  }

  function alreadySeen() {
    return sessionStorage.getItem(modalId) || getCookie(cookieName);
  }

  function showModal() {
    const overlay = document.getElementById('subaruModalOverlay');
    if (overlay) overlay.style.display = 'flex';

    processGoal('Pop up Appearences');

    sessionStorage.setItem(modalId, 'true');
    setCookie(cookieName, 'true', 30);
  }

  function hideModal() {
    const overlay = document.getElementById('subaruModalOverlay');
    if (overlay) overlay.style.display = 'none';
  }

  function trackClick(label) {
    if (label === 'explore_2026_forester_clicked') {
      processGoal('Explore Forester');
    }
    if (typeof gtag === 'function') {
      gtag('event', 'click', {
        event_category: 'Subaru Modal',
        event_label: label
      });
    }
  }

  /* global gtag */
  function bindModalEvents() {
    const overlay = document.getElementById('subaruModalOverlay');
    const closeBtn = document.getElementById('subaruCloseBtn');

    if (overlay) {
      Kameleoon.API.Utils.addEventListener(overlay, 'click', function (event) {
        if (event.target === overlay) hideModal();
      });
    }

    if (closeBtn) {
      Kameleoon.API.Utils.addEventListener(closeBtn, 'click', hideModal);
    }

    Kameleoon.API.Utils.addEventListener(document, 'click', function (event) {
      if (event.target.matches('.subaru-primary')) {
        trackClick('explore_2026_forester_clicked');
      } else if (event.target.matches('.subaru-secondary')) {
        trackClick('register_interest_clicked');
      }
    });
  }

  function injectModalHTML() {
    const html = `
      <div id="subaruModalOverlay">
        <div id="subaruModal">
          <button id="subaruCloseBtn" aria-label="Close modal">&times;</button>
            <picture>
            <source srcset="https://www.subaru.co.nz/sites/default/files/styles/scale_width_media_extra_large/public/2023-10/Solterra%20ET-HS%20Updated%20model%20%28Japanese%20specification%20model%29.jpg?itok=mk8Pawi_" media="(max-width: 480px)">
            <img src="https://www.subaru.co.nz/sites/default/files/styles/scale_width_media_extra_large/public/2023-10/Solterra%20ET-HS%20Updated%20model%20%28Japanese%20specification%20model%29.jpg?itok=mk8Pawi_" alt="Solterra Sold Out" style="width: 100%; height: auto; display: block;" />
          </picture>        
          <div id="subaruModalContent">
            <h2>SOLTERRA IS NOW SOLD OUT</h2>
            <p>Already a Solterra owner? Explore our range of available accessories.</p>
            <a href="https://www.subaru.co.nz/owners/accessories?model=900" class="subaru-btn subaru-primary">EXPLORE ACCESSORIES</a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    bindModalEvents();
    showModal();
  }

  function startWhenReady() {
    if (alreadySeen()) return;
    injectModalHTML();
  }

  Kameleoon.API.Core.runWhenConditionTrue(
    function () { return document.body; },
    startWhenReady
  );
}());
