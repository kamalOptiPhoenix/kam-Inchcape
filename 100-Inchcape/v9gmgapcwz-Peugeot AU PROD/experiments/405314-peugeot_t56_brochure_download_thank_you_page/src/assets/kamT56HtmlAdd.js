import kamT56GetImageUrl from './kamT56GetImageUrl.js';

function kamT56HtmlAdd(modelName) {
    const safeModelName = modelName || 'Vehicle';
    const imgUrl = kamT56GetImageUrl(safeModelName);
    const modalHtml = `
        <div class="t56ModalOverlay" data-current-model="${safeModelName}" data-modelName="${safeModelName}">
            <div class="t56ModalContainer">
                <span class="t56CloseButton">×</span>
                <div class="t56Step1">
                    <img src="${imgUrl}" class="t56ModalImage t56Step1Image" />
                    <h4 class="t56ModalHeading">DOWNLOAD BROCHURE</h4>
                    <p class="t56ModalContent">
                        Please enter your email so that you're able to download your digital brochure.
                    </p>
                    <iframe
                        id="t56FormIframe"
                        src="https://peugeotforms.inchcape.com.au/webforms/download_brochure/?pcat56kam=true"
                        title="Download brochure form"
                        class="t56IframeForm"
                    ></iframe>
                </div>
                <div class="t56Step2" style="display: none;">
                    <img src="${imgUrl}" class="t56ModalImage t56Step2Image" />
                    <h4 class="t56ModalHeading">THANK YOU!</h4>
                    <p class="t56ModalContent">Download your digital brochure below</p>
                    <a class="t56FinalDownloadBtn" href="javascript:void(0);">DOWNLOAD BROCHURE</a>
                    <p class="t56ModalContent">You may also like to</p>
                     <a href="https://configurator.peugeot.com.au" target="_blank" class="t56Link2 t56Link">CONFIGURE A ${safeModelName}</a>
                   
                    <div class="t56BottomLinks">
                        <a href="https://www.peugeot.com.au/tools/enquiry.html" target="_blank" class="t56Link">Make an enquiry</a>
                        <a href="https://www.peugeot.com.au/tools/find-retailer.html" target="_blank" class="t56Link">Find a dealer</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', modalHtml);
}

export default kamT56HtmlAdd;
