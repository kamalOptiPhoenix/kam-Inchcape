"use strict";

(function () {
  function butterBarHtml() {
    const {
      pathname
    } = window.location;
    const isAumarkSPath = pathname === '/trucks/series/aumark-s/';
    const hideTestDriveCTA = isAumarkSPath;
    return `
        <div class="fott2-butter-bar fott2-butter-bar-visible ${isAumarkSPath ? 'fott2-aumark-s' : ''}" id="fott2-butter-bar">
            <div class="fott2-top-row">
                <a href="https://www.fotonaustralia.com.au/about-us/contact-us/" class="fott2-cta-btn fott2-contact" >
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/aea5eabac18a48a8b72f4f80147c0e78.svg" alt="Contact Us Icon" />
                    Contact Us
                </a>
                ${!hideTestDriveCTA ? `
                <a href="https://www.fotonaustralia.com.au/buying-tools/book-a-test-drive/" class="fott2-cta-btn fott2-batd" >
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/32dc6038afc641078d6029142dae0a5a.svg" alt="Test Drive Icon" />
                    <span class="desktop-text">Book a Test Drive</span>
                    <span class="mobile-text">Test Drive</span>
                </a>
                ` : ''}
                <a href="https://www.fotonaustralia.com.au/find-a-dealer/" class="fott2-cta-btn fott2-find-dealer" >
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/3672d6516af6452b84114464d8827667.svg" alt="Dealer Icon" />
                    Find a Dealer
                </a>
                <a href="https://www.fotonaustralia.com.au/buying-tools/get-a-quote/" class="fott2-cta-btn fott2-quote">
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/0abe4b02bfce486caefbffb4f9913d68.svg" alt="Quote Icon" />
                    Get a Quote
                </a>
                ${isAumarkSPath ? `
                <a href="https://www.fotonaustralia.com.au/#form" class="fott2-cta-btn fott2-newsletter fott2-newsletter-top-row">
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/05715b5d743c45708613c6cc80018550.svg" alt="Newsletter Icon" />
                    <span class="desktop-text">Subscribe</span>
                    <span class="mobile-text">Subscribe</span>
                </a>
                ` : ''}
            </div>
            <div class="fott2-bottom-row ${isAumarkSPath ? 'fott2-bottom-row-hidden-mobile' : ''}">
                <a href="https://www.fotonaustralia.com.au/#form" class="fott2-cta-btn fott2-newsletter">
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/05715b5d743c45708613c6cc80018550.svg" alt="Special Offers Icon" />
                  <span class="desktop-text">Subscribe</span>
                  <span class="mobile-text">Subscribe</span>
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
      const butterBar = document.getElementById('fott2-butter-bar');
      if (!butterBar) {
        setTimeout(init, 100);
        return;
      }
      targetElement = document.querySelector('h1') || document.querySelector('h2');
      if (!targetElement) {
        console.warn('FOTT2: No H1 or H2 element found for scroll detection');
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
      const butterBar = document.getElementById('fott2-butter-bar');
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
      const actuallyVisible = butterBar.classList.contains('fott2-butter-bar-visible');
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
      const butterBar = document.getElementById('fott2-butter-bar');
      if (butterBar && butterBar.classList.contains('fott2-butter-bar-hidden')) {
        butterBar.classList.remove('fott2-butter-bar-hidden');
        butterBar.classList.add('fott2-butter-bar-visible');
      }
    }
    function hideButterBar() {
      const butterBar = document.getElementById('fott2-butter-bar');
      if (butterBar && butterBar.classList.contains('fott2-butter-bar-visible')) {
        butterBar.classList.remove('fott2-butter-bar-visible');
        butterBar.classList.add('fott2-butter-bar-hidden');
      }
    }
    return {
      init
    };
  }
  const kamT2FotonConfig = {
    selectors: {
      headerWrapper: '.header-wrapper'
    }
  };

  /* eslint-disable import/extensions */

  (function kamT2FotonV1() {
    function insertButterBar() {
      if (!document.getElementById('fott2-butter-bar')) {
        const html = butterBarHtml();
        const header = document.querySelector('header.header-wrapper');
        if (header) {
          header.insertAdjacentHTML('afterend', html);
          const butterBar = document.getElementById('fott2-butter-bar');
          if (butterBar) {
            const updateButterBarPosition = () => {
              const currentHeader = document.querySelector('header.header-wrapper');
              if (!currentHeader) return;
              const isMobile = window.innerWidth <= 1155;
              const defaultHeaderHeight = isMobile ? 54 : 86;
              const headerRect = currentHeader.getBoundingClientRect();
              const measuredHeight = Math.max(headerRect.height, currentHeader.offsetHeight);
              const headerHeight = measuredHeight > 0 ? measuredHeight : defaultHeaderHeight;
              butterBar.style.setProperty('--butter-bar-top', `${headerHeight}px`);
            };
            updateButterBarPosition();
            requestAnimationFrame(() => {
              updateButterBarPosition();
              setTimeout(updateButterBarPosition, 100);
              setTimeout(updateButterBarPosition, 300);
              setTimeout(updateButterBarPosition, 500);
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
      console.log('*** Foton T2 - Butter Bar ***');
      document.body.classList.add('fott2');
      insertButterBar();
    }
    if (!window.fott2start) {
      window.fott2start = true;
      Kameleoon.API.Core.runWhenElementPresent(kamT2FotonConfig.selectors.headerWrapper, init);
    }
  })();
})();