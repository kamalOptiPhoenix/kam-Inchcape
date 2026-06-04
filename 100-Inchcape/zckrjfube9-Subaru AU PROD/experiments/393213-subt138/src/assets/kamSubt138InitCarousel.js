import kamSubt138Config from './kamSubt138Config';
import { kamSubt138GetPersistRoot } from './kamSubt138PersistRoot';

function kamSubt138GetCarouselElements() {
    const persistRoot = kamSubt138GetPersistRoot();
    const mobileCarousel = persistRoot?.querySelector(
        kamSubt138Config.selectors.mobileCarousel
    );

    if (!mobileCarousel?.isConnected) {
        return null;
    }

    const mobileTrack = mobileCarousel.querySelector(
        kamSubt138Config.selectors.mobileTrack
    );
    const mobileDots = mobileCarousel.querySelectorAll(
        kamSubt138Config.selectors.mobileDots
    );
    const slides = mobileTrack?.querySelectorAll('a');

    if (!mobileTrack || !mobileDots.length || !slides?.length) {
        return null;
    }

    return {
        mobileCarousel,
        mobileTrack,
        mobileDots,
        slides,
    };
}

function kamSubt138GetActiveSlideIndex(mobileTrack, slides) {
    const scrollLeft = mobileTrack.scrollLeft;
    let activeIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - scrollLeft);

        if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
        }
    });

    return activeIndex;
}

function kamSubt138UpdateDots() {
    const elements = kamSubt138GetCarouselElements();

    if (!elements) {
        return;
    }

    const { mobileTrack, mobileDots, slides } = elements;
    const activeIndex = kamSubt138GetActiveSlideIndex(mobileTrack, slides);

    mobileDots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === activeIndex);
    });
}

function kamSubt138BindScrollSync() {
    const elements = kamSubt138GetCarouselElements();

    if (!elements || elements.mobileTrack.dataset.subt138ScrollBound) {
        return;
    }

    elements.mobileTrack.dataset.subt138ScrollBound = 'true';
    elements.mobileTrack.addEventListener('scroll', kamSubt138UpdateDots, { passive: true });
}

function kamSubt138BindDelegates() {
    if (window.__subt138DelegatesBound) {
        return;
    }

    window.__subt138DelegatesBound = true;

    document.addEventListener('click', (event) => {
        const dot = event.target.closest(kamSubt138Config.selectors.mobileDots);

        if (!dot) {
            return;
        }

        const elements = kamSubt138GetCarouselElements();

        if (!elements) {
            return;
        }

        const { mobileTrack, mobileDots, slides } = elements;
        const dotIndex = [...mobileDots].indexOf(dot);

        if (dotIndex < 0 || !slides[dotIndex]) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        mobileTrack.scrollTo({
            left: slides[dotIndex].offsetLeft,
            behavior: 'smooth',
        });

        window.setTimeout(kamSubt138UpdateDots, 350);
    }, true);
}

export default function kamSubt138InitCarousel() {
    kamSubt138BindDelegates();

    const elements = kamSubt138GetCarouselElements();

    if (!elements) {
        return;
    }

    kamSubt138BindScrollSync();
    kamSubt138UpdateDots();
}
