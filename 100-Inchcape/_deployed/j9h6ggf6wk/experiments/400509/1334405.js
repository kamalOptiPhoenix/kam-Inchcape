"use strict";

(function () {
  function butterBarHtmlV1() {
    return `
        <div class="deet6-butter-bar deet6-butter-bar-visible" id="deet6-butter-bar">
            <div class="deet6-top-row">
                <a href="https://www.deepal.com.au/about-us/contact-us/" class="deet6-cta-btn" >
                    <img class="deet6-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/4c32a0adf9d14c93b4ab561358a38a5f.svg" alt="Contact Us Icon" />
                    Contact Us
                </a>
                <a href="https://www.deepal.com.au/buying-tools/book-a-test-drive/" class="deet6-cta-btn" >
                    <img class="deet6-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/435405771dbb4af087eb4ac7d8835a44.svg" alt="Test Drive Icon" />
                    <span class="desktop-text">Book a Test Drive</span>
                    <span class="mobile-text">Test Drive</span>
                </a>
                <a href="https://www.deepal.com.au/find-a-dealer/" class="deet6-cta-btn" >
                    <img class="deet6-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/282f30c897ee4affa0d3741f6cef20e2.svg" alt="Dealer Icon" />
                    Find a Dealer
                </a>
                <a href="https://www.deepal.com.au/buying-tools/get-a-quote/" class="deet6-cta-btn">
                    <img class="deet6-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/4170df0c02d249009bfda05d48ed8331.svg" alt="Quote Icon" />
                    Get a Quote
                </a>
            </div>
            <div class="deet6-bottom-row">
                <a href="https://www.deepal.com.au/special-offers/" class="deet6-cta-btn deet6-special-offers">
                    <img class="deet6-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/791903a1119d417ba9e166740a52e56f.svg" alt="Special Offers Icon" />
                    Special Offers
                </a>
            </div>
        </div>
    `;
  }

  /* eslint-disable no-use-before-define */
  function scrollHandler() {
    let lastScrollTop = 0;
    let isScrollingDown = false;
    let targetElement = null;
    let isButterBarVisible = true;
    let ticking = false;
    let lastToggleTime = 0;
    function init() {
      const butterBar = document.getElementById('deet6-butter-bar');
      if (!butterBar) {
        setTimeout(init, 100);
        return;
      }
      targetElement = document.querySelector('h1') || document.querySelector('h2');
      if (!targetElement) {
        console.warn('DEET6: No H1 or H2 element found for scroll detection');
        return;
      }
      const targetRect = targetElement.getBoundingClientRect();
      const targetBottom = targetRect.bottom;
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop === 0 || targetBottom > 0) {
        showButterBar();
        isButterBarVisible = true;
      } else {
        hideButterBar();
        isButterBarVisible = false;
      }
      Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll, {
        passive: true
      });
    }
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateButterBar();
          ticking = false;
        });
        ticking = true;
      }
    }
    function updateButterBar() {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const butterBar = document.getElementById('deet6-butter-bar');
      if (!butterBar || !targetElement) return;
      const now = Date.now();
      if (now - lastToggleTime < 50) {
        return;
      }
      const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);
      if (scrollDiff < 10 && currentScrollTop !== 0) {
        return;
      }
      isScrollingDown = currentScrollTop > lastScrollTop;
      const targetRect = targetElement.getBoundingClientRect();
      const targetBottom = targetRect.bottom;
      const isPastTarget = targetBottom < -10;
      const actuallyVisible = butterBar.classList.contains('deet6-butter-bar-visible');
      if (actuallyVisible !== isButterBarVisible) {
        isButterBarVisible = actuallyVisible;
      }
      if (isScrollingDown) {
        if (isPastTarget && isButterBarVisible) {
          hideButterBar();
          isButterBarVisible = false;
          lastToggleTime = now;
        }
      } else if (!isButterBarVisible) {
        showButterBar();
        isButterBarVisible = true;
        lastToggleTime = now;
      }
      lastScrollTop = currentScrollTop;
    }
    function showButterBar() {
      const butterBar = document.getElementById('deet6-butter-bar');
      if (butterBar && butterBar.classList.contains('deet6-butter-bar-hidden')) {
        butterBar.classList.remove('deet6-butter-bar-hidden');
        butterBar.classList.add('deet6-butter-bar-visible');
      }
    }
    function hideButterBar() {
      const butterBar = document.getElementById('deet6-butter-bar');
      if (butterBar && butterBar.classList.contains('deet6-butter-bar-visible')) {
        butterBar.classList.remove('deet6-butter-bar-visible');
        butterBar.classList.add('deet6-butter-bar-hidden');
      }
    }
    return {
      init
    };
  }
  const kamT6DeepalConfig = {
    selectors: {
      headerWrapper: '.header-wrapper'
    }
  };

  /* eslint-disable import/extensions */

  (function kamT6DeepalV1() {
    function insertButterBar() {
      if (!document.getElementById('deet6-butter-bar')) {
        const html = butterBarHtmlV1();
        const header = document.querySelector('header.header-wrapper');
        if (header) {
          header.insertAdjacentHTML('afterend', html);
          const butterBar = document.getElementById('deet6-butter-bar');
          if (butterBar) {
            const updateButterBarPosition = () => {
              const isMobile = window.innerWidth <= 768;
              const defaultStickyBannerHeight = isMobile ? 170 : 56;
              const defaultHeaderHeight = isMobile ? 50 : 82;
              let stickyBannerHeight = 0;
              const stickyBanner = document.querySelector('.T4_sticky-banner');
              if (stickyBanner && !stickyBanner.classList.contains('T4_banner-hidden')) {
                stickyBannerHeight = stickyBanner.offsetHeight > 0 ? stickyBanner.offsetHeight : defaultStickyBannerHeight;
              }
              const headerHeight = header.offsetHeight > 0 ? header.offsetHeight : defaultHeaderHeight;
              const totalHeight = headerHeight + stickyBannerHeight;
              butterBar.style.setProperty('--butter-bar-top', `${totalHeight}px`);
            };
            requestAnimationFrame(() => {
              updateButterBarPosition();
              setTimeout(updateButterBarPosition, 100);
            });
            Kameleoon.API.Utils.addEventListener(window, 'scroll', updateButterBarPosition, {
              passive: true
            });
            Kameleoon.API.Utils.addEventListener(window, 'resize', updateButterBarPosition, {
              passive: true
            });
          }
          const scrollHandlerInstance = scrollHandler();
          scrollHandlerInstance.init();
        }
      }
    }
    function init() {
      console.log('*** Deepal T6 - Butter Bar he ***');
      document.body.classList.add('deet6');
      insertButterBar();
      const observer = new MutationObserver(() => {
        insertButterBar();
      });
      const headerWrapper = document.querySelector('.header-wrapper').parentNode;
      if (headerWrapper) {
        observer.observe(headerWrapper, {
          childList: true,
          subtree: true
        });
      }
    }
    if (!window.deet6start) {
      window.deet6start = true;
      Kameleoon.API.Core.runWhenElementPresent(kamT6DeepalConfig.selectors.headerWrapper, init);
    }
  })();
})();