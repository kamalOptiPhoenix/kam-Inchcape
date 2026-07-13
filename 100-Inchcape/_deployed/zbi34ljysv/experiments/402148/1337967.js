"use strict";

(function () {
  let modalTriggered = false;
  function kamSubnzT5CheckScroll(showSlider, scrollHandler) {
    if (modalTriggered) return;
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const triggerPoint = documentHeight * 0.5 - viewportHeight;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll >= triggerPoint) {
      modalTriggered = true;
      window.removeEventListener('scroll', scrollHandler);
      showSlider();
    }
  }
  function kamSubnzT5CloseSlider() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({
      target
    }) => {
      const isCloseBtn = target.closest('.subtnz5-close-slider');
      const isOverLay = target.closest('.subtnz5-slider-overlay') && target.closest('.subtnz5-slider-container') === null;
      if (isCloseBtn || isOverLay) {
        const overlay = document.querySelector('.subtnz5-slider-overlay');
        if (overlay) {
          document.body.classList.remove('subtnz5-slide-up-animation');
          overlay.remove();
        }
      }
    });
  }
  const goals = {
    'Modal Page Views T5': 422379
  };
  function kamSubnzT5ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable no-unused-vars */

  // Function to identify the model from .boxHome .title
  function getModelName() {
    const titleElement = document.querySelector('.hero__wrapper .model__title');
    if (!titleElement) {
      return null;
    }
    const titleText = titleElement.textContent.trim().toUpperCase();
    if (titleText.includes('OUTBACK')) {
      return 'OUTBACK';
    }
    if (titleText.includes('CROSSTREK')) {
      return 'CROSSTREK';
    }
    if (titleText.includes('FORESTER')) {
      return 'FORESTER';
    }
    if (titleText.includes('IMPREZA')) {
      return 'IMPREZA';
    }
    if (titleText.includes('WRX')) {
      return 'WRX';
    }
    if (titleText.includes('BRZ')) {
      return 'BRZ';
    }
    return null;
  }
  function kamSubnzT5ShowSlider() {
    if (sessionStorage.getItem('t3ModalShown') === null) {
      const buildIcon = '//cdn.optimizely.com/img/15841360337/a6d5f8954fbc42d9b94709482b5639e3.svg';
      const testIcon = '//cdn.optimizely.com/img/15841360337/de946c42babb4dac863742ad1d68581c.svg';
      const brochureIcon = '//cdn.optimizely.com/img/15841360337/982d3b5ed0a4473fa90176fe6391749d.svg';

      // Identify the model from .boxHome .title
      const modelName = getModelName();

      // Model mapping for FOTT4 models (OUTBACK and CROSSTREK)
      const modelMapping = {
        OUTBACK: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/9cdbe34f47274c83b95d3be94c22804b.svg',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/994b51dbaa454dd494f9a7c6c231fcf6.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/1057b786f17441f984e5d19209a75943.png',
          modelName: 'OUTBACK',
          hero1: '//cdn.optimizely.com/img/15841360337/ea62aea05400434195ac9170234e836d.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/94afd5247cc2437ea3fd4e71a451f474.png',
          dealer: '//cdn.optimizely.com/img/15841360337/6528d9f63ec045c9abbdfc5eed03d874.svg',
          quote: '//cdn.optimizely.com/img/15841360337/50c7e188aabd4bef9e551c5e8d03ca4a.png',
          brochure: '//cdn.optimizely.com/img/15841360337/d42333cce0fc49649e76a2e12f80d0d6.png'
        },
        CROSSTREK: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/9cdbe34f47274c83b95d3be94c22804b.svg',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/4f493c1c85064e79a39fd9308a4f1599.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/966cb81cb1c54474b25e720be2d18640.png',
          modelName: 'CROSSTREK',
          hero1: '//cdn.optimizely.com/img/15841360337/de37608f017548e4be940501e0fbceab.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/7f118380434d4126ac9246e881e8493d.png',
          dealer: '//cdn.optimizely.com/img/15841360337/6528d9f63ec045c9abbdfc5eed03d874.svg',
          quote: '//cdn.optimizely.com/img/15841360337/d03a9d2ee2204606b4a0e3c4e73b302d.png',
          brochure: '//cdn.optimizely.com/img/15841360337/57e2fd17642f49f3918e18e90af8f452.png'
        },
        FORESTER: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/9cdbe34f47274c83b95d3be94c22804b.svg',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/0b563e9b0cc64d08b4e90e77ffa43ea4.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/2d7172b389514ed98e2f4c5a189ad9fa.png',
          modelName: 'FORESTER',
          hero1: '//cdn.optimizely.com/img/15841360337/ece35845cae9452680e2f4962b0db752.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/e695ce7386e6496f85a2f8af92800de1.png',
          dealer: '//cdn.optimizely.com/img/15841360337/6528d9f63ec045c9abbdfc5eed03d874.svg',
          quote: '//cdn.optimizely.com/img/15841360337/5af81438c2bc40bcbe448d6973d649bd.png',
          brochure: '//cdn.optimizely.com/img/15841360337/8923ac5a4ad8459f825dccbc91a56ef3.png'
        },
        IMPREZA: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/9cdbe34f47274c83b95d3be94c22804b.svg',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/66d86ca3aff64d23ab8269a619d1dd4a.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/caa881050bdf4fdc85f547c512cfc926.png',
          modelName: 'IMPREZA',
          hero1: '//cdn.optimizely.com/img/15841360337/efc3bbc96f1a47e6b123cf9548850271.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/ecc21e6a94b843ea9f84f5b6322de7d6.png',
          dealer: '//cdn.optimizely.com/img/15841360337/6528d9f63ec045c9abbdfc5eed03d874.svg',
          quote: '//cdn.optimizely.com/img/15841360337/406a54225e254ca9a2c7f3c3c0b20a96.png',
          brochure: '//cdn.optimizely.com/img/15841360337/6dbe9cb67f474ad68601b9ddf5780a1f.png'
        },
        WRX: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/9cdbe34f47274c83b95d3be94c22804b.svg',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/8e1a61eb25c7421c8073f182f28dadb9.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/e745bdc0ff01457aaf60136a3a5ba8f8.png',
          modelName: 'WRX',
          hero1: '//cdn.optimizely.com/img/15841360337/cf3d7d30efd34ad68739b035085bc1ce.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/90e538ebf62a4a60a6224e7f4d44c381.png',
          dealer: '//cdn.optimizely.com/img/15841360337/6528d9f63ec045c9abbdfc5eed03d874.svg',
          quote: '//cdn.optimizely.com/img/15841360337/39ea47a6f8f948b3ae6616a507fdc0da.png',
          brochure: '//cdn.optimizely.com/img/15841360337/d4fc00f626a346c899c6eee955a567ad.png'
        },
        BRZ: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/9cdbe34f47274c83b95d3be94c22804b.svg',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/931d33f8cd29477299b24ddc98890cd9.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/3f171a44fdf74312a80ed5d95c73f0eb.png',
          modelName: 'BRZ',
          hero1: '//cdn.optimizely.com/img/15841360337/89dcf1888b864cf8bd7c1b92d4679505.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/2770efe43ed04d03b32fa0e08c1cbf82.png',
          dealer: '//cdn.optimizely.com/img/15841360337/6528d9f63ec045c9abbdfc5eed03d874.svg',
          quote: '//cdn.optimizely.com/img/15841360337/58cc3851b1e44a10a7a2a893abdce1cf.png',
          brochure: '//cdn.optimizely.com/img/15841360337/75ae63bbc37a4beb84f72355b98f1087.png'
        }
      };
      const modelConfig = modelName ? modelMapping[modelName] : null;
      const displayModelName = modelConfig && modelConfig.modelName || (modelName ? modelName.toUpperCase() : 'MODEL');
      const isMobile = window.innerWidth <= 768;
      const testDriveURL = 'https://www.subaru.co.nz/buying/book-a-test-drive';
      const contactURL = 'https://www.subaru.co.nz/about/keep-me-informed';
      const buildPriceURLs = {
        OUTBACK: 'https://www.subaru.co.nz/configure/trim-levels/NZOUT',
        CROSSTREK: 'https://www.subaru.co.nz/configure/trim-levels/NZCT',
        FORESTER: 'https://www.subaru.co.nz/configure/trim-levels/NZFOR26',
        IMPREZA: 'https://www.subaru.co.nz/configure/trim-levels/NZIMP',
        WRX: 'https://www.subaru.co.nz/configure/trim-levels/NZWRX',
        BRZ: 'https://www.subaru.co.nz/configure/trim-levels/NZBRZ'
      };
      const buildPriceURL = modelName && buildPriceURLs[modelName] || 'https://www.subaru.co.nz/configure';

      // Brochure PDF URLs
      const brochureURLs = 'https://www.subaru.co.nz/buying/download-a-brochure';
      const helpText = isMobile ? `HAVE A QUESTION ABOUT THE ${displayModelName}?` : `GET ALL THAT'S NEW, FROM SUBARU ${displayModelName}?`;

      // Hero images - OUTBACK has 2, CROSSTREK has 1
      // Use mobile images on mobile, desktop images on desktop
      const hero1Img = isMobile && modelConfig && modelConfig.Mob_hero1 || modelConfig && modelConfig.hero1 || '//cdn.optimizely.com/img/15841360337/49f337a165b447fdb4e0c25b3c4ce40c.png';
      const hero2Img = isMobile && modelConfig && modelConfig.Mob_hero2 || modelConfig && modelConfig.hero2 || null;
      const buildImg = isMobile && modelConfig && modelConfig.Mob_dealer || modelConfig && modelConfig.dealer || buildIcon;
      const testImg = isMobile && modelConfig && modelConfig.Mob_test || modelConfig && modelConfig.test || testIcon;
      const quoteImg = isMobile && modelConfig && modelConfig.Mob_quote || modelConfig && modelConfig.quote || testIcon;
      const brochureImg = isMobile && modelConfig && modelConfig.Mob_broucher || modelConfig && modelConfig.brochure || brochureIcon;

      // Build hero images HTML - OUTBACK shows 2 images side-by-side
      //  CROSSTREK shows 1 image on right
      let heroImagesHTML = '';
      if (modelName === 'OUTBACK' && hero2Img) {
        // OUTBACK: 2 images side-by-side
        heroImagesHTML = `<img src="${hero1Img}" alt="${displayModelName}" /><img src="${hero2Img}" alt="${displayModelName}" />`;
      } else {
        // CROSSTREK: 1 image (positioned on right via CSS)
        heroImagesHTML = `<img src="${hero1Img}" alt="${displayModelName}" />`;
      }
      const sliderHTML = `
    <div class="subtnz5-slider-overlay">
      <div class="subtnz5-slider-Wrapper">
  
        <div class="subtnz5-slider-container">
  
          <div class="subtnz5-model-image">
            ${heroImagesHTML}
          </div>
  
          <span class="subtnz5-close-slider">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="13.5135" x2="14.253" y2="3.26043" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="3.76777" y1="3.25" x2="14.0208" y2="13.503" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="1.55078" y1="15.9314" x2="16.2322" y2="1.25001" stroke="#1A2C4F" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="1.76777" y1="1.46484" x2="16.4492" y2="16.1462" stroke="#1A2C4F" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
  
          <div class="subtnz5-hero">
            <h4 class="subtnz5-slider-heading">
              INTERESTED IN THE <br>${displayModelName.toUpperCase()}?
            </h4>
            <p class="subtnz5-slider-description">
              Here are some options that can further assist you
            </p>
          </div>
  
          <div class="subtnz5-slider-actions">
  
            <!-- BUILD & PRICE -->
            <a href="${buildPriceURL}" target="_self" class="subtnz5-slider-action-block subtnz5-dealer">
              <div class="subtnz5-slider-action-content">
                <div class="subtnz5-card-image left">
                  <img src="${buildImg}" alt="${displayModelName} Build & Price" />
                </div>
                <div class="subtnz5-slider-action-bottom">
                  <div class="subtnz5-slider-action-label">
                    <span class="subtnz5-label-icon">
                      <img src="${buildIcon}" />
                    </span>
                    BUILD & PRICE
                  </div>
                </div>
              </div>
            </a>
  
            <a href="${brochureURLs}" target="_self" class="subtnz5-slider-action-block subtnz5-TestDrive">
              <div class="subtnz5-slider-action-content">
                <div class="subtnz5-card-image center">
                  <img src="${quoteImg}" alt="${displayModelName} brochure" />
                </div>
                <div class="subtnz5-slider-action-bottom">
                  <div class="subtnz5-slider-action-label">
                    <span class="subtnz5-label-icon">
                      <img src="${testIcon}" />
                    </span>
                    DOWNLOAD A BROCHURE
                  </div>
                </div>
              </div>
            </a>
  
            <!-- BOOK A TEST DRIVE -->
            <a href="${testDriveURL}" target="_blank" class="subtnz5-slider-action-block subtnz5-broucher">
              <div class="subtnz5-slider-action-content">
                <div class="subtnz5-card-image right">
                  <img src="${brochureImg}" alt="${displayModelName} brochure" />
                </div>
                <div class="subtnz5-slider-action-bottom">
                  <div class="subtnz5-slider-action-label">
                    <span class="subtnz5-label-icon">
                      <img src="${brochureIcon}" />
                    </span>
                    BOOK A TEST DRIVE
                  </div>
                </div>
              </div>
            </a>
  
          </div>
  
          <div class="subtnz5-help-cta">
            <div class="subtnz5-help-text">${helpText}</div>
            <a href="${contactURL}" target="_self" class="subtnz5-help-button">
              GET IN TOUCH
            </a>
          </div>
  
        </div>
      </div>
    </div>
  `;
      if (!document.querySelector('.subtnz5-slider-overlay')) {
        document.body.insertAdjacentHTML('beforeend', sliderHTML);
        const modelImageContainer = document.querySelector('.subtnz5-model-image');
        const modelImages = document.querySelectorAll('.subtnz5-model-image img');
        if (modelImages.length > 0 && modelImageContainer) {
          const setImageHeight = () => {
            // Calculate the total height of the hero image container
            // For OUTBACK: height of the container (which contains 2 images side-by-side)
            // For CROSSTREK: height of the single image
            const containerHeight = modelImageContainer.offsetHeight;
            if (containerHeight > 0) {
              // Set CSS variable for both desktop and mobile
              document.documentElement.style.setProperty('--subtnz5-img-height', `${containerHeight}px`);
            }
          };

          // Wait for all images to load
          let imagesLoaded = 0;
          const totalImages = modelImages.length;
          const checkAllLoaded = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
              // Small delay to ensure layout is complete
              setTimeout(setImageHeight, 50);
            }
          };
          modelImages.forEach(img => {
            if (img.complete) {
              checkAllLoaded();
            } else {
              img.addEventListener('load', checkAllLoaded);
            }
          });

          // Fallback timeout
          setTimeout(setImageHeight, 200);
        }
        setTimeout(() => {
          document.body.classList.add('subtnz5-slide-up-animation');
          sessionStorage.setItem('t5ModalShown', true);
        }, 500);
        console.log('*** Modal_pageviews goal triggered T5 ***');
        kamSubnzT5ProcessGoal('Modal Page Views T5');
      }
    }
  }

  /* eslint-disable no-console */

  (function kamSubnzT5V1() {
    function init() {
      document.body.classList.add('subtnz5');
      console.log('*** Subaru NZ T5 - Slide Up Modal ***');
      const scrollHandler = () => kamSubnzT5CheckScroll(kamSubnzT5ShowSlider, scrollHandler);
      Kameleoon.API.Utils.addEventListener(window, 'scroll', scrollHandler);
      kamSubnzT5CloseSlider();
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('body') !== null, init);
  })();
})();