import kamSubt139Config from './kamSubt139Config.js';

export function kamSubt139IsEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function kamSubt139UpdateSendButtonState() {
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const sendBtn = document.querySelector(kamSubt139Config.selectors.sendBtn);

    if (!sendBtn || sendBtn.dataset.kamSubt139Submitting === 'true') {
        return;
    }

    const isFormValid = kamSubt139IsEmailValid(emailInput?.value || '')
        && Boolean(privacyCheckbox?.checked);

    sendBtn.disabled = !isFormValid;
}

export function kamSubt139HandleEmailBlur() {
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    const emailError = document.querySelector(kamSubt139Config.selectors.emailError);
    const { translations } = kamSubt139Config;
    const emailValue = emailInput?.value.trim() || '';

    if (!emailValue || !kamSubt139IsEmailValid(emailValue)) {
        emailError.textContent = translations.invalidEmail;
    } else {
        emailError.textContent = '';
    }

    kamSubt139UpdateSendButtonState();
}

export function kamSubt139HandleEmailInput() {
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);
    const emailError = document.querySelector(kamSubt139Config.selectors.emailError);

    if (kamSubt139IsEmailValid(emailInput?.value || '')) {
        emailError.textContent = '';
    }

    kamSubt139UpdateSendButtonState();
}

export function kamSubt139HandlePrivacyBlur() {
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const privacyError = document.querySelector(kamSubt139Config.selectors.privacyError);
    const { translations } = kamSubt139Config;

    if (!privacyCheckbox?.checked) {
        privacyError.textContent = translations.privacyRequired;
    } else {
        privacyError.textContent = '';
    }

    kamSubt139UpdateSendButtonState();
}

export function kamSubt139HandlePrivacyChange() {
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const privacyError = document.querySelector(kamSubt139Config.selectors.privacyError);

    if (privacyCheckbox?.checked) {
        privacyError.textContent = '';
    }

    kamSubt139UpdateSendButtonState();
}

export function kamSubt139ResetModalForm() {
    const modal = document.querySelector(kamSubt139Config.selectors.modal);
    const emailError = document.querySelector(kamSubt139Config.selectors.emailError);
    const privacyError = document.querySelector(kamSubt139Config.selectors.privacyError);
    const privacyCheckbox = document.querySelector(kamSubt139Config.selectors.privacyCheckbox);
    const sendBtn = document.querySelector(kamSubt139Config.selectors.sendBtn);
    const formError = document.querySelector(kamSubt139Config.selectors.formError);
    const { translations } = kamSubt139Config;

    if (modal) {
        modal.classList.remove('kamSubt139_modalSuccess');
    }

    if (privacyCheckbox) {
        privacyCheckbox.checked = false;
    }

    if (emailError) {
        emailError.textContent = '';
    }

    if (privacyError) {
        privacyError.textContent = '';
    }

    if (formError) {
        formError.textContent = '';
    }

    if (sendBtn) {
        sendBtn.dataset.kamSubt139Submitting = 'false';
        sendBtn.textContent = translations.sendBtnText;
        sendBtn.disabled = true;
    }

    kamSubt139UpdateSendButtonState();
}

export function kamSubt139ShowFormSuccess() {
    const modal = document.querySelector(kamSubt139Config.selectors.modal);

    if (modal) {
        modal.classList.add('kamSubt139_modalSuccess');
    }
}
