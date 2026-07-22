(function kamPcat56Iframe() {
    const formData = { model: null, email: null };
    let successHandled = false;

    const PARENT_ORIGIN = 'https://www.peugeot.com.au';

    function notifyParentReady() {
        try {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage('childReady', PARENT_ORIGIN);
            }
        } catch (e) {
            console.error('[PCAT56 iframe] Error sending childReady:', e);
        }
    }

    function kamPcat56HandleMessage(event) {
        if (
            event.origin !== 'https://configurator.peugeot.com.au'
            && event.origin !== PARENT_ORIGIN
        ) {
            console.warn('[PCAT56 iframe] Rejected message from invalid origin:', event.origin);
            return;
        }

        if (event.data && event.data.type === 'SET_FORM_DATA') {
            formData.model = event.data.model;
            formData.email = event.data.email;
            setFormValues();
        }
    }

    function setFormValues() {
        const modelInput = document.querySelector('#model');
        if (modelInput && formData.model) {
            modelInput.value = formData.model;
            modelInput.dispatchEvent(new Event('input', { bubbles: true }));
            modelInput.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (!modelInput) {
            console.warn('[PCAT56 iframe] Model field not found: #model');
        }

        const emailInput = document.querySelector('#userEmail');
        if (emailInput && formData.email) {
            emailInput.value = formData.email;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            emailInput.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (!emailInput) {
            console.warn('[PCAT56 iframe] Email field not found: #userEmail');
        }
    }

    function checkForSuccess() {
        const successDiv = document.querySelector('.success');
        if (successDiv && !successHandled) {
            successHandled = true;
            successDiv.style.display = 'none';

            const emailInput = document.querySelector('#userEmail');
            const email = (emailInput && emailInput.value.trim()) || formData.email || '';
            const modelInput = document.querySelector('#model');
            const model = (modelInput && modelInput.value.trim()) || formData.model || '';

            try {
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({
                        event: 'updatevirtualpath',
                        formsLeadType: 'cold lead',
                        formsName: 'download brochure',
                        formsLeadID: 'PCAT56',
                        mainStepIndicator: '1',
                        mainStepName: 'confirmation'
                    }, PARENT_ORIGIN);

                    window.parent.postMessage({
                        type: 'FORM_SUBMIT_SUCCESS',
                        experiment: 'pcat56',
                        model,
                        email
                    }, PARENT_ORIGIN);
                }
            } catch (e) {
                console.error('[PCAT56 iframe] Error sending postMessage:', e);
            }
        }
    }

    function handleSubmitClick() {
        if (successHandled) return;

        const emailInput = document.querySelector('#userEmail');
        const modelInput = document.querySelector('#model');
        const email = (emailInput && emailInput.value.trim()) || formData.email || '';
        const model = (modelInput && modelInput.value.trim()) || formData.model || '';

        console.log('[PCAT56 iframe] Submit clicked. Email:', email, 'Model:', model);

        try {
            if (window.parent && window.parent !== window) {
                const message = {
                    type: 'FORM_SUBMITTING',
                    experiment: 'pcat56',
                    model,
                    email
                };
                console.log('[PCAT56 iframe] Sending FORM_SUBMITTING message:', message);
                window.parent.postMessage(message, PARENT_ORIGIN);
            }
        } catch (e) {
            console.error('[PCAT56 iframe] Error sending submit message:', e);
        }
    }

    function attachSubmitListener() {
        const submitBtn = document.querySelector('input.btn-primary.btn-brand[type="submit"]');
        if (submitBtn && !submitBtn.dataset.pcat56Bound) {
            Kameleoon.API.Utils.addEventListener(submitBtn, 'click', handleSubmitClick);
            submitBtn.dataset.pcat56Bound = 'true';
        }
    }

    function startSuccessObserver() {
        const observer = new MutationObserver(() => {
            checkForSuccess();
            attachSubmitListener();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        attachSubmitListener();
    }

    function init() {
        document.body.classList.add('pcat56-iframe');

        if (formData.model || formData.email) {
            setFormValues();
        }

        startSuccessObserver();
        notifyParentReady();
    }

    if (window.__kam405316Initialized) {
        return;
    }
    window.__kam405316Initialized = true;

    Kameleoon.API.Utils.addEventListener(window, 'message', kamPcat56HandleMessage);

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.body,
        () => {
            if (document.readyState === 'loading') {
                Kameleoon.API.Utils.addEventListener(document, 'DOMContentLoaded', init);
            } else {
                init();
            }
        },
    );
}());
