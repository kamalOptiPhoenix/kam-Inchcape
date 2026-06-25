"use strict";

(function () {
  /* eslint-disable no-console */
  /* eslint-disable max-len */
  function kamT38FormRequest(email) {
    console.log('*** PCAT38: FormRequest called ***', {
      email
    });
    const [, modelName] = jQuery('.trimDetailsTitleWrapper h2').text().toLowerCase().split('your ');
    console.log('*** PCAT38: Model name extracted in FormRequest ***', modelName);
    const model = {
      'partner van': {
        title: 'Partner Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-ice/Peugeot_MY25_Partner_ICE_Spec_Sheet_web.pdf'
      },
      '308 wagon': {
        title: '308 Wagon',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/peugeot-308-specification-sheet-0523.pdf'
      },
      '2008 suv': {
        title: '2008 SUV',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/2008/trust-your-own-way-meessaging/Peugeot-2008-ICE-Facelift-MY24-Brochure-Spec-Sheet-Combined-REV-web.pdf'
      },
      '3008 hybrid': {
        title: '3008 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/3008/2024/3008-hybrid/Peugeot_MY25_3008_Hybrid_Spec_Sheet_LR-R3.pdf'
      },
      'boxer van': {
        title: 'Boxer Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY23_Boxer_Range_Brochure.pdf'
      },
      'expert van': {
        title: 'Expert Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/MY23_Expert_Spec_Sheet.pdf'
      },
      'e-partner van': {
        title: 'E-Partner Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/e-partner-pre-order/Peugeot_MY23_E-Partner_Spec_Sheet.pdf'
      },
      '2008 hybrid': {
        title: '2008 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_2008_Hybrid_Spec_Sheet.pdf'
      },
      '308 hatch': {
        title: '308 Hatch',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/308/my24-colour-change/Peugeot_MY24_308_Spec_Sheet_REV_Final.pdf'
      },
      'e-expert van': {
        title: 'E-Expert Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/expert/e-expert/Peugeot_E-Expert_MY23_Spec_Sheet_web.pdf'
      },
      '308 hybrid': {
        title: '308 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_308_GT_Hybrid_Spec_Sheet.pdf'
      },
      '508 sportswagon': {
        title: '508 Sportswagon',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/peugeot-508-specification-sheet-0923.pdf'
      },
      '408 fastback': {
        title: '408 Fastback',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY24_408_PHEV_Brochure_Spec_Sheet.pdf'
      },
      '408 hybrid': {
        title: '408 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_408_GT_Hybrid_Spec_Sheet.pdf'
      },
      '5008 suv': {
        title: '5008 SUV',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/Peugeot_MY25_5008_Hybrid_Spec_Sheet_LR-R.pdf'
      },
      '5008 hybrid': {
        title: '5008 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/Peugeot_MY25_5008_Hybrid_Spec_Sheet_LR-R.pdf'
      },
      'expert van my25': {
        title: 'Expert Van MY25',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_Expert_Diesel_Spec_Sheet_LR-R3.pdf'
      }
    };
    if (!model[modelName]) {
      console.error('*** PCAT38: ERROR - Model not found in FormRequest mapping ***', modelName);
      return;
    }
    const modelTitle = model[modelName].title;
    console.log('*** PCAT38: Model title for FormRequest ***', modelTitle);
    fetch('https://peugeotforms.pcaconnect.com.au/FormLoader.ashx?id=74&FormType=Lead&LType=Marketing&EType=Request+a+Brochure&Campaign=BAU&Src=peugeot.com.au').then(res => res.text()).then(data => {
      const token = data.split('\'hidden\\\' name = \\\'_requesttoken\\\' value = \\\'')[1].split('\\')[0];
      console.log('*** PCAT38: Token received from FormLoader ***', {
        token: token ? 'received' : 'not found'
      });
      const formData = new FormData();
      formData.append('FirstName', 'NoName');
      formData.append('LastName', 'NoName');
      formData.append('Email', email);
      formData.append('{CHECKBOX}', 'ON');
      formData.append('_requesttoken', token);
      formData.append('Model', modelTitle);
      formData.append('DealerDepartment', 'New Vehicle Sales');
      formData.append('LeadTemperature', 'Warm');
      formData.append('LeadForm', 'Brochure Request');
      formData.append('Make', 'Peugeot');
      console.log('*** PCAT38: Sending FormRequest to WebService ***', {
        email,
        model: modelTitle
      });
      return fetch('https://peugeotforms.pcaconnect.com.au/WebService.ashx?ccsForm=LeadForm&id=74&FormType=Lead&LType=Marketing&EType=Request+a+Brochure&Campaign=BAU&Src=peugeot.com.au', {
        referrer: 'https://www.peugeot.com.au/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: formData,
        method: 'POST',
        mode: 'cors',
        credentials: 'omit'
      }).then(response => {
        console.log('*** PCAT38: FormRequest response received ***', {
          status: response.status,
          statusText: response.statusText
        });
        return response;
      }).then(() => {
        console.log('*** PCAT38: FormRequest sent successfully ***');
        sessionStorage.setItem('t38EmailCollected', email);
        console.log('*** PCAT38: Email saved to sessionStorage ***', email);
      }).catch(error => {
        console.error('*** PCAT38: ERROR in FormRequest ***', error);
      });
    }).catch(error => {
      console.error('*** PCAT38: ERROR fetching token ***', error);
    });
  }

  /* eslint-disable no-console */
  function kamT38AddDataWithCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
    console.log(`**** t38 Cookie Stored ${date.toUTCString()} ****`);
  }
  function kamT38GetCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return '';
  }
  function kamT38CheckCookieDuration(name) {
    const value = kamT38GetCookie(name);
    if (value !== '') {
      return true;
    }
    return false;
  }
  const goals = {
    'Download a Brochure CTA click - 38': 420459
  };
  function kamT38TriggerCtaClickGoal() {
    const goalId = goals['Download a Brochure CTA click - 38'];
    if (Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }
  let kamT38CurrentModelName = '';

  // eslint-disable-next-line max-len
  function kamT38ClickEventBind(pdfDownload, addDataWithCookie, checkCookieDuration, FormRequest, onModalClose) {
    if (window.__kamT38ClickEventBound) {
      return;
    }
    window.__kamT38ClickEventBound = true;
    const modelFormMapping = {
      'partner van': 'Partner Van',
      '308 wagon': '308 Wagon',
      '2008 suv': '2008 SUV',
      '3008 hybrid': '3008 Hybrid',
      'boxer van': 'Boxer Van',
      'expert van': 'Expert Van',
      'e-partner van': 'E-Partner Van',
      '2008 hybrid': '2008 Hybrid',
      '308 hatch': '308 Hatch',
      'e-expert van': 'E-Expert Van',
      '308 hybrid': '308 Hybrid',
      '508 sportswagon': '508 Sportswagon',
      '408 fastback': '408 Fastback',
      '408 hybrid': '408 Hybrid',
      '5008 suv': '5008 SUV',
      '5008 hybrid': '5008 Hybrid',
      'expert van my25': 'Expert Van MY25'
    };
    const modelMapping = {
      'partner van': {
        bodystyle: 'partner-van',
        label: 'Partner Van'
      },
      '308 wagon': {
        bodystyle: '308-wagon',
        label: '308 Wagon'
      },
      '2008 suv': {
        bodystyle: '2008-suv',
        label: '2008 SUV'
      },
      '3008 hybrid': {
        bodystyle: '3008-hybrid',
        label: '3008 Hybrid'
      },
      'boxer van': {
        bodystyle: 'boxer-van',
        label: 'Boxer Van'
      },
      'expert van': {
        bodystyle: 'expert-van',
        label: 'Expert Van'
      },
      'e-partner van': {
        bodystyle: 'e-partner-van',
        label: 'E-Partner Van'
      },
      '2008 hybrid': {
        bodystyle: '2008-hybrid',
        label: '2008 Hybrid'
      },
      '308 hatch': {
        bodystyle: '308-hatch',
        label: '308 Hatch'
      },
      'e-expert van': {
        bodystyle: 'e-expert-van',
        label: 'E-Expert Van'
      },
      '308 hybrid': {
        bodystyle: '308-hybrid',
        label: '308 Hybrid'
      },
      '508 sportswagon': {
        bodystyle: '508-sportswagon',
        label: '508 Sportswagon'
      },
      '408 fastback': {
        bodystyle: '408-fastback',
        label: '408 Fastback'
      },
      '408 hybrid': {
        bodystyle: '408-hybrid',
        label: '408 Hybrid'
      },
      '5008 suv': {
        bodystyle: '5008-suv',
        label: '5008 SUV'
      },
      '5008 hybrid': {
        bodystyle: '5008-hybrid',
        label: '5008 Hybrid'
      },
      'expert van my25': {
        bodystyle: 'expert-van-my25',
        label: 'Expert Van MY25'
      }
    };
    function kamT38HandleIframeMessage(event) {
      const allowedOrigins = ['https://peugeotforms.inchcape.com.au', 'https://configurator.peugeot.com.au'];
      if (!allowedOrigins.includes(event.origin)) {
        return;
      }
      if (event.data && event.data.type === 'PCAT38_FORM_SUCCESS') {
        if (!kamT38CurrentModelName) {
          return;
        }
        let email = event.data.email || '';
        if (!email) {
          const iframe = document.getElementById('t38FormIframe');
          if (iframe) {
            try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
              const emailInput = iframeDoc.querySelector('#userEmail');
              if (emailInput) {
                email = emailInput.value;
              }
            } catch (iframeError) {
              email = localStorage.getItem('userEmail') || '';
            }
          }
        }
        jQuery('body').removeClass('t38ModalShow');
        if (onModalClose) {
          requestAnimationFrame(() => {
            onModalClose();
          });
        }
        if (email) {
          addDataWithCookie('t38EmailCollected', email);
          FormRequest(email);
        }
        pdfDownload(kamT38CurrentModelName);
      }
    }
    Kameleoon.API.Utils.addEventListener(window, 'message', kamT38HandleIframeMessage);
    jQuery(document).on('click', '.build-buy-summary .trimDetailsPromotionRow .trimDetailsButtonWrapper.t38ButtonWrapper a', event => {
      event.preventDefault();
      event.stopPropagation();
      const [, modelName] = jQuery('.trimDetailsTitleWrapper h2').text().toLowerCase().split('your ');
      kamT38CurrentModelName = modelName;
      const modelData = modelMapping[modelName] || {
        bodystyle: modelName.replace(/\s+/g, '-'),
        label: modelName
      };
      const formModelValue = modelFormMapping[modelName] || modelData.label;
      kamT38TriggerCtaClickGoal();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'updatevirtualpath',
        formsLeadType: 'cold lead',
        formsName: 'brochure request',
        formsLeadID: 'PCAT38',
        mainStepIndicator: '1',
        mainStepName: 'confirmation',
        vehicleModelBodystyle: modelData.bodystyle,
        vehicleModelBodystyleLabel: modelData.label
      });
      const emailCollected = checkCookieDuration('t38EmailCollected');
      if (emailCollected) {
        pdfDownload(modelName);
        return;
      }
      const iframe = document.getElementById('t38FormIframe');
      if (iframe) {
        const email = localStorage.getItem('userEmail');
        iframe.src = 'https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat38kam=true';
        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow.postMessage({
              type: 'SET_FORM_DATA',
              model: formModelValue,
              email: email || ''
            }, 'https://peugeotforms.inchcape.com.au');
          }, 500);
        };
      }
      jQuery('body').addClass('t38ModalShow');
    });
  }
  function kamT38CloseModal(onClose) {
    jQuery('body').removeClass('t38ModalShow');
    if (onClose) {
      requestAnimationFrame(() => {
        onClose();
      });
    }
  }
  function kamT38CloseModalClickEvent(onClose) {
    if (window.__kamT38CloseModalBound) {
      return;
    }
    window.__kamT38CloseModalBound = true;
    jQuery('.t38ModalOverlay').click(event => {
      const outsideModalClick = jQuery(event.target).closest('.t38ModalContainer').length === 0;
      if (outsideModalClick) kamT38CloseModal(onClose);
    });
    jQuery('.t38CloseButton').click(() => {
      kamT38CloseModal(onClose);
    });
  }
  function kamT38EmailValidation() {
    const mail = jQuery('.t38EmailInput').val();
    jQuery('.t38EmailInputWrapper').removeClass('t38errorShow');
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regexEmail.test(mail)) return true;
    jQuery('.t38EmailInputWrapper').addClass('t38errorShow');
    return false;
  }
  function kamT38HtmlAddV1() {
    jQuery('body').prepend(`
        <div class="t38ModalOverlay">
            <div class="t38ModalContainer">
            <span class="t38CloseButton">×</span>
                <h4 class="t38ModalHeading">Download brochure</h4>
                <p class="t38ModalContent">
                    Please enter your email so that you're able to download your digital brochure.
                </p>
                <div class="t38IframeWrapper">
                    <iframe id="t38FormIframe" src="https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat38kam=true" frameborder="0" scrolling="no"></iframe>
                </div>
            </div>
        </div>
    `);
    jQuery('.promotionBox .promotionWrap').append(`
    <div class="t38ButtonWrapper trimDetailsButtonWrapper">
        <a href="javascript:void(0)" role="button" class="trimButtonPrimary">Download Brochure</a>
    </div>`);
  }

  /* eslint-disable no-console */
  function kamT38DataLayerEvent(modelName) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'uaevent',
      eventCategory: 'Brochure Download',
      eventAction: modelName,
      eventLabel: 'email provided'
    });
  }
  function kamT38PdfDownload(modelName) {
    console.log('*** PCAT38: pdfDownload called ***', {
      modelName
    });
    const model = {
      'partner van': {
        title: 'Partner Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-ice/Peugeot_MY25_Partner_ICE_Spec_Sheet_web.pdf'
      },
      '308 wagon': {
        title: '308 Wagon',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/peugeot-308-specification-sheet-0523.pdf'
      },
      '2008 suv': {
        title: '2008 SUV',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/2008/trust-your-own-way-meessaging/Peugeot-2008-ICE-Facelift-MY24-Brochure-Spec-Sheet-Combined-REV-web.pdf'
      },
      '3008 hybrid': {
        title: '3008 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/3008/2024/3008-hybrid/Peugeot_MY25_3008_Hybrid_Spec_Sheet_LR-R3.pdf'
      },
      'boxer van': {
        title: 'Boxer Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY23_Boxer_Range_Brochure.pdf'
      },
      'expert van': {
        title: 'Expert Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/MY23_Expert_Spec_Sheet.pdf'
      },
      'e-partner van': {
        title: 'E-Partner Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/e-partner-pre-order/Peugeot_MY23_E-Partner_Spec_Sheet.pdf'
      },
      '2008 hybrid': {
        title: '2008 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_2008_Hybrid_Spec_Sheet.pdf'
      },
      '308 hatch': {
        title: '308 Hatch',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/308/my24-colour-change/Peugeot_MY24_308_Spec_Sheet_REV_Final.pdf'
      },
      'e-expert van': {
        title: 'E-Expert Van',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/expert/e-expert/Peugeot_E-Expert_MY23_Spec_Sheet_web.pdf'
      },
      '308 hybrid': {
        title: '308 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_308_GT_Hybrid_Spec_Sheet.pdf'
      },
      '508 sportswagon': {
        title: '508 Sportswagon',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/peugeot-508-specification-sheet-0923.pdf'
      },
      '408 fastback': {
        title: '408 Fastback',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY24_408_PHEV_Brochure_Spec_Sheet.pdf'
      },
      '408 hybrid': {
        title: '408 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_408_GT_Hybrid_Spec_Sheet.pdf'
      },
      '5008 suv': {
        title: '5008 SUV',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/Peugeot_MY25_5008_Hybrid_Spec_Sheet_LR-R.pdf'
      },
      '5008 hybrid': {
        title: '5008 Hybrid',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/Peugeot_MY25_5008_Hybrid_Spec_Sheet_LR-R.pdf'
      },
      'expert van my25': {
        title: 'Expert Van MY25',
        href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_Expert_Diesel_Spec_Sheet_LR-R3.pdf'
      }
    };
    if (!model[modelName]) {
      console.error('*** PCAT38: ERROR - Model not found in mapping ***', modelName);
      return;
    }
    console.log('*** PCAT38: Opening PDF ***', {
      modelName,
      pdfUrl: model[modelName].href
    });
    window.open(model[modelName].href, '_blank');
    console.log('*** PCAT38: PDF window opened ***');
    console.log('*** PCAT38: DataLayer event pushed ***');
    kamT38DataLayerEvent(modelName);
  }

  /* global jQuery */

  (function kamT38V1() {
    function kamT38V1Init() {
      console.log('**** PCAT38 V1 Started ****');
      jQuery('body').addClass('pcat38');
      kamT38HtmlAddV1();
      kamT38ClickEventBind(kamT38PdfDownload, kamT38AddDataWithCookie, kamT38CheckCookieDuration, kamT38FormRequest, kamT38EmailValidation);
      kamT38CloseModalClickEvent();
    }
    if (window.__kamT38V1Initialized) {
      return;
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('body.build-buy-summary') !== null && document.querySelector('.promotionBox') !== null, () => {
      if (window.__kamT38V1Initialized) {
        return;
      }
      window.__kamT38V1Initialized = true;
      kamT38V1Init();
    });
  })();
})();