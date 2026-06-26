function kamT38PushApiOnly(nameOfEvent) {
    window.optimizely = window.optimizely || [];
    window.optimizely.push({
        type: 'event',
        eventName: nameOfEvent,
    });
}

let kamT38CurrentModelName = '';

// eslint-disable-next-line max-len
export default function kamT38ClickEventBind(
    pdfDownload,
    addDataWithCookie,
    checkCookieDuration,
    FormRequest
) {
    const modelFormMapping = {
        'partner van': 'Partner Van',
        '308 wagon': '308 Wagon',
        '2008 suv': '2008 SUV',
        '3008 hybrid': '3008 Hybrid',
        'boxer van': 'Boxer Van',
        'expert van': 'Expert Van',
        'e-partner van': 'E-Partner Van',
        '2008 hybrid': '2008 Hybrid',
        '308 hatch': '308 Hatch',
        'e-expert van': 'E-Expert Van',
        '308 hybrid': '308 Hybrid',
        '508 sportswagon': '508 Sportswagon',
        '408 fastback': '408 Fastback',
        '408 hybrid': '408 Hybrid',
        '5008 suv': '5008 SUV',
        '5008 hybrid': '5008 Hybrid',
        'expert van my25': 'Expert Van MY25',
    };

    const modelMapping = {
        'partner van': { bodystyle: 'partner-van', label: 'Partner Van' },
        '308 wagon': { bodystyle: '308-wagon', label: '308 Wagon' },
        '2008 suv': { bodystyle: '2008-suv', label: '2008 SUV' },
        '3008 hybrid': { bodystyle: '3008-hybrid', label: '3008 Hybrid' },
        'boxer van': { bodystyle: 'boxer-van', label: 'Boxer Van' },
        'expert van': { bodystyle: 'expert-van', label: 'Expert Van' },
        'e-partner van': { bodystyle: 'e-partner-van', label: 'E-Partner Van' },
        '2008 hybrid': { bodystyle: '2008-hybrid', label: '2008 Hybrid' },
        '308 hatch': { bodystyle: '308-hatch', label: '308 Hatch' },
        'e-expert van': { bodystyle: 'e-expert-van', label: 'E-Expert Van' },
        '308 hybrid': { bodystyle: '308-hybrid', label: '308 Hybrid' },
        '508 sportswagon': { bodystyle: '508-sportswagon', label: '508 Sportswagon' },
        '408 fastback': { bodystyle: '408-fastback', label: '408 Fastback' },
        '408 hybrid': { bodystyle: '408-hybrid', label: '408 Hybrid' },
        '5008 suv': { bodystyle: '5008-suv', label: '5008 SUV' },
        '5008 hybrid': { bodystyle: '5008-hybrid', label: '5008 Hybrid' },
        'expert van my25': { bodystyle: 'expert-van-my25', label: 'Expert Van MY25' },
    };

    Kameleoon.API.Utils.addEventListener(window, 'message', (event) => {
        const allowedOrigins = [
            'https://peugeotforms.inchcape.com.au',
            'https://configurator.peugeot.com.au',
        ];

        if (!allowedOrigins.includes(event.origin)) {
            return;
        }

        if (event.data && event.data.type === 'PCAT38_FORM_SUCCESS') {
            if (!kamT38CurrentModelName) {
                return;
            }

            let email = event.data.email || '';

            if (!email) {
                const iframe = document.getElementById('t38FormIframe');
                if (iframe) {
                    try {
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        const emailInput = iframeDoc.querySelector('#userEmail');
                        if (emailInput) {
                            email = emailInput.value;
                        }
                    } catch (iframeError) {
                        email = localStorage.getItem('userEmail') || '';
                    }
                }
            }

            document.body.classList.remove('t38ModalShow');

            if (email) {
                addDataWithCookie('t38EmailCollected', email);
                FormRequest(email);
            }

            pdfDownload(kamT38CurrentModelName, kamT38PushApiOnly);
        }
    });

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.build-buy-summary .trimDetailsPromotionRow .trimDetailsButtonWrapper.t38ButtonWrapper a');
        if (!button) {
            return;
        }

        const [, modelName] = document.querySelector('.trimDetailsTitleWrapper h2').textContent.toLowerCase().split('your ');
        kamT38CurrentModelName = modelName;

        const modelData = modelMapping[modelName] || { bodystyle: modelName.replace(/\s+/g, '-'), label: modelName };
        const formModelValue = modelFormMapping[modelName] || modelData.label;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'updatevirtualpath',
            formsLeadType: 'cold lead',
            formsName: 'brochure request',
            formsLeadID: 'PCAT38',
            mainStepIndicator: '1',
            mainStepName: 'confirmation',
            vehicleModelBodystyle: modelData.bodystyle,
            vehicleModelBodystyleLabel: modelData.label,
        });

        const emailCollected = checkCookieDuration('t38EmailCollected');

        if (emailCollected) {
            pdfDownload(modelName, kamT38PushApiOnly);
            return;
        }

        const iframe = document.getElementById('t38FormIframe');
        if (iframe) {
            const email = localStorage.getItem('userEmail');
            iframe.src = 'https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat38kam=true';

            iframe.onload = () => {
                setTimeout(() => {
                    iframe.contentWindow.postMessage(
                        {
                            type: 'SET_FORM_DATA',
                            model: formModelValue,
                            email: email || '',
                        },
                        'https://peugeotforms.inchcape.com.au'
                    );
                }, 500);
            };
        }

        document.body.classList.add('t38ModalShow');
    });
}
