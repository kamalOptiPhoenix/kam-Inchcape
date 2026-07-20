export default function closeModalClick() {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
        const isCloseBtn = target.closest('.form_modalClose');
        const isOverLay = target.closest('.KGMT1-form')
            && target.closest('.form_modal-content') === null;
        if (isCloseBtn || isOverLay) {
            document.body.classList.remove('t1-Modal-Show');
        }
    });
}
