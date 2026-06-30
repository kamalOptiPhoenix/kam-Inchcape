import kamPcat58DealerUrls from './kamPcat58DealerUrls.js';

function kamPcat58GetTextFromSelectors(selectors) {
    for (let i = 0; i < selectors.length; i += 1) {
        const element = document.querySelector(selectors[i]);
        if (element) {
            const text = element.textContent.trim();
            if (text) {
                return text;
            }
        }
    }
    return null;
}

export function kamPcat58ResolveDealerKey(rawDealerName) {
    if (!rawDealerName) {
        return null;
    }

    const trimmed = rawDealerName.trim();
    if (!trimmed || trimmed === 'DEALER NAME') {
        return null;
    }

    if (kamPcat58DealerUrls[trimmed]) {
        return trimmed;
    }

    const mappedNames = Object.keys(kamPcat58DealerUrls);
    for (let i = 0; i < mappedNames.length; i += 1) {
        const mappedDealerName = mappedNames[i];
        if (trimmed.includes(mappedDealerName) || mappedDealerName.includes(trimmed)) {
            return mappedDealerName;
        }
    }

    return null;
}

export function kamPcat58GetDealerName() {
    const rawName = kamPcat58GetTextFromSelectors([
        '.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemDealer .tdOfferBoxItemText',
        '#js-dealerName',
        '.dealerDetails h3.trimDetailsTitle span#js-dealerName',
    ]);

    if (!rawName) {
        return 'DEALER NAME';
    }

    return kamPcat58ResolveDealerKey(rawName) || rawName;
}

export function kamPcat58GetModelName() {
    const rawName = kamPcat58GetTextFromSelectors([
        '.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemModel .tdOfferBoxItemText',
        '.trimDetailsSecondaryColumn .trimDetailsTitle',
    ]);

    if (!rawName) {
        return 'model name';
    }

    if (rawName.toLowerCase().startsWith('your ')) {
        return rawName.substring(5);
    }

    return rawName;
}

export function kamPcat58GetDealerContactInfo() {
    return {
        phone: kamPcat58GetTextFromSelectors([
            '#js-dealerPhone',
            '.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemPhone .tdOfferBoxItemText',
        ]) || '',
        address: kamPcat58GetTextFromSelectors([
            '#js-dealerAddress',
            '.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemAddress .tdOfferBoxItemText',
        ]) || '',
        hours: (() => {
            const hoursElement = document.querySelector('#js-dealerSalesWeekdayTitle')
                || document.querySelector('.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemHours .tdOfferBoxItemText');
            return hoursElement ? hoursElement.innerHTML.trim() : '';
        })(),
    };
}
