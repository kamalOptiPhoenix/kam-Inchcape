/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import kamSubnzT7ProcessGoal from './kamSubnzT7ProcessGoal.js';

function unlockAntibotKey(key) {
    // Mirrors Drupal antibot.js unlockForms key transform.
    return key
        .split('')
        .reverse()
        .join('')
        .match(/.{1,2}/g)
        .map((value) => value.split('').reverse().join(''))
        .join('');
}

export default function kamSubnzT7AppendLeadCaptureForm() {
    const redirectToStoredUrl = () => {
        const pendingUrl = sessionStorage.getItem('leadCapture_redirect_url');
        if (pendingUrl) {
            sessionStorage.removeItem('leadCapture_redirect_url');
            window.location.href = pendingUrl;
        }
    };

    fetch('/about/keep-me-informed', {
        credentials: 'same-origin',
    })
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const form = doc.querySelector('form.webform-submission-form');

            const scriptTag = doc.querySelector(
                'script[type="application/json"][data-drupal-selector="drupal-settings-json"]',
            );
            const settingsData = JSON.parse(scriptTag.textContent);
            const antibotKey = unlockAntibotKey(
                settingsData.antibot.forms[
                    'webform-submission-keep-me-informed-node-917-add-form'
                ].key,
            );

            const antibotInput = form.querySelector('input[name="antibot_key"]');
            if (antibotInput) {
                antibotInput.value = antibotKey;
            }

            // Antibot locks action to /antibot until unlocked; use data-action.
            form.action = form.getAttribute('data-action') || '/about/keep-me-informed';

            const container = document.getElementById('leadCaptureForm');

            if (!container.querySelector('form')) {
                container.insertAdjacentElement('afterbegin', form);
            }
            const emailLabel = document.querySelector('#leadCaptureForm label[for="edit-email-address"]');
            if (emailLabel) {
                emailLabel.innerHTML = 'Email';
            }

            const getFormData = (formElement) => {
                const formData = new FormData(formElement);
                const data = new URLSearchParams();
                formData.forEach((value, key) => {
                    data.append(key, value);
                });
                if (!data.has('antibot_key')) {
                    data.append('antibot_key', antibotKey);
                }
                return data;
            };

            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const formData = getFormData(form);

                fetch(form.action, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                })
                    .then((response) => response.text())
                    .then((responseHTML) => {
                        const responseDoc = new DOMParser().parseFromString(responseHTML, 'text/html');
                        const confirmationEl = responseDoc.querySelector(
                            '.webform-confirmation, .webform-confirmation__message, [data-drupal-messages] .messages--status',
                        );
                        const responseText = (responseDoc.body && responseDoc.body.textContent) || '';
                        const textSuccess = /Thanks for your interest in Subaru/i.test(responseText);

                        console.log('[SUBNZT7] form submit response', {
                            confirmationEl: !!confirmationEl,
                            textSuccess,
                            hasSubmissionFailed: /Submission failed/i.test(responseText),
                        });

                        if (confirmationEl || textSuccess) {
                            document.body.classList.remove('leadCapture-Show');
                            localStorage.removeItem('leadCapture_skipped');
                            localStorage.setItem('leadCaptured', 'true');
                            console.log('*** contact_details_collected goal triggerd ***');
                            kamSubnzT7ProcessGoal('Contact Details Captured');
                            redirectToStoredUrl();
                        } else {
                            const errorEl = responseDoc.querySelector(
                                '.messages--error, .messages.messages--error, .webform-error-message, .form-item--error-message, [role="alert"]',
                            );
                            const errorText = errorEl && errorEl.textContent && errorEl.textContent.trim();
                            console.log('[SUBNZT7] form submit failed', errorText);
                            alert(errorText ? `Form not submitted: ${errorText}` : 'Form not submitted successfully.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error submitting form:', error);
                    });
            });
        })
        .catch((error) => {
            console.error('Error fetching the page:', error);
        });
}
