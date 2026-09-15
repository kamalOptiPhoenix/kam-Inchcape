/* eslint-disable no-console */

const kamT140VariantWaitSelector = '#customise_summary [data-test="title:variantName"]';
const kamT140SelectedSpecPackSelector = 'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]';

// Prefer selected spec-pack title first — Summary title:variantName can concatenate
// feature labels (e.g. "Uncharted AWD Panoramic Glass Roof/Premium Paint").
const kamT140VariantSelectors = [
    kamT140SelectedSpecPackSelector,
    '[data-test="trim_level_name:trim"] > [data-test="title:variantName"]',
    kamT140VariantWaitSelector,
    '#customise_summary h6[data-test="title:model"]',
    '#customise_summary [data-test="title:model"]',
];

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
    autrail: 'Trailseeker',
};

const kamT140AllNewOutbackCode = 'auout2026';
const kamT140ConfigurePathPattern = /\/configure\/configure\/([^/?&#"'\\]+)/i;
const kamT140TinyUrlResolveTimeoutMs = 3000;

// Known bad DOM / payload variant labels -> Salesforce catalog names
const kamT140VariantNameReplacements = {
    'Uncharted AWD Panoramic Glass Roof/Premium Paint':
        'Uncharted AWD with Panoramic Glass Roof',
};

function kamT140NormalizeModelText(text) {
    return (text || '')
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
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
        signal: controller ? controller.signal : undefined,
    })
        .then((response) => {
            let modelCode = kamT140GetModelCodeFromUrlString(response.url);

            if (modelCode) {
                return kamT140GetModelNameFromModelCode(modelCode);
            }

            return response.text().then((html) => (
                kamT140GetModelNameFromModelCode(kamT140GetModelCodeFromHtml(html))
            ));
        })
        .catch((error) => {
            console.log(
                '%c *** T140 tinyurl model resolve failed ***',
                'color:#fff;background:#900',
                { configUrl, error }
            );

            return '';
        })
        .then((modelName) => {
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
    if (normalized.includes('outback')
        && (normalized.includes('wilderness') || normalized.startsWith('all-new'))) {
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
        variantName,
    };
}

export function kamT140NeedsModelFallback(parsed) {
    if (!parsed || typeof parsed !== 'object') {
        return false;
    }

    return !kamT140HasModelValue(parsed.modelName) || !kamT140HasModelValue(parsed.variantName);
}

export function kamT140WaitForVariantInDom(timeoutMs = 3000) {
    const existing = document.querySelector(kamT140VariantWaitSelector);

    if (existing && kamT140NormalizeModelText(existing.textContent)) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
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

        if (
            typeof Kameleoon !== 'undefined'
            && Kameleoon.API
            && Kameleoon.API.Core
            && typeof Kameleoon.API.Core.runWhenElementPresent === 'function'
        ) {
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

export default function kamT140FillMissingModelData(parsed) {
    const result = {
        parsed,
        modelFromDom: 'No',
    };

    if (!parsed || typeof parsed !== 'object') {
        return Promise.resolve(result);
    }

    let filledFromFallback = false;
    let hasModelName = kamT140HasModelValue(parsed.modelName);
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
            console.log(
                '%c *** T140 variantName cleaned ***',
                'color:#fff;background:#060',
                {
                    modelName: parsed.modelName,
                    variantName: parsed.variantName,
                }
            );
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

    const tinyUrlPromise = !kamT140HasModelValue(parsed.modelName) && kamT140IsTinyUrl(parsed.configUrl)
        ? kamT140ResolveModelNameFromTinyUrl(parsed.configUrl)
        : Promise.resolve('');

    return tinyUrlPromise.then((modelNameFromTinyUrl) => {
        if (!kamT140HasModelValue(parsed.modelName) && modelNameFromTinyUrl) {
            parsed.modelName = modelNameFromTinyUrl;
            result.modelFromDom = 'Yes';
            filledFromFallback = true;

            console.log(
                '%c *** T140 modelName filled from tinyurl ***',
                'color:#fff;background:#060',
                {
                    configUrl: parsed.configUrl,
                    modelName: parsed.modelName,
                }
            );
        }

        if (filledFromFallback) {
            console.log(
                '%c *** T140 model data filled from DOM/URL fallback ***',
                'color:#fff;background:#060',
                {
                    modelName: parsed.modelName,
                    variantName: parsed.variantName,
                    modelFromDom: result.modelFromDom,
                }
            );
        }

        return result;
    });
}
