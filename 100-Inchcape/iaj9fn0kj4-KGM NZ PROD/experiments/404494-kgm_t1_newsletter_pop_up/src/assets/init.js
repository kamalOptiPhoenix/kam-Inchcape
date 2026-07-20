/* eslint-disable no-console */
import appendForm from './appendForm.js';
import triggerForm from './triggerForm.js';
import closeModalClick from './closeModalClick.js';

export default function init() {
    console.log('*** KGM T1 - Newsletter Pop-up ***');
    document.body.classList.add('KGMT1');
    appendForm();
    triggerForm();
    closeModalClick();
}
