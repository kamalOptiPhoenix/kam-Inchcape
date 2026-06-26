/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import kamT34MobileExitIntentEvent from './kamT34MobileExitIntentEvent.js';
import kamT34ProcessGoal from './kamT34ProcessGoal.js';

export default function kamT34ExitIntentEvents() {
    Kameleoon.API.Utils.addEventListener(document, 'mouseleave', () => {
        if (sessionStorage.getItem('t34ModalShowed') === null && window.innerWidth > 767) {
            kamT34ProcessGoal('T34 Exit Intent Modal Pageviews');
            window.jQuery('body').addClass('t34ModalShow');
            sessionStorage.setItem('t34ModalShowed', 'true');
        }
    });

    window.jQuery(document).on('click', '.t34ExitIntentModal .t34ModalBtn', () => {
        kamT34ProcessGoal('T34 Exit Intent Modal CTA Button Clicks');
        sessionStorage.setItem('t34RefExitIntent', true);
        console.log('*** Exit intent modal click ***');
        window.jQuery('body').removeClass('t34ModalShow');
        let summaryCta = document.querySelectorAll('.psStep[custom-index-title="Summary"] a');
        if (summaryCta.length === 0) {
            summaryCta = document.querySelectorAll('#js-step-list a[href*=summary]');
        }
        summaryCta[0].click();
    });

    kamT34MobileExitIntentEvent();
}
