import kamSubt139Config from './kamSubt139Config.js';
import kamSubt139ResolveModelKey from './kamSubt139ResolveModelKey.js';

export default function kamSubt139GetModelImageUrl() {
    const variantName = document.querySelector(kamSubt139Config.selectors.variantName)
        ?.textContent || '';
    const modelKey = kamSubt139ResolveModelKey(variantName);

    if (!modelKey) {
        return '';
    }

    return kamSubt139Config.modelImageUrls[modelKey] || '';
}
