/* eslint-disable import/extensions */
import kamSubt138Config from './kamSubt138Config.js';

export default function kamSubt138InsertMarkup(searchBarContent) {
    if (
        document.querySelector(kamSubt138Config.selectors.desktopGrid)
        || document.querySelector(kamSubt138Config.selectors.mobileCarousel)
    ) {
        return;
    }

    searchBarContent.insertAdjacentHTML(
        'afterend',
        kamSubt138Config.html.gridMarkup
    );
}
