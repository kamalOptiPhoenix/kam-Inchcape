import kamT34ModalSummaryEvents from './kamT34ModalSummaryEvents.js';

export default function kamT34ModalBuildSummary({ ModalImgDesktop, ModalImgMobile }) {
    const comingSoonModel = document.querySelectorAll('#js-summary-next').length === 0;
    const email = localStorage.getItem('userEmail');
    const Html = `
    <section class="t34ModalWrapper t34CongurationSaveModal">
        <img class="t34ModalImg t34DesktopImg" src="${ModalImgDesktop}"/>
        <img class="t34ModalImg t34MobileImg" src="${ModalImgMobile}"/>
        <h3 class="t34ModalHeading">
            Configuration saved
        </h3>
        <p>
            Your configuration has been <span>successfully</span> sent to:
            <br>
            <strong>${email}</strong>
        </p>
        <div class="t34ButtonWrapper">
            <button class="t34ModalBtn t34TestDriveCta">
                ${comingSoonModel ? 'Enquire Now' : 'Book a Test Drive'}
            </button>
            <button class="t34ModalBtn t34ReturnConfiguratorCta">
                Return to Configurator
            </button>
        </div>
    </section>`;
    if (document.querySelector('.t34CongurationSaveModal') === null && sessionStorage.getItem('t34RefExitIntent') !== null) {
        document.querySelector('body').insertAdjacentHTML('afterbegin', Html);
        kamT34ModalSummaryEvents(comingSoonModel);
        setTimeout(() => { window.jQuery('body').addClass('t34ModalShow'); }, 300);
    }
}
