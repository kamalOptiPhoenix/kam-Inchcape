"use strict";

(function () {
  /* eslint-disable no-console */

  const EMAIL_KEY = 'kamT140EmailCollected';
  const FIRED_KEY = 'kamT140DigitalDataFired';
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
    const email = sessionStorage.getItem(EMAIL_KEY);
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
    sessionStorage.setItem(EMAIL_KEY, emailInput.value.trim());
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
        temperature: logEntry.temperature,
        modelFromDom: logEntry.modelFromDom || 'No'
      })
    }).catch(() => {
      console.warn('*** T140 Google Sheet log failed ***');
    });
  }

  /* eslint-disable no-console */

  const TARGET_ENDPOINT = 'sendEmailWithNames';
  const TEMPERATURE_VALUE = 'HOT';
  const PAYLOAD_LOG_KEY = 'kamT140HotLeadPayloadLogs';
  const PAYLOAD_LOG_LIMIT = 20;
  const PAYLOAD_LOG_WINDOW_KEY = '__kamT140HotLeadPayloadLogs';
  function kamT140StoreHotLeadPayload(parsed, modelFromDom) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      toEmail: parsed.toEmail || '',
      firstName: parsed.firstName || '',
      lastName: parsed.lastName || '',
      modelName: parsed.modelName || '',
      variantName: parsed.variantName || '',
      configUrl: parsed.configUrl || '',
      postCode: parsed.postCode || parsed.postcode || '',
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
    console.log('%c *** T140 HOT lead payload ***', 'color:#fff;background:#c00;font-weight:bold', logEntry);
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
  function kamT140PrepareRequestBody(body) {
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
      parsed.temperature = TEMPERATURE_VALUE;
      kamT140StoreHotLeadPayload(parsed, fillResult.modelFromDom);
      return JSON.stringify(parsed);
    }));
  }
  function patchFetch() {
    const originalFetch = window.fetch;
    if (typeof originalFetch !== 'function' || originalFetch.__kamT140Patched) {
      return;
    }
    const patchedFetch = function kamT140Fetch(input, init) {
      const url = getUrlString(input);
      if (isTargetUrl(url) && init && typeof init.body === 'string') {
        return kamT140PrepareRequestBody(init.body).then(nextBody => {
          const nextInit = {
            ...init,
            body: nextBody
          };
          return originalFetch.call(this, input, nextInit);
        });
      }
      return originalFetch.call(this, input, init);
    };
    patchedFetch.__kamT140Patched = true;
    window.fetch = patchedFetch;
  }
  function patchXhr() {
    const XhrProto = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
    if (!XhrProto || XhrProto.__kamT140Patched) {
      return;
    }
    const originalOpen = XhrProto.open;
    const originalSend = XhrProto.send;
    XhrProto.open = function kamT140Open(method, url, ...rest) {
      this.__kamT140IsTarget = isTargetUrl(url);
      return originalOpen.call(this, method, url, ...rest);
    };
    XhrProto.send = function kamT140Send(body) {
      if (this.__kamT140IsTarget && typeof body === 'string') {
        const xhr = this;
        kamT140PrepareRequestBody(body).then(nextBody => {
          originalSend.call(xhr, nextBody);
        });
        return;
      }
      return originalSend.call(this, body);
    };
    XhrProto.__kamT140Patched = true;
  }
  function kamT140InterceptTemperature() {
    if (window.__kamT140TemperatureBound) {
      return;
    }
    window.__kamT140TemperatureBound = true;
    patchFetch();
    patchXhr();
  }

  /* eslint-disable no-console */

  (function kamT140SubaruV1() {
    function init() {
      if (document.body.classList.contains('subt140')) {
        return;
      }
      console.log('%c *** Subaru T140 V1 - Turn Save my Build Leads into HOT', 'color:red;background:white');
      document.body.classList.add('subt140');
      kamT140InterceptTemperature();
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