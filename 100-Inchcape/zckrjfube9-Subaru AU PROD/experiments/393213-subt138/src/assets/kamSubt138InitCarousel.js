import kamSubt138Config from './kamSubt138Config';

export default function kamSubt138InitCarousel() {
    const mobileTrack = document.querySelector(
        kamSubt138Config.selectors.mobileTrack
    );

    const mobileDots = document.querySelectorAll(
        kamSubt138Config.selectors.mobileDots
    );

    if (!mobileTrack || !mobileDots.length) {
        return;
    }

    const kamSubt138UpdateDots = () => {
        const activeIndex = Math.round(
            mobileTrack.scrollLeft / mobileTrack.clientWidth
        );

        mobileDots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === activeIndex);
        });
    };

    mobileTrack.addEventListener('scroll', kamSubt138UpdateDots);

    mobileDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            mobileTrack.scrollTo({
                left: mobileTrack.clientWidth * index,
                behavior: 'smooth',
            });
        });
    });

    kamSubt138UpdateDots();
}
