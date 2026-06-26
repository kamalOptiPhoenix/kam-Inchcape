/* eslint-disable no-unused-expressions */
import kamT34ProcessGoal from './kamT34ProcessGoal.js';

export default function kamT34MobileExitIntentEvent() {
    let lastScrollPosition = 0;

    function handleScroll() {
        const currentScrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const halfwayPoint = (documentHeight - windowHeight) / 2;

        if (currentScrollPosition > lastScrollPosition) {
            if (currentScrollPosition > halfwayPoint) {
                sessionStorage.setItem('t34DocHalfScrolled', 'true');
            }
        } else if (sessionStorage.getItem('t34DocHalfScrolled') !== null
            && sessionStorage.getItem('t34ModalShowed') === null
            && window.innerWidth < 768) {
            kamT34ProcessGoal('T34 Exit Intent Modal Pageviews');
            window.jQuery('body').addClass('t34ModalShow');
            sessionStorage.setItem('t34ModalShowed', 'true');
        }

        lastScrollPosition = currentScrollPosition;
    }

    Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll);
}
