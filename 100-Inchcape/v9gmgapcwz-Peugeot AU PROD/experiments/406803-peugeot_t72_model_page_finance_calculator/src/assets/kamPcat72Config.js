/* eslint-disable max-len */
/* eslint-disable import/extensions */
import kamPcat72ProcessGoal from './kamPcat72ProcessGoal.js';

const PCAT72_MODEL_CONFIG = {
    '2008-hybrid-suv': {
        calculatorPath: '/2008-HYBRID-SUV/?variant=2129',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'UNMISTAKABLY PEUGEOT');

            return heading ? heading.closest('div.grid_builder_v2.grid_builder') : null;
        }
    },
    '3008-hybrid-suv': {
        calculatorPath: '/3008-HYBRID-SUV/?variant=2121',
        getTargetElement: () => {
            const photolink = [...document.querySelectorAll('a.wlb-button-wrapper--element')]
                .find(el => el.textContent.trim() === 'VIEW PHOTOS & VIDEOS');

            return photolink ? photolink.closest('.canvas.aem-GridColumn--default--12') : null;
        }
    },
    '5008-hybrid-suv': {
        calculatorPath: '/5008-HYBRID-SUV/?variant=2130',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'CHOOSE YOUR PEUGEOT 5008 HYBRID');

            return heading ? heading.closest('.grid_builder_v2.grid_builder') : null;
        }
    },
    '308-hybrid': {
        calculatorPath: '/308-Hatch/?variant=2118',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'CHOOSE YOUR PEUGEOT 308 HYBRID');

            return heading ? heading.closest('.grid_builder_v2.grid_builder') : null;
        }
    },
    '408-hybrid': {
        calculatorPath: '/408/?variant=2098',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'CHOOSE YOUR PEUGEOT 408 HYBRID');

            return heading ? heading.closest('.grid_builder_v2.grid_builder') : null;
        }
    },
    'partner-van': {
        calculatorPath: '/Partner-Van/?variant=2112',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'DIMENSIONS OF THE PEUGEOT PARTNER');

            return heading ? heading.closest('.grid_builder_v2.grid_builder') : null;
        }
    },
    'diesel-expert-van': {
        calculatorPath: '/Expert-Van/?variant=2045',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'THE MAIN ADVANTAGES OF YOUR NEW EXPERT');

            return heading ? heading.closest('.grid_builder_v2.grid_builder') : null;
        }
    },
    'boxer-van': {
        calculatorPath: '/Boxer-Van/?variant=2037',
        getTargetElement: () => {
            const heading = [...document.querySelectorAll('h2')]
                .find(el => el.textContent.trim() === 'A PEUGEOT BOXER FOR EVERY JOB');

            return heading ? heading.closest('.grid_builder_v2.grid_builder') : null;
        }
    }
};

