export default function kamT56CloseModalClickEvent() {
    Kameleoon.API.Utils.addEventListener(document, 'click', (event) => {
        const overlay = document.querySelector('.t56ModalOverlay');
        if (overlay && event.target === overlay) {
            document.body.classList.remove('t56ModalShow');
        }
        if (event.target.classList.contains('t56CloseButton')) {
            document.body.classList.remove('t56ModalShow');
        }
    });
}
