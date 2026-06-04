"use strict";

(function () {
  const kamSubt138Config = {
    selectors: {
      searchBarContent: '#search-bar-content',
      mobileTrack: '.subt138-mobile-track',
      mobileDots: '.subt138-mobile-carousel .subt138-mobile-dots button',
      desktopGrid: '.subt138_custom-grid',
      mobileCarousel: '.subt138-mobile-carousel'
    },
    html: {
      gridMarkup: `
              <section class="subt138_custom-grid">
                <div class="subt138_grid">

                    <div class="subt138_top">

                        <a href="https://www.subaru.com.au/outback/2026" class="subt138_outback">
                            <img src="https://cdn.optimizely.com/img/15841360337/08ca1a9a33a5445f9679fb716cc14800.jpg" alt="Outback">
                        </a>

                        <a href="https://www.subaru.com.au/uncharted/2026" class="subt138_uncharted">
                            <img src="https://cdn.optimizely.com/img/15841360337/85dd67b9db6d44ba89a8c12f8ed7f055.jpg" alt="Uncharted">
                        </a>

                        <a href="https://www.subaru.com.au/wilderness/2026" class="subt138_wilderness">
                            <img src="https://cdn.optimizely.com/img/15841360337/87482eb2e6b24ad7ae582559808d29f1.jpg" alt="Wilderness">
                        </a>

                    </div>

                    <div class="subt138_bottom">

                        <a href="https://www.subaru.com.au/special-offers/my26-forester-awd-hybrid-driveaway-offer" class="subt138_forester">
                            <img src="https://cdn.optimizely.com/img/15841360337/aaa213e4b08c4c9d9511f88d81bdf663.jpg" alt="Forester">
                        </a>

                        <a href="https://www.subaru.com.au/trailseeker/2026" class="subt138_trailseeker">
                            <img src="https://cdn.optimizely.com/img/15841360337/81f0f50a3c014e298a59969a7d20e3bc.jpg" alt="Trailseeker">
                        </a>

                    </div>

                </div>
            </section>
             <div class="subt138-mobile-carousel">
        <div class="subt138-mobile-track">
        
        <a class="subt138_outback_mobile" href="https://www.subaru.com.au/outback/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/8bf9f99102f44f29a1ea1275b6095fb1.jpg" alt="Outback">
            </a>
            
             <a class="subt138_uncharted_mobile" href="https://www.subaru.com.au/uncharted/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/61f4a8ff928447d284e33903f53533ed.jpg" alt="Uncharted">
            </a>
            
             <a class="subt138_wilderness_mobile" href="https://www.subaru.com.au/wilderness/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/333625f2944f48fdaf83ae3487ad03d7.jpg" alt="Wilderness">
            </a>

            <a class="subt138_forester_mobile" href="https://www.subaru.com.au/special-offers/my26-forester-awd-hybrid-driveaway-offer">
                <img src="https://cdn.optimizely.com/img/15841360337/4abf4348be91416d9ea6ca0bc420b706.jpg" alt="Forester">
            </a>

            <a class="subt138_trailseeker_mobile" href="https://www.subaru.com.au/trailseeker/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/9ff815457f4f4e5da0a15cb356d5f62f.jpg" alt="Trailseeker">
            </a>

        </div>

        <div class="subt138-mobile-dots">
            <button class="is-active"></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>

    </div>`
    }
  };
  const SUBT138_BUILD_VERSION = 'v3-delegates';

  /* eslint-disable import/extensions */

  const PERSIST_ROOT_ID = 'subt138-persist-root-v3';
  let persistRoot = null;
  function kamSubt138RestorePersistRootFromWindow() {
    const storedRoot = window.__subt138PersistRoot;
    if (storedRoot?.id === PERSIST_ROOT_ID) {
      persistRoot = storedRoot;
    }
  }
  function kamSubt138StorePersistRootOnWindow() {
    window.__subt138PersistRoot = persistRoot;
  }
  function kamSubt138CleanupOrphanRoots() {
    document.querySelectorAll('[id^="subt138-persist-root"]').forEach(element => {
      if (element.id !== PERSIST_ROOT_ID) {
        element.remove();
      }
    });
  }
  function kamSubt138GetPersistRoot() {
    kamSubt138RestorePersistRootFromWindow();
    return persistRoot || document.getElementById(PERSIST_ROOT_ID);
  }
  function kamSubt138GetOrCreatePersistRoot() {
    kamSubt138RestorePersistRootFromWindow();
    kamSubt138CleanupOrphanRoots();
    if (!persistRoot) {
      persistRoot = document.createElement('div');
      persistRoot.id = PERSIST_ROOT_ID;
      persistRoot.dataset.subt138Build = SUBT138_BUILD_VERSION;
      persistRoot.innerHTML = kamSubt138Config.html.gridMarkup;
      kamSubt138StorePersistRootOnWindow();
    }
    return persistRoot;
  }
  function kamSubt138GetCarouselElements() {
    const persistRoot = kamSubt138GetPersistRoot();
    const mobileCarousel = persistRoot?.querySelector(kamSubt138Config.selectors.mobileCarousel);
    if (!mobileCarousel?.isConnected) {
      return null;
    }
    const mobileTrack = mobileCarousel.querySelector(kamSubt138Config.selectors.mobileTrack);
    const mobileDots = mobileCarousel.querySelectorAll(kamSubt138Config.selectors.mobileDots);
    const slides = mobileTrack?.querySelectorAll('a');
    if (!mobileTrack || !mobileDots.length || !slides?.length) {
      return null;
    }
    return {
      mobileCarousel,
      mobileTrack,
      mobileDots,
      slides
    };
  }
  function kamSubt138GetActiveSlideIndex(mobileTrack, slides) {
    const {
      scrollLeft
    } = mobileTrack;
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
    const {
      mobileTrack,
      mobileDots,
      slides
    } = elements;
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
    elements.mobileTrack.addEventListener('scroll', kamSubt138UpdateDots, {
      passive: true
    });
  }
  function kamSubt138BindDelegates() {
    if (window.__subt138DelegatesBound) {
      return;
    }
    window.__subt138DelegatesBound = true;
    document.addEventListener('click', event => {
      const dot = event.target.closest(kamSubt138Config.selectors.mobileDots);
      if (!dot) {
        return;
      }
      const elements = kamSubt138GetCarouselElements();
      if (!elements) {
        return;
      }
      const {
        mobileTrack,
        mobileDots,
        slides
      } = elements;
      const dotIndex = [...mobileDots].indexOf(dot);
      if (dotIndex < 0 || !slides[dotIndex]) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      mobileTrack.scrollTo({
        left: slides[dotIndex].offsetLeft,
        behavior: 'smooth'
      });
      window.setTimeout(kamSubt138UpdateDots, 350);
    }, true);
  }
  function kamSubt138InitCarousel() {
    kamSubt138BindDelegates();
    const elements = kamSubt138GetCarouselElements();
    if (!elements) {
      return;
    }
    kamSubt138BindScrollSync();
    kamSubt138UpdateDots();
  }

  /* eslint-disable import/extensions */

  let reattachScheduled = false;
  function isCorrectlyPlaced(searchBarContent, root) {
    return root.isConnected && root.parentElement === searchBarContent.parentElement && searchBarContent.nextElementSibling === root;
  }
  function placeMarkup(searchBarContent) {
    const root = kamSubt138GetOrCreatePersistRoot();
    if (!isCorrectlyPlaced(searchBarContent, root)) {
      searchBarContent.insertAdjacentElement('afterend', root);
    }
  }
  function kamSubt138ReattachIfNeeded() {
    if (reattachScheduled) {
      return;
    }
    reattachScheduled = true;
    window.requestAnimationFrame(() => {
      reattachScheduled = false;
      const anchor = document.querySelector(kamSubt138Config.selectors.searchBarContent);
      if (!anchor) {
        return;
      }
      const root = kamSubt138GetPersistRoot();
      if (!root || !isCorrectlyPlaced(anchor, root)) {
        placeMarkup(anchor);
        window.requestAnimationFrame(() => {
          kamSubt138InitCarousel();
        });
      }
    });
  }
  function startPersistObserver() {
    if (window.__subt138ObserverStarted) {
      return;
    }
    window.__subt138ObserverStarted = true;
    const observer = new MutationObserver(kamSubt138ReattachIfNeeded);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    window.__subt138Observer = observer;
  }
  function kamSubt138InsertMarkup(searchBarContent) {
    placeMarkup(searchBarContent);
    startPersistObserver();
    kamSubt138ReattachIfNeeded();
  }

  /* eslint-disable import/extensions */

  function kamSubt138Init([searchBarContent]) {
    document.body.classList.add('kamSubt138');
    kamSubt138InsertMarkup(searchBarContent);
    kamSubt138InitCarousel();
  }
  Kameleoon.API.Core.runWhenElementPresent(kamSubt138Config.selectors.searchBarContent, kamSubt138Init);
})();