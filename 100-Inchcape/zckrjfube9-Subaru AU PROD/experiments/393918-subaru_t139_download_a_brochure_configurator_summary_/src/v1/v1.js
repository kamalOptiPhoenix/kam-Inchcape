/* eslint-disable import/extensions */
/* eslint-disable max-len */
import KamMutation from '../../../../../utils/kamMutation.js';
import kamSubt139Config from '../assets/kamSubt139Config.js';
import kamSubt139InsertMarkup from '../assets/kamSubt139InsertMarkup.js';
import kamSubt139InitEvents from '../assets/kamSubt139InitEvents.js';

let kamSubt139Initialized = false;

function kamSubt139Init() {
    if (!kamSubt139Initialized) {
        document.body.classList.add('kamSubt139_body');
        console.log('%c SUBARU T139 DOWNLOAD A BROCHURE CONFIGURATOR SUMMARY', 'background-color: red; color: white;');
        kamSubt139InitEvents();
        kamSubt139Initialized = true;
    }

    kamSubt139InsertMarkup();
}

KamMutation(kamSubt139Config.selectors.customiseSummary, kamSubt139Init);
