"use strict";

(function () {
  const CONFIG = {
    baseUrl: 'https://www.kgm.co.nz',
    stickySelector: '.sticky.top-0',
    butterBarId: 'kgm-butter-bar_T4'
  };

  // Static Butter Bar HTML
  const BUTTER_BAR_HTML = `
<div id="${CONFIG.butterBarId}" class="kgm-butter-bar_T4">
    <div class="butter-bar-container_T4">
        <div class="butter-bar-content_T4">
            <a href="${CONFIG.baseUrl}/brochure-page/" class="butter-bar-btn_T4" data-action="download-brochure">
                <img src="https://cdn.optimizely.com/img/15841360337/be6c293730b5458daae6bb0d04c7a755.svg" alt="DOWNLOAD BROCHURE Icon" class="btn-icon" />
                <span>DOWNLOAD BROCHURE</span>
            </a>
            <a href="${CONFIG.baseUrl}/price-list/" class="butter-bar-btn_T4" data-action="price-list">
                <img src="https://cdn.optimizely.com/img/15841360337/67ffce562d98423c81cce4db76f1803d.svg" alt="PRICE LIST Icon" class="btn-icon" />
                <span class="desktop-label">PRICE LIST</span>
                <span class="mobile-label">DOWNLOAD<br>PRICELIST</span>
            </a>
            <a href="${CONFIG.baseUrl}/book-a-test-drive/" class="butter-bar-btn_T4" data-action="test-drive">
                <img src="https://cdn.optimizely.com/img/15841360337/a2d565d512d34e6ba2b38c31cdaa7114.svg" alt="TEST DRIVE Icon" class="btn-icon" />
                <span>TEST DRIVE</span>
            </a>
            <a href="${CONFIG.baseUrl}/contact-us/" class="butter-bar-btn_T4" data-action="enquiry">
                <img src="https://cdn.optimizely.com/img/15841360337/7d9c8ed43ed949eebd95911f2d07609c.svg" alt="CONTACT US Icon" class="btn-icon" />
                <span>CONTACT US</span>
            </a>
            <a href="${CONFIG.baseUrl}/find-a-dealer/" class="butter-bar-btn_T4" data-action="find-dealer">
                <img src="https://cdn.optimizely.com/img/15841360337/f18ab6eb6801462599a7c7265e9ddc5b.svg" alt="FIND A DEALER Icon" class="btn-icon" />
                <span>FIND A DEALER</span>
            </a>
        </div>
    </div>
</div>
`;
  function isMobile() {
    return window.innerWidth <= 768;
  }
  function showButterBar(butterBar) {
    if (butterBar) {
      butterBar.classList.add('visible');
    }
  }
  function initButterBar() {
    if (document.getElementById(CONFIG.butterBarId)) return;
    if (isMobile()) {
      const scndFunction = document.getElementById('scnd_function');
      if (scndFunction) {
        const parentContainer = scndFunction.parentElement;
        parentContainer.classList.add('parent-container');
        scndFunction.insertAdjacentHTML('afterend', BUTTER_BAR_HTML);
        showButterBar(document.getElementById(CONFIG.butterBarId));
      }
    } else {
      const stickyDivs = document.querySelectorAll('.sticky.top-0');
      if (stickyDivs.length) {
        const lastDiv = stickyDivs[stickyDivs.length - 1];
        lastDiv.insertAdjacentHTML('beforeend', BUTTER_BAR_HTML);
        showButterBar(document.getElementById(CONFIG.butterBarId));
      }
    }
  }

  /* eslint-disable no-console */

  (function kamKgmt4V1() {
    function getInsertionTarget() {
      if (window.innerWidth <= 768) {
        return document.getElementById('scnd_function');
      }
      const stickyDivs = document.querySelectorAll('.sticky.top-0');
      return stickyDivs.length ? stickyDivs[stickyDivs.length - 1] : null;
    }
    function init() {
      if (document.getElementById('kgm-butter-bar_T4')) return;
      console.log('**** KGMT4 Started ****');
      document.body.classList.add('KGMT4');
      initButterBar();
    }
    Kameleoon.API.Core.runWhenConditionTrue(getInsertionTarget, init);
  })();
})();