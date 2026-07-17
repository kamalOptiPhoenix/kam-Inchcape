/* eslint-disable camelcase */
/* eslint-disable no-console */
import config from './config.js';

export default function init() {
    const bodyEl = document.querySelector('body');
    console.log('*** LDV T5 - Pricelist Lead Capture ***');
    bodyEl.classList.add('ldvt5');

    // HTML and Event Bind
    if (!document.querySelector('.brochureModal')) {
        bodyEl.insertAdjacentHTML('afterbegin', config.html);
        config.fetchForm().then((form) => {
            const brochure_T5_form_wrapper = document.querySelector(
                '.brochure_T5_form_wrapper'
            );
            if (!brochure_T5_form_wrapper.querySelector('form')) {
                brochure_T5_form_wrapper.append(form);
                config.changeFormStyle();
                config.populateFormFromSession();
                config.handleDwnloadBtn();
                config.clickBind();
            }
        });
    }
}
