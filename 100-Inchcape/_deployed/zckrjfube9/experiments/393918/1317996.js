"use strict";

(function () {
  function KamMutation(selector, callback) {
    const matchedElement = document.querySelector(selector);
    if (matchedElement) {
      callback(matchedElement);
      return;
    }
    const observerRoot = document.body || document.documentElement;
    const observer = new MutationObserver(() => {
      const foundElement = document.querySelector(selector);
      if (foundElement) {
        observer.disconnect();
        callback(foundElement);
      }
    });
    observer.observe(observerRoot, {
      childList: true,
      subtree: true
    });
  }
  const goals = {
    'Download a Brochure CTA click - 139': 418583,
    'Download Text Link click - 139': 418585,
    'Email conversion - 139': 418584
  };
  const kamSubt139Config = {
    selectors: {
      customiseSummary: '#customise_summary',
      variantName: 'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]',
      brochureBtn: '.kamSubt139_brochureBtn',
      brochureWrap: '.kamSubt139_brochureWrap',
      modalOverlay: '.kamSubt139_modalOverlay',
      modal: '.kamSubt139_modal',
      closeBtn: '.kamSubt139_close',
      downloadLink: '.kamSubt139_downloadLink',
      emailInput: '.kamSubt139_emailInput',
      privacyCheckbox: '.kamSubt139_privacy',
      sendBtn: '.kamSubt139_sendBtn',
      formSection: '.kamSubt139_formSection',
      successSection: '.kamSubt139_successSection',
      emailError: '.kamSubt139_emailError',
      privacyError: '.kamSubt139_privacyError'
    },
    html: {
      brochureBtn: `
            <div class="kamSubt139_brochureWrap">
                <hr class="kamSubt139_brochureDivider">
                <button type="button" class="kamSubt139_brochureBtn">
                    <svg
                        class="kamSubt139_brochureIcon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 5v10"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M8 11l4 4 4-4"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M5 19h14"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                    Download a Brochure
                </button>
                <p class="kamSubt139_brochureSubtext">
                    Includes full specs, features &amp; pricing.
                </p>
            </div>
        `,
      modal: `
            <div class="kamSubt139_modalOverlay">
                <div class="kamSubt139_modal">
                    <button type="button" class="kamSubt139_close" aria-label="Close"><img src="https://zckrjfube9.kameleoon.io/images/32666-aab1d71e-ce1f-433f-a7b9-6e4d34388c99.svg"></button>
                    <div class="kamSubt139_modalTop">
                        <h2>Thanks for downloading!</h2>
                        <p class="kamSubt139_introText">
                            Your brochure is available through the following link:
                        </p>
                        <img
                            class="kamSubt139_carImage"
                            src="https://dxp-pim-proxy-prod.inchcapedigital.com/inchcosy/v2/subaruauasset/AUBTAEKH8SE/?ex=1X&in=40&view=front"
                            alt="Vehicle"
                        >
                        <a
                            href="#"
                            class="kamSubt139_downloadLink"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Download</a>
                    </div>
                    <hr class="kamSubt139_divider">
                    <div class="kamSubt139_formSection">
                        <h3 class="kamSubt139_formHeading">
                            Why not send a copy of the brochure straight to your inbox for later?
                        </h3>
                        <div class="kamSubt139_fieldWrap">
                            <input
                                type="email"
                                class="kamSubt139_emailInput"
                                placeholder="Email"
                            >
                            <p class="kamSubt139_emailError"></p>
                        </div>
                        <label class="kamSubt139_checkboxWrap">
                            <input type="checkbox" class="kamSubt139_privacy">
                            <span class="kamSubt139_checkboxText">
                                Please confirm you have read and agreed to our
                                <strong>Privacy Collection Statement</strong>
                                below by checking this box.
                            </span>
                        </label>
                        <p class="kamSubt139_privacyError"></p>
                        <button type="button" class="kamSubt139_sendBtn" disabled>
                            Email my brochure
                        </button>
                        
                    </div>
                    <div class="kamSubt139_successSection">
                        <p class="kamSubt139_successMessage">
                            Your brochure has been sent to your email.<br>
                            Please check your inbox!
                        </p>
                    </div>
                </div>
            </div>
        `
    },
    urls: {
      brochurePage: 'https://www.subaru.com.au/brochure-download?model=',
      submitForm: 'https://www.subaru.com.au/umbraco/surface/brochuredownloadform/SubmitBrochureDownloadForm'
    },
    brochurePdfUrls: {
      forester: 'https://docs.subaru.com.au/Subaru-Forester-brochure.pdf',
      crosstrek: 'https://docs.subaru.com.au/Subaru-Crosstrek-brochure.pdf',
      outback: 'https://docs.subaru.com.au/Subaru-Outback-Brochure.pdf',
      wilderness: 'https://docs.subaru.com.au/Subaru-Outback2026-Brochure.pdf',
      trailseeker: 'https://docs.subaru.com.au/Subaru-Trailseeker-brochure.pdf',
      impreza: 'https://docs.subaru.com.au/Subaru-Impreza-brochure.pdf',
      wrx: 'https://cdn.oem-production.subaru.com.au/documents/Subaru-WRX-brochure.pdf',
      uncharted: 'https://docs.subaru.com.au/Subaru-Uncharted-brochure.pdf',
      solterra: 'https://docs.subaru.com.au/Subaru-Solterra-brochure.pdf',
      brz: 'https://cdn.oem-production.subaru.com.au/documents/Subaru-BRZ-brochure.pdf'
    },
    sessionStorageKeys: {
      emailCollected: 'T37EmailCollected'
    },
    translations: {
      invalidEmail: 'Please enter a valid email address.',
      privacyRequired: 'You must agree to the Privacy Collection Statement.',
      sendBtnText: 'Email my brochure',
      submitting: 'submitting...',
      tokenError: 'Unable to fetch brochure form tokens',
      requestFailed: 'Request failed',
      genericError: 'Something went wrong'
    },
    goalNames: {
      brochureCtaClick: 'Download a Brochure CTA click - 139',
      downloadTextLinkClick: 'Download Text Link click - 139',
      emailConversion: 'Email conversion - 139'
    },
    goalIds: goals
  };
  let reattachScheduled = false;
  function kamSubt139GetLastSummaryWrapper() {
    const wrappers = document.querySelectorAll(kamSubt139Config.selectors.customiseSummary);
    return wrappers[wrappers.length - 1] || null;
  }
  function kamSubt139IsBrochureWrapCorrectlyPlaced(lastWrapper) {
    const brochureWrap = document.querySelector(kamSubt139Config.selectors.brochureWrap);
    return Boolean(brochureWrap && lastWrapper && lastWrapper.nextElementSibling === brochureWrap);
  }
  function kamSubt139RemoveOrphanBrochureWraps() {
    const lastWrapper = kamSubt139GetLastSummaryWrapper();
    const brochureWraps = document.querySelectorAll(kamSubt139Config.selectors.brochureWrap);
    brochureWraps.forEach(brochureWrap => {
      if (!lastWrapper || lastWrapper.nextElementSibling !== brochureWrap) {
        brochureWrap.remove();
      }
    });
  }
  function kamSubt139PlaceBrochureButton() {
    const lastWrapper = kamSubt139GetLastSummaryWrapper();
    if (!lastWrapper) {
      return;
    }
    kamSubt139RemoveOrphanBrochureWraps();
    if (kamSubt139IsBrochureWrapCorrectlyPlaced(lastWrapper)) {
      return;
    }
    lastWrapper.insertAdjacentHTML('afterend', kamSubt139Config.html.brochureBtn);
  }
  function kamSubt139EnsureModal() {
    const modalOverlays = document.querySelectorAll(kamSubt139Config.selectors.modalOverlay);
    modalOverlays.forEach((modalOverlay, index) => {
      if (index > 0) {
        modalOverlay.remove();
      }
    });
    if (!document.querySelector(kamSubt139Config.selectors.modalOverlay)) {
      document.body.insertAdjacentHTML('beforeend', kamSubt139Config.html.modal);
    }
  }
  function kamSubt139ReattachIfNeeded() {
    if (reattachScheduled) {
      return;
    }
    reattachScheduled = true;
    window.requestAnimationFrame(() => {
      reattachScheduled = false;
      kamSubt139EnsureModal();
      kamSubt139PlaceBrochureButton();
    });
  }
  function kamSubt139StartSpaObserver() {
    if (window.__kamSubt139ObserverStarted) {
      return;
    }
    window.__kamSubt139ObserverStarted = true;
    const observer = new MutationObserver(kamSubt139ReattachIfNeeded);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    window.__kamSubt139Observer = observer;
  }
  function kamSubt139InsertMarkup() {
    kamSubt139EnsureModal();
    kamSubt139PlaceBrochureButton();
    kamSubt139StartSpaObserver();
    kamSubt139ReattachIfNeeded();
  }
  function kamSubt139GetModelName() {
    const variantName = document.querySelector(kamSubt139Config.selectors.variantName)?.textContent?.trim() || '';
    return variantName.split(/\s+/)[0];
  }
  function kamSubt139GetVehicleSelected() {
    return {
      make: 'subaru',
      model: kamSubt139GetModelName().toLowerCase()
    };
  }
  function kamSubt139PushDigitalDataEvent(eventData) {
    if (window.digitalData?.events?.pushAndUpdate) {
      window.digitalData.events.pushAndUpdate(eventData);
    }
  }
  function kamSubt139HashEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalizedEmail)).then(hashBuffer => Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join(''));
  }
  function kamSubt139FireBrochureCtaStartEvent() {
    kamSubt139PushDigitalDataEvent({
      event: '_formNavigate',
      form: {
        name: 'download a brochure',
        stage: 'start',
        details: {
          vehicleSelected: [kamSubt139GetVehicleSelected()]
        }
      }
    });
  }
  function kamSubt139FireBrochureDownloadSubmittedEvent() {
    kamSubt139PushDigitalDataEvent({
      event: '_formNavigate',
      form: {
        name: 'download a brochure',
        stage: 'submitted',
        details: {
          vehicleSelected: [kamSubt139GetVehicleSelected()]
        }
      }
    });
  }
  function kamSubt139FireEmailBrochureSubmittedEvent(email) {
    return kamSubt139HashEmail(email).then(emailHashed => {
      kamSubt139PushDigitalDataEvent({
        event: '_formNavigate',
        form: {
          name: 'email brochure',
          stage: 'submitted',
          details: {
            dealerContact: false,
            vehicleSelected: [kamSubt139GetVehicleSelected()]
          }
        },
        user: {
          emailHashed
        }
      });
    });
  }
  function kamSubt139GetBrochurePdfUrl() {
    const variantName = document.querySelector(kamSubt139Config.selectors.variantName)?.textContent?.trim().toLowerCase() || '';
    const {
      brochurePdfUrls
    } = kamSubt139Config;
    if (variantName.includes('wilderness') || variantName.includes('all-new')) {
      return brochurePdfUrls.wilderness;
    }
    if (variantName.includes('forester')) {
      return brochurePdfUrls.forester;
    }
    if (variantName.includes('crosstrek')) {
      return brochurePdfUrls.crosstrek;
    }
    if (variantName.includes('outback')) {
      return brochurePdfUrls.outback;
    }
    if (variantName.includes('trailseeker')) {
      return brochurePdfUrls.trailseeker;
    }
    if (variantName.includes('impreza')) {
      return brochurePdfUrls.impreza;
    }
    if (variantName.includes('wrx')) {
      return brochurePdfUrls.wrx;
    }
    if (variantName.includes('uncharted')) {
      return brochurePdfUrls.uncharted;
    }
    if (variantName.includes('solterra')) {
      return brochurePdfUrls.solterra;
    }
    if (variantName.includes('brz')) {
      return brochurePdfUrls.brz;
    }
    return '';
  }
  function kamSubt139GetBrochureTokens(modelName) {
    const brochureUrl = `${kamSubt139Config.urls.brochurePage}${encodeURIComponent(modelName)}`;
    return fetch(brochureUrl, {
      credentials: 'include'
    }).then(res => res.text()).then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const token = doc.querySelector('input[name="__RequestVerificationToken"]')?.value || '';
      const ufprt = doc.querySelector('input[name="ufprt"]')?.value || '';
      return {
        token,
        ufprt
      };
    }).catch(() => ({
      token: '',
      ufprt: ''
    }));
  }
  function kamSubt139ProcessGoal(goalName) {
    const goalId = kamSubt139Config.goalIds[goalName];
    const canFireGoal = Boolean(goalId && typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Goals && Kameleoon.API.Goals.processConversion);
    console.log('[SUBT139] Goal trigger:', {
      goalName,
      goalId,
      fired: canFireGoal
    });
    if (canFireGoal) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }
  function kamSubt139TriggerBrochureCtaClickGoal() {
    kamSubt139ProcessGoal(kamSubt139Config.goalNames.brochureCtaClick);
  }
  function kamSubt139TriggerDownloadTextLinkClickGoal() {
    kamSubt139ProcessGoal(kamSubt139Config.goalNames.downloadTextLinkClick);
  }
  function kamSubt139TriggerEmailConversionGoal() {
    kamSubt139ProcessGoal(kamSubt139Config.goalNames.emailConversion);
  }
  function kamSubt139IsEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
  function kamSubt139UpdateSendButtonState() {
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const sendBtn = document.querySelector(kamSubt139Config.selectors.sendBtn);
    if (!sendBtn || sendBtn.dataset.kamSubt139Submitting === 'true') {
      return;
    }
    const isFormValid = kamSubt139IsEmailValid(emailInput?.value || '') && Boolean(privacyCheckbox?.checked);
    sendBtn.disabled = !isFormValid;
  }
  function kamSubt139HandleEmailBlur() {
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    const emailError = document.querySelector(kamSubt139Config.selectors.emailError);
    const {
      translations
    } = kamSubt139Config;
    const emailValue = emailInput?.value.trim() || '';
    if (!emailValue || !kamSubt139IsEmailValid(emailValue)) {
      emailError.textContent = translations.invalidEmail;
    } else {
      emailError.textContent = '';
    }
    kamSubt139UpdateSendButtonState();
  }
  function kamSubt139HandleEmailInput() {
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    const emailError = document.querySelector(kamSubt139Config.selectors.emailError);
    if (kamSubt139IsEmailValid(emailInput?.value || '')) {
      emailError.textContent = '';
    }
    kamSubt139UpdateSendButtonState();
  }
  function kamSubt139HandlePrivacyBlur() {
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const privacyError = document.querySelector(kamSubt139Config.selectors.privacyError);
    const {
      translations
    } = kamSubt139Config;
    if (!privacyCheckbox?.checked) {
      privacyError.textContent = translations.privacyRequired;
    } else {
      privacyError.textContent = '';
    }
    kamSubt139UpdateSendButtonState();
  }
  function kamSubt139HandlePrivacyChange() {
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const privacyError = document.querySelector(kamSubt139Config.selectors.privacyError);
    if (privacyCheckbox?.checked) {
      privacyError.textContent = '';
    }
    kamSubt139UpdateSendButtonState();
  }
  function kamSubt139ResetModalForm() {
    const modal = document.querySelector(kamSubt139Config.selectors.modal);
    const emailError = document.querySelector(kamSubt139Config.selectors.emailError);
    const privacyError = document.querySelector(kamSubt139Config.selectors.privacyError);
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const sendBtn = document.querySelector(kamSubt139Config.selectors.sendBtn);
    const formError = document.querySelector(kamSubt139Config.selectors.formError);
    const {
      translations
    } = kamSubt139Config;
    if (modal) {
      modal.classList.remove('kamSubt139_modalSuccess');
    }
    if (privacyCheckbox) {
      privacyCheckbox.checked = false;
    }
    if (emailError) {
      emailError.textContent = '';
    }
    if (privacyError) {
      privacyError.textContent = '';
    }
    if (formError) {
      formError.textContent = '';
    }
    if (sendBtn) {
      sendBtn.dataset.kamSubt139Submitting = 'false';
      sendBtn.textContent = translations.sendBtnText;
      sendBtn.disabled = true;
    }
    kamSubt139UpdateSendButtonState();
  }
  function kamSubt139ShowFormSuccess() {
    const modal = document.querySelector(kamSubt139Config.selectors.modal);
    if (modal) {
      modal.classList.add('kamSubt139_modalSuccess');
    }
  }
  function kamSubt139ResetSubmitButton(sendBtn, translations) {
    sendBtn.dataset.kamSubt139Submitting = 'false';
    sendBtn.textContent = translations.sendBtnText;
    kamSubt139UpdateSendButtonState();
  }
  function kamSubt139SubmitBrochureForm(sendBtn, emailInput) {
    const {
      translations
    } = kamSubt139Config;
    const formError = document.querySelector(kamSubt139Config.selectors.formError);
    const email = emailInput?.value.trim();
    const modelName = kamSubt139GetModelName();
    sendBtn.dataset.kamSubt139Submitting = 'true';
    sendBtn.disabled = true;
    sendBtn.textContent = translations.submitting;
    if (formError) {
      formError.textContent = '';
    }
    return kamSubt139GetBrochureTokens(modelName).then(({
      token,
      ufprt
    }) => {
      if (!token || !ufprt) {
        kamSubt139ResetSubmitButton(sendBtn, translations);
        if (formError) {
          formError.textContent = translations.tokenError;
        }
        return null;
      }
      const payload = new URLSearchParams();
      payload.append('ModelName', modelName);
      payload.append('ModelImageUrl', modelName);
      payload.append('Email', email);
      payload.append('FirstName', 'noname');
      payload.append('LastName', 'noname');
      payload.append('Phone', '');
      payload.append('Postcode', '');
      payload.append('__RequestVerificationToken', token);
      payload.append('ufprt', ufprt);
      payload.append('ContactMe', 'false');
      payload.append('TocAgreement', 'True');
      return fetch(kamSubt139Config.urls.submitForm, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: payload.toString()
      });
    }).then(response => {
      if (!response) {
        return;
      }
      return response.text().then(() => {
        if (response.ok) {
          return kamSubt139FireEmailBrochureSubmittedEvent(email).then(() => {
            kamSubt139ShowFormSuccess();
            kamSubt139TriggerEmailConversionGoal();
          });
        }
        kamSubt139ResetSubmitButton(sendBtn, translations);
        if (formError) {
          formError.textContent = `${translations.requestFailed} (${response.status})`;
        }
        return undefined;
      });
    }).catch(() => {
      kamSubt139ResetSubmitButton(sendBtn, translations);
      if (formError) {
        formError.textContent = translations.genericError;
      }
    });
  }
  function kamSubt139PrefillEmail() {
    const existingEmail = sessionStorage.getItem(kamSubt139Config.sessionStorageKeys.emailCollected) || '';
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    if (emailInput && existingEmail) {
      emailInput.value = existingEmail;
    }
  }
  function kamSubt139UpdateDownloadLink() {
    const downloadLink = document.querySelector(kamSubt139Config.selectors.downloadLink);
    const brochurePdfUrl = kamSubt139GetBrochurePdfUrl();
    if (downloadLink && brochurePdfUrl) {
      downloadLink.href = brochurePdfUrl;
    }
  }
  function kamSubt139OpenModal() {
    const modal = document.querySelector(kamSubt139Config.selectors.modalOverlay);
    if (!modal) {
      return;
    }
    kamSubt139ResetModalForm();
    kamSubt139PrefillEmail();
    kamSubt139UpdateDownloadLink();
    kamSubt139UpdateSendButtonState();
    modal.classList.add('kamSubt139_modalOverlayOpen');
  }
  function kamSubt139CloseModal() {
    const modal = document.querySelector(kamSubt139Config.selectors.modalOverlay);
    if (modal) {
      modal.classList.remove('kamSubt139_modalOverlayOpen');
    }
  }
  function kamSubt139HandleDocumentClick(event) {
    if (event.target.closest(kamSubt139Config.selectors.brochureBtn)) {
      kamSubt139TriggerBrochureCtaClickGoal();
      kamSubt139FireBrochureCtaStartEvent();
      kamSubt139OpenModal();
      return;
    }
    if (event.target.matches(kamSubt139Config.selectors.modalOverlay)) {
      kamSubt139CloseModal();
      return;
    }
    if (event.target.closest(kamSubt139Config.selectors.closeBtn)) {
      kamSubt139CloseModal();
      return;
    }
    if (event.target.closest(kamSubt139Config.selectors.downloadLink)) {
      event.preventDefault();
      const brochurePdfUrl = kamSubt139GetBrochurePdfUrl();
      if (brochurePdfUrl) {
        window.open(brochurePdfUrl, '_blank', 'noopener,noreferrer');
      }
      kamSubt139TriggerDownloadTextLinkClickGoal();
      kamSubt139FireBrochureDownloadSubmittedEvent();
      return;
    }
    const sendBtn = event.target.closest(kamSubt139Config.selectors.sendBtn);
    if (!sendBtn || sendBtn.disabled) {
      return;
    }
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    kamSubt139SubmitBrochureForm(sendBtn, emailInput);
  }
  function kamSubt139HandleDocumentFocusOut(event) {
    if (event.target.matches(kamSubt139Config.selectors.emailInput)) {
      kamSubt139HandleEmailBlur();
      return;
    }
    if (event.target.matches(kamSubt139Config.selectors.privacyCheckbox)) {
      kamSubt139HandlePrivacyBlur();
    }
  }
  function kamSubt139HandleDocumentInput(event) {
    if (event.target.matches(kamSubt139Config.selectors.emailInput)) {
      kamSubt139HandleEmailInput();
    }
  }
  function kamSubt139HandleDocumentChange(event) {
    if (event.target.matches(kamSubt139Config.selectors.privacyCheckbox)) {
      kamSubt139HandlePrivacyChange();
    }
  }
  function kamSubt139InitEvents() {
    if (window.__kamSubt139EventsBound) {
      return;
    }
    window.__kamSubt139EventsBound = true;
    document.addEventListener('click', kamSubt139HandleDocumentClick);
    document.addEventListener('focusout', kamSubt139HandleDocumentFocusOut);
    document.addEventListener('input', kamSubt139HandleDocumentInput);
    document.addEventListener('change', kamSubt139HandleDocumentChange);
  }

  /* eslint-disable import/extensions */

  function kamSubt139Init() {
    if (!window.__kamSubt139CoreInitialized) {
      document.body.classList.add('kamSubt139_body');
      kamSubt139InitEvents();
      window.__kamSubt139CoreInitialized = true;
    }
    kamSubt139InsertMarkup();
  }
  if (!window.__kamSubt139Bootstrapped) {
    window.__kamSubt139Bootstrapped = true;
    KamMutation(kamSubt139Config.selectors.customiseSummary, kamSubt139Init);
  }
})();