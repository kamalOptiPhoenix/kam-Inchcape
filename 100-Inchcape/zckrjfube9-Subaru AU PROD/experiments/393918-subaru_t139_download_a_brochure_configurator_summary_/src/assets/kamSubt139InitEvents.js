import kamSubt139Config from './kamSubt139Config.js';
import {
    kamSubt139FireBrochureCtaStartEvent,
    kamSubt139FireBrochureDownloadSubmittedEvent,
} from './kamSubt139DigitalData.js';
import kamSubt139GetBrochurePdfUrl from './kamSubt139GetBrochurePdfUrl.js';
import kamSubt139GetModelImageUrl from './kamSubt139GetModelImageUrl.js';
import kamSubt139SubmitBrochureForm from './kamSubt139SubmitBrochureForm.js';
import {
    kamSubt139TriggerBrochureCtaClickGoal,
    kamSubt139TriggerDownloadTextLinkClickGoal,
} from './kamSubt139TriggerGoals.js';
import {
    kamSubt139HandleEmailBlur,
    kamSubt139HandleEmailInput,
    kamSubt139HandlePrivacyBlur,
    kamSubt139HandlePrivacyChange,
    kamSubt139ResetModalForm,
    kamSubt139UpdateSendButtonState,
} from './kamSubt139ValidateForm.js';

function kamSubt139PrefillEmail() {
    const existingEmail = sessionStorage.getItem(
        kamSubt139Config.sessionStorageKeys.emailCollected
    ) || '';
    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);

    if (emailInput && existingEmail) {
        emailInput.value = existingEmail;
    }
}

function kamSubt139UpdateDownloadLink() {
    const downloadLink = document.querySelector(kamSubt139Config.selectors.downloadLink);
    const brochurePdfUrl = kamSubt139GetBrochurePdfUrl();

    if (downloadLink && brochurePdfUrl) {
        downloadLink.href = brochurePdfUrl;
    }
}

function kamSubt139UpdateCarImage() {
    const carImage = document.querySelector(kamSubt139Config.selectors.carImage);
    const modelImageUrl = kamSubt139GetModelImageUrl();

    if (carImage && modelImageUrl) {
        carImage.src = modelImageUrl;
    }
}

function kamSubt139OpenModal() {
    const modal = document.querySelector(kamSubt139Config.selectors.modalOverlay);

    if (!modal) {
        return;
    }

    kamSubt139ResetModalForm();
    kamSubt139PrefillEmail();
    kamSubt139UpdateDownloadLink();
    kamSubt139UpdateCarImage();
    kamSubt139UpdateSendButtonState();
    modal.classList.add('kamSubt139_modalOverlayOpen');
}

function kamSubt139CloseModal() {
    const modal = document.querySelector(kamSubt139Config.selectors.modalOverlay);

    if (modal) {
        modal.classList.remove('kamSubt139_modalOverlayOpen');
    }
}

function kamSubt139HandleDocumentClick(event) {
    if (event.target.closest(kamSubt139Config.selectors.brochureBtn)) {
        kamSubt139TriggerBrochureCtaClickGoal();
        kamSubt139FireBrochureCtaStartEvent();
        kamSubt139OpenModal();
        return;
    }

    if (event.target.matches(kamSubt139Config.selectors.modalOverlay)) {
        kamSubt139CloseModal();
        return;
    }

    if (event.target.closest(kamSubt139Config.selectors.closeBtn)) {
        kamSubt139CloseModal();
        return;
    }

    if (event.target.closest(kamSubt139Config.selectors.downloadLink)) {
        event.preventDefault();

        const brochurePdfUrl = kamSubt139GetBrochurePdfUrl();

        if (brochurePdfUrl) {
            window.open(brochurePdfUrl, '_blank', 'noopener,noreferrer');
        }

        kamSubt139TriggerDownloadTextLinkClickGoal();
        kamSubt139FireBrochureDownloadSubmittedEvent();
        return;
    }

    const sendBtn = event.target.closest(kamSubt139Config.selectors.sendBtn);

    if (!sendBtn || sendBtn.disabled) {
        return;
    }

    const emailInput = document.querySelector(kamSubt139Config.selectors.emailInput);

    kamSubt139SubmitBrochureForm(sendBtn, emailInput);
}

function kamSubt139HandleDocumentFocusOut(event) {
    if (event.target.matches(kamSubt139Config.selectors.emailInput)) {
        kamSubt139HandleEmailBlur();
        return;
    }

    if (event.target.matches(kamSubt139Config.selectors.privacyCheckbox)) {
        kamSubt139HandlePrivacyBlur();
    }
}

function kamSubt139HandleDocumentInput(event) {
    if (event.target.matches(kamSubt139Config.selectors.emailInput)) {
        kamSubt139HandleEmailInput();
    }
}

function kamSubt139HandleDocumentChange(event) {
    if (event.target.matches(kamSubt139Config.selectors.privacyCheckbox)) {
        kamSubt139HandlePrivacyChange();
    }
}

export default function kamSubt139InitEvents() {
    if (window.__kamSubt139EventsBound) {
        return;
    }

    window.__kamSubt139EventsBound = true;
    document.addEventListener('click', kamSubt139HandleDocumentClick);
    document.addEventListener('focusout', kamSubt139HandleDocumentFocusOut);
    document.addEventListener('input', kamSubt139HandleDocumentInput);
    document.addEventListener('change', kamSubt139HandleDocumentChange);
}
