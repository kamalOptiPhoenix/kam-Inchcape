/* eslint-disable no-unused-expressions */
export default function kamT34ModalSummaryEvents(comingSoonModel) {
    window.jQuery(document).on('click', '.t34ModalWrapper button.t34TestDriveCta', () => {
        window.jQuery('body').removeClass('t34ModalShow');
        sessionStorage.removeItem('t34RefExitIntent');
        const btn = comingSoonModel ? document.querySelector('div[data-target="#buildForm7"] a.js-buildfForm-cta') : document.querySelector('#js-summary-next');
        if (btn) {
            btn.click();
        }
    });
    window.jQuery(document).on('click', '.t34ModalWrapper button.t34ReturnConfiguratorCta', () => {
        window.jQuery('body').removeClass('t34ModalShow');
        sessionStorage.removeItem('t34RefExitIntent');
    });
}
