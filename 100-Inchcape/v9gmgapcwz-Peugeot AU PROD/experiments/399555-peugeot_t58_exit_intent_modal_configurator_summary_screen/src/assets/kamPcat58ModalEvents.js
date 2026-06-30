/* eslint-disable no-console */
import kamPcat58Config from './kamPcat58Config.js';
import kamPcat58ProcessGoal from './kamPcat58ProcessGoal.js';
import kamPcat58UpdateModalContent from './kamPcat58UpdateModalContent.js';

function kamPcat58HidePodiumBubble() {
    const podiumBubble = document.querySelector('#podium-bubble');
    if (podiumBubble) {
        podiumBubble.classList.add('PCAT58_hidePodium');
    }
}

function kamPcat58ShowPodiumBubble() {
    const podiumBubble = document.querySelector('#podium-bubble');
    if (podiumBubble) {
        podiumBubble.classList.remove('PCAT58_hidePodium');
    }
}

function kamPcat58CloseModal() {
    window.jQuery('.PCAT58_customModal').removeClass('PCAT58_Show');
    window.jQuery('body').removeClass('PCAT58_modalShowNoScroll');
    kamPcat58ShowPodiumBubble();
}

function kamPcat58ViewModal() {
    if (sessionStorage.getItem('PCAT58_PopupOpen') === null) {
        kamPcat58UpdateModalContent();
        window.jQuery('.PCAT58_customModal').addClass('PCAT58_Show');
        window.jQuery('body').addClass('PCAT58_modalShowNoScroll');
        sessionStorage.setItem('PCAT58_PopupOpen', 'true');
        kamPcat58HidePodiumBubble();
        console.log('*** T58 Modal Appearances goal triggered');
        kamPcat58ProcessGoal(kamPcat58Config.goalNames.modalAppearances);
    }
}

function kamPcat58MobileScrollEvent() {
    window.onscroll = function kamPcat58OnScroll() {
        if (sessionStorage.getItem('scrolledHalfDoc') === null) {
            sessionStorage.setItem('scrolledHalfDoc', 'false');
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
        );

        if (this.oldScroll > this.scrollY) {
            if (sessionStorage.getItem('scrolledHalfDoc') === 'true') {
                kamPcat58ViewModal();
            }
        } else if (scrollTop > documentHeight / 2) {
            sessionStorage.setItem('scrolledHalfDoc', 'true');
        }
        this.oldScroll = this.scrollY;
    };
}

function kamPcat58BindCloseEvents() {
    window.jQuery(document).on('click', '.PCAT58_backdrop', () => {
        kamPcat58CloseModal();
    });

    window.jQuery(document).on('click', '.PCAT58_closeBtn', () => {
        kamPcat58CloseModal();
    });

    window.jQuery(document).on('keydown', (event) => {
        if (event.key === 'Escape' && window.jQuery('.PCAT58_customModal').hasClass('PCAT58_Show')) {
            kamPcat58CloseModal();
        }
    });

    window.jQuery(document).on('click', '.PCAT58_primaryBtn', () => {
        kamPcat58ProcessGoal(kamPcat58Config.goalNames.primaryCta);
        kamPcat58CloseModal();
    });

}

function kamPcat58BindDisplayTriggerEvents() {
    if (window.innerWidth < 768) {
        kamPcat58MobileScrollEvent();
    } else {
        Kameleoon.API.Utils.addEventListener(document, 'mouseout', (event) => {
            if (!event.relatedTarget && !event.toElement && event.clientY <= 10) {
                kamPcat58ViewModal();
            }
        });
    }
}

export default {
    bindCloseEvents: kamPcat58BindCloseEvents,
    bindDisplayTriggerEvents: kamPcat58BindDisplayTriggerEvents,
};
