import showSlider from './showSlider.js';

function detectCarModel() {
    const designElement = document.getElementById('tecnologiaVehiculos_Design');
    const interiorElement = document.getElementById('tecnologiaVehiculos_Interior');

    if (designElement) return 'S07';
    if (interiorElement) return 'E07';

    return null;
}

function mobileScrollEvent() {
    window.onscroll = function () {
        if (sessionStorage.getItem('scrolledHalfDocT5') === null) {
            sessionStorage.setItem('scrolledHalfDocT5', 'false');
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
        );

        if (window.oldScroll > window.scrollY) {
            if (sessionStorage.getItem('scrolledHalfDocT5') === 'true') {
                const model = detectCarModel();
                if (model) showSlider(model);
            }
        } else if (scrollTop > documentHeight / 2) {
            sessionStorage.setItem('scrolledHalfDocT5', 'true');
        }
        window.oldScroll = window.scrollY;
    };
}

export default function checkExitIntent() {
    if (
        window.innerWidth < 768
        && !document.body.classList.contains('t5-slide-up-animation')
    ) {
        mobileScrollEvent();
    } else {
        Kameleoon.API.Utils.addEventListener(document, 'mouseleave', (event) => {
            if (
                event.clientY < 5
                && !document.body.classList.contains('t5-slide-up-animation')
            ) {
                console.log('show exit intent modal');
                const model = detectCarModel();
                if (model) showSlider(model);
            }
        });
    }
}
