/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
(function v1() {
    let lastActiveColor = null; // Track which specific color is active ('C2', 'W5', or null)
    let isProcessing = false; // Lock to prevent multiple simultaneous executions
    let justClickedInterior = false; // Flag to prevent re-evaluation after clicking interior options
    let targetEl = null;
    let interiorClickTimeout = null;
    let interiorFlagTimeout = null;
    let processingReleaseTimeout = null;
    let exteriorObserver = null;

    function clearPendingInteriorActions() {
        if (interiorClickTimeout) {
            clearTimeout(interiorClickTimeout);
            interiorClickTimeout = null;
        }
        if (interiorFlagTimeout) {
            clearTimeout(interiorFlagTimeout);
            interiorFlagTimeout = null;
        }
        if (processingReleaseTimeout) {
            clearTimeout(processingReleaseTimeout);
            processingReleaseTimeout = null;
        }
    }

    function getActiveExteriorColor() {
        const colorPickerC2 = document.querySelector('div[data-test="option:AU_EC_C2"] div[data-test="button:color_picker:active"]');
        const colorPickerW5 = document.querySelector('div[data-test="option:AU_EC_W5"] div[data-test="button:color_picker:active"]');
        return colorPickerC2 ? 'C2' : (colorPickerW5 ? 'W5' : null);
    }

    function selectInterior213() {
        const option213 = document.querySelector('div[data-test="option:AU_IO_213"] div[data-test="option:type:image"]');
        if (!option213) {
            isProcessing = false;
            return;
        }

        justClickedInterior = true;
        option213.click();

        interiorFlagTimeout = setTimeout(() => {
            justClickedInterior = false;
        }, 2000);

        processingReleaseTimeout = setTimeout(() => {
            isProcessing = false;
        }, 300);
    }

    function checkColorPickers(forceUpdate = false) {
        // Prevent re-evaluation if we just clicked an interior option (unless forced from a real color click)
        if (justClickedInterior && !forceUpdate) {
            return;
        }

        // Prevent multiple simultaneous executions (unless forced from click)
        if (isProcessing && !forceUpdate) {
            return;
        }

        isProcessing = true;
        const currentActiveColor = getActiveExteriorColor();
        const shouldShow802 = currentActiveColor !== null;

        // Only skip if active color unchanged AND not forced (from click)
        if (!forceUpdate && lastActiveColor === currentActiveColor) {
            isProcessing = false;
            return;
        }

        lastActiveColor = currentActiveColor;

        if (shouldShow802) {
            clearPendingInteriorActions();
            document.body.classList.add('SUBMY26-show-802');
            isProcessing = false;
            return;
        }

        document.body.classList.remove('SUBMY26-show-802');
        clearPendingInteriorActions();

        // Delay to allow price calculation API to complete before clicking interior
        interiorClickTimeout = setTimeout(() => {
            interiorClickTimeout = null;
            selectInterior213();
        }, 800);
    }

    function attachClickListeners() {
        const allColorOptions = document.querySelectorAll('[data-test*="option:AU_EC_"]');

        allColorOptions.forEach((option) => {
            const clickableImage = option.querySelector('div[data-test="option:type:image"]');

            if (!clickableImage || clickableImage.hasAttribute('data-submy26-listener')) {
                return;
            }

            clickableImage.setAttribute('data-submy26-listener', 'true');

            Kameleoon.API.Utils.addEventListener(clickableImage, 'click', () => {
                // Always re-check after exterior click; DOM active state can update slowly on prod
                setTimeout(() => {
                    checkColorPickers(true);
                }, 150);
            });
        });
    }

    function observeExteriorChanges() {
        if (exteriorObserver) {
            return;
        }

        const exteriorSection = document.querySelector('[data-test="container:section:subaru_exterior"]')
            || document.querySelector('[data-test*="option:AU_EC_"]')?.closest('[data-test="options:container"]');

        if (!exteriorSection) {
            return;
        }

        exteriorObserver = new MutationObserver(() => {
            checkColorPickers();
        });

        exteriorObserver.observe(exteriorSection, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class', 'data-test'],
        });
    }

    function init() {
        if (!targetEl) return;

        const text = targetEl.textContent.trim();

        if (text === 'Solterra AWD Touring') {
            document.body.classList.add('SUBMY26');
            checkColorPickers();
            attachClickListeners();
            observeExteriorChanges();
        } else {
            clearPendingInteriorActions();
            document.body.classList.remove('SUBMY26');
            document.body.classList.remove('SUBMY26-show-802');
            lastActiveColor = null;
        }
    }

    function observeTextChange(el) {
        const observer = new MutationObserver(() => {
            init();
        });

        observer.observe(el, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }

    Kameleoon.API.Core.runWhenElementPresent('span[data-test="title:variantName"]', ([el]) => {
        targetEl = el;
        init();
        observeTextChange(el);
    });
}());
