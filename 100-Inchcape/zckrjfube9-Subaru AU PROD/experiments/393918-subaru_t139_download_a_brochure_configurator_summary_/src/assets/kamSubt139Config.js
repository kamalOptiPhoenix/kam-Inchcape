import { goals } from '../../goals.js';

const kamSubt139Config = {
    selectors: {
        customiseSummary: '#customise_summary',
        variantName: 'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]',
        brochureBtn: '.kamSubt139_brochureBtn',
        brochureWrap: '.kamSubt139_brochureWrap',
        modalOverlay: '.kamSubt139_modalOverlay',
        modal: '.kamSubt139_modal',
        closeBtn: '.kamSubt139_close',
        downloadLink: '.kamSubt139_downloadLink',
        emailInput: '.kamSubt139_emailInput',
        privacyCheckbox: '.kamSubt139_privacy',
        sendBtn: '.kamSubt139_sendBtn',
        formSection: '.kamSubt139_formSection',
        successSection: '.kamSubt139_successSection',
        emailError: '.kamSubt139_emailError',
        privacyError: '.kamSubt139_privacyError',
       
    },

    html: {
        brochureBtn: `
            <div class="kamSubt139_brochureWrap">
                <hr class="kamSubt139_brochureDivider">
                <button type="button" class="kamSubt139_brochureBtn">
                    <svg
                        class="kamSubt139_brochureIcon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 5v10"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M8 11l4 4 4-4"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M5 19h14"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                    Download a Brochure
                </button>
                <p class="kamSubt139_brochureSubtext">
                    Includes full specs, features &amp; pricing.
                </p>
            </div>
        `,
        modal: `
            <div class="kamSubt139_modalOverlay">
                <div class="kamSubt139_modal">
                    <button type="button" class="kamSubt139_close" aria-label="Close"><img src="https://zckrjfube9.kameleoon.io/images/32666-aab1d71e-ce1f-433f-a7b9-6e4d34388c99.svg"></button>
                    <div class="kamSubt139_modalTop">
                        <h2>Thanks for downloading!</h2>
                        <p class="kamSubt139_introText">
                            Your brochure is available through the following link:
                        </p>
                        <img
                            class="kamSubt139_carImage"
                            src="https://dxp-pim-proxy-prod.inchcapedigital.com/inchcosy/v2/subaruauasset/AUBTAEKH8SE/?ex=1X&in=40&view=front"
                            alt="Vehicle"
                        >
                        <a
                            href="#"
                            class="kamSubt139_downloadLink"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Download</a>
                    </div>
                    <hr class="kamSubt139_divider">
                    <div class="kamSubt139_formSection">
                        <h3 class="kamSubt139_formHeading">
                            Why not send a copy of the brochure straight to your inbox for later?
                        </h3>
                        <div class="kamSubt139_fieldWrap">
                            <input
                                type="email"
                                class="kamSubt139_emailInput"
                                placeholder="Email"
                            >
                            <p class="kamSubt139_emailError"></p>
                        </div>
                        <label class="kamSubt139_checkboxWrap">
                            <input type="checkbox" class="kamSubt139_privacy">
                            <span class="kamSubt139_checkboxText">
                                Please confirm you have read and agreed to our
                                <strong>Privacy Collection Statement</strong>
                                below by checking this box.
                            </span>
                        </label>
                        <p class="kamSubt139_privacyError"></p>
                        <button type="button" class="kamSubt139_sendBtn" disabled>
                            Email my brochure
                        </button>
                        
                    </div>
                    <div class="kamSubt139_successSection">
                        <p class="kamSubt139_successMessage">
                            Your brochure has been sent to your email.<br>
                            Please check your inbox!
                        </p>
                    </div>
                </div>
            </div>
        `,
    },

    urls: {
        brochurePage: 'https://www.subaru.com.au/brochure-download?model=',
        submitForm: 'https://www.subaru.com.au/umbraco/surface/brochuredownloadform/SubmitBrochureDownloadForm',
    },

    brochurePdfUrls: {
        forester: 'https://docs.subaru.com.au/Subaru-Forester-brochure.pdf',
        crosstrek: 'https://docs.subaru.com.au/Subaru-Crosstrek-brochure.pdf',
        outback: 'https://docs.subaru.com.au/Subaru-Outback-Brochure.pdf',
        wilderness: 'https://docs.subaru.com.au/Subaru-Outback2026-Brochure.pdf',
        trailseeker: 'https://docs.subaru.com.au/Subaru-Trailseeker-brochure.pdf',
        impreza: 'https://docs.subaru.com.au/Subaru-Impreza-brochure.pdf',
        wrx: 'https://cdn.oem-production.subaru.com.au/documents/Subaru-WRX-brochure.pdf',
        uncharted: 'https://docs.subaru.com.au/Subaru-Uncharted-brochure.pdf',
        solterra: 'https://docs.subaru.com.au/Subaru-Solterra-brochure.pdf',
        brz: 'https://cdn.oem-production.subaru.com.au/documents/Subaru-BRZ-brochure.pdf',
    },

    sessionStorageKeys: {
        emailCollected: 'T37EmailCollected',
    },

    translations: {
        invalidEmail: 'Please enter a valid email address.',
        privacyRequired: 'You must agree to the Privacy Collection Statement.',
        sendBtnText: 'Email my brochure',
        submitting: 'submitting...',
        tokenError: 'Unable to fetch brochure form tokens',
        requestFailed: 'Request failed',
        genericError: 'Something went wrong',
    },

    goalNames: {
        brochureCtaClick: 'Download a Brochure CTA click - 139',
        downloadTextLinkClick: 'Download Text Link click - 139',
        emailConversion: 'Email conversion - 139',
    },

    goalIds: goals,
};

export default kamSubt139Config;