const kamPcat72Config = {
    getModelFromUrl: () => {
        const currentPath = window.location.pathname.toLowerCase();

        if (currentPath.includes('/models/new-peugeot-3008/hybrid') || currentPath.includes('/models/3008-hybrid-suv')) {
            return '3008-hybrid-suv';
        }

        if (currentPath.includes('/models/2008-hybrid-suv')) {
            return '2008-hybrid-suv';
        }

        if (currentPath.includes('/models/5008-hybrid-suv')) {
            return '5008-hybrid-suv';
        }

        if (currentPath.includes('/models/308-hybrid')) {
            return '308-hybrid';
        }

        if (currentPath.includes('/models/408-hybrid')) {
            return '408-hybrid';
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

    getTargetElement: (modelSlug) => {
        const modelConfig = PCAT72_MODEL_CONFIG[modelSlug];

        if (!modelConfig || typeof modelConfig.getTargetElement !== 'function') {
            return null;
        }

        return modelConfig.getTargetElement();
    },

    getCalculatorIframeSrc: (modelSlug) => {
        const modelConfig = PCAT72_MODEL_CONFIG[modelSlug];

        if (!modelConfig) {
            return null;
        }

        const baseUrl = `https://peugeotfinancecalculator.pcaconnect.com.au${modelConfig.calculatorPath}`;
        const separator = baseUrl.includes('?') ? '&' : '?';

        return `${baseUrl}${separator}pcat72kam=testing`;
    },

    scrollToIframe: () => {
        const scrollTarget = document.querySelector('.pcat72-iframe');
        const headerOffset = 0;

        if (!scrollTarget) {
            return;
        }

        const top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: Math.max(top, 0),
            behavior: 'smooth'
        });
    },

    bindIframeLoadOverlay: (iframe, wrapper) => {
        if (!iframe || !wrapper || iframe.dataset.pcat72LoadBound === 'true') {
            return;
        }

        iframe.dataset.pcat72LoadBound = 'true';

        Kameleoon.API.Utils.addEventListener(iframe, 'load', () => {
            wrapper.classList.add('pcat72-iframe-wrapper--loading');
        });
    },

    applyIframeLayout: ({ height, termsExpanded, termsOverflow }) => {
        const iframe = document.querySelector('.pcat72-iframe');
        const wrapper = document.querySelector('.pcat72-iframe-wrapper');

        if (!iframe || Number.isNaN(height)) {
            return;
        }

        window.sessionStorage.setItem('pcat72IframeHeight', String(height));

        iframe.style.height = `${height}px`;
        iframe.setAttribute('scrolling', 'no');

        if (!wrapper) {
            return;
        }

        wrapper.style.height = `${height}px`;
        wrapper.classList.remove('pcat72-iframe-wrapper--loading');
        wrapper.classList.toggle('pcat72-iframe-wrapper--terms-open', Boolean(termsExpanded));

        if (termsExpanded && termsOverflow > 0) {
            wrapper.style.marginBottom = `-${termsOverflow}px`;
            return;
        }

        wrapper.style.marginBottom = '0';
    },

    bindIframeHeightListener: () => {
        const iframeOrigin = 'https://peugeotfinancecalculator.pcaconnect.com.au';

        if (window.pcat72HeightListenerBound) {
            return;
        }

        window.pcat72HeightListenerBound = true;

        Kameleoon.API.Utils.addEventListener(window, 'message', (event) => {
            if (event.origin !== iframeOrigin) {
                return;
            }

            if (event.data && event.data.type === 'PCAT72_SCROLL_TO_IFRAME') {
                kamPcat72Config.scrollToIframe();
                return;
            }

            if (event.data && event.data.type === 'PCAT72_IFRAME_LAYOUT') {
                kamPcat72Config.applyIframeLayout(event.data);
                return;
            }

            if (event.data && event.data.type === 'PCAT72_CTA_CLICK' && event.data.cta) {
                kamPcat72ProcessGoal(event.data.cta);
            }
        });
    },

    insertHTML: () => {
        const modelSlug = kamPcat72Config.getModelFromUrl();
        const iframeSrc = kamPcat72Config.getCalculatorIframeSrc(modelSlug);
        const targetElement = kamPcat72Config.getTargetElement(modelSlug);

        if (!modelSlug || !iframeSrc || !targetElement || document.querySelector('.pcat72-iframe-wrapper')) {
            return;
        }

        kamPcat72Config.bindIframeHeightListener();

        const savedHeight = window.sessionStorage.getItem('pcat72IframeHeight');
        const initialHeight = savedHeight && !Number.isNaN(Number(savedHeight)) ? Number(savedHeight) : 600;

        const partnerVanTitleClass = modelSlug === 'partner-van' ? ' pcat72-iframe-title--partner-van' : '';

        targetElement.insertAdjacentHTML('beforebegin', `
            <h2 class="pcat72-iframe-title${partnerVanTitleClass}">See What a PEUGEoT ${modelSlug.replace('-', ' ').replace(' ', ' ')} Costs to Drive</h2>
            <p class="pcat72-iframe-description">Adjust your deposit and terms to suit your budget.</p>
            <div class="pcat72-iframe-wrapper pcat72-iframe-wrapper--loading" style="height: ${initialHeight}px;">
                <iframe
                    class="pcat72-iframe"
                    src="${iframeSrc}"
                    width="100%"
                    height="${initialHeight}"
                    frameborder="0"
                    scrolling="no"
                    style="border: 0; display: block; width: 100%; height: ${initialHeight}px;"
                    allowfullscreen>
                </iframe>
            </div>`);

        const wrapper = document.querySelector('.pcat72-iframe-wrapper');
        const iframe = document.querySelector('.pcat72-iframe');

        kamPcat72Config.bindIframeLoadOverlay(iframe, wrapper);
    }
};

export default kamPcat72Config;
