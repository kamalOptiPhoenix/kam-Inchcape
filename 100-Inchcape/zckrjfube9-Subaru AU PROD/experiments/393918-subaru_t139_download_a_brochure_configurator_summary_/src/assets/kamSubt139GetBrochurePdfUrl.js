import kamSubt139Config from './kamSubt139Config.js';

export default function kamSubt139GetBrochurePdfUrl() {
    const variantName = document.querySelector(kamSubt139Config.selectors.variantName)
        ?.textContent?.trim()
        .toLowerCase() || '';
    const { brochurePdfUrls } = kamSubt139Config;

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
