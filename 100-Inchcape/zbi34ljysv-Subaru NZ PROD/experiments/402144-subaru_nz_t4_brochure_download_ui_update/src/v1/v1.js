/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamSubnzT4HandleCarSelection from '../assets/kamSubnzT4HandleCarSelection.js';
import kamSubnzT4ModifyUI from '../assets/kamSubnzT4ModifyUI.js';

function kamSubnzT4ModifyConfirmationModal() {
    Kameleoon.API.Core.runWhenElementPresent(
        'div.ui-dialog.webform-confirmation-modal',
        () => {
            const originalModal = document.querySelector('div.ui-dialog.webform-confirmation-modal');
            if (originalModal && !originalModal.dataset.subnzt4Processed) {
                originalModal.dataset.subnzt4Processed = 'true';

                console.log('*** modifyConfirmationModal ***', originalModal);

                const modalContent = originalModal.querySelector('.webform-confirmation-modal--content');

                if (modalContent) {
                    const text = modalContent.textContent || modalContent.innerText;
                    if (text.includes('Your brochure request has been received.')) {
                        const isMobile = window.innerWidth <= 768;
                        const brTag = isMobile ? '<br/><br/>' : '<br/>';

                        modalContent.innerHTML = text.replace(
                            'Your brochure request has been received.',
                            `Your brochure request has been received.${brTag}`,
                        );
                    }
                }
            }
        },
    );
}

(function kamSubnzT4V1() {
    function init() {
        console.log('*** Subaru NZ T4 - Brochure Download UI Update ***');
        document.body.classList.add('subnzt4');
        kamSubnzT4ModifyUI();
        kamSubnzT4HandleCarSelection();
        kamSubnzT4ModifyConfirmationModal();
    }

    if (!window.subnzt2Start) {
        window.subnzt2Start = true;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.querySelector('body'),
            init,
        );
    }
}());
