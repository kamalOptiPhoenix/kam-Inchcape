import kamSubt139Config from './kamSubt139Config.js';
import { kamSubt139FireEmailBrochureSubmittedEvent } from './kamSubt139DigitalData.js';
import kamSubt139GetBrochureTokens from './kamSubt139GetBrochureTokens.js';
import kamSubt139GetModelName from './kamSubt139GetModelName.js';
import { kamSubt139TriggerEmailConversionGoal } from './kamSubt139TriggerGoals.js';
import {
    kamSubt139ShowFormSuccess,
    kamSubt139UpdateSendButtonState,
} from './kamSubt139ValidateForm.js';

function kamSubt139ResetSubmitButton(sendBtn, translations) {
    sendBtn.dataset.kamSubt139Submitting = 'false';
    sendBtn.textContent = translations.sendBtnText;
    kamSubt139UpdateSendButtonState();
}

export default function kamSubt139SubmitBrochureForm(sendBtn, emailInput) {
    const { translations } = kamSubt139Config;
    const formError = document.querySelector(kamSubt139Config.selectors.formError);
    const email = emailInput?.value.trim();
    const configuratorModelName = kamSubt139GetModelName();

    sendBtn.dataset.kamSubt139Submitting = 'true';
    sendBtn.disabled = true;
    sendBtn.textContent = translations.submitting;

    if (formError) {
        formError.textContent = '';
    }

    return kamSubt139GetBrochureTokens(configuratorModelName)
        .then(({ token, ufprt, modelName, brochureUrl }) => {
            if (!token || !ufprt) {
                kamSubt139ResetSubmitButton(sendBtn, translations);

                if (formError) {
                    formError.textContent = translations.tokenError;
                }

                return null;
            }

            const payload = new URLSearchParams();
            payload.append('ModelName', modelName);
            payload.append('ModelImageUrl', modelName);
            payload.append('Email', email);
            payload.append('FirstName', 'noname');
            payload.append('LastName', 'noname');
            payload.append('Phone', '');
            payload.append('Postcode', '');
            payload.append('__RequestVerificationToken', token);
            payload.append('ufprt', ufprt);
            payload.append('ContactMe', 'false');
            payload.append('TocAgreement', 'True');

            return fetch(kamSubt139Config.urls.submitForm, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    Referer: brochureUrl,
                },
                body: payload.toString(),
            });
        })
        .then((response) => {
            if (!response) {
                return;
            }

            return response.text().then(() => {
                if (!response.ok) {
                    kamSubt139ResetSubmitButton(sendBtn, translations);

                    if (formError) {
                        formError.textContent = `${translations.requestFailed} (${response.status})`;
                    }

                    return undefined;
                }

                return kamSubt139FireEmailBrochureSubmittedEvent(email).then(() => {
                    kamSubt139ShowFormSuccess();
                    kamSubt139TriggerEmailConversionGoal();
                });
            });
        })
        .catch(() => {
            kamSubt139ResetSubmitButton(sendBtn, translations);

            if (formError) {
                formError.textContent = translations.genericError;
            }
        });
}
