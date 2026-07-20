export default function scrollHandelr() {
    let lastScrollTop = 0;
    const butterBar = document.getElementById('ldvt3butterbar');

    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolling down – Show butter bar
            butterBar.style.transform = 'translateY(0)';
        } else {
            // Scrolling up – Hide butter bar
            butterBar.style.transform = 'translateY(-100%)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile bounce effect
    });
}
