import kamSubt139Config from './kamSubt139Config.js';

export function kamSubt139NormalizeModelText(text) {
    return text
        .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
}

export function kamSubt139GetBrochureSubmitModelName(modelName) {
    const normalized = kamSubt139NormalizeModelText(modelName).toLowerCase();

    if (normalized.includes('wilderness') && normalized.includes('outback')) {
        return 'All-new Outback Wilderness';
    }

    if (normalized.startsWith('all-new') && normalized.includes('outback')) {
        return 'All-new Outback';
    }

    if (normalized.startsWith('all-new')) {
        return kamSubt139NormalizeModelText(modelName);
    }

    return kamSubt139NormalizeModelText(modelName).split(/\s+/)[0];
}

export function kamSubt139GetBrochurePageModelParam(modelName) {
    const normalized = kamSubt139NormalizeModelText(modelName).toLowerCase();

    if (normalized.includes('wilderness') && normalized.includes('outback')) {
        return 'wilderness2026';
    }

    if (normalized.startsWith('all-new') && normalized.includes('outback')) {
        return 'outback2026';
    }

    return kamSubt139GetBrochureSubmitModelName(modelName);
}

export default function kamSubt139GetModelName() {
    const variantName = kamSubt139NormalizeModelText(
        document.querySelector(kamSubt139Config.selectors.variantName)
            ?.textContent || '',
    );

    if (variantName.toLowerCase().startsWith('all-new')) {
        return kamSubt139GetBrochureSubmitModelName(variantName);
    }

    return variantName.split(/\s+/)[0];
}
