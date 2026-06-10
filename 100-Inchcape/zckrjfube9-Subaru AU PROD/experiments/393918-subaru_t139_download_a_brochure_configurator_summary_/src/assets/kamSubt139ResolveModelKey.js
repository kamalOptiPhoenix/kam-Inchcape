export default function kamSubt139ResolveModelKey(variantName) {
    const normalized = (variantName || '').trim().toLowerCase();

    if (normalized.includes('wilderness') || normalized.includes('all-new')) {
        return 'wilderness';
    }

    if (normalized.includes('forester')) {
        return 'forester';
    }

    if (normalized.includes('crosstrek')) {
        return 'crosstrek';
    }

    if (normalized.includes('outback')) {
        return 'outback';
    }

    if (normalized.includes('trailseeker')) {
        return 'trailseeker';
    }

    if (normalized.includes('impreza')) {
        return 'impreza';
    }

    if (normalized.includes('wrx')) {
        return 'wrx';
    }

    if (normalized.includes('uncharted')) {
        return 'uncharted';
    }

    if (normalized.includes('solterra')) {
        return 'solterra';
    }

    if (normalized.includes('brz')) {
        return 'brz';
    }

    return '';
}
