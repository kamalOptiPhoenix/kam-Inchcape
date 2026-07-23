"use strict";

(function () {
  function kamT35DatalayerPushOnClick() {
    Kameleoon.API.Utils.addEventListener(document, 'click', event => {
      if (!event.target.closest('.t21DownlaodBrochure')) {
        return;
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'uaevent',
        eventCategory: 'd1-showroom::Stickybar',
        eventAction: '',
        eventLabel: 'DOWNLOAD A BROCHURE'
      });
    });
  }
  function kamT35ScrollFunction() {
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
      const nav = jQuery('.nav_anchor .q-navigation-bar[data-navigation-bar]');
      let offset = 0;
      const contentSection = document.querySelector('#main > div > .aem-Grid:last-child').getBoundingClientRect().y;
      if (nav.length > 0) {
        const height = nav.height() + (window.innerWidth < 992 ? 50 : 0);
        offset = height;
        jQuery('.t23-q-sticky-bootom-bar-wrapper').css('top', height);
      } else {
        const navOffset = window.innerWidth < 992 ? 50 : 0;
        jQuery('.t23-q-sticky-bootom-bar-wrapper').css('margin-top', navOffset);
      }
      if (contentSection < -offset) {
        jQuery('.t23-q-sticky-bootom-bar-wrapper').addClass('t23Sticky');
      } else {
        jQuery('.t23-q-sticky-bootom-bar-wrapper').removeClass('t23Sticky');
      }
    });
  }
  function butterBarHtml() {
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

  /* eslint-disable no-console */

  (function kamPcat35V2() {
    function init() {
      jQuery('body').addClass('pcat23');
      jQuery('body').addClass('pcat23v1');
      console.log('**** PCAT35 V2 ****');
      kamT35ScrollFunction();
      butterBarHtml();
      jQuery(window).scrollTop(0);
      kamT35DatalayerPushOnClick();
    }
    if (!window.__kam405294Initialized) {
      window.__kam405294Initialized = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.jQuery === 'function' && document.querySelectorAll('#main > div > .aem-Grid').length > 0, init);
    }
  })();
})();