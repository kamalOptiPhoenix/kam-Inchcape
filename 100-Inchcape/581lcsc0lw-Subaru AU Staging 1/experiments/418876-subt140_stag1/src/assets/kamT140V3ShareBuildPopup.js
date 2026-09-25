/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT140V3TriggerPopupViewsGoal from './kamT140V3ProcessGoal.js';

const kamT140V3PopupId = 'kamT140V3ShareBuildPopup';

const kamT140V3Config = {
    selectors: {
        overlay: '.kamT140V3_overlay',
        closeBtn: '.kamT140V3_close',
        shareBtn: '.kamT140V3_shareBtn',
        keepBtn: '.kamT140V3_keepBtn',
        backBtn: '.kamT140V3_backBtn',
        choiceView: '.kamT140V3_choiceView',
        confirmView: '.kamT140V3_confirmView',
        carImage: '.kamT140V3_carImage',
        heading: '.kamT140V3_heading',
    },
    html: {
        popup: `
            <div class="kamT140V3_overlay" id="${kamT140V3PopupId}" role="dialog" aria-modal="true">
                <div class="kamT140V3_modal">
                    <button type="button" class="kamT140V3_close" aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        </svg>
                    </button>
                    <div class="kamT140V3_choiceView">
                        <h2 class="kamT140V3_heading">Your Subaru, your way</h2>
                        <p class="kamT140V3_subcopy">
                            Looking good! Would you like to share this build with a consultant to check local availability?
                        </p>
                        <div class="kamT140V3_imageWrap">
                            <img class="kamT140V3_carImage" src="" alt="Your configured Subaru">
                        </div>
                        <div class="kamT140V3_actions">
                            <button type="button" class="kamT140V3_shareBtn">Share build</button>
                            <button type="button" class="kamT140V3_keepBtn">Keep customising</button>
                        </div>
                    </div>
                    <div class="kamT140V3_confirmView" hidden>
                        <h2 class="kamT140V3_thankYou">Thank you!</h2>
                        <p class="kamT140V3_sentCopy">Your build has been sent.</p>
                        <div class="kamT140V3_imageWrap">
                            <img class="kamT140V3_carImage" src="" alt="Your configured Subaru">
                        </div>
                        <p class="kamT140V3_followUp">
                            One of our dealership sales consultants will reach out shortly.
                        </p>
                        <div class="kamT140V3_actions kamT140V3_actions--single">
                            <button type="button" class="kamT140V3_backBtn">Back to my build</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
    },
};

function kamT140V3GetVehicleImageSrc() {
    const selectors = [
        '#customise_summary img[src*="inchcosy"]',
        '#customise_summary img',
        'img[data-test="image:variant:0"]',
        '[data-test="image:variant:0"]',
        'img[src*="inchcosy"][src*="view=front"]',
        'img[src*="subaruauasset"]',
    ];

    for (let index = 0; index < selectors.length; index += 1) {
        const element = document.querySelector(selectors[index]);
        if (!element) {
            continue;
        }

        const src = element.currentSrc || element.src || '';
        if (src) {
            return src;
        }
    }

    return '';
}

function kamT140V3FormatModelName(modelName) {
    const cleaned = String(modelName || '')
        .replace(/^all-new\s+/i, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (!cleaned) {
        return 'Subaru';
    }

    // Prefer short model label for heading ("WRX", "Outback", …)
    const firstWord = cleaned.split(' ')[0];
    return firstWord || cleaned;
}

function kamT140V3GetModelNameFromDom() {
    const selectors = [
        '#customise_summary [data-test="title:model"]',
        '[data-test="title:variantName"]',
        'div[data-test="specPack:list"] div[data-selected="true"] h6[data-test="title:model"]',
    ];

    for (let index = 0; index < selectors.length; index += 1) {
        const element = document.querySelector(selectors[index]);
        const text = ((element && (element.innerText || element.textContent)) || '').trim();
        if (text) {
            return text;
        }
    }

    return '';
}

function kamT140V3EnsurePopup() {
    let overlay = document.getElementById(kamT140V3PopupId);
    if (overlay) {
        return overlay;
    }

    document.body.insertAdjacentHTML('beforeend', kamT140V3Config.html.popup);
    overlay = document.getElementById(kamT140V3PopupId);
    return overlay;
}

function kamT140V3SetCarImages(overlay, imageSrc) {
    if (!imageSrc) {
        return;
    }

    overlay.querySelectorAll(kamT140V3Config.selectors.carImage).forEach((img) => {
        img.src = imageSrc;
    });
}

function kamT140V3SetHeading(overlay, modelName) {
    const heading = overlay.querySelector(kamT140V3Config.selectors.heading);
    if (!heading) {
        return;
    }

    const displayName = kamT140V3FormatModelName(modelName || kamT140V3GetModelNameFromDom());
    heading.textContent = `Your ${displayName}, your way`;
}

function kamT140V3ShowChoiceView(overlay) {
    const choiceView = overlay.querySelector(kamT140V3Config.selectors.choiceView);
    const confirmView = overlay.querySelector(kamT140V3Config.selectors.confirmView);
    if (choiceView) {
        choiceView.hidden = false;
    }
    if (confirmView) {
        confirmView.hidden = true;
    }
}

function kamT140V3ShowConfirmView(overlay) {
    const choiceView = overlay.querySelector(kamT140V3Config.selectors.choiceView);
    const confirmView = overlay.querySelector(kamT140V3Config.selectors.confirmView);
    if (choiceView) {
        choiceView.hidden = true;
    }
    if (confirmView) {
        confirmView.hidden = false;
    }
}

function kamT140V3ClosePopup() {
    const overlay = document.getElementById(kamT140V3PopupId);
    if (!overlay) {
        return;
    }

    overlay.classList.remove('kamT140V3_overlay--active');
    document.body.classList.remove('kamT140V3_popupOpen');
    window.__kamT140V3PopupOpen = false;
}

function kamT140V3ShowConfirmation() {
    const overlay = document.getElementById(kamT140V3PopupId);
    if (!overlay) {
        return;
    }

    kamT140V3ShowConfirmView(overlay);
    overlay.classList.add('kamT140V3_overlay--active');
    document.body.classList.add('kamT140V3_popupOpen');
    window.__kamT140V3PopupOpen = true;
}

/**
 * @param {object} options
 * @param {string} [options.modelName]
 * @param {() => void|Promise<void>} options.onShareBuild
 * @param {() => void|Promise<void>} options.onKeepCustomising
 * @param {() => void|Promise<void>} options.onClose
 */
export default function kamT140V3ShowShareBuildPopup(options) {
    const overlay = kamT140V3EnsurePopup();
    const imageSrc = kamT140V3GetVehicleImageSrc();

    kamT140V3SetCarImages(overlay, imageSrc);
    kamT140V3SetHeading(overlay, options.modelName);
    kamT140V3ShowChoiceView(overlay);

    const shareBtn = overlay.querySelector(kamT140V3Config.selectors.shareBtn);
    const keepBtn = overlay.querySelector(kamT140V3Config.selectors.keepBtn);
    const closeBtn = overlay.querySelector(kamT140V3Config.selectors.closeBtn);
    const backBtn = overlay.querySelector(kamT140V3Config.selectors.backBtn);

    const runOnce = (handler) => {
        if (overlay.__kamT140V3Busy) {
            return;
        }
        overlay.__kamT140V3Busy = true;

        Promise.resolve()
            .then(() => handler && handler())
            .catch(() => {})
            .finally(() => {
                overlay.__kamT140V3Busy = false;
            });
    };

    shareBtn.onclick = () => {
        runOnce(() => options.onShareBuild && options.onShareBuild());
    };

    keepBtn.onclick = () => {
        runOnce(() => options.onKeepCustomising && options.onKeepCustomising());
    };

    closeBtn.onclick = () => {
        runOnce(() => options.onClose && options.onClose());
    };

    backBtn.onclick = () => {
        kamT140V3ClosePopup();
    };

    overlay.onclick = (event) => {
        if (event.target === overlay) {
            runOnce(() => options.onClose && options.onClose());
        }
    };

    overlay.classList.add('kamT140V3_overlay--active');
    document.body.classList.add('kamT140V3_popupOpen');
    window.__kamT140V3PopupOpen = true;

    kamT140V3TriggerPopupViewsGoal();
    console.log('%c *** T140 V3 Share Build popup shown ***', 'color:#fff;background:#1637A0');
}

export {
    kamT140V3ClosePopup,
    kamT140V3ShowConfirmation,
    kamT140V3GetVehicleImageSrc,
};
