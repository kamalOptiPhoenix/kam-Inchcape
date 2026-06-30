/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
export default function kamPcat70WarrantyConfig() {
    const commercialIds = [
        'trim-1216', 'trim-1198', 'trim-1209', 'trim-1203', 'trim-3478', 'trim-3483',
        'trim-3475', 'trim-3484', 'trim-3482', 'trim-3481', 'trim-3283', 'trim-3486',
        'trim-3116', 'trim-3117', 'trim-3118', 'trim-3119', 'trim-2410', 'trim-1197', 'trim-3417'
    ];

    const passengerIds = [
        'trim-2688', 'trim-2689', 'trim-2529', 'trim-2535', 'trim-2802',
        'trim-2803', 'trim-2635', 'trim-2654'
    ];

    const isMobile = window.innerWidth < 768;

    function getTypeFromCard(cardEl) {
        if (commercialIds.includes(cardEl.id)) return 'commercial';
        if (passengerIds.includes(cardEl.id)) return 'passenger';
        const trimEl = cardEl.querySelector('[id^="trim-"]');
        if (commercialIds.includes(trimEl.id)) return 'commercial';
        if (passengerIds.includes(trimEl.id)) return 'passenger';
        return 'passenger';
    }

    function buildContent(type) {
        const isCommercial = type === 'commercial';
        const warrantyText = isCommercial
            ? `5 Year/200,000km Warranty ${isMobile ? '&' : '&<br>'} 5 Years Roadside Assistance`
            : `5 Year Warranty ${isMobile ? '&' : '&<br>'} 5 Years Roadside Assistance`;

        return `
            <div class="pcat70-warranty-text" data-vehicle-type="${type}">
                ${warrantyText}
                <a href="javascript:void(0)" class="pcat70-info-icon">i</a>
            </div>
        `;
    }

    function getWarrantyDetails(type) {
        return type === 'commercial'
            ? '5 Year/200,000 Kilometre Warranty, whichever occurs first on PEUGEOT commercial vehicles.'
            : '5 Year Unlimited Kilometre Warranty on PEUGEOT passenger vehicles.';
    }

    function getRoadsideDetails(type) {
        return type === 'commercial'
            ? '5 Year Roadside Assistance on PEUGEOT commercial vehicles.'
            : '5 Year Roadside Assistance on PEUGEOT vehicles.';
    }

    const commercialNames = [
        'Partner', 'Expert', 'Boxer', 'E-Partner', 'E-Expert'
    ];

    function getTypeFromName(el) {
        const container = el.closest('.tdOfferBoxItem') || el.closest('.trimDetailsWrapper') || el.parentElement;
        let nameEl = container ? container.querySelector('#js-vehicle-name, .tdOfferBoxItemText') : null;
        if (!nameEl) nameEl = document.querySelector('#js-vehicle-name');
        const name = nameEl ? nameEl.textContent.trim() : '';
        const isCommercial = commercialNames.some(n => name.indexOf(n) !== -1);
        return isCommercial ? 'commercial' : 'passenger';
    }

    const parent = document.querySelector('#listing-wrapper');
    if (parent) {
        const targets = parent.querySelectorAll('.trimCardHeadingWrapper');

        targets.forEach((el) => {
            if (el.nextElementSibling.classList.contains('pcat70-warranty-text')) return;
            const card = el.closest('[id^="trim-"]') || el.closest('.trimCard') || el.parentElement;
            const type = getTypeFromCard(card);
            el.insertAdjacentHTML('afterend', buildContent(type));
        });
    }
    if (isMobile) {
        const trimHeadings = document.querySelectorAll('.trimDetailsHeading');

        trimHeadings.forEach((heading) => {
            const type = getTypeFromName(heading);
            heading.insertAdjacentHTML('afterend', buildContent(type));
        });
    } else {
        const infoAreas = document.querySelectorAll('.tdOfferBoxInfoArea');

        infoAreas.forEach((infoArea) => {
            const type = getTypeFromName(infoArea);
            infoArea.insertAdjacentHTML('beforebegin', buildContent(type));
        });
    }

    if (!document.querySelector('.pcat70-modal-overlay')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="pcat70-modal-overlay">
                <div class="pcat70-modal">

                    <button class="pcat70-modal-close">✕</button>

                    <div class="pcat70-heading-container">
                        <h2 class="pcat70-modal-heading">DISCLAIMER:</h2>

                        <p class="pcat70-subheading-heading-para" data-disclaimer="passenger">
                            <strong class="pcat70-heading">Warranty:</strong>
                            ${getWarrantyDetails('passenger')}
                            Subject to terms, conditions, and exclusions.
                            Visit <a href="https://www.peugeot.com.au/owners/warranty.html" target="_blank">
                            www.peugeot.com.au/owners/warranty.html</a>.
                        </p>
                        <p class="pcat70-subheading-heading-para" data-disclaimer="commercial" style="display:none">
                            <strong class="pcat70-heading">Warranty:</strong>
                            ${getWarrantyDetails('commercial')}
                            Subject to terms, conditions, and exclusions.
                            Visit <a href="https://www.peugeot.com.au/owners/warranty.html" target="_blank">
                            www.peugeot.com.au/owners/warranty.html</a>.
                        </p>

                        <p class="pcat70-subheading-heading-para" data-disclaimer="passenger">
                            <strong>Roadside:</strong>
                            ${getRoadsideDetails('passenger')}
                            Subject to terms, conditions, and exclusions.
                            Visit <a href="https://www.peugeot.com.au/owners/peugeot-roadside-assistance.html" target="_blank">
                            www.peugeot.com.au/owners/peugeot-roadside-assistance.html</a>.
                        </p>
                        <p class="pcat70-subheading-heading-para" data-disclaimer="commercial" style="display:none">
                            <strong>Roadside:</strong>
                            ${getRoadsideDetails('commercial')}
                            Subject to terms, conditions, and exclusions.
                            Visit <a href="https://www.peugeot.com.au/owners/peugeot-roadside-assistance.html" target="_blank">
                            www.peugeot.com.au/owners/peugeot-roadside-assistance.html</a>.
                        </p>
                    </div>
                </div>
            </div>
        `);

        const overlay = document.querySelector('.pcat70-modal-overlay');
        const modal = document.querySelector('.pcat70-modal');
        const closeBtn = document.querySelector('.pcat70-modal-close');

        Kameleoon.API.Utils.addEventListener(document, 'click', (e) => {
            const icon = e.target.closest('.pcat70-info-icon');
            if (!icon) return;

            const warrantyDiv = icon.closest('.pcat70-warranty-text');
            const type = warrantyDiv.dataset.vehicleType || 'passenger';

            modal.querySelectorAll('[data-disclaimer]').forEach((el) => {
                el.style.display = el.dataset.disclaimer === type ? '' : 'none';
            });

            overlay.classList.add('pcat70-modal-open');
        });

        Kameleoon.API.Utils.addEventListener(closeBtn, 'click', () => {
            overlay.classList.remove('pcat70-modal-open');
        });

        Kameleoon.API.Utils.addEventListener(overlay, 'click', (e) => {
            if (!modal.contains(e.target)) {
                overlay.classList.remove('pcat70-modal-open');
            }
        });
    }
}
