export default function butterBarHtml() {
    const html = `
    <section class="t23-q-sticky-bootom-bar-wrapper">
        <div class="q-sticky-bottom-bar__container">
            <a class="t23DownloadSpecsCta q-sticky-bottom-bar__link q-mod q-mod-analytics" href="https://www.peugeot.com.au/tools/download-brochure.html" target="_blank" data-gtm-event-label="DOWNLOAD SPECIFICATIONS" >
                
                <img src="//cdn.optimizely.com/img/15841360337/162120f20c5545d6a032636992f7acfa.png">    
                <span class="q-sticky-bottom-bar__label">DOWNLOAD SPECIFICATIONS</span>
            
            </a>
            <a class="t23BrochureDownloadCta q-sticky-bottom-bar__link t21DownlaodBrochure q-mod q-mod-analytics" href="https://www.peugeot.com.au/tools/download-brochure.html" target="_blank">
            
                <img src="//cdn.optimizely.com/img/15841360337/4e1d31b80f1c49db852f3c06941ab156.png">    
                <span class="q-sticky-bottom-bar__label">DOWNLOAD A BROCHURE</span>
            
            </a>
            <a class="t23BuildPrice Cta q-sticky-bottom-bar__link q-mod q-mod-analytics" href="https://configurator.peugeot.com.au/" target="_blank" data-gtm-event-label="BUILD PRICE" >
                
                <img src="//cdn.optimizely.com/img/15841360337/239041bff029488ea0e7896090efd396.png">
                <span class="q-sticky-bottom-bar__label">BUILD & PRICE</span>
            
            </a>
            <a class="t23TestDriveCta q-sticky-bottom-bar__link q-mod q-mod-analytics" href="/tools/test-drive.html" data-gtm-event-label="REQUEST A TEST DRIVE" >    
            
                <img src="//cdn.optimizely.com/img/15841360337/f931b00d30c9476d82a218bb4ae33a15.png">
                <span class="q-sticky-bottom-bar__label">BOOK A TEST DRIVE</span>
            
            </a>
            <a class="t23EnquiryCta q-sticky-bottom-bar__link q-mod q-mod-analytics" href="/tools/enquiry.html" data-gtm-event-label="MAKE AN ENQUIRY" >

                <img src="//cdn.optimizely.com/img/15841360337/65159d9bf4084a63a1513136a82b1dd7.png">
                <span class="q-sticky-bottom-bar__label">MAKE AN ENQUIRY</span>
            
            </a>
        </div>
    </section>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', html);
}
