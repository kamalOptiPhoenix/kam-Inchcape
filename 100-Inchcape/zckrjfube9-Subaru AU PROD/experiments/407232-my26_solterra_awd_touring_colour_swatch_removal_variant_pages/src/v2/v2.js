/* eslint-disable no-return-assign */
/* eslint-disable no-tabs */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
(function v2() {
    const handleInteriorVisibility = () => {
        // console.log('*** handleInteriorVisibility runs ***');

        const activeExterior = document.querySelector(
            '.B8zs1VVNh5 .lmZUVzq18T.rxD85kjvWr'
        );

        if (!activeExterior) return;

        const bgDiv = activeExterior.querySelector('div');
        const bgImage = bgDiv.style.backgroundImage || '';

        const isDualTone =	bgImage.includes('/solterra/sol-cosmic-white-pearl-attitudeblackmica') || bgImage.includes('/solterra/sol-harbourmistgreypearl-attitudeblackmica');

        const interiors = document.querySelectorAll('.mXQKavWful .zepKH9h2EZ');

        const option1 = interiors[0];
        const option2 = interiors[1];

        // Detect selected interior
        const selectedInterior = document.querySelector(
            '.mXQKavWful .zepKH9h2EZ.q90KDzyBIV'
        );

        if (isDualTone) {
            // show both
            interiors.forEach(item => (item.style.display = ''));
        } else {
            // show only first
            interiors.forEach((item, index) => {
                item.style.display = index === 0 ? '' : 'none';
            });

            // 🔥 FIX: if option2 is selected → switch to option1
            if (selectedInterior && selectedInterior === option2) {
                // console.log('Switching to default interior (option1)');

                // simulate click on option1
                option1.click();
            }
        }
    };

    Kameleoon.API.Core.runWhenElementPresent('.rXKftTm6XK', () => {
        document.body.classList.add('MY26v2-interior-logic-applied');
        // console.log('*** OptiReady callback executed for v1', el);
        handleInteriorVisibility();
        // Observe changes in active class
        const observer = new MutationObserver(() => {
            handleInteriorVisibility();
        });

        observer.observe(document.querySelector('.B8zs1VVNh5'), {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    });
}());
