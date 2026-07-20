/* eslint-disable no-console */
import setupModalEvents from './setupModalEvents.js';
import { T60_MODELS } from './config.js';

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportCenter = viewportHeight / 2;

    // Check if the element's center is at or near the viewport center (within 50px tolerance)
    const elementCenter = rect.top + (rect.height / 2);
    const tolerance = 50; // pixels

    return Math.abs(elementCenter - viewportCenter) <= tolerance;
}

// Preload images for a specific model
function preloadImages(modelName, models) {
    return new Promise((resolve, reject) => {
        const model = models[modelName];
        if (!model) {
            reject(new Error('Model not found'));
            return;
        }

        const isMobile = window.innerWidth <= 768;
        const images = isMobile ? model.mobile : model.desktop;

        const imageUrls = [
            images.priceList,
            images.testDrive,
            images.brochure,
            '//cdn.optimizely.com/img/15841360337/2998c12530b0478f85239cc982388a33.svg',
            '//cdn.optimizely.com/img/15841360337/790168dad33a4cb388bf1ebdae8e28dc.svg',
            '//cdn.optimizely.com/img/15841360337/e9c7afc859b84afb9a7db1d6d7564a72.svg'
        ];

        let loadedCount = 0;
        const totalImages = imageUrls.length;

        function onImageLoad() {
            loadedCount++;
            if (loadedCount === totalImages) {
                resolve();
            }
        }

        function onImageError(error) {
            console.warn('Image failed to load:', error);
            loadedCount++;
            if (loadedCount === totalImages) {
                resolve(); // Continue even if some images fail
            }
        }

        // Preload each image
        imageUrls.forEach((url) => {
            const img = new Image();
            img.onload = onImageLoad;
            img.onerror = onImageError;
            img.src = url;
        });
    });
}

function createModal(config, modelName) {
    if (document.getElementById(config.modalId)) return;

    // Build modal dynamically from model name
    const modalHTML = config.buildModal(modelName);
    if (!modalHTML) return;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModalEvents(config); // still pass config
}

function showModal(config) {
    const modal = document.getElementById(config.modalId);
    if (modal) {
        modal.classList.add('t60-modal-show');
    }
}

export default function setupViewportWatcher(config, modelName) {
    const functionalityElement = Array.from(
        document.querySelectorAll(config.selectors.functionalitySection)
    ).find(el => el.textContent.trim() === config.selectors.functionalityText)
    || document.querySelector(config.selectors.gallerySection);

    if (!functionalityElement) {
        return;
    }

    function checkViewport() {
        // Check if element is at the center of the viewport (50%)
        if (isElementInViewport(functionalityElement)) {
            // Preload images before showing modal
            preloadImages(modelName, T60_MODELS)
                .then(() => {
                    createModal(config, modelName);
                    setTimeout(() => showModal(config), config.timings.showDelay);
                })
                .catch((error) => {
                    console.warn('Image preloading failed, showing modal anyway:', error);
                    createModal(config, modelName);
                    setTimeout(() => showModal(config), config.timings.showDelay);
                });

            window.removeEventListener('scroll', checkViewport);
            window.removeEventListener('resize', checkViewport);
        }
    }

    checkViewport();
    // Raw listeners kept so removeEventListener pairs correctly (same pattern as other slide-up modals)
    window.addEventListener('scroll', checkViewport, { passive: true });
    window.addEventListener('resize', checkViewport, { passive: true });
}
