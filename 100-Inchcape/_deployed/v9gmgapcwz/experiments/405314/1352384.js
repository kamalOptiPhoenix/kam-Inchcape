"use strict";

(function () {
  function kamT56CloseModalClickEvent() {
    Kameleoon.API.Utils.addEventListener(document, 'click', event => {
      const overlay = document.querySelector('.t56ModalOverlay');
      if (overlay && event.target === overlay) {
        document.body.classList.remove('t56ModalShow');
      }
      if (event.target.classList.contains('t56CloseButton')) {
        document.body.classList.remove('t56ModalShow');
      }
    });
  }

  /* eslint-disable no-tabs */

  const ModelImages = {
    'New 408 Hybrid': 'https://cdn.optimizely.com/img/15841360337/421762776999436191b848fba63086be.png',
    408: 'https://cdn.optimizely.com/img/15841360337/a147bcbb08f943ac8e3ed03cf080cd8e.png',
    Expert: 'https://cdn.optimizely.com/img/15841360337/75622d91515545be850f53e8f7101c11.png',
    'MY23 Expert Van': 'https://cdn.optimizely.com/img/15841360337/ef7ff4035f52407c891a3072ba983fca.png',
    'MY25 Expert Van': 'https://cdn.optimizely.com/img/15841360337/3e8e2be5c63c4af7899c0d5114d5fd8d.png',
    '308 Wagon': 'https://cdn.optimizely.com/img/15841360337/7002a92f8bc84e939f848f6d571e5060.png',
    'E-Expert Van': 'https://cdn.optimizely.com/img/15841360337/c97709804341400b8301a74324df5cc9.png',
    'Hybrid 2008': 'https://cdn.optimizely.com/img/15841360337/b090585d3cb742aebb0278a00566ad03.png',
    'E-Partner Van': 'https://cdn.optimizely.com/img/15841360337/857c7abc96024f7baeb43c819b9804ba.png',
    Partner: 'https://cdn.optimizely.com/img/15841360337/ad108d9387634bdcbb18dec33ddf5dde.png',
    '2008 SUV': 'https://cdn.optimizely.com/img/15841360337/2e9aba6f1d1e453a83363beac2281d9b.png',
    '308 Hatch Hybrid': 'https://cdn.optimizely.com/img/15841360337/223d738097254803abd10fb1d5777ae5.png',
    '308 Hatch': 'https://cdn.optimizely.com/img/15841360337/6b7f575178e84770a643f66c90ecdf46.png',
    'Boxer Van': 'https://cdn.optimizely.com/img/15841360337/5859730be0d842b09225b2db4a550865.png',
    '5008 SUV': 'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '5008 Hybrid': 'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '3008 Hybrid': 'https://cdn.optimizely.com/img/15841360337/d7f0770e93b04cc19a1d589aa2044b05.png',
    'MY23 E-Partner Van': 'https://cdn.optimizely.com/img/15841360337/ddc0089da1dd47d4a7f8c336bca378bb.png',
    'New Boxer Van': 'https://cdn.optimizely.com/img/15841360337/0a249412b72743409705abf48ee191a9.png'
  };
  const ModelImagesMobile = {
    'New 408 Hybrid': 'https://cdn.optimizely.com/img/15841360337/421762776999436191b848fba63086be.png',
    408: 'https://cdn.optimizely.com/img/15841360337/a147bcbb08f943ac8e3ed03cf080cd8e.png',
    Expert: 'https://cdn.optimizely.com/img/15841360337/75622d91515545be850f53e8f7101c11.png',
    'MY23 Expert Van': 'https://cdn.optimizely.com/img/15841360337/ef7ff4035f52407c891a3072ba983fca.png',
    'MY25 Expert Van': 'https://cdn.optimizely.com/img/15841360337/3e8e2be5c63c4af7899c0d5114d5fd8d.png',
    '308 Wagon': 'https://cdn.optimizely.com/img/15841360337/7002a92f8bc84e939f848f6d571e5060.png',
    'E-Expert Van': 'https://cdn.optimizely.com/img/15841360337/c97709804341400b8301a74324df5cc9.png',
    'Hybrid 2008': 'https://cdn.optimizely.com/img/15841360337/b090585d3cb742aebb0278a00566ad03.png',
    'E-Partner Van': 'https://cdn.optimizely.com/img/15841360337/857c7abc96024f7baeb43c819b9804ba.png',
    Partner: 'https://cdn.optimizely.com/img/15841360337/ad108d9387634bdcbb18dec33ddf5dde.png',
    '2008 SUV': 'https://cdn.optimizely.com/img/15841360337/2e9aba6f1d1e453a83363beac2281d9b.png',
    '308 Hatch Hybrid': 'https://cdn.optimizely.com/img/15841360337/223d738097254803abd10fb1d5777ae5.png',
    '308 Hatch': 'https://cdn.optimizely.com/img/15841360337/6b7f575178e84770a643f66c90ecdf46.png',
    'Boxer Van': 'https://cdn.optimizely.com/img/15841360337/5859730be0d842b09225b2db4a550865.png',
    '5008 SUV': 'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '5008 Hybrid': 'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '3008 Hybrid': 'https://cdn.optimizely.com/img/15841360337/d7f0770e93b04cc19a1d589aa2044b05.png',
    'MY23 E-Partner Van': 'https://cdn.optimizely.com/img/15841360337/da3e13b4064f4dc789a4a1a5aa53463f.png',
    'New Boxer Van': 'https://cdn.optimizely.com/img/15841360337/67e86320054e4f918a3b1a147666a4e1.png'
  };
  const fallbackImageUrl = 'https://cdn.optimizely.com/img/15841360337/2e9aba6f1d1e453a83363beac2281d9b.png';
  function kamT56GetImageUrl(modelName) {
    if (window.innerWidth < 768) {
      if (ModelImagesMobile[modelName]) return ModelImagesMobile[modelName];
    }
    if (ModelImages[modelName]) return ModelImages[modelName];
    const imagesObj = window.innerWidth < 768 ? ModelImagesMobile : ModelImages;
    let imageKey = Object.keys(imagesObj).find(key => key.toLowerCase() === modelName.toLowerCase());
    if (!imageKey) {
      imageKey = Object.keys(imagesObj).find(key => key.toLowerCase().includes(modelName.toLowerCase()));
    }
    if (window.innerWidth < 768 && imageKey && ModelImagesMobile[imageKey]) {
      return ModelImagesMobile[imageKey];
    }
    return imageKey ? ModelImages[imageKey] : fallbackImageUrl;
  }
  function kamT56HtmlAdd(modelName) {
    const safeModelName = modelName || 'Vehicle';
    const imgUrl = kamT56GetImageUrl(safeModelName);
    const modalHtml = `
        <div class="t56ModalOverlay" data-current-model="${safeModelName}" data-modelName="${safeModelName}">
            <div class="t56ModalContainer">
                <span class="t56CloseButton">×</span>
                <div class="t56Step1">
                    <img src="${imgUrl}" class="t56ModalImage t56Step1Image" />
                    <h4 class="t56ModalHeading">DOWNLOAD BROCHURE</h4>
                    <p class="t56ModalContent">
                        Please enter your email so that you're able to download your digital brochure.
                    </p>
                    <iframe
                        id="t56FormIframe"
                        src="https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat56kam=true"
                        title="Download brochure form"
                        class="t56IframeForm"
                    ></iframe>
                </div>
                <div class="t56Step2" style="display: none;">
                    <img src="${imgUrl}" class="t56ModalImage t56Step2Image" />
                    <h4 class="t56ModalHeading">THANK YOU!</h4>
                    <p class="t56ModalContent">Download your digital brochure below</p>
                    <a class="t56FinalDownloadBtn" href="javascript:void(0);">DOWNLOAD BROCHURE</a>
                    <p class="t56ModalContent">You may also like to</p>
                     <a href="https://configurator.peugeot.com.au" target="_blank" class="t56Link2 t56Link">CONFIGURE A ${safeModelName}</a>
                   
                    <div class="t56BottomLinks">
                        <a href="https://www.peugeot.com.au/tools/enquiry.html" target="_blank" class="t56Link">Make an enquiry</a>
                        <a href="https://www.peugeot.com.au/tools/find-retailer.html" target="_blank" class="t56Link">Find a dealer</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', modalHtml);
  }

  /* eslint-disable prefer-const */
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
  const currentModelInfo = {
    name: '',
    code: '',
    imageUrl: ''
  };
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
      const email = localStorage.getItem('userEmail') || sessionStorage.getItem('t56EmailCollected') || '';
      const formModelValue = window.targetModalCode || modelInfo.code || modelInfo.name;
      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow.postMessage({
              type: 'SET_FORM_DATA',
              model: formModelValue,
              email
            }, 'https://peugeotforms.inchcape.com.au');
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
  }
  function kamT56HandleIframeMessage(event) {
    if (event.origin !== 'https://peugeotforms.inchcape.com.au') {
      return;
    }
    if (event.data === 'childReady' || event.data && event.data.type === 'childReady') {
      const iframe = document.getElementById('t56FormIframe');
      if (iframe && iframe.contentWindow) {
        const email = localStorage.getItem('userEmail') || sessionStorage.getItem('t56EmailCollected') || '';
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
    const isFormSubmitting = event.data && event.data.type === 'FORM_SUBMITTING' && event.data.experiment === 'pcat56' || event.data && event.data.type === 'PCAT56_FORM_SUCCESS' || event.data && event.data.action === 'showSuccessAndCloseModal' || event.data && event.data.event === 'updatevirtualpath';
    if (isFormSubmitting) {
      let model = event.data && event.data.model || '';
      const email = event.data && event.data.email || event.data && event.data.userEmail || '';
      if (!model) {
        const overlay = document.querySelector('.t56ModalOverlay');
        model = window.targetModalCode || overlay && overlay.getAttribute('data-current-model') || overlay && overlay.getAttribute('data-modelName') || '';
      }
      const step1 = document.querySelector('.t56Step1');
      const step2 = document.querySelector('.t56Step2');
      if (step1) {
        step1.style.display = 'none';
      }
      if (step2) {
        step2.removeAttribute('style');
        step2.style.cssText = 'display: block !important;';
      }
      const overlay = document.querySelector('.t56ModalOverlay');
      const modalModelName = model || overlay && overlay.getAttribute('data-current-model') || 'Vehicle';
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
    }
  }
  function kamT56BindBrochureAnchorClicks(anchors) {
    anchors.forEach(anchor => {
      Kameleoon.API.Utils.addEventListener(anchor, 'click', event => {
        if (sessionStorage.getItem('T24EmailCollected') && sessionStorage.getItem('T56ModalSubmitted')) {
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
    Kameleoon.API.Utils.addEventListener(document, 'click', event => {
      if (event.target.classList.contains('t56CheckboxInput')) {
        event.target.classList.toggle('t56Active');
        const wrapper = document.querySelector('.t56CheckboxWrapper');
        if (wrapper) wrapper.classList.remove('t56errorShow');
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
  function kamT56ClickEventBind() {
    Kameleoon.API.Utils.addEventListener(window, 'message', kamT56HandleIframeMessage);
    Kameleoon.API.Core.runWhenConditionTrue(() => document.readyState !== 'loading', () => {
      setTimeout(preloadIframe, 1000);
    });
    Kameleoon.API.Core.runWhenElementPresent('#main .q-modal-content .aem-Grid a[data-gtm-event-category="d1-content::Content"]', kamT56BindBrochureAnchorClicks);
    kamT56BindDocumentClicks();
    kamT56CloseModalClickEvent();
  }

  /* eslint-disable import/extensions */

  (function kamPcat56V1() {
    function init() {
      const {
        body
      } = document;
      body.classList.add('pcat56');
      kamT56ClickEventBind();
    }
    if (!window.__kam405314Initialized) {
      window.__kam405314Initialized = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelectorAll('div[data-current-page="download-brochure"]').length > 0, init);
    }
  })();
})();