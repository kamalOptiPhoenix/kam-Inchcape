import { goals } from '../../goals.js';
import kamPcat58DealerUrls from './kamPcat58DealerUrls.js';

const kamPcat58Config = {
    dealerUrls: kamPcat58DealerUrls,
    goalIds: goals,
    goalNames: {
        modalAppearances: 'Modal Appearances T58',
        primaryCta: 'Primary CTA click T58',
        checkStockCta: 'Check Stock Availability CTA clicks T58',
    },
    modalHtml: () => `
        <div class="PCAT58_customModal">
            <div class="PCAT58_backdrop"></div>
            <div class="PCAT58_modalBody">
                <div class="PCAT58_closeBtn">
                    <img src="//cdn.optimizely.com/img/15841360337/5b9e42997d3644e29dae58c356f5fde5.svg" alt="Close" class="PCAT58_closeIcon" />
                </div>
                <div class="PCAT58_modalContent">
                    <div class="PCAT58_contentLeft">
                        <h2 class="PCAT58_title">ANYTHING <span class="PCAT58_dealerName">DEALER NAME</span> CAN HELP YOU WITH?</h2>
                        <p class="PCAT58_subtitle">Have any specific questions about the <span class="PCAT58_modelName">model name</span> you would like to know?</p>
                        <div class="PCAT58_contactInfo"></div>
                        <div class="PCAT58_buttons">
                            <a href="https://www.peugeot.com.au/tools/enquiry.html" target="_blank" class="PCAT58_primaryBtn">I'VE GOT A QUESTION</a>
                        </div>
                    </div>
                    <div class="PCAT58_contentRight"></div>
                </div>
            </div>
        </div>
    `,
};

export default kamPcat58Config;
