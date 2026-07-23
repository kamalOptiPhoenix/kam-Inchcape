"use strict";

(function () {
  /* eslint-disable max-len */
  function escapeHtml(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escapeHtmlAttr(text) {
    return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }
  const PCAT71_FUEL_ADR_DISCLAIMER = 'The published consumption (l/100km) and emissions figures are determined ' + 'in accordance to ADR 81/02. Actual figures will vary as they are dependent on many factors, ' + 'including without limitation: individual driving style, road and traffic conditions, ' + 'environmental conditions and fuel quality. Extra features and accessories ' + '(eg: equipment, wheels or tyres used etc.) can change relevant vehicle parameters such as weight, ' + 'rolling resistance and aerodynamics and can also affect the consumption, emission, ' + 'and performance values of a vehicle. Generally, consumption and emissions will vary from the ' + 'published figures in real world Australian driving conditions.';
  const PCAT71_WIRELESS_DISCLAIMER = 'Compatible Apple® or AndroidTM device required';
  const PCAT71_WARRANTY_DISCLAIMER = '5 Year Unlimited Kilometre Warranty on PEUGEOT new vehicles. ' + 'Subject to terms, conditions, and exclusions. Visit ';
  const PCAT71_WARRANTY_URL = 'https://www.peugeot.com.au/owners/warranty.html';
  const PCAT71_ROADSIDE_DISCLAIMER = '5 Year Roadside Assist on PEUGEOT new vehicles. ' + 'Subject to terms, conditions, and exclusions. Visit ';
  const PCAT71_ROADSIDE_URL = 'https://www.peugeot.com.au/owners/peugeot-roadside-assistance.html';
  const PCAT71_BATTERY_WLTP_DISCLAIMER = 'Figure based on WLTP (Worldwide Harmonised Light Vehicle Test Procedure) ' + 'static laboratory combined average city and highway cycle test, which measure, energy consumption, range and ' + 'emissions in passenger vehicles, figures stated for the purposes of comparison amongst vehicles tested to ' + 'the same technical procedures only. Actual real world range results will vary depending on a combination of ' + 'factors including but not limited to load, driving style, type of journey, vehicle configuration, battery age ' + 'and condition, use of vehicle features (such as heating and air conditioning), as well as operating, ' + 'environmental and climate conditions.';
  const PCAT71_BATTERY_WARRANTY_DISCLAIMER = '8 years or 160,000km whichever comes sooner, from the vehicle\'s ' + 'warranty start date. Subject to terms and conditions, visit ';
  const config = {
    buildInfoTipHtml({
      message,
      ariaLabel,
      instanceId = '0',
      visitHref
    }) {
      const safeMessage = escapeHtml(message);
      const visitLink = visitHref ? `<a href="${escapeHtmlAttr(visitHref)}" class="pcat71-infotip__link" target="_blank" rel="noopener noreferrer">${escapeHtml(visitHref)}</a>` : '';
      const bubbleInner = safeMessage + visitLink;
      const safeAria = escapeHtml(ariaLabel);
      const tipId = `pcat71-infotip-bubble-${instanceId}`;
      const openSpan = '<span class="pcat71-infotip" tabindex="0" role="button" ' + `aria-label="${safeAria}" aria-describedby="${tipId}">`;
      const svgOpen = '<svg class="pcat71-infotip__icon" width="14" height="14" ' + 'viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
      const svgShapes = '<circle class="pcat71-infotip__ring" cx="7" cy="7" r="6"/>' + '<circle class="pcat71-infotip__i-part" cx="7" cy="4.25" r="0.9"/>' + '<rect class="pcat71-infotip__i-part" x="6.15" y="5.85" width="1.7" height="4.15" rx="0.45"/>';
      return `${openSpan + svgOpen + svgShapes}</svg>` + `<span class="pcat71-infotip__bubble" role="tooltip" id="${tipId}">${bubbleInner}</span>` + '</span>';
    },
    getModelFromUrl: () => {
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('/models/2008-hybrid-suv')) {
        return '2008-hybrid-suv';
      }
      if (currentPath.includes('/models/3008-suv')) {
        return '3008-suv';
      }
      if (currentPath.includes('/models/5008-hybrid-suv')) {
        return '5008-hybrid-suv';
      }
      if (currentPath.includes('/models/3008-hybrid-suv')) {
        return '3008-hybrid-suv';
      }
      if (currentPath.includes('/models/expert-van/e-expert')) {
        return 'e-expert';
      }
      if (currentPath.includes('/models/new-boxer-van/diesel')) {
        return 'new-boxer-van-diesel';
      }
      if (currentPath.includes('/models/308-hybrid')) {
        return '308-hybrid';
      }
      if (currentPath.includes('/models/408-hybrid')) {
        return '408-hybrid';
      }
      if (currentPath.includes('/models/new-e-partner-van')) {
        return 'new-e-partner-van';
      }
      if (currentPath.includes('/models/diesel-expert-van')) {
        return 'diesel-expert-van';
      }
      if (currentPath.includes('/models/partner-van')) {
        return 'partner-van';
      }
      if (currentPath.includes('/models/boxer-van')) {
        return 'boxer-van';
      }
      return null;
    },
    getCardHTML: modelSlug => {
      const modelData = config.modelspecificdata[modelSlug];
      if (!modelData) {
        return '';
      }
      const cardsMarkup = Object.values(modelData).map((card, index) => {
        const imageBlock = card.imageDisclaimerOverlay ? `<div class="pcat71-card-image"><img src="${card.image}" alt="${card.title}" /></div>` : `<img src="${card.image}" alt="${card.title}" />`;
        return `
            <div class="pcat71-card pcat71-card-${index + 1}">
                ${imageBlock}
                <div class="pcat71-card-content">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            </div>
        `;
      }).join('');
      return `
            <div class="pcat71-carousel" data-total-cards="${Object.values(modelData).length}" data-pcat71-model="${modelSlug}">
                <div class="pcat71-container">${cardsMarkup}</div>
                <div class="pcat71-controls" aria-label="Carousel navigation">
                    <button type="button" class="pcat71-arrow pcat71-arrow-left" aria-label="Previous card">
                        <img src="//cdn.optimizely.com/img/15841360337/c6fb877c93eb48809e2fc308252b645f.svg" alt="" />
                    </button>
                    <span class="pcat71-indicator" aria-live="polite">1 / ${Object.values(modelData).length}</span>
                    <button type="button" class="pcat71-arrow pcat71-arrow-right" aria-label="Next card">
                        <img src="//cdn.optimizely.com/img/15841360337/7f292edb0c644fd183c38ef058b16cab.svg" alt="" />
                    </button>
                </div>
            </div>
        `;
    },
    updateIndicator(container, indicator, totalCards) {
      const firstCard = container.querySelector('.pcat71-card');
      if (!firstCard) {
        return;
      }
      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(window.getComputedStyle(container).columnGap || window.getComputedStyle(container).gap || '0');
      const scrollStep = cardWidth + gap;
      const index = Math.min(totalCards, Math.max(1, Math.round(container.scrollLeft / scrollStep) + 1));
      const indicatorElement = indicator;
      indicatorElement.textContent = `${index} / ${totalCards}`;
    },
    setupMobileCarousel() {
      const carousel = document.querySelector('.pcat71-carousel');
      if (!carousel) {
        return;
      }
      const container = carousel.querySelector('.pcat71-container');
      const indicator = carousel.querySelector('.pcat71-indicator');
      const leftArrow = carousel.querySelector('.pcat71-arrow-left');
      const rightArrow = carousel.querySelector('.pcat71-arrow-right');
      const cards = container ? container.querySelectorAll('.pcat71-card') : [];
      const totalCards = cards.length;
      if (!container || !indicator || !leftArrow || !rightArrow || !totalCards) {
        return;
      }
      const scrollToCard = index => {
        const boundedIndex = Math.max(0, Math.min(index, totalCards - 1));
        container.scrollTo({
          left: cards[boundedIndex].offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
      };
      const getCurrentIndex = () => {
        let closestIndex = 0;
        let smallestDistance = Number.POSITIVE_INFINITY;
        cards.forEach((card, idx) => {
          const distance = Math.abs(container.scrollLeft - (card.offsetLeft - container.offsetLeft));
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = idx;
          }
        });
        return closestIndex;
      };
      Kameleoon.API.Utils.addEventListener(leftArrow, 'click', () => {
        scrollToCard(getCurrentIndex() - 1);
      });
      Kameleoon.API.Utils.addEventListener(rightArrow, 'click', () => {
        scrollToCard(getCurrentIndex() + 1);
      });
      Kameleoon.API.Utils.addEventListener(container, 'scroll', () => {
        config.updateIndicator(container, indicator, totalCards);
      });
      Kameleoon.API.Utils.addEventListener(window, 'resize', () => {
        config.updateIndicator(container, indicator, totalCards);
      });
      config.updateIndicator(container, indicator, totalCards);
    },
    setupInfoTipFixedPositioning() {
      const carousel = document.querySelector('.pcat71-carousel');
      if (!carousel) {
        return;
      }
      const pad = 16;
      const gap = 8;
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const tipState = new WeakMap();
      function getBubble(tipRoot) {
        const state = tipState.get(tipRoot);
        return state?.bubble || tipRoot.querySelector('.pcat71-infotip__bubble');
      }
      function ensureBubbleHoverBridge(tipRoot, bubble) {
        if (bubble.dataset.pcat71HoverBridge) {
          return;
        }
        bubble.dataset.pcat71HoverBridge = 'true';
        Kameleoon.API.Utils.addEventListener(bubble, 'mouseenter', () => {
          tipRoot.dataset.pcat71BubbleHover = 'true';
        });
        Kameleoon.API.Utils.addEventListener(bubble, 'mouseleave', () => {
          delete tipRoot.dataset.pcat71BubbleHover;
          requestAnimationFrame(() => {
            if (!tipRoot.matches(':hover')) {
              closeTip(tipRoot);
            }
          });
        });
      }
      function portalBubble(tipRoot) {
        let state = tipState.get(tipRoot);
        if (!state) {
          const bubble = tipRoot.querySelector('.pcat71-infotip__bubble');
          if (!bubble) {
            return null;
          }
          const placeholder = document.createComment('pcat71-infotip-bubble');
          bubble.parentNode.insertBefore(placeholder, bubble);
          state = {
            bubble,
            placeholder
          };
          tipState.set(tipRoot, state);
          ensureBubbleHoverBridge(tipRoot, bubble);
        }
        if (state.bubble.parentNode !== document.body) {
          document.body.appendChild(state.bubble);
        }
        return state.bubble;
      }
      function restoreBubble(tipRoot) {
        const state = tipState.get(tipRoot);
        if (!state || !state.placeholder.parentNode) {
          return;
        }
        state.placeholder.parentNode.insertBefore(state.bubble, state.placeholder);
      }
      function positionFixedBubble(tipRoot, attempt = 0) {
        const bubble = getBubble(tipRoot);
        if (!bubble) {
          return;
        }
        bubble.classList.add('pcat71-infotip__bubble--open');
        const trigger = tipRoot.getBoundingClientRect();
        // eslint-disable-next-line no-unused-expressions
        bubble.offsetWidth;
        const bw = bubble.offsetWidth;
        const bh = bubble.offsetHeight;
        if ((bw < 1 || bh < 1) && attempt < 8) {
          requestAnimationFrame(() => positionFixedBubble(tipRoot, attempt + 1));
          return;
        }
        if (bw < 1 || bh < 1) {
          return;
        }
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let left = trigger.left + trigger.width / 2 - bw / 2;
        left = Math.max(pad, Math.min(left, vw - pad - bw));
        let top = trigger.top - bh - gap;
        if (top < pad) {
          top = trigger.bottom + gap;
        }
        if (top + bh > vh - pad) {
          top = Math.max(pad, vh - pad - bh);
        }
        const triggerCx = trigger.left + trigger.width / 2;
        const arrowRaw = Math.round(triggerCx - left);
        const arrowInset = 14;
        const arrowLeftPx = Math.max(arrowInset, Math.min(arrowRaw, bw - arrowInset));
        const placedAbove = top + bh <= trigger.top + 4;
        bubble.style.setProperty('--pcat71-arrow-left', `${arrowLeftPx}px`);
        bubble.setAttribute('data-placement', placedAbove ? 'above' : 'below');
        bubble.style.left = `${Math.round(left)}px`;
        bubble.style.top = `${Math.round(top)}px`;
      }
      function resetTip(tipRoot) {
        const bubble = getBubble(tipRoot);
        if (bubble) {
          bubble.classList.remove('pcat71-infotip__bubble--open');
          bubble.style.removeProperty('left');
          bubble.style.removeProperty('top');
          bubble.style.removeProperty('--pcat71-arrow-left');
          bubble.removeAttribute('data-placement');
        }
        tipRoot.classList.remove('pcat71-infotip--open');
        restoreBubble(tipRoot);
      }
      function isTipActive(tipRoot) {
        if (tipRoot.classList.contains('pcat71-infotip--open')) {
          return true;
        }
        return tipRoot.matches(':hover') || tipRoot.contains(document.activeElement);
      }
      function openTip(tipRoot) {
        portalBubble(tipRoot);
        tipRoot.classList.add('pcat71-infotip--open');
        requestAnimationFrame(() => positionFixedBubble(tipRoot));
      }
      function closeTip(tipRoot) {
        if (document.activeElement === tipRoot) {
          tipRoot.blur();
        }
        resetTip(tipRoot);
      }
      function closeAllTips() {
        carousel.querySelectorAll('.pcat71-infotip').forEach(tip => {
          closeTip(tip);
        });
      }
      function refreshActiveTips() {
        carousel.querySelectorAll('.pcat71-infotip').forEach(tip => {
          if (isTipActive(tip)) {
            portalBubble(tip);
            requestAnimationFrame(() => positionFixedBubble(tip));
          }
        });
      }
      carousel.querySelectorAll('.pcat71-infotip').forEach(tip => {
        if (isCoarsePointer) {
          Kameleoon.API.Utils.addEventListener(tip, 'click', event => {
            event.preventDefault();
            event.stopPropagation();
            if (tip.classList.contains('pcat71-infotip--open')) {
              closeTip(tip);
            } else {
              closeAllTips();
              openTip(tip);
            }
          });
        } else {
          Kameleoon.API.Utils.addEventListener(tip, 'mouseenter', () => {
            openTip(tip);
          });
          Kameleoon.API.Utils.addEventListener(tip, 'mouseleave', () => {
            requestAnimationFrame(() => {
              if (!tip.matches(':hover') && !tip.dataset.pcat71BubbleHover) {
                closeTip(tip);
              }
            });
          });
          Kameleoon.API.Utils.addEventListener(tip, 'focusin', () => {
            openTip(tip);
          });
          Kameleoon.API.Utils.addEventListener(tip, 'focusout', event => {
            if (!tip.contains(event.relatedTarget)) {
              closeTip(tip);
            }
          });
        }
      });
      if (isCoarsePointer) {
        Kameleoon.API.Utils.addEventListener(document, 'click', event => {
          if (event.target.closest('.pcat71-infotip__bubble')) {
            return;
          }
          if (!event.target.closest('.pcat71-infotip')) {
            closeAllTips();
          }
        });
      }
      let scrollTicking = false;
      function onScrollDismiss() {
        if (scrollTicking) {
          return;
        }
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollTicking = false;
          closeAllTips();
        });
      }
      const scrollHost = carousel.querySelector('.pcat71-container');
      if (scrollHost) {
        Kameleoon.API.Utils.addEventListener(scrollHost, 'scroll', onScrollDismiss);
      }
      window.addEventListener('scroll', onScrollDismiss, {
        passive: true,
        capture: true
      });
      Kameleoon.API.Utils.addEventListener(window, 'resize', refreshActiveTips);
    },
    insertHTML: () => {
      let targetElement = document.querySelector('.main-section .q-modal-content .canvas');
      const modelSlug = config.getModelFromUrl();

      // for 3008-hybrid-suv target is different element ('.main-section .q-modal-content .teaserFullscreen')

      if (modelSlug === '3008-hybrid-suv') {
        targetElement = document.querySelector('.main-section .q-modal-content .teaserFullscreen');
      }
      if (!targetElement || !modelSlug) {
        return;
      }
      const existingContainer = document.querySelector('.pcat71-carousel');
      const cardHTML = config.getCardHTML(modelSlug);
      if (!cardHTML) {
        return;
      }
      if (existingContainer) {
        existingContainer.outerHTML = cardHTML;
        return;
      }
      targetElement.insertAdjacentHTML('afterend', cardHTML);
    }
  };
  config.modelspecificdata = {
    '2008-hybrid-suv': {
      card1: {
        title: 'Turbo Hybrid Powertrain',
        description: `Drive further on a single tank with fuel consumption from <span class="pcat71-infotip-keep"><strong>4.4L/100km.</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-2008'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/03b1a7ee367142038d3f852ac0fc3a9d.png'
      },
      card2: {
        title: '21” Panoramic i-Cockpit®',
        description: `Immersive curved HD display with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-2008'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/3f41745442374522adce548f725e3596.png'
      },
      card3: {
        title: 'Fastback SUV Design',
        description: 'Striking coupe-inspired design with up to 588L boot capacity for everyday practicality.',
        image: '//cdn.optimizely.com/img/15841360337/a226010956cd4c1a8e5158b7545ff663.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year UNLIMITED KM <span class="pcat71-infotip-keep">WARRANTY${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-2008'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-2008'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/e8cae8621d964a0e97029e88ca7defb8.png'
      }
    },
    '3008-suv': {
      card1: {
        title: 'Up to 1,036km Hybrid Range',
        description: `Drive further with up to 1,036km on a single tank. Fuel consumption from <span class="pcat71-infotip-keep"><strong>4.9L/100km.</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-3008'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/4266ba26568440eca163bf9127567cc3.png'
      },
      card2: {
        title: '21” Panoramic i-Cockpit®',
        description: `Immersive curved HD display with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-3008'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/d7512120ce554c9490b47a5d3c7cae60.png'
      },
      card3: {
        title: 'Fastback SUV Design',
        description: 'Striking coupe-inspired design with up to 588L boot capacity for everyday practicality.',
        image: '//cdn.optimizely.com/img/15841360337/91d1e1eba25d4997b30b7a1b48f4f7d9.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year UNLIMITED KM <span class="pcat71-infotip-keep">WARRANTY${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-3008'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-3008'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/84cd4d2d6abd4bb08ae289289273d253.png'
      }
    },
    '5008-hybrid-suv': {
      card1: {
        title: 'Up to 1,152km Hybrid Range',
        description: `Drive further with up to 1,152km range & fuel consumption from <span class="pcat71-infotip-keep"><strong>5.1L/100km.</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-5008'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/84f5e359cb5f468b94d0728a01e2bdc8.png'
      },
      card2: {
        title: '21” Panoramic i-Cockpit®',
        description: `Immersive curved HD display with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-5008'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/712f5dfb8ace44ac8fe590782eb69605.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: '7-Seater Fastback SUV Design',
        description: 'Striking coupe-inspired design with full 7 seats as standard.',
        image: '//cdn.optimizely.com/img/15841360337/d835b23a66884dcbb07036353a41466b.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year UNLIMITED KM <span class="pcat71-infotip-keep">WARRANTY${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-5008'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-5008'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/f0e72bc1ecb240cb9f71cb1b2c418ad0.png'
      }
    },
    '3008-hybrid-suv': {
      card1: {
        title: 'Up to 1,036km Hybrid Range',
        description: `Drive further with up to 1,036km on a single tank. Fuel consumption from <span class="pcat71-infotip-keep"><strong>4.9L/100km.</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-3008h'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/f2ac83767afa4997bef650c2b363cb73.png'
      },
      card2: {
        title: '21” Panoramic i-Cockpit®',
        description: `Immersive curved HD display with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-3008h'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/bd2095cf9cb14c56892cb10cf9aa8a9c.png'
      },
      card3: {
        title: 'Fastback SUV Design',
        description: 'Striking coupe-inspired design with up to 588L boot capacity for everyday practicality.',
        image: '//cdn.optimizely.com/img/15841360337/e00c70c984ef4099816ff8f009ee3d1e.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year UNLIMITED KM <span class="pcat71-infotip-keep">WARRANTY${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-3008h'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-3008h'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/0fc836272b674e0481cbc73af2b6fabb.png'
      }
    },
    '308-hybrid': {
      card1: {
        title: 'Turbo Hybrid Powertrain',
        description: `Drive further with fuel consumption from <span class="pcat71-infotip-keep"><strong>4.2L/100km.</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-308'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/8416e689d8e1459f9360bc5dc590c6ba.png'
      },
      card2: {
        title: 'PEUGEOT i-Cockpit®',
        description: `10” HD display with Apple CarPlay® and Android Auto™  <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-308'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/6088e6e11725464cab89ab6d8442e98a.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Uncompromising Style',
        description: 'The PEUGEOT 308 GT Hybrid captivates with its striking stance, muscular rear, and sleek silhouette.',
        image: '//cdn.optimizely.com/img/15841360337/56ebc8fb35fc49f19be22fa6f74cd349.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year UNLIMITED KM <span class="pcat71-infotip-keep">WARRANTY${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-308'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-308'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/d87c8cc8cbb641be96d82a6a436e3acb.png'
      }
    },
    '408-hybrid': {
      card1: {
        title: 'Turbo Hybrid Powertrain',
        description: `Drive further on a single tank with fuel consumption from <span class="pcat71-infotip-keep"><strong>4.7L/100km.</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-408'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/b98612d9a70b447e81ed6194a1207fde.png'
      },
      card2: {
        title: 'PEUGEOT i-Cockpit®',
        description: `10” HD display with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-408'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/319f2fa7ef9b4471bb35c6df85cb380f.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Unmistakably PEUGEOT',
        description: 'Unexpected and striking, the PEUGEOT 408 GT PREMIUM HYBRID stands out with its sleek, feline posture.',
        image: '//cdn.optimizely.com/img/15841360337/0a421578409c42538c1252a95092d40f.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year UNLIMITED KM <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-408'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-408'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/488f2005d8764bf293b2b58f0b7d86eb.png'
      }
    },
    'partner-van': {
      card1: {
        title: 'Efficient Puretech Petrol Engine',
        description: `Drive further with fuel consumption from <span class="pcat71-infotip-keep"><strong>6.3L/100km</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-partner'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/4ae10f77230747f8945847b5e0685b3e.png'
      },
      card2: {
        title: 'Touchscreen',
        description: `10” HD touchscreen display with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-partner'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/ec7be84a885c46ad8278c5e7bd730412.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Large Payload Capacity',
        description: 'Take advantage of payload capacity of up to 1,000kg and a spacious load volume to 4.4m³',
        image: '//cdn.optimizely.com/img/15841360337/410bab5ded4640eb8279228b7f60bcb8.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year/200,000 KM warranty <span class="pcat71-infotip-keep">WARRANTY${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-partner'
        })}</span> plus complimentary 5-year PEUGEOT Roadside Assistance. <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-partner'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/1fbddcfd35484f89af0895c8e13e0ccc.png'
      }
    },
    'new-e-partner-van': {
      card1: {
        title: '30 Min to Recover 80% Range',
        description: `100% electric driving range up to 258km with a 100kW motor and 50kWh battery. <span class="pcat71-infotip-keep">${config.buildInfoTipHtml({
          ariaLabel: 'Battery disclaimer',
          message: PCAT71_BATTERY_WLTP_DISCLAIMER,
          instanceId: 'battery-e-partner'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/d3fcec9868f6437b89229edadddebbaa.png'
      },
      card2: {
        title: 'Touchscreen',
        description: `10” HD touchscreen display with Apple CarPlay® and Android Auto™  <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-e-partner'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/1414bd0fcde249be88376c2fac0704c4.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Large Payload Capacity',
        description: 'Take advantage of payload capacity of up to 717kg and a spacious load volume of 3.9m³',
        image: '//cdn.optimizely.com/img/15841360337/bce49c8d76a9407d861b520fc9dae6ec.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year/200,000 KM <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-e-partner'
        })}</span> as well as an 8 Year/160,000km battery <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-e-partner'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/5ba14592f3964f95895934f464010f6c.png'
      }
    },
    'diesel-expert-van': {
      card1: {
        title: 'Powerful 2.0L BlueHDi Diesel Engine',
        description: `Drive further with fuel consumption from <span class="pcat71-infotip-keep"><strong>6.3L/100km</strong>${config.buildInfoTipHtml({
          ariaLabel: 'Fuel consumption disclaimer',
          message: PCAT71_FUEL_ADR_DISCLAIMER,
          instanceId: 'fuel-expert'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/16c3d601ed8e4153a8695c339e7e639c.png'
      },
      card2: {
        title: 'Touchscreen',
        description: `10” HD touchscreen display with Apple CarPlay® and Android Auto™  <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-expert'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/c59ca08107e344fbb1aa87b877b39ab6.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Large Payload Capacity',
        description: 'Take advantage of payload capacity of up to 1,350kg and a spacious load volume of 6.6m³',
        image: '//cdn.optimizely.com/img/15841360337/693f4529e47c48bf8fe74710d4eb4ace.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year/200,000 KM <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-expert'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-expert'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/1b4038a250c04569bc8443daef50f1ce.png'
      }
    },
    'e-expert': {
      card1: {
        title: '45 Min to Recover 80% Range',
        description: `100% electric driving range up to 330km, with a 100kW motor and 75kWh<span class="pcat71-infotip-keep">battery${config.buildInfoTipHtml({
          ariaLabel: 'Battery disclaimer',
          message: PCAT71_BATTERY_WLTP_DISCLAIMER,
          instanceId: 'battery-e-expert'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/3d276b9f423e4c84b4709d2a9306b827.png'
      },
      card2: {
        title: 'Touchscreen',
        description: `10” touchscreen with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">wireless connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Wireless connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'wireless-e-expert'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/03be5eeceb1140df852dd0229ed9b4cf.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Large Payload Capacity',
        description: 'Payload capacity of up to 1,000kg and a spacious load volume of 6.1m³',
        image: '//cdn.optimizely.com/img/15841360337/942e53ffc3724a57943c4e462e044836.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year/200,000 KM <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-e-expert'
        })}</span> as well as an 8 Year/160,000km battery <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Battery warranty disclaimer',
          message: PCAT71_BATTERY_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'battery-warranty-e-expert'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/b925a7e9fd8443b795aeaa2d15027368.png'
      }
    },
    'boxer-van': {
      card1: {
        title: 'Turbo Diesel Powertrain',
        description: 'A powerful 2.2L HDi Common Rail Turbo Diesel Engine producing 121kW / 370 Nm.',
        image: '//cdn.optimizely.com/img/15841360337/6aaabd8481ad453e88e451d4ecd7d80c.png'
      },
      card2: {
        title: 'Touchscreen',
        description: `9” touchscreen with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'connectivity-boxer'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/79e577fe649a43749f623abaa2a02ee6.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Large Payload Capacity',
        description: 'Payload capacity of up to 1,450kg, a spacious load volume of 13m³ and 2.5T towing capacity.',
        image: '//cdn.optimizely.com/img/15841360337/446e6517c4ed473d8b4c63c06773c2f0.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year/200,000 KM <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-boxer'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-boxer'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/f3852200d7154b6f9d8d13e7317b45a5.png'
      }
    },
    'new-boxer-van-diesel': {
      card1: {
        title: 'Turbo Diesel Powertrain',
        description: 'A powerful 2.2L HDi Common Rail Turbo Diesel Engine producing 132kW / 450 Nm.',
        image: '//cdn.optimizely.com/img/15841360337/301ed562b38d403e907afbc324951c3f.png'
      },
      card2: {
        title: 'Touchscreen',
        description: `9” touchscreen with Apple CarPlay® and Android Auto™ <span class="pcat71-infotip-keep">connectivity.${config.buildInfoTipHtml({
          ariaLabel: 'Connectivity disclaimer',
          message: PCAT71_WIRELESS_DISCLAIMER,
          instanceId: 'connectivity-new-boxer'
        })}</span>`,
        image: '//cdn.optimizely.com/img/15841360337/7aa7106e85b4449abdf49777c05d8b55.png',
        imageDisclaimerOverlay: true
      },
      card3: {
        title: 'Large Payload Capacity',
        description: 'Payload capacity of up to 1,326kg, a spacious load volume of 13m³ and 3T towing capacity.',
        image: '//cdn.optimizely.com/img/15841360337/c5aecb0e31f14dabaf8715aa059289b5.png'
      },
      card4: {
        title: '5-Years Peace of Mind',
        description: `5-year/200,000 KM <span class="pcat71-infotip-keep">warranty${config.buildInfoTipHtml({
          ariaLabel: 'Warranty disclaimer',
          message: PCAT71_WARRANTY_DISCLAIMER,
          visitHref: PCAT71_WARRANTY_URL,
          instanceId: 'warranty-new-boxer'
        })}</span> plus complimentary 5-year PEUGEOT Roadside <span class="pcat71-infotip-keep">Assistance${config.buildInfoTipHtml({
          ariaLabel: 'Roadside assistance disclaimer',
          message: PCAT71_ROADSIDE_DISCLAIMER,
          visitHref: PCAT71_ROADSIDE_URL,
          instanceId: 'roadside-new-boxer'
        })}</span>.`,
        image: '//cdn.optimizely.com/img/15841360337/78918899d01847ec9aa70bea9b4c7030.png'
      }
    }
  };

  /* eslint-disable no-console */

  (function kamPcat71V1() {
    function init() {
      console.log('%c *** PCAT71 Started local running *** ***', 'background: #16b271; color: #fff; padding: 4px;');
      document.body.classList.add('pcat71');
      config.insertHTML();
      config.setupMobileCarousel();
      config.setupInfoTipFixedPositioning();
    }
    if (!window.__kam405277Initialized) {
      window.__kam405277Initialized = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('.main-section .q-modal-content .canvas'), init);
    }
  })();
})();