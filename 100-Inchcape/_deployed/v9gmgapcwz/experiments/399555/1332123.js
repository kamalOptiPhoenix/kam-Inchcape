"use strict";

(function () {
  const goals = {
    'Primary CTA click T58': 421155,
    'Check Stock Availability CTA clicks T58': 421156,
    'Modal Appearances T58': 421157
  };
  const kamPcat58DealerUrls = {
    'Baker Motors': {
      url: 'https://peugeotalbury.com.au/New-Cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/0e01d01a50724cf3885ee160300f190f.png'
    },
    'Alexandria Peugeot and Citroen': {
      url: 'https://www.peugeotalexandria.com.au/our-stock/new-peugeot-for-sale-alexandria/',
      mapImage: '//cdn.optimizely.com/img/15841360337/6a93ae79a14d4725b65df031478fe9d4.png'
    },
    'North Shore Peugeot': {
      url: 'https://www.peugeotnorthshore.com.au/our-stock/new-peugeot-for-sale-artamon/',
      mapImage: '//cdn.optimizely.com/img/15841360337/a15bd8843221489cbf1b6590d1516756.png'
    },
    'Riverina Euro Centre': {
      url: 'https://riverinaeurocentre.com.au/new-demo-used-models/',
      mapImage: '//cdn.optimizely.com/img/15841360337/0ecfe470ae8a46158abfe09468bfb1c2.png'
    },
    'Gateway Automotive': {
      url: 'https://gatewayautomotive.com.au/New-Cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/2c4444639f6543c98e99a9ca7bccac1b.png'
    },
    'Peugeot Newcastle': {
      url: 'https://www.peugeotnewcastle.com.au/new-peugeot-cardiff/',
      mapImage: '//cdn.optimizely.com/img/15841360337/4f0e1eccd4184009bb05fc5c0c61cd72.png'
    },
    'Brian Hilton Peugeot': {
      url: 'https://www.brianhiltonpeugeot.com.au/our-stock/new-peugeot-for-sale-gosford/',
      mapImage: '//cdn.optimizely.com/img/15841360337/7e6534d6c4ec4c1098980c285a6fd4e9.png'
    },
    'Parramatta Peugeot': {
      url: 'https://www.peugeotparramatta.com.au/our-stock/new-peugeot-for-sale-parramatta/',
      mapImage: '//cdn.optimizely.com/img/15841360337/bcbca7c77f8942749df55beaf5fce462.png'
    },
    'Von Bibra Prestige Gold Coast': {
      url: 'https://www.vonbibrapeugeot.com.au/stock?condition=New%2CDemo&make[Peugeot]=',
      mapImage: '//cdn.optimizely.com/img/15841360337/04b41453c418488a99b03d4a6ea806b5.png'
    },
    'East Coast Peugeot Professional': {
      url: 'https://www.eastcoastpeugeot.com.au/search/new-cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/c42ea70dc3f54bdaa3aeb4a5c3596e91.png'
    },
    'Brisbane Peugeot': {
      url: 'https://brisbanepeugeot.com.au/our-stock/',
      mapImage: '//cdn.optimizely.com/img/15841360337/c199cf21b5c540fcac3ca052eccb39e0.png'
    },
    'West Car Sales': {
      url: 'https://westcarsales.com.au/',
      mapImage: '//cdn.optimizely.com/img/15841360337/c9ef43c11e4b4a6aba212005687f95e7.png'
    },
    'Bartons Peugeot Professional (Commercial Only)': {
      url: null,
      mapImage: '//cdn.optimizely.com/img/15841360337/0e3291b8e33446789a8271b61c963fe0.png'
    },
    'Auto Centre Townsville': {
      url: 'https://peugeottownsville.com.au/New-Cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/b7bc04882758449c80b0cf3bec5b4528.png'
    },
    'Lawrences Peugeot': {
      url: 'https://www.peugeotrockhampton.com.au/stock/new-peugeot-for-sale-kawana/',
      mapImage: '//cdn.optimizely.com/img/15841360337/8d41a07f88bb46b29e1d5b4893eb64d0.png'
    },
    'A. Cullen & Son': {
      url: 'https://www.peugeotsunshinecoast.com.au/our-stock/new-peugeot-for-sale-nambour/',
      mapImage: '//cdn.optimizely.com/img/15841360337/e923405784dc4dde9a4249de2c5fe497.png'
    },
    'Jarvis Peugeot': {
      url: 'https://www.jarvispeugeot.com.au/our-stock/new-peugeot-for-sale-medindie/',
      mapImage: '//cdn.optimizely.com/img/15841360337/b7fb483b84264ea2b8ff0451098df402.png'
    },
    'Buckby Motors Peugeot': {
      url: null,
      mapImage: '//cdn.optimizely.com/img/15841360337/4daa8f0f301a41899c16e6eb78e6cc84.png'
    },
    'Regan Peugeot': {
      url: 'https://www.reganpeugeot.com.au/our-stock/new-peugeot-for-sale-in-balwyn/',
      mapImage: '//cdn.optimizely.com/img/15841360337/b9b3a17ffd684a75a6d4c7d576f59330.png'
    },
    'Barry Bourke Peugeot': {
      url: 'https://www.barrybourkepeugeot.com.au/search/new-cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/6813a23f07e540b98cae51f855922360.png'
    },
    'Bayside European': {
      url: 'https://www.baysidepeugeot.com.au/search/new-cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/0fc195238fb54784a878569092531e31.png'
    },
    'Peninsula Peugeot': {
      url: 'https://www.peninsulapeugeot.com.au/search/new-cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/56654df6178440cf9201b06e9a45e3d1.png'
    },
    'Rex Gorell Geelong': {
      url: 'https://www.peugeotgeelong.com.au/stock/new-peugeot-for-sale-geelong/',
      mapImage: '//cdn.optimizely.com/img/15841360337/0ecfe470ae8a46158abfe09468bfb1c2.png'
    },
    'Melbourne City Peugeot': {
      url: 'https://www.peugeotnorthmelbourne.com.au/our-stock/new-peugeot-for-sale-north-melbourne/',
      mapImage: '//cdn.optimizely.com/img/15841360337/1918c322b92b4019821d3ab273612b13.png'
    },
    'Bedggoods Motor Group': {
      url: 'https://www.peugeotballarat.com.au/our-stock/new-peugeot-for-sale-ballarat/',
      mapImage: '//cdn.optimizely.com/img/15841360337/33c8ad8134c64871b8184c4955105e20.png'
    },
    'Perth City Peugeot': {
      url: 'https://www.perthcitypeugeot.com.au/our-stock/new-peugeot-perth/',
      mapImage: '//cdn.optimizely.com/img/15841360337/ab8218715eb64abf84b6325c5383b672.png'
    },
    'Allan Mackay Peugeot': {
      url: null,
      mapImage: '//cdn.optimizely.com/img/15841360337/6d08a99ae98c438b9df4319e26458c35.png'
    },
    'Cairns Cars': {
      url: 'https://cairnscars.com.au/New-Cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/e13075bafb5641c285cdc9923df9af11.png'
    },
    'Gippsland Motor Group': {
      url: 'https://www.peugeotgippsland.com.au/',
      mapImage: '//cdn.optimizely.com/img/15841360337/906f4ee0a72844db8e6bbe9ec92ddd69.png'
    },
    'McPherson Motors': {
      url: null,
      mapImage: '//cdn.optimizely.com/img/15841360337/e4a8d51b470b4fa6b14bc85d749f0773.png'
    },
    'Tamworth Peugeot (Wideland)': {
      url: 'https://peugeottamworth.com.au/New-Cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/8c9b6340b1af41158c1d2f4cb8ad3361.png'
    },
    'Western Peugeot': {
      url: 'https://www.westernpeugeot.com.au/search/new-cars',
      mapImage: '//cdn.optimizely.com/img/15841360337/c9ef43c11e4b4a6aba212005687f95e7.png'
    }
  };

  /* eslint-disable no-console */

  function kamPcat58ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }
  function kamPcat58NormalizeDealerName(name) {
    return name.toLowerCase().replace(/\binchcape\b/g, '').replace(/\bpeugeot\b/g, '').replace(/\bcitroen\b/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function kamPcat58ResolveDealerKey(rawDealerName) {
    if (!rawDealerName) {
      return null;
    }
    const trimmed = rawDealerName.trim();
    if (!trimmed || trimmed === 'DEALER NAME') {
      return null;
    }
    if (kamPcat58DealerUrls[trimmed]) {
      return trimmed;
    }
    const normalizedRaw = kamPcat58NormalizeDealerName(trimmed);
    const mappedDealerNames = Object.keys(kamPcat58DealerUrls);
    for (let i = 0; i < mappedDealerNames.length; i += 1) {
      const mappedDealerName = mappedDealerNames[i];
      const normalizedKey = kamPcat58NormalizeDealerName(mappedDealerName);
      if (normalizedRaw === normalizedKey) {
        return mappedDealerName;
      }
    }
    for (let i = 0; i < mappedDealerNames.length; i += 1) {
      const mappedDealerName = mappedDealerNames[i];
      if (trimmed.includes(mappedDealerName) || mappedDealerName.includes(trimmed)) {
        return mappedDealerName;
      }
    }
    for (let i = 0; i < mappedDealerNames.length; i += 1) {
      const mappedDealerName = mappedDealerNames[i];
      const normalizedKey = kamPcat58NormalizeDealerName(mappedDealerName);
      if (normalizedRaw.includes(normalizedKey) || normalizedKey.includes(normalizedRaw)) {
        return mappedDealerName;
      }
    }
    return null;
  }
  const kamPcat58Config = {
    dealerUrls: kamPcat58DealerUrls,
    getDealerName: () => {
      const dealerNameElement = document.querySelector('.dealerDetails h3.trimDetailsTitle span#js-dealerName');
      if (dealerNameElement) {
        const dealerName = dealerNameElement.textContent.trim();
        const resolvedKey = kamPcat58ResolveDealerKey(dealerName);
        if (resolvedKey) {
          return resolvedKey;
        }
        return dealerName;
      }
      return 'DEALER NAME';
    },
    getModelName: () => {
      const modelElement = document.querySelector('.trimDetailsSecondaryColumn .trimDetailsTitle');
      if (modelElement) {
        let modelName = modelElement.textContent.trim();
        if (modelName.toLowerCase().startsWith('your ')) {
          modelName = modelName.substring(5);
        }
        return modelName;
      }
      return 'model name';
    },
    getDealerContactInfo: () => {
      const phoneElement = document.querySelector('#js-dealerPhone');
      const addressElement = document.querySelector('#js-dealerAddress');
      const hoursElement = document.querySelector('#js-dealerSalesWeekdayTitle');
      return {
        phone: phoneElement ? phoneElement.textContent.trim() : '',
        address: addressElement ? addressElement.textContent.trim() : '',
        hours: hoursElement ? hoursElement.innerHTML.trim() : ''
      };
    },
    modalHtml: () => `
        <div class="PCAT58_customModal">
            <div class="PCAT58_backdrop"></div>
            <div class="PCAT58_modalBody">
                <div class="PCAT58_closeBtn">
                    <img src="//cdn.optimizely.com/img/15841360337/5b9e42997d3644e29dae58c356f5fde5.svg" alt="Close" class="PCAT58_closeIcon" />
                </div>
                <div class="PCAT58_modalContent">
                    <div class="PCAT58_contentLeft">
                        <h2 class="PCAT58_title">ANYTHING <span class="PCAT58_dealerName">DEALER NAME</span> CAN HELP YOU WITH?</h2>
                        <p class="PCAT58_subtitle">Have any specific questions about the <span class="PCAT58_modelName">model name</span> you would like to know?</p>
                        <div class="PCAT58_contactInfo"></div>
                        <div class="PCAT58_buttons">
                            <a href="https://www.peugeot.com.au/tools/enquiry.html" target="_blank" class="PCAT58_primaryBtn">I'VE GOT A QUESTION</a>
                        </div>
                    </div>
                    <div class="PCAT58_contentRight"></div>
                </div>
            </div>
        </div>
    `,
    modalCloseEvent: () => {
      window.jQuery(document).on('click', '.PCAT58_backdrop', () => {
        kamPcat58Config.closeModal();
      });
      window.jQuery(document).on('click', '.PCAT58_closeBtn', () => {
        kamPcat58Config.closeModal();
      });
      window.jQuery(document).on('keydown', event => {
        if (event.key === 'Escape' && window.jQuery('.PCAT58_customModal').hasClass('PCAT58_Show')) {
          kamPcat58Config.closeModal();
        }
      });
      window.jQuery(document).on('click', '.PCAT58_primaryBtn', () => {
        kamPcat58ProcessGoal('Primary CTA click T58');
        kamPcat58Config.closeModal();
      });
      window.jQuery(document).on('click', '.PCAT58_secondaryBtn', () => {
        kamPcat58ProcessGoal('Check Stock Availability CTA clicks T58');
      });
    },
    displayModalTriggerEvents: () => {
      if (window.innerWidth < 768) {
        kamPcat58Config.mobileScrollEvent();
      } else {
        document.addEventListener('mouseout', event => {
          if (!event.relatedTarget && !event.toElement && event.clientY <= 10) {
            kamPcat58Config.viewModal();
          }
        });
      }
    },
    mobileScrollEvent: () => {
      window.onscroll = function kamPcat58OnScroll() {
        if (sessionStorage.getItem('scrolledHalfDoc') === null) {
          sessionStorage.setItem('scrolledHalfDoc', 'false');
        }
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        if (this.oldScroll > this.scrollY) {
          if (sessionStorage.getItem('scrolledHalfDoc') === 'true') {
            kamPcat58Config.viewModal();
          }
        } else if (scrollTop > documentHeight / 2) {
          sessionStorage.setItem('scrolledHalfDoc', 'true');
        }
        this.oldScroll = this.scrollY;
      };
    },
    viewModal: () => {
      if (sessionStorage.getItem('PCAT58_PopupOpen') === null) {
        kamPcat58Config.updateModalContent();
        window.jQuery('.PCAT58_customModal').addClass('PCAT58_Show');
        window.jQuery('body').addClass('PCAT58_modalShowNoScroll');
        sessionStorage.setItem('PCAT58_PopupOpen', 'true');
        kamPcat58Config.hidePodiumBubble();
        console.log('*** T58 Modal Appearances goal triggered');
        kamPcat58ProcessGoal('Modal Appearances T58');
      }
    },
    updateModalContent: () => {
      const dealerName = kamPcat58Config.getDealerName();
      const modelName = kamPcat58Config.getModelName();
      const dealerData = kamPcat58Config.dealerUrls[dealerName];
      const stockUrl = dealerData ? dealerData.url : null;
      const mapImage = dealerData ? dealerData.mapImage : '';
      const hasStockUrl = stockUrl !== null;
      const contactInfo = kamPcat58Config.getDealerContactInfo();
      window.jQuery('.PCAT58_dealerName').text(dealerName);
      window.jQuery('.PCAT58_modelName').text(modelName);
      const contactInfoContainer = window.jQuery('.PCAT58_contactInfo');
      contactInfoContainer.empty();
      if (contactInfo.phone) {
        contactInfoContainer.append(`
                <div class="PCAT58_contactItem">
                    <div class="PCAT58_icon">
                        <svg aria-hidden="true" class="iconSvg iconSvgPhone">
                            <use xlink:href="#icon-phone"></use>
                        </svg>
                    </div>
                    <div class="PCAT58_contactText">
                         ${contactInfo.phone}
                    </div>
                </div>
            `);
      }
      if (contactInfo.address) {
        contactInfoContainer.append(`
                <div class="PCAT58_contactItem">
                    <div class="PCAT58_icon">
                        <svg aria-hidden="true" class="iconSvg iconSvgLocation">
                            <use xlink:href="#icon-location"></use>
                        </svg>
                    </div>
                    <div class="PCAT58_contactText">
                        ${contactInfo.address}
                    </div>
                </div>
            `);
      }
      if (contactInfo.hours) {
        contactInfoContainer.append(`
                <div class="PCAT58_contactItem">
                    <div class="PCAT58_icon">
                        <svg aria-hidden="true" class="iconSvg iconSvgHours">
                            <use xlink:href="#icon-build-sm-hours"></use>
                        </svg>
                    </div>
                    <div class="PCAT58_contactText">
                         ${contactInfo.hours}
                    </div>
                </div>
            `);
      }
      const buttonsContainer = window.jQuery('.PCAT58_buttons');
      const primaryBtn = buttonsContainer.find('.PCAT58_primaryBtn');
      buttonsContainer.find('.PCAT58_secondaryBtn').remove();
      if (hasStockUrl) {
        primaryBtn.after(`<a href="${stockUrl}" target="_blank" class="PCAT58_secondaryBtn">CHECK STOCK AVAILABILITY</a>`);
      }
      const rightContentArea = window.jQuery('.PCAT58_contentRight');
      if (mapImage) {
        rightContentArea.html(`
                <div class="PCAT58_map">
                    <img src="${mapImage}" alt="${dealerName} Location Map" class="PCAT58_mapImage" />
                </div>
            `);
      } else {
        rightContentArea.empty();
      }
    },
    closeModal: () => {
      window.jQuery('.PCAT58_customModal').removeClass('PCAT58_Show');
      window.jQuery('body').removeClass('PCAT58_modalShowNoScroll');
      kamPcat58Config.showPodiumBubble();
    },
    hidePodiumBubble: () => {
      const podiumBubble = document.querySelector('#podium-bubble');
      if (podiumBubble) {
        podiumBubble.classList.add('PCAT58_hidePodium');
      }
    },
    showPodiumBubble: () => {
      const podiumBubble = document.querySelector('#podium-bubble');
      if (podiumBubble) {
        podiumBubble.classList.remove('PCAT58_hidePodium');
      }
    }
  };

  /* eslint-disable no-console */

  (function kamPcat58V1() {
    function kamPcat58Init() {
      console.log('*** Peugeot T58 - Exit Intent Modal Configurator Summary Screen ***');
      document.body.classList.add('PCAT58');
      window.jQuery('body').append(kamPcat58Config.modalHtml());
      kamPcat58Config.modalCloseEvent();
      kamPcat58Config.displayModalTriggerEvents();
    }
    if (!window.t58Start) {
      window.t58Start = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function', kamPcat58Init);
    }
  })();
})();