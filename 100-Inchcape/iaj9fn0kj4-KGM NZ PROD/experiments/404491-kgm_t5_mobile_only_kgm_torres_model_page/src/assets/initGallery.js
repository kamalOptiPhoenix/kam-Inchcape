const getImageKey = (src) => {
    const match = (src || '').match(/\/media\/[^?]+/);
    return match ? match[0] : src;
};

const getUniqueGalleryImages = (gallerySection) => {
    const seen = new Set();
    const uniqueImages = [];

    gallerySection.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src') || img.src;
        const key = getImageKey(src);

        if (!seen.has(key)) {
            seen.add(key);
            uniqueImages.push({
                src,
                alt: img.getAttribute('alt') || 'Torres Gallery'
            });
        }
    });

    return uniqueImages;
};

export function restyleGallery() {
    const gallerySection = document.getElementById('Gallery');
    if (!gallerySection || gallerySection.dataset.kgmT5Gallery === 'true') return;

    const uniqueImages = getUniqueGalleryImages(gallerySection);
    if (!uniqueImages.length) return;

    const slidesHtml = uniqueImages.map(({ src, alt }) => `
      <div class="swiper-slide">
        <div class="kgmt5-gallery-slide">
          <img class="kgmt5-gallery-img" src="${src}" alt="${alt}" loading="lazy" />
        </div>
      </div>
    `).join('');

    gallerySection.innerHTML = `
      <div class="kgmt5-gallery-inner px-4">
        <h3 class="kgmt5-gallery-title kgmt5-title">Torres Gallery</h3>
        <div class="kgmt5-gallery-swiper swiper">
          <div class="swiper-wrapper">
            ${slidesHtml}
          </div>
          <button type="button" class="kgmt5-gallery-button-prev" aria-label="Previous image">
            <img src="//cdn.optimizely.com/img/15841360337/3277cc31969b4d50b4a180dc6d286227.svg" alt="" aria-hidden="true" />
          </button>
          <button type="button" class="kgmt5-gallery-button-next" aria-label="Next image">
            <img src="//cdn.optimizely.com/img/15841360337/ee7035d2e0094cdd94b126d296ae0718.svg" alt="" aria-hidden="true" />
          </button>
          <div class="kgmt5-gallery-pagination swiper-pagination"></div>
        </div>
      </div>
    `;

    gallerySection.classList.add('kgmt5-gallery');
    gallerySection.dataset.kgmT5Gallery = 'true';
}

export function initGallerySwiper() {
    const SwiperConstructor = window.Swiper;
    const swiperEl = document.querySelector('.kgmt5-gallery-swiper');

    if (!SwiperConstructor || !swiperEl || swiperEl.swiper) return;

    // eslint-disable-next-line no-new
    new SwiperConstructor(swiperEl, {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 12,
        loop: false,
        watchSlidesProgress: true,
        navigation: {
            nextEl: swiperEl.querySelector('.kgmt5-gallery-button-next'),
            prevEl: swiperEl.querySelector('.kgmt5-gallery-button-prev')
        },
        pagination: {
            el: swiperEl.querySelector('.kgmt5-gallery-pagination'),
            clickable: true
        }
    });
}
