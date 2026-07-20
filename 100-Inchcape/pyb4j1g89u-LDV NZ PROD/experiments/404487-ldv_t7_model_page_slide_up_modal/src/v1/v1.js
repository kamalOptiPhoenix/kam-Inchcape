/* eslint-disable no-console */
/* eslint-disable import/extensions */
import T60_MODAL_CONFIG from '../assets/config.js';
import setupViewportWatcher from '../assets/setupViewportWatcher.js';

(function kamLdvt7V1() {
    const config = T60_MODAL_CONFIG;
    console.log('*** LDV T7 - Model Page Slide-Up Modal ***');

    // Detect model name dynamically from URL
    function getModelNameFromURL() {
        const path = window.location.pathname.toLowerCase();

        if (path.includes('t60-max-plus')) return 'T60 Max Plus';
        if (path.includes('t60-elite')) return 'T60 Elite';
        if (path.includes('t60-lux')) return 'T60 Lux';
        if (path.includes('g10')) return 'G10';
        if (path.includes('deliver-9-biggest')) return 'Deliver 9 Biggest';
        if (path.includes('deliver-9-bigger')) return 'Deliver 9 Bigger';
        if (path.includes('deliver-9-big')) return 'Deliver 9 Big';
        if (path.includes('edeliver-9-bigger')) return 'eDeliver 9 Bigger';
        if (path.includes('edeliver-9-big')) return 'eDeliver 9 Big';
        if (path.includes('edeliver-3')) return 'eDeliver 3';
        if (path.includes('deliver-7')) return 'Deliver 7';
        if (path.includes('terron-9')) return 'Terron 9';
        if (path.includes('d90')) return 'D90';

        return null; // fallback
    }

    function init() {
        const modelName = getModelNameFromURL();
        if (!modelName) return; // Don't run if no matching model found
        setupViewportWatcher(config, modelName);
    }

    if (!window.v1Start && !sessionStorage.getItem(config.sessionStorageKey) && !sessionStorage.getItem('T7_slideup_popup')) {
        window.v1Start = true;

        Kameleoon.API.Core.runWhenConditionTrue(
            () => {
                document.body.classList.add('ldvt7');
                const functionalityMatch = Array.from(
                    document.querySelectorAll(config.selectors.functionalitySection)
                ).find(el => el.textContent.trim() === config.selectors.functionalityText);

                const galleryMatch = document.querySelector(config.selectors.gallerySection);

                return functionalityMatch !== undefined || galleryMatch !== null;
            },
            init,
        );
    }
}());
