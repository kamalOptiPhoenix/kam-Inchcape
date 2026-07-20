/* eslint-disable id-length */
export default function setupModalEvents(config) {
    const modal = document.getElementById(config.modalId);
    const closeBtn = modal.querySelector('.t60-modal-close');
    const overlay = modal.querySelector('.t60-modal-overlay');
    const container = modal.querySelector('.t60-modal-container');

    function closeModal() {
        // Set session storage flag to prevent modal from appearing again
        sessionStorage.setItem('T7_slideup_popup', 'closed');

        // Remove the show class to trigger CSS transitions
        modal.classList.remove('t60-modal-show');
        modal.classList.add('t60-modal-closing');

        setTimeout(() => {
            modal.remove();
        }, config.timings.closeDelay);
    }

    // Close button click handler
    Kameleoon.API.Utils.addEventListener(closeBtn, 'click', closeModal);

    // Close modal when clicking anywhere on the modal (including overlay)
    Kameleoon.API.Utils.addEventListener(modal, 'click', (e) => {
        // Close if clicking directly on the modal/overlay (not on the container)
        if (e.target === modal || e.target === overlay) {
            closeModal();
        }
    });

    // Prevent modal from closing when clicking inside the container
    Kameleoon.API.Utils.addEventListener(container, 'click', (e) => {
        e.stopPropagation();
    });

    // Button event handlers
    Kameleoon.API.Utils.addEventListener(modal.querySelector('.t60-price-btn'), 'click', () => {
        // Add price list logic here
    });

    Kameleoon.API.Utils.addEventListener(modal.querySelector('.t60-testdrive-btn'), 'click', () => {
        // Add test drive logic here
    });

    Kameleoon.API.Utils.addEventListener(modal.querySelector('.t60-brochure-btn'), 'click', () => {
        // Add brochure logic here
    });
}
