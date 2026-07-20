import scrollHandelr from './scrollHandelr.js';
import getLdvt3Html from './getLdvt3Html.js';

export default function init(header, variant) {
    document.body.classList.add('ldvt3', `ldvt3_${variant}`);


    if (!document.getElementById('ldvt3butterbar')) {
        const html = getLdvt3Html(variant);
        header.insertAdjacentHTML('beforeend', html);
    }
    if (window.innerWidth < 768) {
        scrollHandelr();
    }
}
