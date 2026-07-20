/* eslint-disable no-console */
import kamKgmt1ProcessGoal from './kamKgmt1ProcessGoal.js';

function validateForm() {
    const form = document.querySelector('#popUpForm.KGMT1-form form');
    if (!form) return;

    Kameleoon.API.Utils.addEventListener(form, 'submit', (e) => {
        e.preventDefault(); // stop default submit
        let isValid = true;

        // Validate first name
        const firstName = form.querySelector('#firstName');
        const firstNameFeedback = firstName.nextElementSibling;
        if (!firstName.value.trim().match(/^[A-Za-z\s]+$/)) {
            firstNameFeedback.textContent = 'Please enter a valid first name.';
            firstName.classList.add('border-red-500');
            isValid = false;
        } else {
            firstNameFeedback.textContent = '';
            firstName.classList.remove('border-red-500');
        }

        // Validate last name
        const lastName = form.querySelector('#lastName');
        const lastNameFeedback = lastName.nextElementSibling;
        if (!lastName.value.trim().match(/^[A-Za-z\s]+$/)) {
            lastNameFeedback.textContent = 'Please enter a valid last name.';
            lastName.classList.add('border-red-500');
            isValid = false;
        } else {
            lastNameFeedback.textContent = '';
            lastName.classList.remove('border-red-500');
        }

        // Validate email
        const email = form.querySelector('#email');
        const emailFeedback = email.nextElementSibling;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        if (!email.value.trim().match(emailPattern)) {
            emailFeedback.textContent = 'Please enter a valid email address.';
            email.classList.add('border-red-500');
            isValid = false;
        } else {
            emailFeedback.textContent = '';
            email.classList.remove('border-red-500');
        }

        // Validate checkbox
        const checkbox = form.querySelector('#customCheckBox');
        const checkboxFeedback = form.querySelector(
            '#customCheckBox'
        ).parentElement.querySelector('.invalid-feedback');
        if (!checkbox.checked) {
            checkboxFeedback.textContent = 'Please accept the privacy policy.';
            isValid = false;
        } else {
            checkboxFeedback.textContent = '';
        }

        // Submit if valid
        if (isValid) {
            console.log('*** t1_newsletter_conversions goal triggered ***');
            kamKgmt1ProcessGoal('t1_newsletter_conversions');
            form.submit();
        }
    });
}

export default function appendForm() {
    fetch('https://www.kgm.co.nz/')
        .then(res => res.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const popupForm = doc.querySelector('#popUpForm');
            if (popupForm) {
                document.body.appendChild(popupForm);
                popupForm.classList.add('KGMT1-form');
                validateForm();
                console.log('*** Pop-up form appended successfully.');
            } else {
                console.warn('***Pop-up form not found.');
            }
        })
        .catch(err => console.error('Failed to fetch the page:', err));
}
