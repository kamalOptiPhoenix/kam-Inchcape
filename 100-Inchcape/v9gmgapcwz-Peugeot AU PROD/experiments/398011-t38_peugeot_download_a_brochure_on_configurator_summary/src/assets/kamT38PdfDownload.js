/* eslint-disable no-console */
function kamT38DataLayerEvent(modelName) {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: 'uaevent',
        eventCategory: 'Brochure Download',
        eventAction: modelName,
        eventLabel: 'email provided',
    });
}

export default function kamT38PdfDownload(modelName, pushApiOnly) {
    console.log('*** PCAT38: pdfDownload called ***', { modelName });
    const model = {
        'partner van': {
            title: 'Partner Van',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-ice/Peugeot_MY25_Partner_ICE_Spec_Sheet_web.pdf',
        },
        '308 wagon': {
            title: '308 Wagon',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/peugeot-308-specification-sheet-0523.pdf',
        },
        '2008 suv': {
            title: '2008 SUV',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/2008/trust-your-own-way-meessaging/Peugeot-2008-ICE-Facelift-MY24-Brochure-Spec-Sheet-Combined-REV-web.pdf',
        },
        '3008 hybrid': {
            title: '3008 Hybrid',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/3008/2024/3008-hybrid/Peugeot_MY25_3008_Hybrid_Spec_Sheet_LR-R3.pdf',
        },
        'boxer van': {
            title: 'Boxer Van',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY23_Boxer_Range_Brochure.pdf',
        },
        'expert van': {
            title: 'Expert Van',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/MY23_Expert_Spec_Sheet.pdf',
        },
        'e-partner van': {
            title: 'E-Partner Van',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/e-partner-pre-order/Peugeot_MY23_E-Partner_Spec_Sheet.pdf',
        },
        '2008 hybrid': {
            title: '2008 Hybrid',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_2008_Hybrid_Spec_Sheet.pdf',
        },
        '308 hatch': {
            title: '308 Hatch',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/308/my24-colour-change/Peugeot_MY24_308_Spec_Sheet_REV_Final.pdf',
        },
        'e-expert van': {
            title: 'E-Expert Van',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/expert/e-expert/Peugeot_E-Expert_MY23_Spec_Sheet_web.pdf',
        },
        '308 hybrid': {
            title: '308 Hybrid',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_308_GT_Hybrid_Spec_Sheet.pdf',
        },
        '508 sportswagon': {
            title: '508 Sportswagon',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/peugeot-508-specification-sheet-0923.pdf',
        },
        '408 fastback': {
            title: '408 Fastback',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY24_408_PHEV_Brochure_Spec_Sheet.pdf',
        },
        '408 hybrid': {
            title: '408 Hybrid',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_408_GT_Hybrid_Spec_Sheet.pdf',
        },
        '5008 suv': {
            title: '5008 SUV',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/Peugeot_MY25_5008_Hybrid_Spec_Sheet_LR-R.pdf',
        },
        '5008 hybrid': {
            title: '5008 Hybrid',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/Peugeot_MY25_5008_Hybrid_Spec_Sheet_LR-R.pdf',
        },
        'expert van my25': {
            title: 'Expert Van MY25',
            href: 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/brochures/Peugeot_MY25_Expert_Diesel_Spec_Sheet_LR-R3.pdf',
        },
    };

    if (!model[modelName]) {
        console.error('*** PCAT38: ERROR - Model not found in mapping ***', modelName);
        return;
    }

    console.log('*** PCAT38: Opening PDF ***', {
        modelName,
        pdfUrl: model[modelName].href,
    });

    window.open(model[modelName].href, '_blank');
    console.log('*** PCAT38: PDF window opened ***');

    pushApiOnly('Downloads_T38');
    console.log('*** PCAT38: Optimizely event pushed ***');

    kamT38DataLayerEvent(modelName);
    console.log('*** PCAT38: DataLayer event pushed ***');
}
