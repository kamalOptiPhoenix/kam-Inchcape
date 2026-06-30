/* eslint-disable no-console */
import kamPcat58Config from '../assets/kamPcat58Config.js';

(function kamPcat58V1() {
    function kamPcat58Init() {
        console.log('*** Peugeot T58 - Exit Intent Modal Configurator Summary Screen ***');
        document.body.classList.add('PCAT58');
        window.jQuery('body').append(kamPcat58Config.modalHtml());
        kamPcat58Config.modalCloseEvent();
        kamPcat58Config.displayModalTriggerEvents();
    }

    if (!window.t58Start) {
        window.t58Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.jQuery === 'function',
            kamPcat58Init,
        );
    }
}());
