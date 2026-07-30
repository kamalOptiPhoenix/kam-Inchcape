/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
(function v1() {
    let lastActiveColor = null; // Track which specific color is active ('C2', 'W5', or null)
    let isProcessing = false; // Lock to prevent multiple simultaneous executions
    let clickCooldown = false; // Cooldown to prevent rapid clicks that cancel APIs
    let justClickedInterior = false; // Flag to prevent re-evaluation after clicking interior options
    let targetEl = null;
    function checkColorPickers(forceUpdate = false) {
    // Prevent re-evaluation if we just clicked an interior option (unless forced from a real color click)
        if (justClickedInterior && !forceUpdate) {
            return;
        }

        // Prevent multiple simultaneous executions (unless forced from click)
        if (isProcessing && !forceUpdate) {
            return;
        }

        // Set processing lock
        isProcessing = true;
        const colorPickerC2 = document.querySelector('div[data-test="option:AU_EC_C2"] div[data-test="button:color_picker:active"]');
        const colorPickerW5 = document.querySelector('div[data-test="option:AU_EC_W5"] div[data-test="button:color_picker:active"]');

        // Determine which specific color is currently active
        const currentActiveColor = colorPickerC2 ? 'C2' : (colorPickerW5 ? 'W5' : null);
        const shouldShow802 = !!(colorPickerC2 || colorPickerW5);

        // Only skip if active color unchanged AND not forced (from click)
        // This handles switching between C2 and W5 (both use show-802 class; no scripted interior click)
        if (!forceUpdate && lastActiveColor === currentActiveColor) {
            isProcessing = false;
            return; // Active color unchanged, skip unnecessary work
        }

        lastActiveColor = currentActiveColor;

        if (shouldShow802) {
            document.body.classList.add('SUBMY26-show-802');
            isProcessing = false;
        } else {
            document.body.classList.remove('SUBMY26-show-802');

            // Longer delay to allow price calculation API to complete before clicking
            setTimeout(() => {
                const option213 = document.querySelector('div[data-test="option:AU_IO_213"] div[data-test="option:type:image"]');
                if (option213) {
                    justClickedInterior = true; // Set flag to prevent re-evaluation
                    option213.click();

                    // Clear flag after delay to allow DOM to settle
                    setTimeout(() => {
                        justClickedInterior = false;
                    }, 2000); // Wait 2s for DOM to fully settle
                }
                // Release lock after click
                setTimeout(() => {
                    isProcessing = false;
                }, 300);
            }, 800); // Delay to allow price calculation API to complete
        }
    }

    function attachClickListeners() {
    // Get all color picker options
        const allColorOptions = document.querySelectorAll('[data-test*="option:AU_EC_"]');

        allColorOptions.forEach((option) => {
            // Find the actual clickable image element inside each color option
            const clickableImage = option.querySelector('div[data-test="option:type:image"]');

            if (!clickableImage) {
                return; // Skip if no clickable image found
            }

            // Prevent duplicate listeners
            if (clickableImage.hasAttribute('data-submy26-listener')) {
                return;
            }
            clickableImage.setAttribute('data-submy26-listener', 'true');

            Kameleoon.API.Utils.addEventListener(clickableImage, 'click', () => {
                // Ignore clicks that happen right after clicking interior options
                if (justClickedInterior) {
                    return;
                }

                // Cooldown to prevent rapid clicks that cancel APIs
                if (clickCooldown) {
                    return;
                }
                clickCooldown = true;

                // Force update on click to ensure logic always runs
                // Small delay to allow the DOM to update with the active state
                setTimeout(() => {
                    checkColorPickers(true); // Force update on click

                    // Release cooldown after processing starts
                    setTimeout(() => {
                        clickCooldown = false;
                    }, 1200); // Cooldown period to prevent rapid clicks
                }, 100);
            });
        });
    }
    function observeTextChange(el) {
        const observer = new MutationObserver(() => {
            // console.log('Text changed:', el.textContent);
            init();
        });

        observer.observe(el, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function init() {
        if (!targetEl) return;

        const text = targetEl.textContent.trim();

        if (text === 'Solterra AWD Touring') {
            document.body.classList.add('SUBMY26');

            // Check initial state
            checkColorPickers();

            // Attach click listeners to color swatches
            attachClickListeners();
        } else {
            document.body.classList.remove('SUBMY26');
            document.body.classList.remove('SUBMY26-show-802');
        }
    }

    Kameleoon.API.Core.runWhenElementPresent('span[data-test="title:variantName"]', ([el]) => {
        targetEl = el;
        init();
        observeTextChange(el); // observe changes
    });
}());
