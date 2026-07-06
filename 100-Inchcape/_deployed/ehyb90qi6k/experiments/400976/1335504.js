"use strict";

(function () {
  let modalTriggered = false;
  function getModelName() {
    const titleElement = document.querySelector('.boxHome .title');
    if (!titleElement) {
      return null;
    }
    const titleText = titleElement.textContent.trim().toUpperCase();
    if (titleText.includes('FOTON TUNLAND') || titleText.includes('TUNLAND')) {
      return 'TUNLAND';
    }
    if (titleText.includes('AUMARK S') || titleText.includes('AUMARK')) {
      return 'AUMARK';
    }
    return null;
  }
  function checkScroll(showSlider, scrollHandler) {
    if (modalTriggered) {
      return;
    }
    const modelName = getModelName();
    if (!modelName) {
      return;
    }
    let targetHeadlineText = '';
    if (modelName === 'AUMARK') {
      targetHeadlineText = 'Powered by Cummins';
    } else if (modelName === 'TUNLAND') {
      targetHeadlineText = 'POWER TO MOVE THINGS';
    }
    if (!targetHeadlineText) {
      return;
    }
    const targetHeadline = Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent.trim() === targetHeadlineText);
    if (!targetHeadline) {
      return;
    }
    const rect = targetHeadline.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.left >= 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth);
    if (isInViewport) {
      modalTriggered = true;
      window.removeEventListener('scroll', scrollHandler);
      showSlider();
    }
  }
  function closeSlider() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({
      target
    }) => {
      const isCloseBtn = target.closest('.fott4-close-slider');
      const isOverLay = target.closest('.fott4-slider-overlay') && target.closest('.fott4-slider-container') === null;
      if (isCloseBtn || isOverLay) {
        const overlay = document.querySelector('.fott4-slider-overlay');
        if (overlay) {
          document.body.classList.remove('fott4-slide-up-animation');
          overlay.remove();
        }
      }
    });
  }
  const kamT4FotonConfig = {
    sessionKey: 't3ModalShown',
    goalIds: {
      'Modal PageViews T4': 421833
    }
  };
  function kamT4FotonProcessGoal(goalName) {
    const goalId = kamT4FotonConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable max-len */

  function getModelName$1() {
    const titleElement = document.querySelector('.boxHome .title');
    if (!titleElement) {
      return null;
    }
    const titleText = titleElement.textContent.trim().toUpperCase();
    if (titleText.includes('FOTON TUNLAND') || titleText.includes('TUNLAND')) {
      return 'TUNLAND';
    }
    if (titleText.includes('AUMARK S') || titleText.includes('AUMARK')) {
      return 'AUMARK';
    }
    return null;
  }
  function showSlider() {
    if (sessionStorage.getItem(kamT4FotonConfig.sessionKey) === null) {
      const buildIcon = '//cdn.optimizely.com/img/15841360337/496ff8078f724c8c9e4849ec0abcda91.svg';
      const testIcon = '//cdn.optimizely.com/img/15841360337/62d6b7dc65324e46817da61027d89563.svg';
      const brochureIcon = '//cdn.optimizely.com/img/15841360337/24ec2605b1e6479d82a167a9d952ab9a.svg';
      const quoteIcon = '//cdn.optimizely.com/img/15841360337/4a6447532f934477af33ba162145213f.svg';
      const modelName = getModelName$1();
      const modelMapping = {
        TUNLAND: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/e6ccc471163c45eb9375162262f285ee.png',
          Mob_test: '//cdn.optimizely.com/img/15841360337/445923616b88478ba61c9db666ce3f4b.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/d2f58b87857c4b4da65d616be42bbf05.png',
          modelName: 'TUNLAND',
          hero1: '//cdn.optimizely.com/img/15841360337/5d5186d0814f45f19aa011e19d860562.png',
          hero2: '//cdn.optimizely.com/img/15841360337/662e1bcc8c2749228ffcf30a983c4d9e.png',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/95fcd223e8744d4299ad00aee463c5c0.png',
          Mob_hero2: '//cdn.optimizely.com/img/15841360337/64b0aa19cb024095b3834141360472b5.png',
          dealer: '//cdn.optimizely.com/img/15841360337/08d279edca714bfdaecb85fa35b771ef.png',
          test: '//cdn.optimizely.com/img/15841360337/91126e02b6184c978242410c8b4f79b9.png',
          brochure: '//cdn.optimizely.com/img/15841360337/7e689ebffd6e4b7f9731800eb99b70bf.png'
        },
        AUMARK: {
          Mob_dealer: '//cdn.optimizely.com/img/15841360337/ce17672d8c67407ca640e4a03d6eae3f.png',
          Mob_quote: '//cdn.optimizely.com/img/15841360337/321fb0ad09e040dfba685a4cdbf739eb.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/1b6b7ace42be4a1e8a1a6c4ba1336d48.png',
          modelName: 'AUMARK S',
          hero1: '//cdn.optimizely.com/img/15841360337/3a64d4ba7e834d4294d0f44f36a98a7f.png',
          hero2: '',
          Mob_hero1: '//cdn.optimizely.com/img/15841360337/4848dcee74ba4f6ebd44493956a2c9a3.png',
          dealer: '//cdn.optimizely.com/img/15841360337/aeb6d0b583de41b0b058f843bbb8aea2.png',
          quote: '//cdn.optimizely.com/img/15841360337/6ad4af97bf45437689e833dbc9845966.png',
          brochure: '//cdn.optimizely.com/img/15841360337/bee753a6c764417ea8e82d4fb906e160.png'
        }
      };
      const modelConfig = modelName ? modelMapping[modelName] : null;
      const displayModelName = modelConfig && modelConfig.modelName || (modelName ? modelName.toUpperCase() : 'MODEL');
      const isMobile = window.innerWidth <= 768;
      const testDriveURL = 'https://www.fotonaustralia.com.au/buying-tools/book-a-test-drive/';
      const buildNpriceURL = 'https://www.fotonaustralia.com.au/find-a-dealer';
      const contactURL = 'https://www.fotonaustralia.com.au/about-us/contact-us/';
      const getQuoteURL = 'https://www.fotonaustralia.com.au/buying-tools/get-a-quote/';
      const brochureURLs = {
        TUNLAND: 'https://www.fotonaustralia.com.au/media/mblmdnca/pca7713_tunland_full_spec_sheet_v6.pdf',
        AUMARK: 'https://www.fotonaustralia.com.au/media/widhk4es/foton_aumark_s_5d15_cabchas_spec_sheet_fin-r.pdf'
      };
      const brochureURL = modelName ? brochureURLs[modelName] : 'https://www.fotonaustralia.com.au/brochure-page/';
      const helpText = isMobile ? `HAVE A QUESTION ABOUT THE FOTON ${displayModelName}?` : `WE'RE HERE TO HELP. HAVE A QUESTION ABOUT THE FOTON ${displayModelName}?`;
      const hero1Img = isMobile && modelConfig && modelConfig.Mob_hero1 || modelConfig && modelConfig.hero1 || '//cdn.optimizely.com/img/15841360337/49f337a165b447fdb4e0c25b3c4ce40c.png';
      const hero2Img = isMobile && modelConfig && modelConfig.Mob_hero2 || modelConfig && modelConfig.hero2 || null;
      const buildImg = isMobile && modelConfig && modelConfig.Mob_dealer || modelConfig && modelConfig.dealer || buildIcon;
      const testImg = isMobile && modelConfig && modelConfig.Mob_test || modelConfig && modelConfig.test || testIcon;
      const quoteImg = isMobile && modelConfig && modelConfig.Mob_quote || modelConfig && modelConfig.quote || testIcon;
      const brochureImg = isMobile && modelConfig && modelConfig.Mob_broucher || modelConfig && modelConfig.brochure || brochureIcon;
      let heroImagesHTML = '';
      if (modelName === 'TUNLAND' && hero2Img) {
        heroImagesHTML = `<img src="${hero1Img}" alt="${displayModelName}" /><img src="${hero2Img}" alt="${displayModelName}" />`;
      } else {
        heroImagesHTML = `<img src="${hero1Img}" alt="${displayModelName}" />`;
      }
      const sliderHTML = `
<div class="fott4-slider-overlay">
<div class="fott4-slider-Wrapper">

<div class="fott4-slider-container">
  <div class="fott4-model-image">
        ${heroImagesHTML}
  </div>
<span class="fott4-close-slider">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 18 18" fill="black">
    <path d="M0.863327 0.367234C0.979442 0.250826 1.11738 0.158468 1.26924 0.0954521C1.42111 0.0324359 1.58391 0 1.74833 0C1.91275 0 2.07555 0.0324359 2.22741 0.0954521C2.37927 0.158468 2.51721 0.250826 2.63333 0.367234L9.24833 6.98473L15.8633 0.367234C15.9795 0.251014 16.1175 0.158823 16.2694 0.0959253C16.4212 0.0330276 16.584 0.000654459 16.7483 0.000654459C16.9127 0.000654459 17.0754 0.0330276 17.2273 0.0959253C17.3791 0.158823 17.5171 0.251014 17.6333 0.367234C17.7495 0.483454 17.8417 0.621426 17.9046 0.773275C17.9675 0.925123 17.9999 1.08787 17.9999 1.25223C17.9999 1.41659 17.9675 1.57934 17.9046 1.73119C17.8417 1.88304 17.7495 2.02101 17.6333 2.13723L11.0158 8.75223L17.6333 15.3672C17.7495 15.4835 17.8417 15.6214 17.9046 15.7733C17.9675 15.9251 17.9999 16.0879 17.9999 16.2522C17.9999 16.4166 17.9675 16.5793 17.9046 16.7312C17.8417 16.883 17.7495 17.021 17.6333 17.1372C17.5171 17.2535 17.3791 17.3456 17.2273 17.4085C17.0754 17.4714 16.9127 17.5038 16.7483 17.5038C16.584 17.5038 16.4212 17.4714 16.2694 17.4085C16.1175 17.3456 15.9795 17.2535 15.8633 17.1372L9.24833 10.5197L2.63333 17.1372C2.51711 17.2535 2.37914 17.3456 2.22729 17.4085C2.07544 17.4714 1.91269 17.5038 1.74833 17.5038C1.58397 17.5038 1.42122 17.4714 1.26937 17.4085C1.11752 17.3456 0.979547 17.2535 0.863327 17.1372C0.747108 17.021 0.654917 16.883 0.592019 16.7312C0.529121 16.5793 0.496748 16.4166 0.496748 16.2522C0.496748 16.0879 0.529121 15.9251 0.592019 15.7733C0.654917 15.6214 0.747108 15.4835 0.863327 15.3672L7.48083 8.75223L0.863327 2.13723C0.746919 2.02112 0.654562 1.88318 0.591546 1.73132C0.52853 1.57946 0.496094 1.41665 0.496094 1.25223C0.496094 1.08782 0.52853 0.925012 0.591546 0.77315C0.654562 0.621287 0.746919 0.483348 0.863327 0.367234Z"></path>
  </svg>
</span>

<div class="fott4-hero">
    <h4 class="fott4-slider-heading">INTERESTED IN THE FOTON <br>${displayModelName.toUpperCase()}?</h4>
    <p class="fott4-slider-description">Here are some options that can further assist you</p>
</div>

<div class="fott4-slider-actions">
    
    <a href="${buildNpriceURL}" target="_self" class="fott4-slider-action-block fott4-dealer">
      <div class="fott4-slider-action-content">
        <div class="fott4-card-image left">
          <img src="${buildImg}" alt="${displayModelName} Find a Dealer" />
        </div>
        <div class="fott4-slider-action-bottom">
          <div class="fott4-slider-action-label">
            <span class="fott4-label-icon"><img src="${buildIcon}" /></span>
            FIND A DEALER
          </div>
        </div>
      </div>
    </a>

    ${modelName === 'AUMARK' ? `<a href="${getQuoteURL}" target="_self" class="fott4-slider-action-block fott4-GetQuote">
      <div class="fott4-slider-action-content">
        <div class="fott4-card-image center">
          <img src="${quoteImg}" alt="${displayModelName} get a quote" />
        </div>
        <div class="fott4-slider-action-bottom">
          <div class="fott4-slider-action-label">
            <span class="fott4-label-icon"><img src="${quoteIcon}" /></span>
            GET A QUOTE
          </div>
        </div>
      </div>
    </a>` : `<a href="${testDriveURL}" target="_self" class="fott4-slider-action-block fott4-TestDrive">
      <div class="fott4-slider-action-content">
        <div class="fott4-card-image center">
          <img src="${testImg}" alt="${displayModelName} test drive" />
        </div>
        <div class="fott4-slider-action-bottom">
          <div class="fott4-slider-action-label">
            <span class="fott4-label-icon"><img src="${testIcon}" /></span>
            REQUEST A TEST DRIVE
          </div>
        </div>
      </div>
    </a>`}

    <a href="${brochureURL}" target="_blank" class="fott4-slider-action-block fott4-broucher">
      <div class="fott4-slider-action-content">
        <div class="fott4-card-image right">
          <img src="${brochureImg}" alt="${displayModelName} brochure" />
        </div>
        <div class="fott4-slider-action-bottom">
          <div class="fott4-slider-action-label">
            <span class="fott4-label-icon"><img src="${brochureIcon}" /></span>
            DOWNLOAD A BROCHURE
          </div>
        </div>
      </div>
    </a>

</div>

<div class="fott4-help-cta">
    <div class="fott4-help-text">${helpText}</div>
    <a href="${contactURL}" target="_self" class="fott4-help-button">GET IN TOUCH</a>
</div>

</div>
</div>
</div>
`;
      if (!document.querySelector('.fott4-slider-overlay')) {
        document.body.insertAdjacentHTML('beforeend', sliderHTML);
        const modelImageContainer = document.querySelector('.fott4-model-image');
        const modelImages = document.querySelectorAll('.fott4-model-image img');
        if (modelImages.length > 0 && modelImageContainer) {
          const setImageHeight = () => {
            const containerHeight = modelImageContainer.offsetHeight;
            if (containerHeight > 0) {
              document.documentElement.style.setProperty('--fott4-img-height', `${containerHeight}px`);
            }
          };
          let imagesLoaded = 0;
          const totalImages = modelImages.length;
          const checkAllLoaded = () => {
            imagesLoaded += 1;
            if (imagesLoaded === totalImages) {
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
          setTimeout(setImageHeight, 200);
        }
        setTimeout(() => {
          document.body.classList.add('fott4-slide-up-animation');
          sessionStorage.setItem(kamT4FotonConfig.sessionKey, true);
        }, 500);
        console.log('*** Modal_pageviews goal triggered T4 ***');
        kamT4FotonProcessGoal('Modal PageViews T4');
      }
    }
  }

  /* eslint-disable import/extensions */

  (function kamT4FotonV1() {
    function init() {
      document.body.classList.add('fott4');
      console.log('*** Foton T4 - Slide Up Modal ***');
      const scrollHandler = () => checkScroll(showSlider, scrollHandler);
      window.addEventListener('scroll', scrollHandler);
      closeSlider();
    }
    Kameleoon.API.Core.runWhenElementPresent('body', init);
  })();
})();