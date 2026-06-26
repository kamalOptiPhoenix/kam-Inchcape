export default function kamT38CloseModalClickEvent() {
    document.querySelector('.t38ModalOverlay').addEventListener('click', (event) => {
        const outsideModalClick = !event.target.closest('.t38ModalContainer');
        if (outsideModalClick) document.body.classList.remove('t38ModalShow');
    });

    document.querySelector('.t38CloseButton').addEventListener('click', () => {
        document.body.classList.remove('t38ModalShow');
    });
}
