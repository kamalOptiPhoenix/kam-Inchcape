function kamT38CloseModal(onClose) {
    jQuery('body').removeClass('t38ModalShow');

    if (onClose) {
        requestAnimationFrame(() => {
            onClose();
        });
    }
}

export default function kamT38CloseModalClickEvent(onClose) {
    if (window.__kamT38CloseModalBound) {
        return;
    }
    window.__kamT38CloseModalBound = true;

    jQuery('.t38ModalOverlay').click((event) => {
        const outsideModalClick = jQuery(event.target).closest('.t38ModalContainer').length === 0;
        if (outsideModalClick) kamT38CloseModal(onClose);
    });

    jQuery('.t38CloseButton').click(() => {
        kamT38CloseModal(onClose);
    });
}
