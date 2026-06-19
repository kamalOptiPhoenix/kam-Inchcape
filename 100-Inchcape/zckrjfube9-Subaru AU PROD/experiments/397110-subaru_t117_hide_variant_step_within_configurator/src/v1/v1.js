/* eslint-disable import/extensions */
/* eslint-disable no-console */
import handleDetailPage from '../assets/handleDetailPage.js';
import handleListPage from '../assets/handleListPage.js';
import watchElement from '../assets/watchElement.js';

const INIT_SELECTOR = 'div[data-test="container:models"] div[data-test="container:cars"] > div.SPC_WIDGET-MuiGrid-root, [data-test^="container:variants_section:"].SPC_WIDGET-MuiAccordion-root, .SPC_WIDGET-MuiGrid-grid-md-8';

(function v1() {
    function init() {
        document.body.classList.add('subt117');

        if (window.location.pathname.startsWith('/configure/models')) {
            handleListPage();
        }

        if (window.location.pathname.startsWith('/configure/configure')) {
            handleDetailPage();
        }
    }

    watchElement(INIT_SELECTOR, init);
}());
