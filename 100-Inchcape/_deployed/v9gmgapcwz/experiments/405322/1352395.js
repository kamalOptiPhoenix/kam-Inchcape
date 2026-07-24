"use strict";

(function () {
  /* eslint-disable no-unused-vars */
  /* eslint-disable func-names */
  /* eslint-disable no-useless-escape */
  const modelDetails = [{
    slug: '2008-suv',
    name: '2008 SUV',
    imageUrl: '//cdn.optimizely.com/img/15841360337/6fe3a113ac2f464daedd799805bd920b.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/088012a9e1844a9da010767ba0edf959.png'
  }, {
    slug: '2008-hybrid-suv',
    name: '2008 Hybrid',
    imageUrl: '//cdn.optimizely.com/img/15841360337/5f30303120484c8ca25fe442bfaad9f3.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/f4d605412f174a6dbb715c3ba36a33ad.png'
  }, {
    slug: '3008-suv',
    name: '3008 Hybrid',
    imageUrl: '//cdn.optimizely.com/img/15841360337/415b4f6cdb72463a84031e3fc0d22046.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/769e9890fa184bf6ac1b6342c8b885c0.png'
  }, {
    slug: '5008-hybrid-suv',
    name: '5008 Hybrid',
    imageUrl: '//cdn.optimizely.com/img/15841360337/282f05f0cdcf436fb597cd19f99f3a7f.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/52dc7b7210ba4593aaafbca79fd0a48f.png'
  }, {
    slug: '308',
    name: '308',
    imageUrl: '//cdn.optimizely.com/img/15841360337/7ea05f90c96948948ecb7f723509197c.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/ebcd2d6be6684d3fba99a9bf446beb1c.png'
  }, {
    slug: '308-hybrid',
    name: '308 Hybrid',
    imageUrl: '//cdn.optimizely.com/img/15841360337/362a0f5df82d432c942d6391e2cfeec1.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/4be737eeb96446b3a6567b2db334590a.png'
  }, {
    slug: 'e-308-peugeot-preview-program',
    name: 'E-308',
    imageUrl: '//cdn.optimizely.com/img/15841360337/8959cd284e454c2e9d92a2fd0a6c28db.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/13139d6c121b4272a06a10b17b2892e7.png'
  }, {
    slug: '408',
    name: '408',
    imageUrl: '//cdn.optimizely.com/img/15841360337/9074ea5c50784332966698190a480a03.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/b55d09988b1745d3a638aa048b286d3b.png'
  }, {
    slug: '408-hybrid',
    name: '408 Hybrid',
    imageUrl: '//cdn.optimizely.com/img/15841360337/c4c88576c3f64fd78f7e16acf5897a3a.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/a7e0c5082f17442da166b59fd2835283.png'
  }, {
    slug: 'partner-van',
    name: 'Partner Van',
    imageUrl: '//cdn.optimizely.com/img/15841360337/4c31130e89574352bb95ad95001a02f8.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/64f6ea52657b4adba5e74daf65a2bdb5.png'
  }, {
    slug: 'e-partner-van',
    name: 'E-Partner Van',
    imageUrl: '//cdn.optimizely.com/img/15841360337/c799fdf6cd1c4c67953ea4bf9261d887.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/005a6a144f9244c99c1a77c8083952ed.png'
  }, {
    slug: 'expert-van',
    name: 'Expert Van',
    imageUrl: '//cdn.optimizely.com/img/15841360337/647633ba7afd41a1b323a9918ac18e40.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/0c1eaca962f84e9c800c7e8d03c6bec6.png'
  }, {
    slug: 'diesel-expert-van',
    name: 'Expert Diesel Van',
    imageUrl: '//cdn.optimizely.com/img/15841360337/484e147c30d24f13886098e4963062fb.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/091985a1856d4e3dad28a055ae7d2534.png'
  }, {
    slug: 'expert-van/e-expert',
    name: 'E-Expert Van',
    imageUrl: '//cdn.optimizely.com/img/15841360337/e170bf13479c4bdc89e7aafa689b7145.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/00c321aacf14451aaaa030910ca6f111.png'
  }, {
    slug: 'boxer-van',
    name: 'Boxer Van',
    imageUrl: '//cdn.optimizely.com/img/15841360337/d63082d09d864410b1d9b6e386fd5e93.png',
    mobImgUrl: '//cdn.optimizely.com/img/15841360337/21ead9a170d2433ebddd56b2214df6a9.png'
  }];
  const kamPcat59Config = {
    getModelSlug: () => {
      const url = window.location.pathname;
      const match = url.match(/\/models\/([^.\/]+)\.html$/);
      return match ? match[1] : null;
    },
    getCurrentModel: () => {
      const slug = kamPcat59Config.getModelSlug();
      return modelDetails.find(model => model.slug === slug) || modelDetails[0];
    },
    toTitleCase: str => str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
    preloadImage: () => {
      const currentModel = kamPcat59Config.getCurrentModel();
      const isMobile = window.innerWidth < 768;
      const imageUrl = isMobile ? currentModel.mobImgUrl : currentModel.imageUrl;
      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        return img;
      }
      return null;
    },
    getModalHTML: () => {
      const currentModel = kamPcat59Config.getCurrentModel();
      const isMobile = window.innerWidth < 768;
      const imageUrl = isMobile ? currentModel.mobImgUrl : currentModel.imageUrl;
      return `
            <div id="exitIntentModal" class="pcat59-exit-intent-modal">
                <div class="pcat59-modal-overlay"></div>
                <div class="pcat59-modal-content">
                    <button class="pcat59-modal-close" id="modalClose">
                        <img src="//cdn.optimizely.com/img/15841360337/70f5607737ad454a90c6f4a0986502b6.svg" alt="Close" />
                    </button>
                    <div class="pcat59-modal-image">
                        <img src="${imageUrl}" alt="Peugeot ${currentModel.name}" />
                    </div>
                    <div class="pcat59-modal-text">
                        <h2>NOT SURE ABOUT THE PEUGEOT ${currentModel.name}? </br> ASK US</h2>
                        <p>Send your questions about the PEUGEOT ${currentModel.name}, and get answers!</p>
                        <a href="https://www.peugeot.com.au/tools/enquiry.html" class="pcat59-cta-button">I'VE GOT A QUESTION</a>
                    </div>
                </div>
            </div>
        `;
    },
    mobileScrollEvent: () => {
      console.log('Mobile scroll event initialized');
      if (sessionStorage.getItem('scrolledHalfDocV1') === null) {
        sessionStorage.setItem('scrolledHalfDocV1', 'false');
        console.log('Initialized scrolledHalfDocV1 to false');
      }
      let lastScrollTop = 0;
      let hasScrolledPastHalf = false;
      Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = scrollTop / (documentHeight - windowHeight) * 100;
        if (scrollPercentage > 50 && !hasScrolledPastHalf) {
          hasScrolledPastHalf = true;
          sessionStorage.setItem('scrolledHalfDocV1', 'true');
          console.log('User scrolled past 50% - modal can now be triggered. Scroll percentage:', `${scrollPercentage.toFixed(1)}%`);
        }
        if (scrollTop < lastScrollTop && hasScrolledPastHalf && sessionStorage.getItem('pcat59ModalShown') !== 'true') {
          console.log('User scrolling up - showing modal. Current scroll:', scrollTop, 'Previous scroll:', lastScrollTop);
          kamPcat59Config.showModal();
        }
        lastScrollTop = scrollTop;
      });
      console.log('Mobile scroll event listener added');
    },
    desktopExitIntent: () => {
      Kameleoon.API.Utils.addEventListener(document, 'mouseleave', e => {
        if (e.clientY <= 0) {
          kamPcat59Config.showModal();
        }
      });
    },
    createModal: () => {
      kamPcat59Config.preloadImage();
      const modalHTML = kamPcat59Config.getModalHTML();
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      const modalClose = document.getElementById('modalClose');
      const modalOverlay = document.querySelector('.pcat59-modal-overlay');
      if (modalClose) {
        Kameleoon.API.Utils.addEventListener(modalClose, 'click', kamPcat59Config.closeModal);
      }
      if (modalOverlay) {
        Kameleoon.API.Utils.addEventListener(modalOverlay, 'click', kamPcat59Config.closeModal);
      }
      document.body.style.overflow = 'hidden';
    },
    showModal: () => {
      if (sessionStorage.getItem('pcat59ModalShown')) return;
      sessionStorage.setItem('pcat59ModalShown', 'true');
      document.body.classList.add('pcat59-modal-open');
      kamPcat59Config.createModal();
      setTimeout(() => {
        const modal = document.getElementById('exitIntentModal');
        if (modal) {
          modal.classList.add('pcat59-show');
        }
      }, 10);
    },
    closeModal: () => {
      const modal = document.getElementById('exitIntentModal');
      if (modal) {
        modal.classList.remove('pcat59-show');
        setTimeout(() => {
          modal.remove();
          document.body.style.overflow = '';
          document.body.classList.remove('pcat59-modal-open');
        }, 300);
      }
    }
  };

  /* eslint-disable no-console */

  (function kamPcat59V1() {
    function init() {
      console.log('*** Peugeot T59 - Model Page Exit Intent ***');
      document.body.classList.add('PCAT59');
      kamPcat59Config.preloadImage();
      const isMobile = window.innerWidth < 768;
      console.log('Device type:', isMobile ? 'Mobile' : 'Desktop');
      if (isMobile) {
        console.log('Initializing mobile scroll event...');
        kamPcat59Config.mobileScrollEvent();
      } else {
        console.log('Initializing desktop exit intent...');
        kamPcat59Config.desktopExitIntent();
      }
    }
    if (!window.t59Start) {
      window.t59Start = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function', init);
    }
  })();
})();