import kamSubt139Config from './kamSubt139Config.js';

export default function kamSubt139GetBrochureTokens(modelName) {
    const brochureUrl = `${kamSubt139Config.urls.brochurePage}${encodeURIComponent(modelName)}`;

    return fetch(brochureUrl, {
        credentials: 'include',
    })
        .then((res) => res.text())
        .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const token = doc.querySelector('input[name="__RequestVerificationToken"]')?.value || '';
            const ufprt = doc.querySelector('input[name="ufprt"]')?.value || '';

            return { token, ufprt };
        })
        .catch(() => ({ token: '', ufprt: '' }));
}
