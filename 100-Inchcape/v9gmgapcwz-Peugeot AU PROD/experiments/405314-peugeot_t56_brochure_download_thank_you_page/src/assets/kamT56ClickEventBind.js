/* eslint-disable prefer-const */
import kamT56CloseModalClickEvent from './kamT56CloseModalClickEvent.js';
import kamT56GetImageUrl from './kamT56GetImageUrl.js';
import kamT56HtmlAdd from './kamT56HtmlAdd.js';
import kamT56ProcessGoal from './kamT56ProcessGoal.js';

const ModelCodes = {
    '308 HATCH': '308 Hatch',
    '308 WAGON': '308 Wagon',
    '5008 HYBRID SUV': '5008 Hybrid',
    'MY23 E-PARTNER VAN': 'E-Partner Van',
    'MY23 EXPERT VAN': 'Expert Van',
    'E-EXPERT VAN': 'E-Expert Van',
    'NEW BOXER VAN': 'New Boxer Van',
    '308 HATCH HYBRID': '308 Hybrid',
    '408 HYBRID': '408 Hybrid',
    '2008 SUV': '2008 SUV',
    '2008 HYBRID SUV': '2008 Hybrid',
    '3008 HYBRID SUV': '3008 Hybrid',
    'PARTNER VAN': 'Partner Van',
    'MY25 EXPERT VAN': 'New Expert Van',
    'E-PARTNER VAN': 'E-Partner Van',
    'EXPERT VAN': 'Expert Van',
    'BOXER VAN': 'Boxer Van',
    508: '508 Fastback',
    '508 SPORTSWAGON': '508 Sportswagon',
    '5008 SUV': '5008 SUV'
};

let targetUrl = '';
const currentModelInfo = { name: '', code: '', imageUrl: '' };

function updateExistingModal(modelInfo) {
    const modal = document.querySelector('.t56ModalOverlay');
    if (modal) {
        modal.setAttribute('data-current-model', modelInfo.name);
        modal.setAttribute('data-modelName', modelInfo.name);
    }
    const imgUrl = kamT56GetImageUrl(modelInfo.code || modelInfo.name);
    const imgStep1 = document.querySelector('.t56Step1 .t56ModalImage');
    const imgStep2 = document.querySelector('.t56Step2 .t56ModalImage');
    if (imgStep1) imgStep1.setAttribute('src', imgUrl);
    if (imgStep2) imgStep2.setAttribute('src', imgUrl);
    const configureBtn = document.querySelector('.t56Step2 .t56ConfigureBtn');
    if (configureBtn) {
        configureBtn.setAttribute('data-model', modelInfo.name);
        configureBtn.textContent = `CONFIGURE A ${modelInfo.name}`;
    }
    const contents = document.querySelectorAll('.t56ModalContent');
    if (contents.length > 0) {
        contents[0].textContent = "Please enter your email so that you're able to download your digital brochure.";
    }

    const step1 = document.querySelector('.t56Step1');
    if (step1) {
        const legacyForm = step1.querySelector('form');
        if (legacyForm) {
            legacyForm.remove();
        }

        let iframe = document.getElementById('t56FormIframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 't56FormIframe';
            iframe.className = 't56IframeForm';
            iframe.title = 'Download brochure form';
            step1.appendChild(iframe);
        }

        iframe.src = 'https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat56kam=true';

        const email = localStorage.getItem('userEmail')
            || sessionStorage.getItem('t56EmailCollected')
            || '';
        const formModelValue = window.targetModalCode || modelInfo.code || modelInfo.name;

        iframe.onload = () => {
            setTimeout(() => {
                try {
                    iframe.contentWindow.postMessage(
                        {
                            type: 'SET_FORM_DATA',
                            model: formModelValue,
                            email
                        },
                        'https://peugeotforms.inchcape.com.au'
                    );
                } catch (e) {
                    // Silent fail if iframe is not accessible
                }
            }, 500);
        };
    }
}

function preloadIframe() {
    const preloadFrame = document.createElement('iframe');
    preloadFrame.id = 't56PreloadIframe';
    preloadFrame.style.display = 'none';
    preloadFrame.src = 'https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat56kam=true';
    document.body.appendChild(preloadFrame);
    console.log('[PCAT56] Iframe preloaded for faster modal opening');
}

