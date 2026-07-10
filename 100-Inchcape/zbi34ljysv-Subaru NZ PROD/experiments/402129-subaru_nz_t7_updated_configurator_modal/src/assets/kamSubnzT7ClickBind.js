/* eslint-disable no-console */
export default function kamSubnzT7ClickBind() {
    const triggerSelector = 'div[data-test="container:cars"] a[href*="/configure/trim-levels"]';
    const redirectStorageKey = 'leadCapture_redirect_url';
    const shouldShowModal = () => (
        localStorage.getItem('leadCaptured') === null
        || localStorage.getItem('leadCapture_skipped') === 'true'
    );
    const redirectToStoredUrl = () => {
        const pendingUrl = sessionStorage.getItem(redirectStorageKey);
        console.log('[SUBNZT7] redirectToStoredUrl', pendingUrl);
        if (pendingUrl) {
            sessionStorage.removeItem(redirectStorageKey);
            window.location.href = pendingUrl;
        }
    };

    console.log('[SUBNZT7] clickBind attached', {
        triggerCount: document.querySelectorAll(triggerSelector).length,
        leadCaptured: localStorage.getItem('leadCaptured'),
        leadCaptureSkipped: localStorage.getItem('leadCapture_skipped'),
        leadCaptureShown: sessionStorage.getItem('leadCaptureShown'),
        modalPresent: !!document.getElementById('leadCaptureModal'),
    });

    document.addEventListener('click', (event) => {
        const triggerLink = event.target.closest(triggerSelector);
        if (triggerLink) {
            const showModal = shouldShowModal();
            const leadCaptureShown = sessionStorage.getItem('leadCaptureShown');
            console.log('[SUBNZT7] trigger link clicked', {
                href: triggerLink.href,
                showModal,
                leadCaptureShown,
                leadCaptured: localStorage.getItem('leadCaptured'),
                leadCaptureSkipped: localStorage.getItem('leadCapture_skipped'),
                target: event.target,
            });

            if (showModal && leadCaptureShown === null) {
                console.log('[SUBNZT7] showing lead capture modal');
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                sessionStorage.setItem('leadCaptureShown', 'true');
                sessionStorage.setItem(redirectStorageKey, triggerLink.href);
                const skipConfirmation = document.getElementById('skipConfirmation');
                if (skipConfirmation) {
                    skipConfirmation.classList.add('hidden');
                }
                document.body.classList.add('leadCapture-Show');
                console.log('[SUBNZT7] body class after show', document.body.className);
                return;
            }

            console.log('[SUBNZT7] modal skipped — allowing navigation');
        }

        if (event.target.closest('#skipButton')) {
            console.log('[SUBNZT7] skip button clicked');
            document.getElementById('skipConfirmation').classList.remove('hidden');
        }
        if (event.target.closest('#lead-capture-SubmitButton')) {
            console.log('[SUBNZT7] submit button clicked');
            document
                .querySelector('#leadCaptureForm .webform-button--submit')
                .click();
        }
        if (event.target.closest('#skipAnyway')) {
            console.log('[SUBNZT7] skip anyway clicked');
            document.body.classList.remove('leadCapture-Show');
            localStorage.setItem('leadCapture_skipped', 'true');
            redirectToStoredUrl();
        }
    }, true);
}
