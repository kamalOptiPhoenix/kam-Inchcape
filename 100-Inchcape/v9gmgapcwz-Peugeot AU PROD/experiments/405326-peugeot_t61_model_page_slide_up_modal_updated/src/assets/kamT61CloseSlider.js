export default function kamT61CloseSlider() {
  Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
    const isCloseBtn = target.closest(".t61-close-slider");
    const isOverLay =
      target.closest(".t61-slider-overlay") &&
      target.closest(".t61-slider-container") === null;
    if (isCloseBtn || isOverLay) {
      const overlay = document.querySelector(".t61-slider-overlay");
      if (overlay) {
        document.body.classList.remove("t61-slide-up-animation");
        overlay.remove();
      }
    }
  });
}