function kamT56HandleIframeMessage(event) {
    if (event.origin !== 'https://peugeotforms.inchcape.com.au') {
        return;
    }

    if (event.data === 'childReady' || (event.data && event.data.type === 'childReady')) {
        const iframe = document.getElementById('t56FormIframe');
        if (iframe && iframe.contentWindow) {
            const email = localStorage.getItem('userEmail')
                || sessionStorage.getItem('t56EmailCollected')
                || '';
            const overlay = document.querySelector('.t56ModalOverlay');
            const modalModelName = overlay ? overlay.getAttribute('data-current-model') : '';
            const formModelValue = window.targetModalCode || modalModelName || '';

            const message = {
                type: 'SET_FORM_DATA',
                model: formModelValue,
                email
            };
            iframe.contentWindow.postMessage(message, 'https://peugeotforms.inchcape.com.au');
        }
        return;
    }

    const isFormSubmitting = (event.data && event.data.type === 'FORM_SUBMITTING' && event.data.experiment === 'pcat56')
        || (event.data && event.data.type === 'PCAT56_FORM_SUCCESS')
        || (event.data && event.data.action === 'showSuccessAndCloseModal')
        || (event.data && event.data.event === 'updatevirtualpath');

    if (isFormSubmitting) {
        let model = (event.data && event.data.model) || '';
        const email = (event.data && event.data.email) || (event.data && event.data.userEmail) || '';

        if (!model) {
            const overlay = document.querySelector('.t56ModalOverlay');
            model = window.targetModalCode
                || (overlay && overlay.getAttribute('data-current-model'))
                || (overlay && overlay.getAttribute('data-modelName'))
                || '';
        }

        const step1 = document.querySelector('.t56Step1');
        const step2 = document.querySelector('.t56Step2');

        if (step1) {
            step1.style.display = 'none';
        } else {
            console.error('[PCAT56 parent] ❌ t56Step1 NOT FOUND');
        }

        if (step2) {
            step2.removeAttribute('style');
            step2.style.cssText = 'display: block !important;';
        } else {
            console.error('[PCAT56 parent] ❌ t56Step2 NOT FOUND');
        }

        const overlay = document.querySelector('.t56ModalOverlay');
        const modalModelName = model || (overlay && overlay.getAttribute('data-current-model')) || 'Vehicle';

        const configureBtn = document.querySelector('.t56Step2 .t56ConfigureBtn');
        if (configureBtn) {
            configureBtn.setAttribute('data-model', modalModelName);
            configureBtn.textContent = `CONFIGURE A ${modalModelName}`;
        }

        const modelCode = ModelCodes[modalModelName] || modalModelName;
        const imageUrl = kamT56GetImageUrl(modelCode);
        const imgStep2 = document.querySelector('.t56Step2 .t56ModalImage');
        if (imgStep2) imgStep2.setAttribute('src', imageUrl);

        sessionStorage.setItem('T56ModalSubmitted', 'true');
        sessionStorage.setItem('t56EmailCollected', email);

        return;
    }

    if (event.data && event.data.type === 'FORM_SUBMIT_SUCCESS' && event.data.experiment === 'pcat56') {
        try {
            kamT56ProcessGoal('Brochure Contact Details T56');
        } catch (e) {
            console.error('[PCAT56 parent] Error triggering analytics:', e);
        }
    }
}

