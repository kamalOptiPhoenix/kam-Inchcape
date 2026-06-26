export default function kamT34ModalBuild({ ModalImgDesktop, ModalImgMobile }) {
    const Html = `
    <section class="t34ModalWrapper t34ExitIntentModal">
        <img class="t34ModalImg t34DesktopImg" src="${ModalImgDesktop}"/>
        <img class="t34ModalImg t34MobileImg" src="${ModalImgMobile}"/>
        <h3 class="t34ModalHeading">
            forgetting something?
        </h3>
        <p>
            You’re only 1 click away from completing your configuration
            <br>
            Click on the button below to save your configuration for later.
        </p>
        <button class="t34ModalBtn">
            Save my configuration
        </button>
    </section>`;
    document.querySelectorAll('.t34ExitIntentModal').forEach((section) => section.remove());
    document.querySelector('body').insertAdjacentHTML('afterbegin', Html);
}
