export default function kamT35ScrollFunction() {
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        const nav = jQuery('.nav_anchor .q-navigation-bar[data-navigation-bar]');
        let offset = 0;
        const contentSection = document.querySelector('#main > div > .aem-Grid:last-child').getBoundingClientRect().y;
        if (nav.length > 0) {
            const height = nav.height() + (window.innerWidth < 992 ? 50 : 0);
            offset = height;
            jQuery('.t23-q-sticky-bootom-bar-wrapper').css('top', height);
        } else {
            const navOffset = window.innerWidth < 992 ? 50 : 0;
            jQuery('.t23-q-sticky-bootom-bar-wrapper').css('margin-top', navOffset);
        }
        if (contentSection < -offset) {
            jQuery('.t23-q-sticky-bootom-bar-wrapper').addClass('t23Sticky');
        } else {
            jQuery('.t23-q-sticky-bootom-bar-wrapper').removeClass('t23Sticky');
        }
    });
}
