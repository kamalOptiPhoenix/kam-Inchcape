/* eslint-disable prefer-destructuring */
import kamT56ProcessGoal from './src/assets/kamT56ProcessGoal.js';

function kamT56IsValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return false;
    if (email.includes('..')) return false;
    return true;
}

function kamT56HandleFormMessage(event) {
    if (event.origin !== 'https://peugeotforms.inchcape.com.au') {
        return;
    }

    if (event.data && event.data.type === 'FORM_SUBMITTING') {
        const email = event.data.email || '';

        if (email && kamT56IsValidEmail(email)) {
            kamT56ProcessGoal('brochure_contact_details_t56');
        }
    }

    if (event.data && event.data.type === 'FORM_SUBMIT_SUCCESS') {
        const email = event.data.email || '';

        if (email && kamT56IsValidEmail(email)) {
            kamT56ProcessGoal('brochure_download_success_t56');
        }
    }
}

(function kamPcat56Shared() {
    if (window.__kam405314SharedInitialized) {
        return;
    }
    window.__kam405314SharedInitialized = true;

    Kameleoon.API.Utils.addEventListener(window, 'message', kamT56HandleFormMessage);
}());
