export default function kamT38CloseModalClickEvent() {
    jQuery('.t38ModalOverlay').click((event) => {
        const outsideModalClick = jQuery(event.target).closest('.t38ModalContainer').length === 0;
        if (outsideModalClick) jQuery('body').removeClass('t38ModalShow');
    });

    jQuery('.t38CloseButton').click(() => {
        jQuery('body').removeClass('t38ModalShow');
    });
}