function kamT56BindBrochureAnchorClicks(anchors) {
    anchors.forEach((anchor) => {
        Kameleoon.API.Utils.addEventListener(anchor, 'click', (event) => {
            if (
                sessionStorage.getItem('T24EmailCollected')
                && sessionStorage.getItem('T56ModalSubmitted')
            ) {
                document.body.classList.remove('t24ModalShow');
                window.open(event.currentTarget.getAttribute('href'), '_blank');
                return;
            }
            document.body.classList.remove('t24Allowed');
            const grid = event.target.closest('.aem-Grid');
            const labelDiv = grid ? grid.querySelector('.q-label div') : null;
            const Name = labelDiv ? labelDiv.textContent.trim() : '';

            if (sessionStorage.getItem('T56ModalSubmitted')) {
                window.open(event.currentTarget.getAttribute('href'), '_blank');
                return;
            }

            if (Name === '508' || Name === '508 SPORTSWAGON') {
                if (sessionStorage.getItem('T56ModalSubmitted')) {
                    window.open(event.currentTarget.getAttribute('href'), '_blank');
                    return;
                }
                event.preventDefault();
                document.body.classList.remove('t24notAllowed');
                document.body.classList.add('t24Allowed');
                document.body.classList.add('t24ModalShow');

                targetUrl = event.currentTarget.getAttribute('href');
                return;
            }
            document.body.classList.add('t24notAllowed');
            document.body.classList.remove('t24ModalShow');

            currentModelInfo.name = Name || 'Vehicle';
            currentModelInfo.code = ModelCodes[Name] || currentModelInfo.name;
            currentModelInfo.imageUrl = kamT56GetImageUrl(currentModelInfo.code || currentModelInfo.name);
            window.targetModalCode = currentModelInfo.code;
            if (!sessionStorage.getItem('T56ModalSubmitted')) {
                event.preventDefault();
                targetUrl = anchor.getAttribute('href');
                const preloadImg = new window.Image();
                preloadImg.onload = function onModalImageLoad() {
                    if (!document.querySelector('.t56ModalOverlay')) {
                        kamT56HtmlAdd(currentModelInfo.name);
                    } else {
                        updateExistingModal(currentModelInfo);
                    }
                    const imgStep1 = document.querySelector('.t56Step1 .t56ModalImage');
                    const imgStep2 = document.querySelector('.t56Step2 .t56ModalImage');
                    if (imgStep1) imgStep1.setAttribute('src', currentModelInfo.imageUrl);
                    if (imgStep2) imgStep2.setAttribute('src', currentModelInfo.imageUrl);
                    setTimeout(() => {
                        document.body.className = document.body.className.replace(/t\d+ModalShow/g, '').trim();
                        document.body.classList.add('t56ModalShow');
                    }, 0);
                };
                preloadImg.src = currentModelInfo.imageUrl;
            }
        });
    });
}

function kamT56BindDocumentClicks() {
    Kameleoon.API.Utils.addEventListener(document, 'click', (event) => {
        if (event.target.classList.contains('t56CheckboxInput')) {
            event.target.classList.toggle('t56Active');
            const wrapper = document.querySelector('.t56CheckboxWrapper');
            if (wrapper) wrapper.classList.remove('t56errorShow');
        }

        if (event.target.classList.contains('t56SubmitButton')) {
            console.warn('[PCAT56] Old inline form submit detected - this should not be used with iframe implementation');
        }

        if (event.target.classList.contains('t56ConfigureBtn')) {
            const model = event.target.getAttribute('data-model');
            const base = 'https://configurator.peugeot.com.au/';
            const url = `${base}?model=${encodeURIComponent(model || 'vehicle')}`;
            window.open(url, '_blank');
        }

        if (event.target.classList.contains('t56FinalDownloadBtn')) {
            if (targetUrl) {
                setTimeout(() => {
                    window.open(targetUrl, '_blank');
                }, 3000);
            }
            document.body.classList.remove('t56ModalShow');
        }

        if (event.target.classList.contains('t56CloseButton')) {
            document.body.classList.remove('t56ModalShow');
        }

        if (event.target.classList.contains('t24SubmitButton')) {
            const emailInput = document.querySelector('.t24EmailInput');
            const emailValid = emailInput && emailInput.value && /.+@.+\..+/.test(emailInput.value);
            const checkbox = document.querySelector('.t24CheckboxInput');
            const checkboxChecked = checkbox && checkbox.classList.contains('t24Active');
            if (emailValid && checkboxChecked) {
                sessionStorage.setItem('T56ModalSubmitted', 'true');
                sessionStorage.setItem('T24EmailCollected', emailInput.value);
                document.body.classList.remove('t24ModalShow');
            }
        }
    });
}

export default function kamT56ClickEventBind() {
    Kameleoon.API.Utils.addEventListener(window, 'message', kamT56HandleIframeMessage);

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.readyState !== 'loading',
        () => {
            setTimeout(preloadIframe, 1000);
        },
    );

    Kameleoon.API.Core.runWhenElementPresent(
        '#main .q-modal-content .aem-Grid a[data-gtm-event-category="d1-content::Content"]',
        kamT56BindBrochureAnchorClicks,
    );

    kamT56BindDocumentClicks();
    kamT56CloseModalClickEvent();
}
