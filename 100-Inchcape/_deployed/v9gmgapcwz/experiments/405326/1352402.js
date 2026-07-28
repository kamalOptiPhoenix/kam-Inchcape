"use strict";

(function () {
  /* eslint-disable no-restricted-syntax */
  function isAssertStyleEle() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    let elements;
    if (screenWidth <= 991) {
      elements = document.querySelectorAll('.q-headline > div span.font-22');
    } else {
      elements = document.querySelectorAll('.q-headline > div span.font-36');
    }

    // Loop through elements and check the text content
    for (const element of elements) {
      if (element.textContent.trim() === 'ASSERT YOUR STYLE') {
        return element;
      }
    }
    return null;
  }
  function kamT61CheckScroll(showSlider, scrollHandler) {
    const specsElement = document.querySelector('#colours');
    const assertStyleElement = isAssertStyleEle();
    const viewportHeight = window.innerHeight;

    // Check if specsElement is halfway into the viewport
    if (specsElement) {
      const specsRect = specsElement.getBoundingClientRect();
      if (specsRect.top <= viewportHeight / 2) {
        showSlider();
        // console.log('show slider for specsElement');
        window.removeEventListener('scroll', scrollHandler);
        return; // Stop further execution
      }
    }

    // Check if assertStyleElement is fully or partially in the viewport
    if (assertStyleElement) {
      const assertRect = assertStyleElement.getBoundingClientRect();
      if (assertRect.top >= 0 && assertRect.bottom <= viewportHeight) {
        showSlider();
        // console.log('show slider for assertStyleElement');
        window.removeEventListener('scroll', scrollHandler);
      }
    }
  }
  function kamT61CloseSlider() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({
      target
    }) => {
      const isCloseBtn = target.closest('.t61-close-slider');
      const isOverLay = target.closest('.t61-slider-overlay') && target.closest('.t61-slider-container') === null;
      if (isCloseBtn || isOverLay) {
        const overlay = document.querySelector('.t61-slider-overlay');
        if (overlay) {
          document.body.classList.remove('t61-slide-up-animation');
          overlay.remove();
        }
      }
    });
  }
  const goals = {
    'modal pageviews T61': 424173
  };
  const kamT61Config = {
    goalIds: goals
  };
  function kamT61ProcessGoal(goalName) {
    const goalId = kamT61Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable no-useless-escape */

  function kamT61GetModelName() {
    const path = window.location.pathname;
    const match = path.match(/\/models\/([^\/]+)\.html/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return '';
  }
  function kamT61ShowSlider() {
    if (sessionStorage.getItem('t61ModalShown') === null) {
      const buildIcon = '//cdn.optimizely.com/img/15841360337/0def1f803cce4ef5a27cb3f3cf54e024.svg';
      const testIcon = '//cdn.optimizely.com/img/15841360337/5f752b617f6b41b8a9c060080d98af7e.svg';
      const brochureIcon = '//cdn.optimizely.com/img/15841360337/acea54fd05394f7daabf9cae353a97d6.png';
      const modelMapping = {
        '/models/2008-suv.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/35cbd13c87d348ca990186f549a33917.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/ee90a6954e0f4568a8d21df8063961db.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/08eb3f3769bb4f3988319321503d2a74.png',
          modelName: 'New 2008 SUV',
          hero: '//cdn.optimizely.com/img/15841360337/49f337a165b447fdb4e0c25b3c4ce40c.png',
          build: '//cdn.optimizely.com/img/15841360337/67b4512b127b48cdbf0901b83514402c.png',
          test: '//cdn.optimizely.com/img/15841360337/dc078c72e31e4c3ab2471dd15bcff724.png',
          brochure: '//cdn.optimizely.com/img/15841360337/c5a6f95570dc4590877e16f9f5831ea5.png'
        },
        '/models/2008-hybrid-suv.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/35cbd13c87d348ca990186f549a33917.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/ee90a6954e0f4568a8d21df8063961db.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/08eb3f3769bb4f3988319321503d2a74.png',
          modelName: 'New 2008 SUV',
          hero: '//cdn.optimizely.com/img/15841360337/3197a60abbb94f17bcfa78b87e2e794b.png',
          build: '//cdn.optimizely.com/img/15841360337/67b4512b127b48cdbf0901b83514402c.png',
          test: '//cdn.optimizely.com/img/15841360337/dc078c72e31e4c3ab2471dd15bcff724.png',
          brochure: '//cdn.optimizely.com/img/15841360337/c5a6f95570dc4590877e16f9f5831ea5.png'
        },
        '/models/3008-suv.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/f7967075e96246e6af6c0a3238918123.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/66f7bb148aef492fa2d05cce09484feb.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/3c58336800da4799823c0075f1528913.png',
          modelName: 'New 3008 SUV',
          hero: '//cdn.optimizely.com/img/15841360337/81494c1a9f93466ea6b4f89eaf5c367e.png',
          build: '//cdn.optimizely.com/img/15841360337/06717ab0ea524e28bd671d4a642220b5.png',
          test: '//cdn.optimizely.com/img/15841360337/e7aec25d9cf345f1a36e703006318724.png',
          brochure: '//cdn.optimizely.com/img/15841360337/e018fbb5079245249f29c7fd442b5359.png'
        },
        '/models/5008-hybrid-suv.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/3b0980761011476caa5e6fdf3dd4dd05.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/f716ae3242ac4b31a6b19c1fa97b7c9a.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/dacc744b6a7a42a9943b1c5e5683dad4.png',
          modelName: 'New 5008 SUV',
          hero: '//cdn.optimizely.com/img/15841360337/3967420766f641659340c9aca07e613c.png',
          build: '//cdn.optimizely.com/img/15841360337/dba4f85a18e04a0cbaad463449511154.png',
          test: '//cdn.optimizely.com/img/15841360337/7dc7b3f634f1412b9d727a5dc6544c04.png',
          brochure: '//cdn.optimizely.com/img/15841360337/b430280b18384bbe99e3effb69420e22.png'
        },
        '/models/308.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/5ad900326777460cb92a107aae467d41.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/b32302db06da49259656e555d213d790.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/cbddf74cf02949eb859268505093afb2.png',
          modelName: '308 Hatch',
          hero: '//cdn.optimizely.com/img/15841360337/0746529901634fa2a5275cfd18b34871.png',
          build: '//cdn.optimizely.com/img/15841360337/7f85b08403ec40148d220359b60e384c.png',
          test: '//cdn.optimizely.com/img/15841360337/c30342b07175428d8fa9673d5280932e.png',
          brochure: '//cdn.optimizely.com/img/15841360337/fe51f0c0724f41f5a139ef175e7af129.png'
        },
        '/models/308-hybrid.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/a17d4fb647ca4c74aa31fa1810ba0b9c.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/29c512cab2684aff85b9fae72ccc0c47.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/16fac8d366ef4d12852df4d96ad8b7f2.png',
          modelName: 'New 308 Hatch',
          hero: '//cdn.optimizely.com/img/15841360337/c55500a637cb4779985a0c6c9ae3772d.png',
          build: '//cdn.optimizely.com/img/15841360337/6fb4c166bace4824bfc93b3bf5e627f1.png',
          test: '//cdn.optimizely.com/img/15841360337/e2d9651f0ad14bb4879e13d39154c302.png',
          brochure: '//cdn.optimizely.com/img/15841360337/b807ef811c224e9da2045b44a0c7ce21.png'
        },
        '/models/408.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/81e2f41049634ab0b149ea583f4c9660.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/79da6239dbf141c78dbaf9bd9fef5045.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/f2eb5288f61a4f5e86775d29c84dece0.png',
          modelName: '408',
          hero: '//cdn.optimizely.com/img/15841360337/b6c97c94b6e44a759ca6c3acd6e26927.png',
          build: '//cdn.optimizely.com/img/15841360337/2eded3a23bc64b73b12d929630960d50.png',
          test: '//cdn.optimizely.com/img/15841360337/009aed3a6aa946d7ba97fb7cc2380afc.png',
          brochure: '//cdn.optimizely.com/img/15841360337/beec3cbd1feb473e9cc9a6744387ea70.png'
        },
        '/models/408-hybrid.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/dfe746e1cfd546a095d8d380f436d5e6.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/3da90a7cc76e4d8a94c6d47901a61cc4.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/eb0c51f8812d43f699044aca619e6667.png',
          modelName: 'new 408',
          hero: '//cdn.optimizely.com/img/15841360337/545bf1de5d2b4345adf1e6394f3b858d.png',
          build: '//cdn.optimizely.com/img/15841360337/5779d8ef13f543729be80ff85fe197c1.png',
          test: '//cdn.optimizely.com/img/15841360337/f949ddb2b2b94dffbdd8a244ae64f0f3.png',
          brochure: '//cdn.optimizely.com/img/15841360337/95bbb57d0c0c4752b1e0420b74c3f20d.png'
        },
        '/models/partner-van.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/80d1bbc22f8d4af9b7663be44e6a361a.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/fce9e6985c1843aea614232aac53c6bc.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/2f00744da2d047359845e5e7ce1c6fd7.png',
          modelName: 'Partner Van',
          hero: '//cdn.optimizely.com/img/15841360337/800aa99fa44641218876ef4062e9cbb3.png',
          build: '//cdn.optimizely.com/img/15841360337/9cd1e10094464e4a9be993a5abad89fe.png',
          test: '//cdn.optimizely.com/img/15841360337/b7d52f0754004699bc0998ba53dfe3d4.png',
          brochure: '//cdn.optimizely.com/img/15841360337/0dd5960b82094543b541b9a33c3dadd5.png'
        },
        '/models/new-e-partner-van.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/32ed48e9a2eb42df857a4a0c05e8363c.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/a5fe8bd7b00146e2b1cf0bc777493049.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/177462c7ba664f5093f8d0a1f4ef3bea.png',
          modelName: 'New E-Partner Van',
          hero: '//cdn.optimizely.com/img/15841360337/6abf5c6a8ff14b59bf17f1b0e7b9cfcc.png',
          build: '//cdn.optimizely.com/img/15841360337/13c11c5a5915493a92ff565f7c0b980d.png',
          test: '//cdn.optimizely.com/img/15841360337/46c2556e000b41e183feb2f4033f849c.png',
          brochure: '//cdn.optimizely.com/img/15841360337/bd7f690d8f184eaeb9d1af9f61133878.png'
        },
        '/models/diesel-expert-van.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/e5db929cdedd4e7d9c2133ef0f0fee67.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/1cf361211b0e4adfa9ca2310bb5cbb39.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/c1cfefaf5fce449a9aea377173ef2458.png',
          modelName: 'New Expert Van',
          hero: '//cdn.optimizely.com/img/15841360337/512a0fe2878b4189ad12512d10a16a75.png',
          build: '//cdn.optimizely.com/img/15841360337/83105ea6583e42c89bc2ac5c2f3dafe2.png',
          test: '//cdn.optimizely.com/img/15841360337/ce4125ec3bfc4d60ada79897cb94c26a.png',
          brochure: '//cdn.optimizely.com/img/15841360337/69cd79c9930b4091be280bf1182ce609.png'
        },
        '/models/expert-van/e-expert.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/0a3ac5fcb10348559af5fbb14419f24c.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/463aee07c60a4e2f806838d3044c2327.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/e6e7d18f22374a31b55d058e501a5858.png',
          modelName: 'New E-Expert Van',
          hero: '//cdn.optimizely.com/img/15841360337/1bdcc703b1c24f6890e93fecdaecdd80.png',
          build: '//cdn.optimizely.com/img/15841360337/4806b132c3754d71bca2cac11135a9d0.png',
          test: '//cdn.optimizely.com/img/15841360337/27c2f80082c94a91825f0c21b70a481f.png',
          brochure: '//cdn.optimizely.com/img/15841360337/7c080be3fbe343138c01a1a7266dea12.png'
        },
        '/models/boxer-van.html': {
          Mob_buildandprice: '//cdn.optimizely.com/img/15841360337/b86fc27ab8e14205b0a5666b05dbc796.png',
          Mob_booktestdrive: '//cdn.optimizely.com/img/15841360337/a99f9d5dc3084413ba72de4509849bf7.png',
          Mob_broucher: '//cdn.optimizely.com/img/15841360337/6e2f3b23b2944f0f9afa889f7c84600e.png',
          modelName: 'Boxer Van',
          hero: '//cdn.optimizely.com/img/15841360337/d44219e6498d4db384d8abf9742009ae.png',
          build: '//cdn.optimizely.com/img/15841360337/fbfa7eb3729a4716879819d8ef85afd2.png',
          test: '//cdn.optimizely.com/img/15841360337/a4b059bb1a644f62b5bac653b7532ccc.png',
          brochure: '//cdn.optimizely.com/img/15841360337/16f9d1622d2d4b1eaceb3c8dd91ada7d.png'
        }
      };
      const pathKey = window.location.pathname.toLowerCase();
      const modelConfig = modelMapping[pathKey] || null;
      const fallbackModelName = kamT61GetModelName();
      const displayModelName = modelConfig && modelConfig.modelName || (fallbackModelName ? fallbackModelName.toUpperCase() : 'MODEL');

      // Detect mobile device (matching the 768px breakpoint in SCSS)
      const isMobile = window.innerWidth <= 768;
      const heroImg = modelConfig && modelConfig.hero || '//cdn.optimizely.com/img/15841360337/49f337a165b447fdb4e0c25b3c4ce40c.png';
      const buildImg = isMobile ? '//cdn.optimizely.com/img/15841360337/5a88d04c2cbd4f1b969015431552c991.png' : '//cdn.optimizely.com/img/15841360337/8c044c3dc17f4b419ccfd807b1fd3345.png';
      const testImg = isMobile && modelConfig && modelConfig.Mob_booktestdrive ? modelConfig.Mob_booktestdrive : modelConfig && modelConfig.test || '//cdn.optimizely.com/img/15841360337/bcb04e1c01f646c493bbdd82253da9a2.svgz';
      const brochureImg = isMobile && modelConfig && modelConfig.Mob_broucher ? modelConfig.Mob_broucher : modelConfig && modelConfig.brochure || '//cdn.optimizely.com/img/15841360337/f35a2f6e85b048cf85a9cbdbc313358a.svgz';
      const brochureURL = 'https://www.peugeot.com.au/tools/download-brochure.html';
      const testDriveURL = 'https://www.peugeot.com.au/tools/test-drive.html';
      const buildNpriceURL = 'https://configurator.peugeot.com.au/';
      const contactURL = 'https://www.peugeot.com.au/tools/enquiry.html';
      const helpText = isMobile ? `HAVE A QUESTION ABOUT THE ${displayModelName}?` : `WE'RE HERE TO HELP. HAVE A QUESTION ABOUT THE ${displayModelName}?`;
      const sliderHTML = `
<div class="t61-slider-overlay">
 <div class="t61-slider-Wrapper">
  
    <div class="t61-slider-container">
      <div class="t61-model-image">
            <img src="${heroImg}" alt="${displayModelName}" />
          </div>
    <span class="t61-close-slider">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 18 18" fill="black">
      <path d="M0.863327 0.367234C0.979442 0.250826 1.11738 0.158468 1.26924 0.0954521C1.42111 0.0324359 1.58391 0 1.74833 0C1.91275 0 2.07555 0.0324359 2.22741 0.0954521C2.37927 0.158468 2.51721 0.250826 2.63333 0.367234L9.24833 6.98473L15.8633 0.367234C15.9795 0.251014 16.1175 0.158823 16.2694 0.0959253C16.4212 0.0330276 16.584 0.000654459 16.7483 0.000654459C16.9127 0.000654459 17.0754 0.0330276 17.2273 0.0959253C17.3791 0.158823 17.5171 0.251014 17.6333 0.367234C17.7495 0.483454 17.8417 0.621426 17.9046 0.773275C17.9675 0.925123 17.9999 1.08787 17.9999 1.25223C17.9999 1.41659 17.9675 1.57934 17.9046 1.73119C17.8417 1.88304 17.7495 2.02101 17.6333 2.13723L11.0158 8.75223L17.6333 15.3672C17.7495 15.4835 17.8417 15.6214 17.9046 15.7733C17.9675 15.9251 17.9999 16.0879 17.9999 16.2522C17.9999 16.4166 17.9675 16.5793 17.9046 16.7312C17.8417 16.883 17.7495 17.021 17.6333 17.1372C17.5171 17.2535 17.3791 17.3456 17.2273 17.4085C17.0754 17.4714 16.9127 17.5038 16.7483 17.5038C16.584 17.5038 16.4212 17.4714 16.2694 17.4085C16.1175 17.3456 15.9795 17.2535 15.8633 17.1372L9.24833 10.5197L2.63333 17.1372C2.51711 17.2535 2.37914 17.3456 2.22729 17.4085C2.07544 17.4714 1.91269 17.5038 1.74833 17.5038C1.58397 17.5038 1.42122 17.4714 1.26937 17.4085C1.11752 17.3456 0.979547 17.2535 0.863327 17.1372C0.747108 17.021 0.654917 16.883 0.592019 16.7312C0.529121 16.5793 0.496748 16.4166 0.496748 16.2522C0.496748 16.0879 0.529121 15.9251 0.592019 15.7733C0.654917 15.6214 0.747108 15.4835 0.863327 15.3672L7.48083 8.75223L0.863327 2.13723C0.746919 2.02112 0.654562 1.88318 0.591546 1.73132C0.52853 1.57946 0.496094 1.41665 0.496094 1.25223C0.496094 1.08782 0.52853 0.925012 0.591546 0.77315C0.654562 0.621287 0.746919 0.483348 0.863327 0.367234Z"></path>
    </svg>
    </span>
        <div class="t61-hero">
       
          <h4 class="t61-slider-heading">INTERESTED IN THE <br>${displayModelName.toUpperCase()}?</h4>
          <p class="t61-slider-description">Here are some options that can further assist you</p>
        </div>
        <div class="t61-slider-actions">
          <a href="${buildNpriceURL}" target="_self" class="t61-slider-action-block t61BuildNPrice" >
            <div class="t61-slider-action-content">
              <div class="t61-card-image">
                <img src="${buildImg}" alt="${displayModelName} build and price" />
              </div>
              <div class="t61-slider-action-bottom">
                <div class="t61-slider-action-label">
                  <span class="t61-label-icon">
                    <img src="${buildIcon}" alt="" aria-hidden="true" />
                  </span>
                  BUILD & PRICE
                </div>
              </div>
            </div>
          </a>
          <a href="${testDriveURL}" target="_self" class="t61-slider-action-block t61TestDrive">
            <div class="t61-slider-action-content">
              <div class="t61-card-image">
                <img src="${testImg}" alt="${displayModelName} book a test drive" />
              </div>
              <div class="t61-slider-action-bottom">
                <div class="t61-slider-action-label">
                  <span class="t61-label-icon">
                    <img src="${testIcon}" alt="" aria-hidden="true" />
                  </span>
                  BOOK A TEST DRIVE
                </div>
              </div>
            </div>
          </a>
          <a href="${brochureURL}" target="_self" class="t61-slider-action-block t61Brochure">
            <div class="t61-slider-action-content">
              <div class="t61-card-image">
                <img src="${brochureImg}" alt="${displayModelName} download a brochure" />
              </div>
              <div class="t61-slider-action-bottom">
                <div class="t61-slider-action-label">
                  <span class="t61-label-icon">
                    <img src="${brochureIcon}" alt="" aria-hidden="true" />
                  </span>
                  DOWNLOAD A BROCHURE
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="t61-help-cta">
          <div class="t61-help-text">${helpText}</div>
          <a href="${contactURL}" target="_self" class="t61-help-button">GET IN TOUCH</a>
        </div>
    </div>
</div>
</div>
    `;
      if (!document.querySelector('.t61-slider-overlay')) {
        document.body.insertAdjacentHTML('beforeend', sliderHTML);

        // Set dynamic top position based on image height
        const modelImageContainer = document.querySelector('.t61-model-image');
        const modelImage = modelImageContainer?.querySelector('img');
        const sliderContainer = document.querySelector('.t61-slider-container');
        if (modelImage) {
          const setImageTop = () => {
            const imgHeight = modelImage.offsetHeight || modelImage.clientHeight;
            if (imgHeight > 0) {
              // modelImageContainer.style.top = `-${imgHeight / 2}px`;
              // Set CSS variable for image height (for desktop styles)
              // Set on root element for global access
              if (window.innerWidth > 768) {
                document.documentElement.style.setProperty('--t61-img-height', `${imgHeight}px`);
              }
            }
          };

          // If image is already loaded, set position immediately
          if (modelImage.complete && modelImage.naturalHeight > 0) {
            setImageTop();
          } else {
            // Wait for image to load
            Kameleoon.API.Utils.addEventListener(modelImage, 'load', setImageTop);
            // Fallback in case load event doesn't fire
            setTimeout(setImageTop, 100);
          }

          // Also try setting it after a short delay to ensure DOM is ready
          setTimeout(setImageTop, 50);
        }
        setTimeout(() => {
          document.body.classList.add('t61-slide-up-animation');
          sessionStorage.setItem('t61ModalShown', true);
        }, 500);
        console.log('*** Modal_pageviews goal trigerred T61***');
        kamT61ProcessGoal('modal pageviews T61'); // modal pageviews T61
      }
    }
  }

  /* eslint-disable no-console */

  (function kamPcat61V1() {
    function init() {
      document.body.classList.add('t61');
      console.log('*** Peugeot T61 - Model Page Slide-Up Modal Updated ***');
      const scrollHandler = () => kamT61CheckScroll(kamT61ShowSlider, scrollHandler);
      Kameleoon.API.Utils.addEventListener(window, 'scroll', scrollHandler);
      kamT61CloseSlider();
    }
    if (!window.t61Start) {
      window.t61Start = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function', init);
    }
  })();
})();