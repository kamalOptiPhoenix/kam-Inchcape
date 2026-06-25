const kamT38PromotionWrapSelector = '.build-buy-summary .trimDetailsPromotionRow .promotionWrap';

const kamT38ButtonHtmlV2 = `
    <div class="t38ButtonWrapper trimDetailsButtonWrapper">
        <a href="javascript:void(0)" role="button" class="trimButtonPrimary">Download Specifications</a>
    </div>`;

export function kamT38InjectModalV2() {
    if (document.querySelector('.t38ModalOverlay')) {
        return;
    }

    jQuery('body').prepend(`
        <div class="t38ModalOverlay">
            <div class="t38ModalContainer">
            <span class="t38CloseButton">×</span>
                <h4 class="t38ModalHeading">Download brochure</h4>
                <p class="t38ModalContent">
                    Please enter your email so that you're able to download your digital brochure.
                </p>
                <div class="t38IframeWrapper">
                    <iframe id="t38FormIframe" src="https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat38kam=true" frameborder="0" scrolling="no"></iframe>
                </div>
            </div>
        </div>
    `);
}

export function kamT38InjectButtonV2(promotionWrap) {
    if (!promotionWrap || promotionWrap.querySelector('.t38ButtonWrapper')) {
        return;
    }

    promotionWrap.insertAdjacentHTML('beforeend', kamT38ButtonHtmlV2);
}

export function kamT38ReinjectButtonV2() {
    document.querySelectorAll(kamT38PromotionWrapSelector).forEach(kamT38InjectButtonV2);
}

export default function kamT38PersistButtonV2() {
    Kameleoon.API.Core.runWhenElementPresent(
        kamT38PromotionWrapSelector,
        (elements) => {
            elements.forEach(kamT38InjectButtonV2);
        },
        null,
        true
    );
}
