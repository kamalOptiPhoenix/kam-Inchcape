"use strict";

(function () {
  const CONFIG = {
    butterBarId: 'butter_bar_ldvt9',
    baseUrl: 'https://ldv.co.nz'
  };
  const BUTTER_BAR_HTML = `
<div id="${CONFIG.butterBarId}" class="butter_bar_ldvt9">
    <div class="butter_bar_container_ldvt9">
        <div class="butter_bar_content_ldvt9">
            <a href="${CONFIG.baseUrl}/brochure-page/" class="butter_bar_btn_ldvt9" data-action="download-brochure">
                <img src="//cdn.optimizely.com/img/15841360337/9057144d8de944c4900d225b93f6aa8c.svg" alt="DOWNLOAD BROCHURE Icon" class="btn_icon_ldvt9" />
                <span  class="desktop-label">DOWNLOAD BROCHURE</span>
                <span class="mobile_label_ldvt9">DOWNLOAD<br>BROCHURE</span>
            </a>
            <a href="${CONFIG.baseUrl}/price-list/" class="butter_bar_btn_ldvt9" data-action="price-list">
                <img src="//cdn.optimizely.com/img/15841360337/0fe420fc029c46f49ccaa55896edac37.svg" alt="PRICE LIST Icon" class="btn_icon_ldvt9" />
                <span class="desktop-label">PRICE LIST</span>
                <span class="mobile_label_ldvt9">PRICE LIST</span>
            </a>
            <a href="${CONFIG.baseUrl}/request-a-test-drive/" class="butter_bar_btn_ldvt9" data-action="test-drive">
                <img src="//cdn.optimizely.com/img/15841360337/948ff9ee64be49b98496996fffaa98a7.svg" alt="TEST DRIVE Icon" class="btn_icon_ldvt9" />
                <span class="desktop-label">TEST DRIVE</span>
                <span class="mobile_label_ldvt9">TEST DRIVE</span>
            </a>
            <a href="${CONFIG.baseUrl}/contact-us/" class="butter_bar_btn_ldvt9" data-action="enquiry">
                <img src="//cdn.optimizely.com/img/15841360337/a98f3715084f4513b78899b689e1811d.svg" alt="enquiry Icon" class="btn_icon_ldvt9" />
                <span  class="desktop-label">ENQUIRY</span>
                <span class="mobile_label_ldvt9">ENQUIRY</span>
            </a>
            <a href="${CONFIG.baseUrl}/find-a-dealer/" class="butter_bar_btn_ldvt9" data-action="find-dealer">
                <img src="//cdn.optimizely.com/img/15841360337/eefe20d370e94679be3240743d75bc8e.svg" alt="FIND A DEALER Icon" class="btn_icon_ldvt9" />
                <span class="desktop-label">FIND A DEALER</span>
                <span class="mobile_label_ldvt9">FIND A DEALER</span>
            </a>
        </div>
    </div>
</div>
`;
  function initHomepageButterBar() {
    if (document.getElementById(CONFIG.butterBarId)) {
      return;
    }
    const stickyHeader = document.querySelector('header .sticky-header');
    if (!stickyHeader) {
      return;
    }
    stickyHeader.insertAdjacentHTML('afterend', BUTTER_BAR_HTML);
  }

  /* eslint-disable no-use-before-define */
  function scrollHandler() {
    let lastScrollTop = 0;
    let isScrollingDown = false;
    function showButterBar() {
      const el = document.getElementById('butter_bar_ldvt9');
      if (el) {
        el.classList.remove('hidden_ldvt9');
        el.classList.add('visible_ldvt9');
      }
    }
    function hideButterBar() {
      const el = document.getElementById('butter_bar_ldvt9');
      if (el) {
        el.classList.remove('visible_ldvt9');
        el.classList.add('hidden_ldvt9');
      }
    }
    function handleScroll() {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const butterBar = document.getElementById('butter_bar_ldvt9');
      if (!butterBar) return;
      isScrollingDown = currentScrollTop > lastScrollTop;
      if (isScrollingDown) {
        hideButterBar();
      } else {
        showButterBar();
      }
      lastScrollTop = currentScrollTop;
    }
    function init() {
      showButterBar();
      Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll, {
        passive: true
      });
    }
    return {
      init
    };
  }

  /* eslint-disable import/extensions */

  (function kamLdvt9V1() {
    function init() {
      document.body.classList.add('LDVT9');
      initHomepageButterBar();
      Kameleoon.API.Core.runWhenElementPresent('#butter_bar_ldvt9', () => {
        scrollHandler().init();
      });
    }
    Kameleoon.API.Core.runWhenElementPresent('body', init);
  })();
})();