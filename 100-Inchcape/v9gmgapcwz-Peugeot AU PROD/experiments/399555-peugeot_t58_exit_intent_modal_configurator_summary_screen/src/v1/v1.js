/* eslint-disable no-console */
import kamPcat58Config from '../assets/kamPcat58Config.js';
import kamPcat58ModalEvents from '../assets/kamPcat58ModalEvents.js';

(function kamPcat58V1() {
    function kamPcat58Init() {
        console.log('*** Peugeot T58 - Exit Intent Modal Configurator Summary Screen ***');
        document.body.classList.add('PCAT58');
        window.jQuery('body').append(kamPcat58Config.modalHtml());
        kamPcat58ModalEvents.bindCloseEvents();
        kamPcat58ModalEvents.bindDisplayTriggerEvents();
    }
    if (window.__kamPcat58Initialized) {
        return;
    }
    window.__kamPcat58Initialized = true;
    Kameleoon.API.Core.runWhenElementPresent(
        'body',
        kamPcat58Init,
    );
}());
