import kamSubt139Config from './kamSubt139Config.js';
import {
    kamSubt139GetBrochurePageModelParam,
    kamSubt139GetBrochureSubmitModelName,
    kamSubt139NormalizeModelText,
} from './kamSubt139GetModelName.js';

function kamSubt139ResolveBrochureModelName(doc, modelName) {
    const submitModelName = kamSubt139GetBrochureSubmitModelName(modelName);
    const normalizedTarget = kamSubt139NormalizeModelText(submitModelName).toLowerCase();
    const carItems = doc.querySelectorAll('.carSelect__item[data-modelName]');
    let resolvedModelName = submitModelName;

    carItems.forEach((item) => {
        const pageModelName = item.getAttribute('data-modelName') || '';
        const normalizedPage = kamSubt139NormalizeModelText(pageModelName).toLowerCase();

        if (normalizedPage === normalizedTarget) {
            resolvedModelName = pageModelName;
        }
    });

    return resolvedModelName;
}

export default function kamSubt139GetBrochureTokens(modelName) {
    const brochurePageModel = kamSubt139GetBrochurePageModelParam(modelName);
    const brochureUrl = `${kamSubt139Config.urls.brochurePage}${encodeURIComponent(brochurePageModel)}`;

    return fetch(brochureUrl, {
        credentials: 'include',
    })
        .then((res) => res.text())
        .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const brochureForm = doc.querySelector('#brochureForm');
            const token = brochureForm?.querySelector('input[name="__RequestVerificationToken"]')?.value || '';
            const ufprt = brochureForm?.querySelector('input[name="ufprt"]')?.value || '';
            const resolvedModelName = kamSubt139ResolveBrochureModelName(doc, modelName);

            return {
                token,
                ufprt,
                modelName: resolvedModelName,
                brochureUrl,
            };
        })
        .catch(() => ({
            token: '',
            ufprt: '',
            modelName: kamSubt139NormalizeModelText(modelName),
            brochureUrl,
        }));
}
