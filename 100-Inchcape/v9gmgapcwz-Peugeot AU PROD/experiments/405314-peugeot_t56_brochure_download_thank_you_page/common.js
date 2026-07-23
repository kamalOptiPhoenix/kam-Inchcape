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

    console.log('T56: postMessage received from iframe: Local', event.data);

    if (event.data && event.data.type === 'FORM_SUBMITTING') {
        const email = event.data.email || '';
        const model = event.data.model || '';

        console.log('T56: Form submitting. Email:', email, 'Model:', model);

        if (email && kamT56IsValidEmail(email)) {
            console.log('T56: Valid email. Firing event...');
            kamT56ProcessGoal('Brochure Contact Details T56');
        } else {
            console.log('T56: Invalid email, event not fired. Email value:', email);
        }
    }

    if (event.data && event.data.type === 'FORM_SUBMIT_SUCCESS') {
        const email = event.data.email || '';
        const model = event.data.model || '';

        console.log('T56: Form submit success. Email:', email, 'Model:', model);

        if (email && kamT56IsValidEmail(email)) {
            console.log('T56: Valid email on success. Firing confirmation event...');
            kamT56ProcessGoal('Brochure Download Success T56');
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
