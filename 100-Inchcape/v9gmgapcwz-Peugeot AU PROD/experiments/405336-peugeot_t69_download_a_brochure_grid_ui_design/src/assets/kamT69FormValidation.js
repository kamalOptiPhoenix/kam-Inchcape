import kamT69ProcessGoal from './kamT69ProcessGoal.js';

function kamT69IsValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return false;
    if (email.includes('..')) return false;
    return true;
}

export default function kamT69FormValidation() {
    Kameleoon.API.Core.runWhenElementPresent('.t56ModalOverlay', () => {
        console.log('T69 Modal detected, binding submit button');

        const submitBtn = document.querySelector('.btn-primary.btn-brand[type="submit"]');
        if (!submitBtn) return;

        Kameleoon.API.Utils.addEventListener(submitBtn, 'click', () => {
            const emailInput = document.querySelector('#userEmail');
            const privacyCheckbox = document.querySelector('#privacyPolicy\\.checkbox');
            const email = emailInput ? emailInput.value.trim() : '';
            const checkboxChecked = privacyCheckbox ? privacyCheckbox.checked : false;

            console.log('T69 Submit clicked. Email:', email, 'Checkbox checked:', checkboxChecked);

            if (kamT69IsValidEmail(email) && checkboxChecked) {
                console.log('T69: Valid email and checkbox active. Firing event...');
                kamT69ProcessGoal('brochure_contact_details_t69');
            } else {
                console.log('T69: Validation failed.');
            }
        });
    });
}
