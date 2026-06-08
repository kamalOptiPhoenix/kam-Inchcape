/* eslint-disable import/extensions */
/* eslint-disable max-len */
import KamMutation from '../../../../../utils/kamMutation.js';
import kamSubt139Config from '../assets/kamSubt139Config.js';
import kamSubt139InsertMarkup from '../assets/kamSubt139InsertMarkup.js';
import kamSubt139InitEvents from '../assets/kamSubt139InitEvents.js';

function kamSubt139Init() {
    if (!window.__kamSubt139CoreInitialized) {
        document.body.classList.add('kamSubt139_body');
        kamSubt139InitEvents();
        window.__kamSubt139CoreInitialized = true;
    }

    kamSubt139InsertMarkup();
}

if (!window.__kamSubt139Bootstrapped) {
    window.__kamSubt139Bootstrapped = true;

    KamMutation(kamSubt139Config.selectors.customiseSummary, kamSubt139Init);
}
