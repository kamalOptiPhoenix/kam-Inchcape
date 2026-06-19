export const hrefMap = {
    '/configure/trim-levels/AUIMP2026':
        'https://www.subaru.com.au/configure/configure/AUIMP2026?carCode=AUGU7CKAL&selectedFeatures=AU_EC_1X&selectedFeatures=AU_IO_209&specificationPack=AUGU7CKAL',
    '/configure/trim-levels/AUCT2026':
        'https://www.subaru.com.au/configure/configure/AUCT2026?specificationPack=AUGU7CKML&fuelType=engine-petrol&carCode=AUGU7CKML',
    '/configure/trim-levels/AUFOR26':
        'https://www.subaru.com.au/configure/configure/AUFOR26?specificationPack=AUSL9BKCL&fuelType=engine-petrol&carCode=AUSL9BKCL',
    '/configure/trim-levels/AUOUT':
        'https://www.subaru.com.au/configure/configure/AUOUT?specificationPack=AUBT9EKDL&carCode=AUBT9EKDL',
    '/configure/trim-levels/AUOUT2026':
    'https://www.subaru.com.au/configure/configure/AUOUT2026?carCode=AUBUAAKL8&selectedFeatures=AU_EC_1X&selectedFeatures=AU_IO_311&specificationPack=AUBUAAKL8',
    '/configure/trim-levels/AUBRZ2026':
        'https://www.subaru.com.au/configure/configure/AUBRZ2026?carCode=AUZD8EKH8&marketingCategory=Manual&specificationPack=AUZD8EKH8&transmissionType=gearbox-manual',
    '/configure/trim-levels/AUWRX2026':
        'https://www.subaru.com.au/configure/configure/AUWRX2026?carCode=AUVBHFKL6&marketingCategory=Sedan&selectedFeatures=AU_EC_6Y&selectedFeatures=AU_IO_306&specificationPack=AUVBHFKL6&transmissionType=gearbox-manual',
    '/configure/trim-levels/AUSOL':
        'https://www.subaru.com.au/configure/configure/AUSOL?carCode=AUEW2DKBV&selectedFeatures=AU_EC_XG&selectedFeatures=AU_IO_213&specificationPack=AUEW2DKBV',
    '/configure/trim-levels/AUTS2026':
        'https://www.subaru.com.au/configure/configure/AUTS2026?carCode=AUHD2ANBV&selectedFeatures=AU_EC_1X&selectedFeatures=AU_IO_213&specificationPack=AUHD2ANBV'
};

export const getTooltipHTML = greeting => `
    <div class="tooltip-inner">
        <button class="tooltip-close" aria-label="Close tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="2.5" y1="15.4891" x2="16.2325" y2="1.75655" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="2.50605" y1="1.74316" x2="16.2386" y2="15.4757" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
        </button>
        <div class="tooltip-heading">Hi ${greeting}</div>
        <div>Don't forget you can choose another model variant here.</div>
        <div class="tooltip-arrow" id="tooltip-arrow"></div>
    </div>
`;
