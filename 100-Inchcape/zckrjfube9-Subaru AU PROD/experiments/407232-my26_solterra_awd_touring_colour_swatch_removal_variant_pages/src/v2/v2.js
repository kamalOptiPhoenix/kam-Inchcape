/* eslint-disable no-return-assign */
/* eslint-disable no-tabs */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
(function v2() {
    let lastIsDualTone = null;
    let isProcessing = false;
    let justClickedInterior = false;
    let interiorClickTimeout = null;
    let interiorFlagTimeout = null;
    let processingReleaseTimeout = null;

    const DUAL_TONE_IMAGES = [
        '/solterra/sol-cosmic-white-pearl-attitudeblackmica',
        '/solterra/sol-harbourmistgreypearl-attitudeblackmica',
    ];

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

    function getDualToneState() {
        const activeExterior = document.querySelector(
            '.B8zs1VVNh5 .lmZUVzq18T.rxD85kjvWr'
        );

        if (!activeExterior) {
            return null;
        }

        const bgDiv = activeExterior.querySelector('div');
        if (!bgDiv) {
            return false;
        }

        const bgImage = bgDiv.style.backgroundImage || '';
        return DUAL_TONE_IMAGES.some((imagePath) => bgImage.includes(imagePath));
    }

    function selectInteriorOption1(option1) {
        if (!option1) {
            isProcessing = false;
            return;
        }

        justClickedInterior = true;
        option1.click();

        interiorFlagTimeout = setTimeout(() => {
            justClickedInterior = false;
        }, 2000);

        processingReleaseTimeout = setTimeout(() => {
            isProcessing = false;
        }, 300);
    }

    function handleInteriorVisibility(forceUpdate = false) {
        if (justClickedInterior && !forceUpdate) {
            return;
        }

        const isDualTone = getDualToneState();
        if (isDualTone === null) {
            return;
        }

        const dualToneChanged = lastIsDualTone !== isDualTone;
        if (!forceUpdate && !dualToneChanged && lastIsDualTone === isDualTone) {
            return;
        }

        if (isProcessing && !forceUpdate && !dualToneChanged) {
            return;
        }

        const wasDualTone = lastIsDualTone === true;
        lastIsDualTone = isDualTone;

        const interiors = document.querySelectorAll('.mXQKavWful .zepKH9h2EZ');
        const option1 = interiors[0];
        const option2 = interiors[1];
        const selectedInterior = document.querySelector(
            '.mXQKavWful .zepKH9h2EZ.q90KDzyBIV'
        );

        if (isDualTone) {
            clearPendingInteriorActions();
            interiors.forEach((item) => {
                item.style.display = '';
            });
            isProcessing = false;
            return;
        }

        interiors.forEach((item, index) => {
            item.style.display = index === 0 ? '' : 'none';
        });

        if (selectedInterior && selectedInterior === option2) {
            clearPendingInteriorActions();
            isProcessing = true;

            interiorClickTimeout = setTimeout(() => {
                interiorClickTimeout = null;
                selectInteriorOption1(option1);
            }, wasDualTone ? 800 : 150);
        } else {
            isProcessing = false;
        }
    }

    function attachExteriorClickListeners(container) {
        const exteriorSwatches = container.querySelectorAll('.lmZUVzq18T');

        exteriorSwatches.forEach((swatch) => {
            if (swatch.hasAttribute('data-my26v2-listener')) {
                return;
            }

            swatch.setAttribute('data-my26v2-listener', 'true');

            Kameleoon.API.Utils.addEventListener(swatch, 'click', () => {
                setTimeout(() => {
                    handleInteriorVisibility(true);
                }, 150);
            });
        });
    }

    Kameleoon.API.Core.runWhenElementPresent('.rXKftTm6XK', () => {
        document.body.classList.add('MY26v2-interior-logic-applied');

        const exteriorContainer = document.querySelector('.B8zs1VVNh5');
        if (!exteriorContainer) {
            return;
        }

        handleInteriorVisibility(true);
        attachExteriorClickListeners(exteriorContainer);

        const observer = new MutationObserver(() => {
            handleInteriorVisibility();
        });

        observer.observe(exteriorContainer, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class', 'style'],
        });
    });
}());
