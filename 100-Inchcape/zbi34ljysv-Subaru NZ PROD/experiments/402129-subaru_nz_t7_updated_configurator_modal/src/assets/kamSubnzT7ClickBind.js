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
     
        if (pendingUrl) {
            sessionStorage.removeItem(redirectStorageKey);
            window.location.href = pendingUrl;
        }
    };

   

    document.addEventListener('click', (event) => {
        const triggerLink = event.target.closest(triggerSelector);
        if (triggerLink) {
            const showModal = shouldShowModal();
            const leadCaptureShown = sessionStorage.getItem('leadCaptureShown');
           

            if (showModal && leadCaptureShown === null) {
              
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
                
                return;
            }

        }

        if (event.target.closest('#skipButton')) {
            
            document.getElementById('skipConfirmation').classList.remove('hidden');
        }
        if (event.target.closest('#lead-capture-SubmitButton')) {
       
            document
                .querySelector('#leadCaptureForm .webform-button--submit')
                .click();
        }
        if (event.target.closest('#skipAnyway')) {
            
            document.body.classList.remove('leadCapture-Show');
            localStorage.setItem('leadCapture_skipped', 'true');
            redirectToStoredUrl();
        }
    }, true);
}
