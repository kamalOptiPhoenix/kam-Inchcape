/* eslint-disable camelcase */
/* eslint-disable no-console */
import config from './config.js';

export default function init() {
    const bodyEl = document.querySelector('body');
    console.log('*** LDV T1 - Upfront Lead Capture Modal 4:51 ***');
    bodyEl.classList.add('ldvt1');

    // HTML and Event Bind
    if (!document.querySelector('.brochureModal')) {
        bodyEl.insertAdjacentHTML('afterbegin', config.html);
        config.fetchForm().then((form) => {
            const brochure_T1_form_wrapper = document.querySelector(
                '.brochure_T1_form_wrapper'
            );
            if (!brochure_T1_form_wrapper.querySelector('form')) {
                brochure_T1_form_wrapper.append(form);
                config.changeFormStyle();
                config.populateFormFromSession();
                config.handleDwnloadBtn();
                config.clickBind();
            }
        });
    }
}
