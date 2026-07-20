/* eslint-disable no-unused-vars, no-tabs, no-console, no-useless-escape, camelcase */
import kamKgmt3ProcessGoal from './kamKgmt3ProcessGoal.js';

// Supports: /models/torres , /models/torres/ , /models/torres.html
function getModelName() {
    const path = window.location.pathname;
    const match = path.match(/\/models\/([^\/]+)(?:\.html)?\/?$/);
    if (match && match[1]) {
        return match[1].trim();
    }
    return '';
}

export default function showSlider() {
    if (sessionStorage.getItem('t3ModalShown') === null) {
        const buildIcon = '//cdn.optimizely.com/img/15841360337/bd17270246284e1cb60ebd3a27c20244.png';
        const testIcon = '//cdn.optimizely.com/img/15841360337/7a6a4cdee0ac4f8f81c303ab32277fc6.png';
        const brochureIcon = '//cdn.optimizely.com/img/15841360337/88503dd93e1443cab9f5ce375743e661.png';

        // Normalize path for matching
        const pathKey = window.location.pathname
            .toLowerCase()
            .replace(/\/$/, '')
            .replace(/\.html$/, '');

        const modelMapping = {
            '/models/torres': {
                Mob_buildandprice: 'https://cdn.optimizely.com/img/15841360337/506bd163bc70477da4c27bc6d7df0de8.svg',
                Mob_booktestdrive: 'http://cdn.optimizely.com/img/15841360337/878d6a04ff6040b7b34430289662cae7.png',
                Mob_broucher: 'https://cdn.optimizely.com/img/15841360337/ca477feb6111493ab8ed17b55b54a7ce.png',

                modelName: 'Torres',
                hero: 'https://cdn.optimizely.com/img/15841360337/f47d0e602c4a4aa9ba234062e642a01e.png',
                build: 'https://cdn.optimizely.com/img/15841360337/14923992218b4f75b28487ff2dfdebee.png',
                test: 'https://cdn.optimizely.com/img/15841360337/406ebd89a5ab4220a81e27349a910433.png',
                brochure: 'https://cdn.optimizely.com/img/15841360337/f360553d0ed342ed8e3172bbed9ba769.png',
                contact: 'https://cdn.optimizely.com/img/15841360337/c8f9d1e2a3b4567890abcdef12345678.png'
            },

            '/models/torres-hybrid': {
                Mob_buildandprice: 'https://cdn.optimizely.com/img/15841360337/506bd163bc70477da4c27bc6d7df0de8.svg',
                Mob_booktestdrive: 'http://cdn.optimizely.com/img/15841360337/878d6a04ff6040b7b34430289662cae7.png',
                Mob_broucher: 'https://cdn.optimizely.com/img/15841360337/ca477feb6111493ab8ed17b55b54a7ce.png',

                modelName: 'Torres Hybrid',
                hero: 'https://cdn.optimizely.com/img/15841360337/f47d0e602c4a4aa9ba234062e642a01e.png',
                build: 'https://cdn.optimizely.com/img/15841360337/14923992218b4f75b28487ff2dfdebee.png',
                test: 'https://cdn.optimizely.com/img/15841360337/406ebd89a5ab4220a81e27349a910433.png',
                brochure: 'https://cdn.optimizely.com/img/15841360337/f360553d0ed342ed8e3172bbed9ba769.png',
                contact: 'https://cdn.optimizely.com/img/15841360337/c8f9d1e2a3b4567890abcdef12345678.png'
            },

            '/models/musso': {
                Mob_buildandprice: 'https://cdn.optimizely.com/img/15841360337/b8f416dc531d4d07a2e4a73fd6a06b43.png',
                Mob_booktestdrive: 'https://cdn.optimizely.com/img/15841360337/23676387855d47d78a308d7af25a352c.png',
                Mob_broucher: 'http://cdn.optimizely.com/img/15841360337/5e9d383c7c084d2aa1ce26aee664b49d.png',

                modelName: 'Musso',
                hero: 'https://cdn.optimizely.com/img/15841360337/be34dfe9d7c243bdbdefd87f564d6db1.png',
                build: 'https://cdn.optimizely.com/img/15841360337/c0f95d5d096d48048eb247794dd75a28.png',
                test: 'https://cdn.optimizely.com/img/15841360337/638c2f51f2ac46bc9ed7617f718c77cf.png',
                brochure: 'https://cdn.optimizely.com/img/15841360337/1d95523854354590b896ae15a1e88b65.png',
                contact: 'https://cdn.optimizely.com/img/15841360337/c8f9d1e2a3b4567890abcdef12345678.png'
            },

            '/models/rexton': {
                Mob_buildandprice: 'https://cdn.optimizely.com/img/15841360337/582f9559b20a4cb88f65546e76206362.png',
                Mob_booktestdrive: 'http://cdn.optimizely.com/img/15841360337/a4f31beda97d497fa83530facfae3863.png',
                Mob_broucher: 'https://cdn.optimizely.com/img/15841360337/ce081cd82bb64a6eba1e99515465fe6c.png',

                modelName: 'Rexton',
                hero: 'https://cdn.optimizely.com/img/15841360337/7e6e3a620e324556b0e7fe3ce50ca127.png',
                build: 'https://cdn.optimizely.com/img/15841360337/9beeb1bdf3664f0d9217aeaa8ca4b827.png',
                test: 'https://cdn.optimizely.com/img/15841360337/58cb166a5d144a2d9a26cc7640da2b11.png',
                brochure: 'https://cdn.optimizely.com/img/15841360337/f10950a99cdb425c93bbdbb5b02989f7.png',
                contact: 'https://cdn.optimizely.com/img/15841360337/c8f9d1e2a3b4567890abcdef12345678.png'
            }
        };

        const modelConfig = modelMapping[pathKey] || null;

        const fallbackModelName = getModelName();
        const displayModelName = (modelConfig && modelConfig.modelName)
          || (fallbackModelName ? fallbackModelName.toUpperCase() : 'MODEL');

        const isMobile = window.innerWidth <= 768;

        // 🔥 Detect Rexton
        const isRexton = displayModelName.toLowerCase() === 'rexton';

        const brochureURL = 'https://www.kgm.co.nz/brochure-page/';
        const testDriveURL = 'https://www.kgm.co.nz/book-a-test-drive/';
        const buildNpriceURL = 'https://www.kgm.co.nz/find-a-dealer/';
        const contactURL = 'https://www.kgm.co.nz/contact-us/';

        const helpText = isMobile
            ? `HAVE A QUESTION ABOUT THE KGM ${displayModelName}?`
            : `WE'RE HERE TO HELP. HAVE A QUESTION ABOUT THE KGM ${displayModelName}?`;

        const heroImg = (modelConfig && modelConfig.hero)
          || '//cdn.optimizely.com/img/15841360337/49f337a165b447fdb4e0c25b3c4ce40c.png';

        const buildImg = (isMobile && modelConfig && modelConfig.Mob_buildandprice)
          || (modelConfig && modelConfig.build)
          || buildIcon;

        const testImg = (isMobile && modelConfig && modelConfig.Mob_booktestdrive)
          || (modelConfig && modelConfig.test)
          || testIcon;

        const brochureImg = (isMobile && modelConfig && modelConfig.Mob_broucher)
          || (modelConfig && modelConfig.brochure)
          || brochureIcon;

        // 🔥 Rexton-only inline style
        const rextonStyle = isRexton ? 'style="top:-30px;"' : '';

        const sliderHTML = `
<div class="t3-slider-overlay">
<div class="t3-slider-Wrapper">

<div class="t3-slider-container">
  <div class="t3-model-image" ${rextonStyle}>
        <img src="${heroImg}" alt="${displayModelName}" />
  </div>
<span class="t3-close-slider">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 18 18" fill="black">
    <path d="M0.863327 0.367234C0.979442 0.250826 1.11738 0.158468 1.26924 0.0954521C1.42111 0.0324359 1.58391 0 1.74833 0C1.91275 0 2.07555 0.0324359 2.22741 0.0954521C2.37927 0.158468 2.51721 0.250826 2.63333 0.367234L9.24833 6.98473L15.8633 0.367234C15.9795 0.251014 16.1175 0.158823 16.2694 0.0959253C16.4212 0.0330276 16.584 0.000654459 16.7483 0.000654459C16.9127 0.000654459 17.0754 0.0330276 17.2273 0.0959253C17.3791 0.158823 17.5171 0.251014 17.6333 0.367234C17.7495 0.483454 17.8417 0.621426 17.9046 0.773275C17.9675 0.925123 17.9999 1.08787 17.9999 1.25223C17.9999 1.41659 17.9675 1.57934 17.9046 1.73119C17.8417 1.88304 17.7495 2.02101 17.6333 2.13723L11.0158 8.75223L17.6333 15.3672C17.7495 15.4835 17.8417 15.6214 17.9046 15.7733C17.9675 15.9251 17.9999 16.0879 17.9999 16.2522C17.9999 16.4166 17.9675 16.5793 17.9046 16.7312C17.8417 16.883 17.7495 17.021 17.6333 17.1372C17.5171 17.2535 17.3791 17.3456 17.2273 17.4085C17.0754 17.4714 16.9127 17.5038 16.7483 17.5038C16.584 17.5038 16.4212 17.4714 16.2694 17.4085C16.1175 17.3456 15.9795 17.2535 15.8633 17.1372L9.24833 10.5197L2.63333 17.1372C2.51711 17.2535 2.37914 17.3456 2.22729 17.4085C2.07544 17.4714 1.91269 17.5038 1.74833 17.5038C1.58397 17.5038 1.42122 17.4714 1.26937 17.4085C1.11752 17.3456 0.979547 17.2535 0.863327 17.1372C0.747108 17.021 0.654917 16.883 0.592019 16.7312C0.529121 16.5793 0.496748 16.4166 0.496748 16.2522C0.496748 16.0879 0.529121 15.9251 0.592019 15.7733C0.654917 15.6214 0.747108 15.4835 0.863327 15.3672L7.48083 8.75223L0.863327 2.13723C0.746919 2.02112 0.654562 1.88318 0.591546 1.73132C0.52853 1.57946 0.496094 1.41665 0.496094 1.25223C0.496094 1.08782 0.52853 0.925012 0.591546 0.77315C0.654562 0.621287 0.746919 0.483348 0.863327 0.367234Z"></path>
  </svg>
</span>

<div class="t3-hero">
    <h4 class="t3-slider-heading">INTERESTED IN THE <br>${displayModelName.toUpperCase()}?</h4>
    <p class="t3-slider-description">Here are some options that can further assist you</p>
</div>

<div class="t3-slider-actions">
    
    <a href="${buildNpriceURL}" target="_self" class="t3-slider-action-block t3BuildNPrice">
      <div class="t3-slider-action-content">
        <div class="t3-card-image left">
          <img src="${buildImg}" alt="${displayModelName} Find a Dealer" />
        </div>
        <div class="t3-slider-action-bottom">
          <div class="t3-slider-action-label">
            <span class="t3-label-icon"><img src="${buildIcon}" /></span>
            FIND A DEALER
          </div>
        </div>
      </div>
    </a>

    <a href="${testDriveURL}" target="_self" class="t3-slider-action-block t3TestDrive">
      <div class="t3-slider-action-content">
        <div class="t3-card-image center">
          <img src="${testImg}" alt="${displayModelName} test drive" />
        </div>
        <div class="t3-slider-action-bottom">
          <div class="t3-slider-action-label">
            <span class="t3-label-icon"><img src="${testIcon}" /></span>
            BOOK A TEST DRIVE
          </div>
        </div>
      </div>
    </a>

    <a href="${brochureURL}" target="_self" class="t3-slider-action-block t3Brochure">
      <div class="t3-slider-action-content">
        <div class="t3-card-image right">
          <img src="${brochureImg}" alt="${displayModelName} brochure" />
        </div>
        <div class="t3-slider-action-bottom">
          <div class="t3-slider-action-label">
            <span class="t3-label-icon"><img src="${brochureIcon}" /></span>
            DOWNLOAD A BROCHURE
          </div>
        </div>
      </div>
    </a>

</div>

<div class="t3-help-cta">
    <div class="t3-help-text">${helpText}</div>
    <a href="${contactURL}" target="_self" class="t3-help-button">GET IN TOUCH</a>
</div>

</div>
</div>
</div>
`;

        if (!document.querySelector('.t3-slider-overlay')) {
            document.body.insertAdjacentHTML('beforeend', sliderHTML);

            const modelImage = document.querySelector('.t3-model-image img');

            if (modelImage && !isRexton) {
                const setImageTop = () => {
                    const imgHeight = modelImage.offsetHeight;
                    if (imgHeight > 0 && window.innerWidth > 768) {
                        document.documentElement.style.setProperty('--t3-img-height', `${imgHeight}px`);
                    }
                };

                if (modelImage.complete) setImageTop();
                Kameleoon.API.Utils.addEventListener(modelImage, 'load', setImageTop);
                setTimeout(setImageTop, 100);
            }

            setTimeout(() => {
                document.body.classList.add('t3-slide-up-animation');
                sessionStorage.setItem('t3ModalShown', true);
            }, 500);

            console.log('*** Modal_pageviews goal triggered T3 ***');
            kamKgmt3ProcessGoal('modal_pageviews_t3');
        }
    }
}
