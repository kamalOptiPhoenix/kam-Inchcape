/* eslint-disable no-console */

const kamT140VariantWaitSelector = '#customise_summary [data-test="title:variantName"]';

const kamT140VariantSelectors = [
    kamT140VariantWaitSelector,
    '[data-test="trim_level_name:trim"] [data-test="title:variantName"]',
    'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]',
    '#customise_summary h6[data-test="title:model"]',
    '#customise_summary [data-test="title:model"]',
];

const kamT140ModelCodeMap = {
    aufor: 'Forester',
    auimp: 'Impreza',
    auout: 'Outback',
    aucros: 'Crosstrek',
    auwrx: 'WRX',
    aubrz: 'BRZ',
    ausol: 'Solterra',
    autrail: 'Trailseeker',
    auunch: 'Uncharted',
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

function kamT140GetTextFromSelectors(selectors) {
    for (let index = 0; index < selectors.length; index += 1) {
        const element = document.querySelector(selectors[index]);

        if (element && element.textContent) {
            const text = kamT140NormalizeModelText(element.textContent);

            if (text) {
                return text;
            }
        }
    }

    return '';
}

function kamT140GetModelNameFromVariant(variantName) {
    const normalized = kamT140NormalizeModelText(variantName).toLowerCase();

    if (!normalized) {
        return '';
    }

    if (normalized.includes('wilderness') && normalized.includes('outback')) {
        return 'All-new Outback Wilderness';
    }

    if (normalized.startsWith('all-new') && normalized.includes('outback')) {
        return 'All-new Outback';
    }

    if (normalized.startsWith('all-new')) {
        return kamT140NormalizeModelText(variantName);
    }

    return kamT140NormalizeModelText(variantName).split(/\s+/)[0];
}

function kamT140GetModelNameFromUrl() {
    const pathMatch = window.location.pathname.match(/\/configure\/configure\/([^/?]+)/i);

    if (!pathMatch || !pathMatch[1]) {
        return '';
    }

    const modelCode = pathMatch[1].replace(/\d+/g, '').toLowerCase();

    return kamT140ModelCodeMap[modelCode] || '';
}

function kamT140GetDomModelData() {
    const variantName = kamT140GetTextFromSelectors(kamT140VariantSelectors);
    const modelName = kamT140GetModelNameFromVariant(variantName)
        || kamT140GetModelNameFromUrl();

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
        return result;
    }

    const hasModelName = kamT140HasModelValue(parsed.modelName);
    const hasVariantName = kamT140HasModelValue(parsed.variantName);

    if (hasModelName && hasVariantName) {
        return result;
    }

    const domModelData = kamT140GetDomModelData();
    let filledFromFallback = false;

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
}
