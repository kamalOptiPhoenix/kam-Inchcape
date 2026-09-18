"use strict";

(function () {
  /* eslint-disable no-console */

  const EMAIL_KEY = 'kamT140EmailCollected';
  const NATIVE_EMAIL_KEY = 'T37EmailCollected';
  const FIRED_KEY = 'kamT140DigitalDataFired';
  function kamT140GetCollectedEmail() {
    const email = sessionStorage.getItem(EMAIL_KEY) || sessionStorage.getItem(NATIVE_EMAIL_KEY);
    return email ? email.trim() : '';
  }
  function hashEmailSha256(email) {
    const normalized = email.trim().toLowerCase();
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized)).then(buffer => Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join(''));
  }
  function pushDigitalData(emailHashed) {
    const payload = {
      event: '_formNavigate',
      form: {
        name: 'configurator',
        stage: 'email my configuration submitted'
      },
      user: {
        emailHashed
      }
    };
    if (window.digitalData && window.digitalData.events && typeof window.digitalData.events.pushAndUpdate === 'function') {
      window.digitalData.events.pushAndUpdate(payload);
      return;
    }
    if (window.digitalData && typeof window.digitalData.pushAndUpdate === 'function') {
      window.digitalData.pushAndUpdate(payload);
    }
  }
  function isSummaryInViewport() {
    const summary = document.querySelector('#customise_summary');
    if (!summary) {
      return false;
    }
    const rect = summary.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }
  function tryFireDigitalData() {
    if (sessionStorage.getItem(FIRED_KEY) === 'true') {
      return;
    }
    const email = kamT140GetCollectedEmail();
    if (!email || !isSummaryInViewport()) {
      return;
    }
    sessionStorage.setItem(FIRED_KEY, 'true');
    hashEmailSha256(email).then(emailHashed => {
      pushDigitalData(emailHashed);
      console.log('%c *** T140 digitalData - email my configuration submitted ***', 'color:red;background:white');
    }).catch(() => {
      sessionStorage.removeItem(FIRED_KEY);
    });
  }
  function storeEmailFromLeadModal() {
    const emailInput = document.querySelector('[data-test="modal:leadCapture"] input[data-test="input:email"]');
    if (!emailInput) {
      return;
    }
    const email = emailInput.value.trim();
    sessionStorage.setItem(EMAIL_KEY, email);
    sessionStorage.setItem(NATIVE_EMAIL_KEY, email);
    try {
      localStorage.setItem('kamT140V3EmailCollected', email);
    } catch (error) {
      // localStorage may be unavailable
    }
    console.log('%c *** T140 email stored ***', 'color:red;background:white');
    tryFireDigitalData();
  }
  function kamT140InitLeadsCaptured() {
    if (window.__kamT140LeadsCapturedBound) {
      return;
    }
    window.__kamT140LeadsCapturedBound = true;
    document.addEventListener('click', event => {
      const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
      if (!el || !el.closest || !el.closest('[data-test="button:personalDetails:next"]')) {
        return;
      }
      storeEmailFromLeadModal();
    }, true);
    window.addEventListener('scroll', () => {
      if (!document.querySelector('#customise_summary')) {
        return;
      }
      window.setTimeout(tryFireDigitalData, 3000);
    }, {
      passive: true
    });
  }

  /* eslint-disable no-console */

  const kamT140VariantWaitSelector = '#customise_summary [data-test="title:variantName"]';
  const kamT140SelectedSpecPackSelector = 'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]';

  // Prefer selected spec-pack title first — Summary title:variantName can concatenate
  // feature labels (e.g. "Uncharted AWD Panoramic Glass Roof/Premium Paint").
  const kamT140VariantSelectors = [kamT140SelectedSpecPackSelector, '[data-test="trim_level_name:trim"] > [data-test="title:variantName"]', kamT140VariantWaitSelector, '#customise_summary h6[data-test="title:model"]', '#customise_summary [data-test="title:model"]'];

  // Live model codes from /configure/configure/ URLs (lookup key = code with digits removed)
  // AUIMP2026, AUCT2026, AUFOR26, AUOUT, AUOUT2026, AUBRZ2026, AUWRX2026, AUSOL, AUTS2026, AUUNC2026
  const kamT140ModelCodeMap = {
    auimp: 'Impreza',
    auct: 'Crosstrek',
    aufor: 'Forester',
    auout: 'Outback',
    aubrz: 'BRZ',
    auwrx: 'WRX',
    ausol: 'Solterra',
    auts: 'Trailseeker',
    auunc: 'Uncharted',
    // legacy aliases
    aucros: 'Crosstrek',
    autrail: 'Trailseeker'
  };
  const kamT140AllNewOutbackCode = 'auout2026';
  const kamT140ConfigurePathPattern = /\/configure\/configure\/([^/?&#"'\\]+)/i;
  const kamT140TinyUrlResolveTimeoutMs = 3000;

  // Known bad DOM / payload variant labels -> Salesforce catalog names
  const kamT140VariantNameReplacements = {
    'Uncharted AWD Panoramic Glass Roof/Premium Paint': 'Uncharted AWD with Panoramic Glass Roof'
  };
  function kamT140NormalizeModelText(text) {
    return (text || '').replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-').replace(/\s+/g, ' ').trim();
  }
  function kamT140HasModelValue(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }
  function kamT140CleanVariantName(text) {
    let cleaned = kamT140NormalizeModelText(text);
    if (!cleaned) {
      return '';
    }

    // Native payloads / Salesforce catalog never put "All-new" in variantName.
    // modelName holds "All-new Outback"; variant is e.g. "Outback AWD".
    // DOM sometimes shows "All-new Outback AWD" — strip the prefix.
    cleaned = cleaned.replace(/^all-new\s+/i, '');
    if (kamT140VariantNameReplacements[cleaned]) {
      return kamT140VariantNameReplacements[cleaned];
    }
    return cleaned;
  }
  function kamT140GetTextFromSelectors(selectors) {
    for (let index = 0; index < selectors.length; index += 1) {
      const element = document.querySelector(selectors[index]);
      if (!element) {
        continue;
      }
      const rawText = element.innerText || element.textContent || '';
      const text = kamT140CleanVariantName(rawText);
      if (text) {
        return text;
      }
    }
    return '';
  }
  function kamT140GetModelCodeFromUrlString(urlString) {
    if (!urlString) {
      return '';
    }
    const match = String(urlString).match(kamT140ConfigurePathPattern);
    if (!match || !match[1]) {
      return '';
    }
    return match[1].toLowerCase();
  }
  function kamT140GetModelCodeFromHtml(html) {
    if (!html) {
      return '';
    }
    const match = String(html).match(kamT140ConfigurePathPattern);
    if (!match || !match[1]) {
      return '';
    }
    return match[1].toLowerCase();
  }
  function kamT140IsTinyUrl(configUrl) {
    return typeof configUrl === 'string' && /tinyurl\.com/i.test(configUrl);
  }
  function kamT140GetModelNameFromModelCode(modelCode) {
    if (!modelCode) {
      return '';
    }
    const normalized = modelCode.toLowerCase();

    // AUOUT2026 = All-new Outback (all trims including Wilderness)
    if (normalized.indexOf(kamT140AllNewOutbackCode) === 0) {
      return 'All-new Outback';
    }
    const mappedCode = normalized.replace(/\d+/g, '');
    return kamT140ModelCodeMap[mappedCode] || '';
  }
  function kamT140ResolveModelNameFromTinyUrl(configUrl) {
    if (!kamT140IsTinyUrl(configUrl)) {
      return Promise.resolve('');
    }
    let timeoutId = null;
    let controller = null;
    if (typeof AbortController !== 'undefined') {
      controller = new AbortController();
      timeoutId = window.setTimeout(() => {
        controller.abort();
      }, kamT140TinyUrlResolveTimeoutMs);
    }
    return fetch(configUrl, {
      method: 'GET',
      redirect: 'follow',
      signal: controller ? controller.signal : undefined
    }).then(response => {
      const modelCode = kamT140GetModelCodeFromUrlString(response.url);
      if (modelCode) {
        return kamT140GetModelNameFromModelCode(modelCode);
      }
      return response.text().then(html => kamT140GetModelNameFromModelCode(kamT140GetModelCodeFromHtml(html)));
    }).catch(error => {
      console.log('%c *** T140 tinyurl model resolve failed ***', 'color:#fff;background:#900', {
        configUrl,
        error
      });
      return '';
    }).then(modelName => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      return modelName;
    });
  }
  function kamT140GetConfigureModelCode() {
    const pathMatch = window.location.pathname.match(/\/configure\/configure\/([^/?]+)/i);
    if (!pathMatch || !pathMatch[1]) {
      return '';
    }
    return pathMatch[1].toLowerCase();
  }
  function kamT140GetModelNameFromVariant(variantName) {
    const normalized = kamT140NormalizeModelText(variantName).toLowerCase();
    if (!normalized) {
      return '';
    }

    // All-new Outback line (AUOUT2026): AWD / Premium / Touring / Wilderness / Wilderness Apex
    if (normalized.includes('outback') && (normalized.includes('wilderness') || normalized.startsWith('all-new'))) {
      return 'All-new Outback';
    }

    // Runout Outback line (AUOUT): Outback AWD, Sport, Touring, XT, Onyx
    if (normalized.includes('outback')) {
      return 'Outback';
    }

    // "All-new Forester AWD Hybrid" -> "Forester" (match native short modelName)
    if (normalized.startsWith('all-new')) {
      const parts = kamT140NormalizeModelText(variantName).split(/\s+/);
      return parts[1] || '';
    }
    return kamT140NormalizeModelText(variantName).split(/\s+/)[0];
  }
  function kamT140GetModelNameFromUrl() {
    const modelCode = kamT140GetConfigureModelCode();
    return kamT140GetModelNameFromModelCode(modelCode);
  }
  function kamT140GetDomModelData() {
    const variantName = kamT140GetTextFromSelectors(kamT140VariantSelectors);
    const modelNameFromVariant = kamT140GetModelNameFromVariant(variantName);
    const modelNameFromUrl = kamT140GetModelNameFromUrl();

    // Prefer URL for Outback family so AUOUT2026 trims are not mislabeled as runout
    // when Summary text is "Outback AWD Touring" without the "All-new" prefix.
    let modelName = modelNameFromVariant || modelNameFromUrl;
    if (modelNameFromUrl === 'All-new Outback' || modelNameFromUrl === 'Outback') {
      modelName = modelNameFromUrl;
    }
    return {
      modelName,
      variantName
    };
  }
  function kamT140NeedsModelFallback(parsed) {
    if (!parsed || typeof parsed !== 'object') {
      return false;
    }
    return !kamT140HasModelValue(parsed.modelName) || !kamT140HasModelValue(parsed.variantName);
  }
  function kamT140WaitForVariantInDom(timeoutMs = 3000) {
    const existing = document.querySelector(kamT140VariantWaitSelector);
    if (existing && kamT140NormalizeModelText(existing.textContent)) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      let settled = false;
      function finish() {
        if (settled) {
          return;
        }
        settled = true;
        resolve();
      }
      let pollId = null;
      const timeoutId = window.setTimeout(() => {
        if (pollId) {
          window.clearInterval(pollId);
        }
        finish();
      }, timeoutMs);
      if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core && typeof Kameleoon.API.Core.runWhenElementPresent === 'function') {
        Kameleoon.API.Core.runWhenElementPresent(kamT140VariantWaitSelector, () => {
          window.clearTimeout(timeoutId);
          finish();
        });
        return;
      }
      pollId = window.setInterval(() => {
        const element = document.querySelector(kamT140VariantWaitSelector);
        if (element && kamT140NormalizeModelText(element.textContent)) {
          window.clearInterval(pollId);
          window.clearTimeout(timeoutId);
          finish();
        }
      }, 100);
    });
  }
  function kamT140FillMissingModelData(parsed) {
    const result = {
      parsed,
      modelFromDom: 'No'
    };
    if (!parsed || typeof parsed !== 'object') {
      return Promise.resolve(result);
    }
    let filledFromFallback = false;
    const hasModelName = kamT140HasModelValue(parsed.modelName);
    let hasVariantName = kamT140HasModelValue(parsed.variantName);

    // Hardcoded catalog fixes (e.g. Uncharted panoramic + premium paint label)
    if (hasVariantName) {
      const cleanedVariantName = kamT140CleanVariantName(parsed.variantName);
      if (cleanedVariantName && cleanedVariantName !== kamT140NormalizeModelText(parsed.variantName)) {
        parsed.variantName = cleanedVariantName;
        filledFromFallback = true;
        hasVariantName = kamT140HasModelValue(parsed.variantName);
      }
    }
    if (hasModelName && hasVariantName) {
      if (filledFromFallback) {
        console.log('%c *** T140 variantName cleaned ***', 'color:#fff;background:#060', {
          modelName: parsed.modelName,
          variantName: parsed.variantName
        });
      }
      return Promise.resolve(result);
    }
    const domModelData = kamT140GetDomModelData();
    if (!hasVariantName && domModelData.variantName) {
      parsed.variantName = domModelData.variantName;
      filledFromFallback = true;
    }
    if (!hasModelName && domModelData.modelName) {
      parsed.modelName = domModelData.modelName;
      result.modelFromDom = 'Yes';
      filledFromFallback = true;
    }
    if (!kamT140HasModelValue(parsed.modelName) && kamT140HasModelValue(parsed.variantName)) {
      parsed.modelName = kamT140GetModelNameFromVariant(parsed.variantName);
      result.modelFromDom = 'Yes';
      filledFromFallback = true;
    }
    if (!kamT140HasModelValue(parsed.modelName)) {
      const modelNameFromUrl = kamT140GetModelNameFromUrl();
      if (modelNameFromUrl) {
        parsed.modelName = modelNameFromUrl;
        result.modelFromDom = 'Yes';
        filledFromFallback = true;
      }
    }
    const tinyUrlPromise = !kamT140HasModelValue(parsed.modelName) && kamT140IsTinyUrl(parsed.configUrl) ? kamT140ResolveModelNameFromTinyUrl(parsed.configUrl) : Promise.resolve('');
    return tinyUrlPromise.then(modelNameFromTinyUrl => {
      if (!kamT140HasModelValue(parsed.modelName) && modelNameFromTinyUrl) {
        parsed.modelName = modelNameFromTinyUrl;
        result.modelFromDom = 'Yes';
        filledFromFallback = true;
        console.log('%c *** T140 modelName filled from tinyurl ***', 'color:#fff;background:#060', {
          configUrl: parsed.configUrl,
          modelName: parsed.modelName
        });
      }
      if (filledFromFallback) {
        console.log('%c *** T140 model data filled from DOM/URL fallback ***', 'color:#fff;background:#060', {
          modelName: parsed.modelName,
          variantName: parsed.variantName,
          modelFromDom: result.modelFromDom
        });
      }
      return result;
    });
  }

  /* eslint-disable no-console */

  const PHONE_STORAGE_KEY = 'kamT140PreferredPhone';
  function kamT140GetPreferredPhone() {
    return localStorage.getItem(PHONE_STORAGE_KEY) || '';
  }

  /* eslint-disable no-console */

  // Paste your deployed Google Apps Script web app URL here after setup.
  const GOOGLE_SHEET_LOG_URL = 'https://script.google.com/macros/s/AKfycbyspbjis5LbPquhEsFAVSBruChpvvRZgA2Yz99WPXbdaiIXYdVJN-YswAu2fuqQir-d/exec';
  function kamT140LogToGoogleSheet(logEntry) {
    fetch(GOOGLE_SHEET_LOG_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        timestamp: logEntry.timestamp,
        toEmail: logEntry.toEmail,
        firstName: logEntry.firstName,
        lastName: logEntry.lastName,
        modelName: logEntry.modelName,
        variantName: logEntry.variantName,
        configUrl: logEntry.configUrl,
        postCode: logEntry.postCode,
        mobile: logEntry.mobile || '',
        temperature: logEntry.temperature,
        modelFromDom: logEntry.modelFromDom || 'No'
      })
    }).catch(() => {
      console.warn('*** T140 Google Sheet log failed ***');
    });
  }
  const goals = {
    'Pop-up views T140': 430163
  };

  /* eslint-disable no-console */

  const POPUP_VIEWS_GOAL_NAME = 'Pop-up views T140';
  function kamT140V3ProcessGoal(goalName) {
    const goalId = goals[goalName];
    const canFireGoal = Boolean(goalId && typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Goals && Kameleoon.API.Goals.processConversion);
    if (!goalId) {
      console.warn('*** T140 V3 goal ID missing — update goals.js ***', goalName);
      return;
    }
    if (canFireGoal) {
      Kameleoon.API.Goals.processConversion(goalId);
      console.log('%c *** Kameleoon Goal  Processed ***', 'background:#fff;color:#000', goalName, goalId);
    }
  }
  function kamT140V3TriggerPopupViewsGoal() {
    kamT140V3ProcessGoal(POPUP_VIEWS_GOAL_NAME);
  }

  /* eslint-disable no-console */

  const kamT140V3PopupId = 'kamT140V3ShareBuildPopup';
  const kamT140V3Config = {
    selectors: {
      overlay: '.kamT140V3_overlay',
      closeBtn: '.kamT140V3_close',
      shareBtn: '.kamT140V3_shareBtn',
      keepBtn: '.kamT140V3_keepBtn',
      backBtn: '.kamT140V3_backBtn',
      choiceView: '.kamT140V3_choiceView',
      confirmView: '.kamT140V3_confirmView',
      carImage: '.kamT140V3_carImage',
      heading: '.kamT140V3_heading'
    },
    html: {
      popup: `
            <div class="kamT140V3_overlay" id="${kamT140V3PopupId}" role="dialog" aria-modal="true">
                <div class="kamT140V3_modal">
                    <button type="button" class="kamT140V3_close" aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        </svg>
                    </button>
                    <div class="kamT140V3_choiceView">
                        <h2 class="kamT140V3_heading">Your Subaru, your way</h2>
                        <p class="kamT140V3_subcopy">
                            Looking good! Would you like to share this build with a consultant to check local availability?
                        </p>
                        <div class="kamT140V3_imageWrap">
                            <img class="kamT140V3_carImage" src="" alt="Your configured Subaru">
                        </div>
                        <div class="kamT140V3_actions">
                            <button type="button" class="kamT140V3_shareBtn">Share build</button>
                            <button type="button" class="kamT140V3_keepBtn">Keep customising</button>
                        </div>
                    </div>
                    <div class="kamT140V3_confirmView" hidden>
                        <h2 class="kamT140V3_thankYou">Thank you!</h2>
                        <p class="kamT140V3_sentCopy">Your build has been sent.</p>
                        <div class="kamT140V3_imageWrap">
                            <img class="kamT140V3_carImage" src="" alt="Your configured Subaru">
                        </div>
                        <p class="kamT140V3_followUp">
                            One of our dealership sales consultants will reach out shortly.
                        </p>
                        <div class="kamT140V3_actions kamT140V3_actions--single">
                            <button type="button" class="kamT140V3_backBtn">Back to my build</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
  };
  function kamT140V3GetVehicleImageSrc() {
    const selectors = ['#customise_summary img[src*="inchcosy"]', '#customise_summary img', 'img[data-test="image:variant:0"]', '[data-test="image:variant:0"]', 'img[src*="inchcosy"][src*="view=front"]', 'img[src*="subaruauasset"]'];
    for (let index = 0; index < selectors.length; index += 1) {
      const element = document.querySelector(selectors[index]);
      if (!element) {
        continue;
      }
      const src = element.currentSrc || element.src || '';
      if (src) {
        return src;
      }
    }
    return '';
  }
  function kamT140V3FormatModelName(modelName) {
    const cleaned = String(modelName || '').replace(/^all-new\s+/i, '').replace(/\s+/g, ' ').trim();
    if (!cleaned) {
      return 'Subaru';
    }

    // Prefer short model label for heading ("WRX", "Outback", …)
    const firstWord = cleaned.split(' ')[0];
    return firstWord || cleaned;
  }
  function kamT140V3GetModelNameFromDom() {
    const selectors = ['#customise_summary [data-test="title:model"]', '[data-test="title:variantName"]', 'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]'];
    for (let index = 0; index < selectors.length; index += 1) {
      const element = document.querySelector(selectors[index]);
      const text = (element && (element.innerText || element.textContent) || '').trim();
      if (text) {
        return text;
      }
    }
    return '';
  }
  function kamT140V3EnsurePopup() {
    let overlay = document.getElementById(kamT140V3PopupId);
    if (overlay) {
      return overlay;
    }
    document.body.insertAdjacentHTML('beforeend', kamT140V3Config.html.popup);
    overlay = document.getElementById(kamT140V3PopupId);
    return overlay;
  }
  function kamT140V3SetCarImages(overlay, imageSrc) {
    if (!imageSrc) {
      return;
    }
    overlay.querySelectorAll(kamT140V3Config.selectors.carImage).forEach(img => {
      img.src = imageSrc;
    });
  }
  function kamT140V3SetHeading(overlay, modelName) {
    const heading = overlay.querySelector(kamT140V3Config.selectors.heading);
    if (!heading) {
      return;
    }
    const displayName = kamT140V3FormatModelName(modelName || kamT140V3GetModelNameFromDom());
    heading.textContent = `Your ${displayName}, your way`;
  }
  function kamT140V3ShowChoiceView(overlay) {
    const choiceView = overlay.querySelector(kamT140V3Config.selectors.choiceView);
    const confirmView = overlay.querySelector(kamT140V3Config.selectors.confirmView);
    if (choiceView) {
      choiceView.hidden = false;
    }
    if (confirmView) {
      confirmView.hidden = true;
    }
  }
  function kamT140V3ShowConfirmView(overlay) {
    const choiceView = overlay.querySelector(kamT140V3Config.selectors.choiceView);
    const confirmView = overlay.querySelector(kamT140V3Config.selectors.confirmView);
    if (choiceView) {
      choiceView.hidden = true;
    }
    if (confirmView) {
      confirmView.hidden = false;
    }
  }
  function kamT140V3ClosePopup() {
    const overlay = document.getElementById(kamT140V3PopupId);
    if (!overlay) {
      return;
    }
    overlay.classList.remove('kamT140V3_overlay--active');
    document.body.classList.remove('kamT140V3_popupOpen');
    window.__kamT140V3PopupOpen = false;
  }
  function kamT140V3ShowConfirmation() {
    const overlay = document.getElementById(kamT140V3PopupId);
    if (!overlay) {
      return;
    }
    kamT140V3ShowConfirmView(overlay);
    overlay.classList.add('kamT140V3_overlay--active');
    document.body.classList.add('kamT140V3_popupOpen');
    window.__kamT140V3PopupOpen = true;
  }

  /**
   * @param {object} options
   * @param {string} [options.modelName]
   * @param {() => void|Promise<void>} options.onShareBuild
   * @param {() => void|Promise<void>} options.onKeepCustomising
   * @param {() => void|Promise<void>} options.onClose
   */
  function kamT140V3ShowShareBuildPopup(options) {
    const overlay = kamT140V3EnsurePopup();
    const imageSrc = kamT140V3GetVehicleImageSrc();
    kamT140V3SetCarImages(overlay, imageSrc);
    kamT140V3SetHeading(overlay, options.modelName);
    kamT140V3ShowChoiceView(overlay);
    const shareBtn = overlay.querySelector(kamT140V3Config.selectors.shareBtn);
    const keepBtn = overlay.querySelector(kamT140V3Config.selectors.keepBtn);
    const closeBtn = overlay.querySelector(kamT140V3Config.selectors.closeBtn);
    const backBtn = overlay.querySelector(kamT140V3Config.selectors.backBtn);
    const runOnce = handler => {
      if (overlay.__kamT140V3Busy) {
        return;
      }
      overlay.__kamT140V3Busy = true;
      Promise.resolve().then(() => handler && handler()).catch(() => {}).finally(() => {
        overlay.__kamT140V3Busy = false;
      });
    };
    shareBtn.onclick = () => {
      runOnce(() => options.onShareBuild && options.onShareBuild());
    };
    keepBtn.onclick = () => {
      runOnce(() => options.onKeepCustomising && options.onKeepCustomising());
    };
    closeBtn.onclick = () => {
      runOnce(() => options.onClose && options.onClose());
    };
    backBtn.onclick = () => {
      kamT140V3ClosePopup();
    };
    overlay.onclick = event => {
      if (event.target === overlay) {
        runOnce(() => options.onClose && options.onClose());
      }
    };
    overlay.classList.add('kamT140V3_overlay--active');
    document.body.classList.add('kamT140V3_popupOpen');
    window.__kamT140V3PopupOpen = true;
    kamT140V3TriggerPopupViewsGoal();
    console.log('%c *** T140 V3 Share Build popup shown ***', 'color:#fff;background:#1637A0');
  }

  /* eslint-disable no-console */

  const TARGET_ENDPOINT = 'sendEmailWithNames';
  const PAYLOAD_LOG_KEY = 'kamT140HotLeadPayloadLogs';
  const PAYLOAD_LOG_LIMIT = 20;
  const PAYLOAD_LOG_WINDOW_KEY = '__kamT140HotLeadPayloadLogs';
  const PENDING_KEY = '__kamT140V3PendingRequest';
  const SUBMITTED_KEY = 'kamT140V3LeadSubmitted';
  const SUBMITTED_AT_KEY = 'kamT140V3LeadSubmittedAt';
  const PENDING_BODY_KEY = 'kamT140V3PendingBody';
  const PENDING_URL_KEY = 'kamT140V3SendEmailUrl';
  const EMAIL_LOCAL_KEY = 'kamT140V3EmailCollected';
  const SUMMARY_SELECTOR = '#customise_summary';
  // Only used when summary is visible but content has not painted yet.
  const SUMMARY_SETTLE_RETRY_MS = 100;
  const SUBMIT_RETRY_GUARD_MS = 8000;
  const CHECKOUT_BUTTON_SELECTOR = 'button[data-test="customise:summary:continuetocheckoutv4"]';
  const EMAIL_KEYS = ['kamT140EmailCollected', 'T37EmailCollected', EMAIL_LOCAL_KEY];
  function kamT140V3StorageGet(key) {
    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key) || '';
    } catch (error) {
      return '';
    }
  }
  function kamT140V3StorageSet(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      // sessionStorage may be unavailable
    }
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // localStorage may be unavailable
    }
  }
  function kamT140V3StorageRemove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      // ignore
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // ignore
    }
  }
  function kamT140V3WasRecentlySubmitted() {
    const submittedAt = Number(kamT140V3StorageGet(SUBMITTED_AT_KEY) || 0);
    if (!submittedAt) {
      // Legacy SUBMITTED flag without timestamp — do not block new sessions forever.
      return false;
    }
    return Date.now() - submittedAt < SUBMIT_RETRY_GUARD_MS;
  }
  function kamT140V3MarkSubmitted() {
    kamT140V3StorageSet(SUBMITTED_KEY, 'true');
    kamT140V3StorageSet(SUBMITTED_AT_KEY, String(Date.now()));
  }
  function kamT140V3ClearSubmitted() {
    kamT140V3StorageRemove(SUBMITTED_KEY);
    kamT140V3StorageRemove(SUBMITTED_AT_KEY);
  }
  function kamT140V3StoreLeadPayload(parsed, modelFromDom) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      toEmail: parsed.toEmail || '',
      firstName: parsed.firstName || '',
      lastName: parsed.lastName || '',
      modelName: parsed.modelName || '',
      variantName: parsed.variantName || '',
      configUrl: parsed.configUrl || '',
      postCode: parsed.postCode || parsed.postcode || '',
      mobile: parsed.mobile || '',
      temperature: parsed.temperature || '',
      modelFromDom: modelFromDom || 'No',
      payload: parsed
    };
    let logs = [];
    try {
      logs = JSON.parse(sessionStorage.getItem(PAYLOAD_LOG_KEY) || '[]');
    } catch (error) {
      logs = [];
    }
    logs.push(logEntry);
    if (logs.length > PAYLOAD_LOG_LIMIT) {
      logs = logs.slice(logs.length - PAYLOAD_LOG_LIMIT);
    }
    sessionStorage.setItem(PAYLOAD_LOG_KEY, JSON.stringify(logs));
    window[PAYLOAD_LOG_WINDOW_KEY] = logs;
    console.log(`%c *** T140 V3 ${parsed.temperature || ''} lead payload ***`, 'color:#fff;background:#1637A0;font-weight:bold', logEntry);
    kamT140LogToGoogleSheet(logEntry);
  }
  function getUrlString(input) {
    if (typeof input === 'string') {
      return input;
    }
    if (input && typeof input.url === 'string') {
      return input.url;
    }
    return '';
  }
  function isTargetUrl(url) {
    return typeof url === 'string' && url.indexOf(TARGET_ENDPOINT) !== -1;
  }
  function kamT140V3FakeSuccessResponse() {
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  function kamT140V3PrepareRequestBody(body, temperature) {
    if (typeof body !== 'string') {
      return Promise.resolve(body);
    }
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (error) {
      return Promise.resolve(body);
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return Promise.resolve(body);
    }
    const waitPromise = kamT140NeedsModelFallback(parsed) ? kamT140WaitForVariantInDom(3000) : Promise.resolve();
    return waitPromise.then(() => kamT140FillMissingModelData(parsed).then(fillResult => {
      parsed.temperature = temperature;
      const preferredPhone = kamT140GetPreferredPhone();
      if (preferredPhone) {
        parsed.mobile = preferredPhone;
      }
      kamT140V3StoreLeadPayload(parsed, fillResult.modelFromDom);
      return {
        body: JSON.stringify(parsed),
        modelName: parsed.modelName || ''
      };
    }));
  }
  function kamT140V3SendPendingLead(temperature) {
    const pending = window[PENDING_KEY];
    if (!pending || typeof pending.body !== 'string') {
      return Promise.resolve();
    }
    if (kamT140V3WasRecentlySubmitted()) {
      return Promise.resolve();
    }
    return kamT140V3PrepareRequestBody(pending.body, temperature).then(prepared => {
      const nextBody = typeof prepared === 'string' ? prepared : prepared.body;
      const headers = pending.headers || {
        'Content-Type': 'application/json'
      };
      kamT140V3MarkSubmitted();
      window.__kamT140V3BypassIntercept = true;
      return window.fetch(pending.url, {
        method: pending.method || 'POST',
        headers,
        body: nextBody,
        credentials: pending.credentials || 'same-origin'
      }).finally(() => {
        window.__kamT140V3BypassIntercept = false;
        window[PENDING_KEY] = null;
        kamT140V3StorageRemove(PENDING_BODY_KEY);
        kamT140V3StorageRemove(PENDING_URL_KEY);
      });
    });
  }
  function kamT140V3EmailFromPendingBody(body) {
    if (typeof body !== 'string') {
      return '';
    }
    try {
      const parsed = JSON.parse(body);
      return parsed && parsed.toEmail ? String(parsed.toEmail).trim() : '';
    } catch (error) {
      return '';
    }
  }
  function kamT140V3GetCollectedEmail() {
    for (let index = 0; index < EMAIL_KEYS.length; index += 1) {
      const email = kamT140V3StorageGet(EMAIL_KEYS[index]);
      if (email && email.trim()) {
        return email.trim();
      }
    }
    const pending = window[PENDING_KEY] || null;
    const fromPending = kamT140V3EmailFromPendingBody(pending && pending.body);
    if (fromPending) {
      return fromPending;
    }
    return kamT140V3EmailFromPendingBody(kamT140V3StorageGet(PENDING_BODY_KEY));
  }
  function kamT140V3PersistPending(pending) {
    window[PENDING_KEY] = pending;
    kamT140V3StorageSet(PENDING_BODY_KEY, pending.body);
    kamT140V3StorageSet(PENDING_URL_KEY, pending.url);
    const emailFromBody = kamT140V3EmailFromPendingBody(pending.body);
    if (emailFromBody) {
      kamT140V3StorageSet(EMAIL_LOCAL_KEY, emailFromBody);
      try {
        sessionStorage.setItem('kamT140EmailCollected', emailFromBody);
        sessionStorage.setItem('T37EmailCollected', emailFromBody);
      } catch (error) {
        // ignore
      }
    }
  }
  function kamT140V3RestorePendingFromSession() {
    if (window[PENDING_KEY]) {
      return window[PENDING_KEY];
    }
    const body = kamT140V3StorageGet(PENDING_BODY_KEY);
    const url = kamT140V3StorageGet(PENDING_URL_KEY);
    if (body && url) {
      window[PENDING_KEY] = {
        url,
        body,
        method: 'POST'
      };
    }
    return window[PENDING_KEY];
  }
  function kamT140V3BuildFallbackPayload() {
    const postCode = new URLSearchParams(window.location.search).get('postcode') || '';
    return {
      toEmail: kamT140V3GetCollectedEmail(),
      firstName: kamT140V3StorageGet('T38FNameCollected') || '',
      lastName: kamT140V3StorageGet('T38LNameCollected') || '',
      configUrl: window.location.href,
      postCode,
      postcode: postCode,
      modelName: '',
      variantName: ''
    };
  }
  function kamT140V3EnsurePendingRequest() {
    kamT140V3RestorePendingFromSession();
    if (window[PENDING_KEY]) {
      return Promise.resolve(true);
    }
    const url = kamT140V3StorageGet(PENDING_URL_KEY);
    if (!url) {
      return Promise.resolve(false);
    }
    const payload = kamT140V3BuildFallbackPayload();
    if (!payload.toEmail) {
      return Promise.resolve(false);
    }
    return kamT140FillMissingModelData(payload).then(() => {
      kamT140V3PersistPending({
        url,
        body: JSON.stringify(payload),
        method: 'POST'
      });
      console.log('%c *** T140 V3 fallback sendEmail payload built ***', 'color:#fff;background:#1637A0');
      return true;
    });
  }
  function kamT140V3GetModelNameFromBody(body) {
    if (typeof body !== 'string') {
      return '';
    }
    try {
      const parsed = JSON.parse(body);
      return parsed && parsed.modelName ? parsed.modelName : '';
    } catch (error) {
      return '';
    }
  }
  function kamT140V3IsSummaryInViewport() {
    const summarySection = document.querySelector(SUMMARY_SELECTOR);
    if (!summarySection) {
      return false;
    }
    const rect = summarySection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }
  function kamT140V3IsSummarySettled() {
    const summarySection = document.querySelector(SUMMARY_SELECTOR);
    if (!summarySection || !kamT140V3IsSummaryInViewport()) {
      return false;
    }
    return Boolean(summarySection.querySelector('[data-test="title:variantName"], [data-test="title:model"]') || summarySection.querySelector('img[src*="inchcosy"], img[src*="subaruauasset"]'));
  }
  function kamT140V3OpenPopup() {
    const pending = window[PENDING_KEY];
    if (!pending || typeof pending.body !== 'string') {
      return;
    }
    if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
      return;
    }
    kamT140V3ShowShareBuildPopup({
      modelName: kamT140V3GetModelNameFromBody(pending.body),
      onShareBuild: () => kamT140V3SendPendingLead('HOT').then(() => {
        kamT140V3ShowConfirmation();
      }),
      onKeepCustomising: () => kamT140V3SendPendingLead('WARM').then(() => {
        kamT140V3ClosePopup();
      }),
      onClose: () => kamT140V3SendPendingLead('WARM').then(() => {
        kamT140V3ClosePopup();
      })
    });
  }
  function kamT140V3TryShowPopup() {
    if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
      return;
    }
    if (!kamT140V3GetCollectedEmail()) {
      return;
    }
    if (!kamT140V3IsSummarySettled()) {
      return;
    }
    kamT140V3EnsurePendingRequest().then(hasPending => {
      if (!hasPending) {
        console.log('%c *** T140 V3 summary ready — waiting for sendEmail payload ***', 'color:#fff;background:#1637A0');
        return;
      }
      if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
        return;
      }
      console.log('%c *** T140 V3 summary in viewport — showing popup ***', 'color:#fff;background:#1637A0');
      kamT140V3OpenPopup();
    });
  }
  function kamT140V3ScheduleSummaryCheck() {
    window.clearTimeout(window.__kamT140V3SummaryCheckTimer);

    // Settled → show on next tick (coalesces scroll spam, no perceptible delay).
    // Not settled → brief retry while summary content paints.
    const delayMs = kamT140V3IsSummarySettled() ? 0 : SUMMARY_SETTLE_RETRY_MS;
    window.__kamT140V3SummaryCheckTimer = window.setTimeout(kamT140V3TryShowPopup, delayMs);
  }
  function kamT140V3StorePendingRequest(url, init, body) {
    // Native sendEmail again = new session opportunity (control also fires again).
    kamT140V3ClearSubmitted();
    kamT140V3PersistPending({
      url,
      body,
      method: init && init.method ? init.method : 'POST',
      headers: init && init.headers,
      credentials: init && init.credentials
    });
    kamT140V3ScheduleSummaryCheck();
  }
  function kamT140V3BindSummaryViewportWatchers() {
    if (window.__kamT140V3SummaryWatchBound) {
      return;
    }
    window.__kamT140V3SummaryWatchBound = true;
    const maybeSchedule = () => {
      if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
        return;
      }
      if (!document.querySelector(SUMMARY_SELECTOR) || !kamT140V3GetCollectedEmail()) {
        return;
      }
      kamT140V3ScheduleSummaryCheck();
    };
    window.addEventListener('scroll', maybeSchedule, {
      passive: true
    });

    // Another tab may hold sendEmail first (fake 200). Restore shared pending here.
    window.addEventListener('storage', event => {
      if (event.key !== PENDING_BODY_KEY && event.key !== PENDING_URL_KEY) {
        return;
      }
      if (!event.newValue) {
        return;
      }
      window[PENDING_KEY] = null;
      kamT140V3RestorePendingFromSession();
      maybeSchedule();
    });
    if (typeof IntersectionObserver === 'function') {
      const observeSummary = summarySection => {
        if (!summarySection || summarySection.__kamT140V3Observed) {
          return;
        }
        summarySection.__kamT140V3Observed = true;
        const observer = new IntersectionObserver(entries => {
          const visible = entries.some(entry => entry.isIntersecting);
          if (visible) {
            maybeSchedule();
          }
        }, {
          threshold: 0.15
        });
        observer.observe(summarySection);
      };
      if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core && typeof Kameleoon.API.Core.runWhenElementPresent === 'function') {
        Kameleoon.API.Core.runWhenElementPresent(SUMMARY_SELECTOR, elements => {
          const summarySection = Array.isArray(elements) ? elements[0] : elements;
          observeSummary(summarySection);
        });
      } else {
        observeSummary(document.querySelector(SUMMARY_SELECTOR));
      }
    }
    document.addEventListener('click', event => {
      if (kamT140V3WasRecentlySubmitted() || window.__kamT140V3PopupOpen) {
        return;
      }
      if (!kamT140V3GetCollectedEmail()) {
        return;
      }
      const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
      if (!el || !el.closest) {
        return;
      }
      const checkoutButton = el.closest(CHECKOUT_BUTTON_SELECTOR);
      const clickedButton = el.closest('button, a, [role="button"]');
      const label = clickedButton ? (clickedButton.innerText || clickedButton.textContent || '').replace(/\s+/g, ' ').trim() : '';
      const isSummaryTab = clickedButton && /^summary$/i.test(label);
      if (!checkoutButton && !isSummaryTab) {
        return;
      }
      kamT140V3ScheduleSummaryCheck();
    }, true);
  }
  function kamT140V3ShouldSwallowSendEmail() {
    // Only block while the popup is open. A fresh native sendEmail means a new
    // session (same as control) and must be held again — even in another tab.
    return Boolean(window.__kamT140V3PopupOpen);
  }
  function patchFetch() {
    const originalFetch = window.fetch;
    if (typeof originalFetch !== 'function' || originalFetch.__kamT140V3Patched) {
      return;
    }
    const patchedFetch = function kamT140V3Fetch(input, init) {
      const url = getUrlString(input);
      if (window.__kamT140V3BypassIntercept) {
        return originalFetch.call(this, input, init);
      }
      if (!isTargetUrl(url) || !init || typeof init.body !== 'string') {
        return originalFetch.call(this, input, init);
      }
      if (kamT140V3ShouldSwallowSendEmail()) {
        return Promise.resolve(kamT140V3FakeSuccessResponse());
      }

      // Hold payload; popup opens only after settled summary is in viewport.
      kamT140V3StorePendingRequest(url, init, init.body);
      return Promise.resolve(kamT140V3FakeSuccessResponse());
    };
    patchedFetch.__kamT140V3Patched = true;
    window.fetch = patchedFetch;
  }
  function kamT140V3FakeXhrSuccess(xhr) {
    window.setTimeout(() => {
      try {
        Object.defineProperty(xhr, 'readyState', {
          configurable: true,
          get: () => 4
        });
        Object.defineProperty(xhr, 'status', {
          configurable: true,
          get: () => 200
        });
        Object.defineProperty(xhr, 'responseText', {
          configurable: true,
          get: () => '{}'
        });
        Object.defineProperty(xhr, 'response', {
          configurable: true,
          get: () => '{}'
        });
      } catch (error) {
        // Some browsers may already have these set.
      }
      if (typeof xhr.onreadystatechange === 'function') {
        xhr.onreadystatechange();
      }
      if (typeof xhr.onload === 'function') {
        xhr.onload();
      }
    }, 0);
  }
  function patchXhr() {
    const XhrProto = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
    if (!XhrProto || XhrProto.__kamT140V3Patched) {
      return;
    }
    const originalOpen = XhrProto.open;
    const originalSend = XhrProto.send;
    XhrProto.open = function kamT140V3Open(method, url, ...rest) {
      this.__kamT140V3IsTarget = isTargetUrl(url);
      this.__kamT140V3Url = url;
      this.__kamT140V3Method = method;
      return originalOpen.call(this, method, url, ...rest);
    };
    XhrProto.send = function kamT140V3Send(body) {
      if (window.__kamT140V3BypassIntercept || !this.__kamT140V3IsTarget || typeof body !== 'string') {
        return originalSend.call(this, body);
      }
      if (kamT140V3ShouldSwallowSendEmail()) {
        kamT140V3FakeXhrSuccess(this);
        return undefined;
      }
      kamT140V3StorePendingRequest(this.__kamT140V3Url, {
        method: this.__kamT140V3Method || 'POST',
        body
      }, body);
      kamT140V3FakeXhrSuccess(this);
      return undefined;
    };
    XhrProto.__kamT140V3Patched = true;
  }
  function kamT140V3InterceptSendEmail() {
    if (window.__kamT140V3InterceptBound) {
      return;
    }
    window.__kamT140V3InterceptBound = true;
    patchFetch();
    patchXhr();
    kamT140V3RestorePendingFromSession();
    kamT140V3BindSummaryViewportWatchers();
    if (kamT140V3GetCollectedEmail() && document.querySelector(SUMMARY_SELECTOR)) {
      kamT140V3ScheduleSummaryCheck();
    }
  }

  /* eslint-disable no-console */

  (function kamT140SubaruV3() {
    function init() {
      if (document.body.classList.contains('subt140v3')) {
        return;
      }
      console.log('%c *** Subaru T140 V3 - Share Build popup (HOT / WARM) ***', 'color:red;background:white');
      document.body.classList.add('subt140v3');
      kamT140V3InterceptSendEmail();
      kamT140InitLeadsCaptured();
    }
    if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core) {
      init();
      return;
    }
    const waitForKam = window.setInterval(() => {
      if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Core) {
        window.clearInterval(waitForKam);
        init();
      }
    }, 100);
  })();
})();