/* eslint-disable max-len */
/**
 * Template variation — replace experiment / variation IDs with real Kameleoon IDs.
 * Build: gulp build --customer-id 100 --sitecode ehyb90qi6k --experiment-id 1999999
 */
import { goals } from './goals';

function mount() {
    document.body.classList.add('opti-inchcape-t999');

    const id = 'opti-inchcape-t999-banner';
    if (document.getElementById(id)) return;

    const el = document.createElement('div');
    el.id = id;
    el.innerHTML = '<div class="opti-inchcape-t999-inner"><span>Inchcape workspace template</span>'
        + '<button type="button" class="opti-inchcape-t999-btn">Test goal</button></div>';
    document.body.appendChild(el);

    const btn = el.querySelector('.opti-inchcape-t999-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const gid = goals['T999 template CTA'];
            if (gid && typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Goals
                && Kameleoon.API.Goals.processConversion) {
                Kameleoon.API.Goals.processConversion(gid);
            }
        });
    }
}

Kameleoon.API.Core.runWhenElementPresent('body', () => {
    mount();
});
