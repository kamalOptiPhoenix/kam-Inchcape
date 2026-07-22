/* eslint-disable no-console */
import kamKgmt1ProcessGoal from './kamKgmt1ProcessGoal.js';

function revealModal() {
    sessionStorage.setItem('KGMT1Shown', 'true');
    setTimeout(() => {
        const popupForm = document.querySelector('#popUpForm.KGMT1-form');
        if (popupForm) {
            popupForm.classList.remove('hidden');
        }
        document.body.classList.add('t1-Modal-Show');
    }, 500);
    console.log('*** t1_pop-up_appearances goal triggered ***');
    kamKgmt1ProcessGoal('Pop-up appearances T1');
}

function showModal() {
    if (document.querySelector('#popUpForm.KGMT1-form')) {
        revealModal();
        return;
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.querySelector('#popUpForm.KGMT1-form'),
        revealModal,
    );
}

function mobileScrollEvent() {
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        if (sessionStorage.getItem('scrolledHalfDocV1') === null) {
            sessionStorage.setItem('scrolledHalfDocV1', 'false');
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );

        if (window.oldScroll > window.scrollY) {
            // Scrolling up
            if (sessionStorage.getItem('scrolledHalfDocV1') === 'true' && sessionStorage.getItem('KGMT1Shown') === null) {
                showModal();
            }
        } else if (scrollTop > documentHeight / 2) {
            sessionStorage.setItem('scrolledHalfDocV1', 'true');
        }
        window.oldScroll = window.scrollY;
    });
}

export default function triggerForm() {
    if (window.innerWidth < 768) {
        mobileScrollEvent();
    } else {
        Kameleoon.API.Utils.addEventListener(document, 'mouseout', (e) => {
            if (
                e.clientY < 5
                && !document.body.classList.contains('t1-Modal-Show') && sessionStorage.getItem('KGMT1Shown') === null
            ) {
                console.log('*** show exit intent modal', e.clientY);

                showModal();
            }
        });
    }
}
