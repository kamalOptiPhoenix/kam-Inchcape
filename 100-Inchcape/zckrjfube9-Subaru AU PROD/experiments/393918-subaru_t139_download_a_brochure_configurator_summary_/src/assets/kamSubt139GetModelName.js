import kamSubt139Config from './kamSubt139Config.js';

export default function kamSubt139GetModelName() {
    const variantName = document.querySelector(kamSubt139Config.selectors.variantName)
        ?.textContent?.trim() || '';

    return variantName.split(/\s+/)[0];
}
