"use strict";

(function () {
  const kamT34CarImgData = {
    'E-Partner Van': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/a67abd4c16114575b744e72b67bb7956.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/e3660476f56445ccb74705a315ea9ec7.png'
    },
    'E-Expert Van': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/37242328519344f9a459969a2b132780.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/fdbe8d776e494148a766f35a4efa9c6c.png'
    },
    '3008 Hybrid': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/380121c0605644db8d2a80dca1173b3a.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/e6e533d099c441549a957ea83777ad9f.png'
    },
    '2008 Hybrid': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/f3c534ac8d7741d99db7770fefff6dbc.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/ffad0e2f9308480a8ee5d22a74cb69cd.png'
    },
    '408 Hybrid': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/a586d34d2f93417084885c829c86701f.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/b5266817a0e74deda6ba7634aadcef14.png'
    },
    '308 Hybrid': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/25f0e7555e244e009cf89de2995f604a.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/e408086982af4fd8808ab7a92216ecc9.png'
    },
    '308 Hatch': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/2374c4a3688e4dc6b050ccfe60f73f99.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/38ef41b6f5454beba7c4eca1d7230193.png'
    },
    '308 Wagon': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/91ea35102a884f7aab598441d9cf718a.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/df3293975a8b42fc881e671eddb3a2c4.png'
    },
    '408 Fastback': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/57173d1cd5464469a27701eb92faed3a.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/c7859450d9524aaa8ca8e66fb70e149a.png '
    },
    '508 Fastback': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/a9e73c33dc5b44ff8ca7aa7f3225a037.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/86f94bdb1b4c4897b340abb96473c769.png'
    },
    '508 Sportswagon': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/16cf1aa0b3bd4ef8a14c661640ba9eaa.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/a0306bb9511a4ed1a6ee49217b8737de.png'
    },
    '2008 SUV': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/9320ef2c2f0d4163a2c77ee0cef9b365.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/3fec9638aa17410c96f4572621b282ef.png'
    },
    '3008 SUV': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/38c5ee4a88f345fda04a037543622ee8.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/83ef7229044b4797a8bf821a16bffda7.png'
    },
    '5008 SUV': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/e9f4a2e7729c46bc806d18fc79c580f3.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/a52bbaaec1fb4f3aa38246733a4cfb6c.png'
    },
    'Boxer Van': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/db5b72e496a243aebf29aadeab7a2d63.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/baa8c2f00937431d95955bb872a3ecce.png'
    },
    'Partner Van': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/710c8181bd824f60a21ef5655af9a8ae.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/030b37a91c324304b65674a5f4087a0c.png'
    },
    'Expert Van': {
      ModalImgDesktop: 'https://cdn.optimizely.com/img/15841360337/9ea12ac75e1b4f95b99e35242bc10fc4.png',
      ModalImgMobile: 'https://cdn.optimizely.com/img/15841360337/f6acb225a13f4415b9fd1a86d62aba25.png'
    }
  };
  const kamT34Config = {
    goalIds: {
      'T34 Exit Intent Modal Pageviews': 420955,
      'T34 Exit Intent Modal CTA Button Clicks': 420956
    }
  };
  function kamT34ProcessGoal(goalName) {
    const goalId = kamT34Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable no-unused-expressions */

  function kamT34MobileExitIntentEvent() {
    let lastScrollPosition = 0;
    function handleScroll() {
      const currentScrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const halfwayPoint = (documentHeight - windowHeight) / 2;
      if (currentScrollPosition > lastScrollPosition) {
        if (currentScrollPosition > halfwayPoint) {
          sessionStorage.setItem('t34DocHalfScrolled', 'true');
        }
      } else if (sessionStorage.getItem('t34DocHalfScrolled') !== null && sessionStorage.getItem('t34ModalShowed') === null && window.innerWidth < 768) {
        kamT34ProcessGoal('T34 Exit Intent Modal Pageviews');
        window.jQuery('body').addClass('t34ModalShow');
        sessionStorage.setItem('t34ModalShowed', 'true');
      }
      lastScrollPosition = currentScrollPosition;
    }
    Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll);
  }

  /* eslint-disable no-console */

  function kamT34ExitIntentEvents() {
    Kameleoon.API.Utils.addEventListener(document, 'mouseleave', () => {
      if (sessionStorage.getItem('t34ModalShowed') === null && window.innerWidth > 767) {
        kamT34ProcessGoal('T34 Exit Intent Modal Pageviews');
        window.jQuery('body').addClass('t34ModalShow');
        sessionStorage.setItem('t34ModalShowed', 'true');
      }
    });
    window.jQuery(document).on('click', '.t34ExitIntentModal .t34ModalBtn', () => {
      kamT34ProcessGoal('T34 Exit Intent Modal CTA Button Clicks');
      sessionStorage.setItem('t34RefExitIntent', true);
      console.log('*** Exit intent modal click ***');
      window.jQuery('body').removeClass('t34ModalShow');
      let summaryCta = document.querySelectorAll('.psStep[custom-index-title="Summary"] a');
      if (summaryCta.length === 0) {
        summaryCta = document.querySelectorAll('#js-step-list a[href*=summary]');
      }
      summaryCta[0].click();
    });
    kamT34MobileExitIntentEvent();
  }

  /* eslint-disable no-unused-expressions */
  function kamT34ModalSummaryEvents(comingSoonModel) {
    window.jQuery(document).on('click', '.t34ModalWrapper button.t34TestDriveCta', () => {
      window.jQuery('body').removeClass('t34ModalShow');
      sessionStorage.removeItem('t34RefExitIntent');
      const btn = comingSoonModel ? document.querySelector('div[data-target="#buildForm7"] a.js-buildfForm-cta') : document.querySelector('#js-summary-next');
      if (btn) {
        btn.click();
      }
    });
    window.jQuery(document).on('click', '.t34ModalWrapper button.t34ReturnConfiguratorCta', () => {
      window.jQuery('body').removeClass('t34ModalShow');
      sessionStorage.removeItem('t34RefExitIntent');
    });
  }
  function kamT34ModalBuildSummary({
    ModalImgDesktop,
    ModalImgMobile
  }) {
    const comingSoonModel = document.querySelectorAll('#js-summary-next').length === 0;
    const email = localStorage.getItem('userEmail');
    const Html = `
    <section class="t34ModalWrapper t34CongurationSaveModal">
        <img class="t34ModalImg t34DesktopImg" src="${ModalImgDesktop}"/>
        <img class="t34ModalImg t34MobileImg" src="${ModalImgMobile}"/>
        <h3 class="t34ModalHeading">
            Configuration saved
        </h3>
        <p>
            Your configuration has been <span>successfully</span> sent to:
            <br>
            <strong>${email}</strong>
        </p>
        <div class="t34ButtonWrapper">
            <button class="t34ModalBtn t34TestDriveCta">
                ${comingSoonModel ? 'Enquire Now' : 'Book a Test Drive'}
            </button>
            <button class="t34ModalBtn t34ReturnConfiguratorCta">
                Return to Configurator
            </button>
        </div>
    </section>`;
    if (document.querySelector('.t34CongurationSaveModal') === null && sessionStorage.getItem('t34RefExitIntent') !== null) {
      document.querySelector('body').insertAdjacentHTML('afterbegin', Html);
      kamT34ModalSummaryEvents(comingSoonModel);
      setTimeout(() => {
        window.jQuery('body').addClass('t34ModalShow');
      }, 300);
    }
  }
  function kamT34ModalBuild(modelImages = {}) {
    const {
      ModalImgDesktop,
      ModalImgMobile
    } = modelImages;
    if (!ModalImgDesktop || !ModalImgMobile) {
      return;
    }
    const Html = `
    <section class="t34ModalWrapper t34ExitIntentModal">
        <img class="t34ModalImg t34DesktopImg" src="${ModalImgDesktop}"/>
        <img class="t34ModalImg t34MobileImg" src="${ModalImgMobile}"/>
        <h3 class="t34ModalHeading">
            forgetting something?
        </h3>
        <p>
            You’re only 1 click away from completing your configuration
            <br>
            Click on the button below to save your configuration for later.
        </p>
        <button class="t34ModalBtn">
            Save my configuration
        </button>
    </section>`;
    document.querySelectorAll('.t34ExitIntentModal').forEach(section => section.remove());
    document.querySelector('body').insertAdjacentHTML('afterbegin', Html);
  }

  /* eslint-disable no-console */

  (function kamT34V1() {
    const modelData = kamT34CarImgData;
    function kamT34V1Init() {
      if (window.__kamT34BuildInitialized) {
        return;
      }
      window.__kamT34BuildInitialized = true;
      console.log('*** PCAT34 ***');
      window.jQuery('body').addClass('pcat34');
      const currentModel = document.getElementById('js-trim-img').alt;
      sessionStorage.setItem('t34CurrentModal', currentModel);
      kamT34ModalBuild(modelData[currentModel]);
      kamT34ExitIntentEvents();
    }
    function kamT34V1InitSummary() {
      if (window.__kamT34SummaryInitialized) {
        return;
      }
      window.__kamT34SummaryInitialized = true;
      console.log('*** PCAT34 Summary Init ***');
      window.jQuery('body').addClass('pcat34');
      const currentModel = sessionStorage.getItem('t34CurrentModal') || document.getElementById('js-trim-img').alt;
      kamT34ModalBuildSummary(modelData[currentModel]);
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function' && document.querySelectorAll('.psList').length > 0 && localStorage.getItem('userEmail') !== null && document.querySelectorAll('.trimDetailsTitle').length > 0 && document.querySelectorAll('body.buildandBuy.colours, body.buildandBuy.vehicle, body.buildandBuy.accessories').length > 0, kamT34V1Init);
    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function' && document.querySelectorAll('.psList').length > 0 && localStorage.getItem('userEmail') !== null && sessionStorage.getItem('t34ModalShowed') !== null && document.querySelectorAll('.trimDetailsTitle').length > 0 && document.querySelectorAll('body.build-buy-summary').length > 0, kamT34V1InitSummary);
  })();
})();