import kamPcat58Config from './kamPcat58Config.js';
import {
    kamPcat58GetDealerContactInfo,
    kamPcat58GetDealerName,
    kamPcat58GetModelName,
    kamPcat58ResolveDealerKey,
} from './kamPcat58DealerHelpers.js';

export default function kamPcat58UpdateModalContent() {
    const dealerName = kamPcat58GetDealerName();
    const modelName = kamPcat58GetModelName();
    const dealerKey = kamPcat58ResolveDealerKey(dealerName) || dealerName;
    const dealerData = kamPcat58Config.dealerUrls[dealerKey];
    const stockUrl = dealerData ? dealerData.url : null;
    const mapImage = dealerData ? dealerData.mapImage : '';
    const hasStockUrl = stockUrl !== null;
    const contactInfo = kamPcat58GetDealerContactInfo();

    window.jQuery('.PCAT58_dealerName').text(dealerName);
    window.jQuery('.PCAT58_modelName').text(modelName);

    const contactInfoContainer = window.jQuery('.PCAT58_contactInfo');
    contactInfoContainer.empty();

    if (contactInfo.phone) {
        contactInfoContainer.append(`
            <div class="PCAT58_contactItem">
                <div class="PCAT58_icon">
                    <svg aria-hidden="true" class="iconSvg iconSvgPhone">
                        <use xlink:href="#icon-phone"></use>
                    </svg>
                </div>
                <div class="PCAT58_contactText">
                     ${contactInfo.phone}
                </div>
            </div>
        `);
    }

    if (contactInfo.address) {
        contactInfoContainer.append(`
            <div class="PCAT58_contactItem">
                <div class="PCAT58_icon">
                    <svg aria-hidden="true" class="iconSvg iconSvgLocation">
                        <use xlink:href="#icon-location"></use>
                    </svg>
                </div>
                <div class="PCAT58_contactText">
                    ${contactInfo.address}
                </div>
            </div>
        `);
    }

    if (contactInfo.hours) {
        contactInfoContainer.append(`
            <div class="PCAT58_contactItem">
                <div class="PCAT58_icon">
                    <svg aria-hidden="true" class="iconSvg iconSvgHours">
                        <use xlink:href="#icon-build-sm-hours"></use>
                    </svg>
                </div>
                <div class="PCAT58_contactText">
                     ${contactInfo.hours}
                </div>
            </div>
        `);
    }

    const buttonsContainer = window.jQuery('.PCAT58_buttons');
    const primaryBtn = buttonsContainer.find('.PCAT58_primaryBtn');

    buttonsContainer.find('.PCAT58_secondaryBtn').remove();

    if (hasStockUrl) {
        primaryBtn.after(`<a href="${stockUrl}" target="_blank" class="PCAT58_secondaryBtn">CHECK STOCK AVAILABILITY</a>`);
    }

    const rightContentArea = window.jQuery('.PCAT58_contentRight');
    if (mapImage) {
        rightContentArea.html(`
            <div class="PCAT58_map">
                <img src="${mapImage}" alt="${dealerName} Location Map" class="PCAT58_mapImage" />
            </div>
        `);
    } else {
        rightContentArea.empty();
    }
}
