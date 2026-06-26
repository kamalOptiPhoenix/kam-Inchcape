export default function kamT38HtmlAddV2() {
    document.body.insertAdjacentHTML('afterbegin', `
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
        document.querySelector('.promotionBox .promotionWrap').insertAdjacentHTML('beforeend', `
    <div class="t38ButtonWrapper trimDetailsButtonWrapper">
        <a href="javascript:void(0)" role="button" class="trimButtonPrimary">Download Specifications</a>
    </div>`);
}
