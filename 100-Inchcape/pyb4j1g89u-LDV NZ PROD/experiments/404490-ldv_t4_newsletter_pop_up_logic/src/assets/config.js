/* eslint-disable func-names */
import kamLdvt4ProcessGoal from './kamLdvt4ProcessGoal.js';

const config = {
    modules: {
        fetchPopup: () => fetch('https://ldv.co.nz/')
            .then(res => res.text())
            .then((htmlStr) => {
                const parser = new DOMParser();
                const parsedDoc = parser.parseFromString(htmlStr, 'text/html');
                const modal = parsedDoc.getElementById('popUpForm');
                return modal;
            }),
        formEvents: () => {
            const formModal = document.getElementById('popUpForm');
            const closeButtons = formModal.querySelectorAll('.form_modalClose');
            closeButtons.forEach((btn) => {
                Kameleoon.API.Utils.addEventListener(btn, 'click', () => {
                    formModal.style.display = 'none';
                });
            });

            Kameleoon.API.Utils.addEventListener(window, 'click', (event) => {
                if (event.target === formModal) {
                    formModal.style.display = 'none';
                }
            });
        },
        addPopup: () => {
            config.modules.fetchPopup()
                .then((popup) => {
                    if (document.getElementById('popUpForm') === null) {
                        document.body.append(popup);
                        config.modules.formEvents();
                    }
                    config.modules.triggerEvents();
                });
        },
        triggerEvents: () => {
            function viewModal() {
                if (sessionStorage.getItem('T4NewsletterViewed') === null) {
                    window.jQuery('#popUpForm').css('display', 'block');
                    sessionStorage.setItem('T4NewsletterViewed', 'true');
                    kamLdvt4ProcessGoal('Pop-up appearances T4');
                }
            }

            function mobileScrollEvent() {
                Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
                    if (sessionStorage.getItem('scrolledHalfDoc') === null) {
                        sessionStorage.setItem('scrolledHalfDoc', 'false');
                    }

                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    // Get the height of the document
                    const documentHeight = Math.max(
                        document.body.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.clientHeight,
                        document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight
                    );
                    // "false" if direction is down and "true" if up
                    if (window.oldScroll > window.scrollY) {
                        if (sessionStorage.getItem('scrolledHalfDoc') === 'true') {
                            viewModal();
                        }
                    } else if (scrollTop > documentHeight / 2) {
                        sessionStorage.setItem('scrolledHalfDoc', 'true');
                    }
                    window.oldScroll = window.scrollY;
                });
            }

            if (window.innerWidth < 768) {
                // View Modal (Mobile Only) when scroll 50% document and then scroll up
                sessionStorage.removeItem('scrolledHalfDoc');
                mobileScrollEvent();
            } else {
                // View Modal (desktop only) When mouseleave event trigger
                Kameleoon.API.Utils.addEventListener(
                    document.querySelector('body'),
                    'mouseleave',
                    viewModal,
                );
            }
        }
    }
};

export default config;
