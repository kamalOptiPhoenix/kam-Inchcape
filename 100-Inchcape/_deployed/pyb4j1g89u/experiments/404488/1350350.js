"use strict";

(function () {
  function scrollHandelr() {
    let lastScrollTop = 0;
    const butterBar = document.getElementById('ldvt3butterbar');
    Kameleoon.API.Utils.addEventListener(window, 'scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        // Scrolling down – Show butter bar
        butterBar.style.transform = 'translateY(0)';
      } else {
        // Scrolling up – Hide butter bar
        butterBar.style.transform = 'translateY(-100%)';
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile bounce effect
    });
  }
  function getLdvt3Html(variant) {
    return `
    <div id="ldvt3butterbar">
        <ul>
            <li class="download_brochure_ldvt3">
                <img src="${variant === 'v3' ? '//cdn.optimizely.com/img/15841360337/f579621b21174b00b09193207aae7567.svgz' : '//cdn.optimizely.com/img/15841360337/cea6889bfcdc4ff69569b7032dfefba7.svgz'}" />
                <a href="https://ldv.co.nz/brochure-page/">download brochure</a>
            </li>
            <li class="price_list_ldvt3">
                <img src="${variant === 'v3' ? '//cdn.optimizely.com/img/15841360337/732869687dbd49f5acfda05701763ed9.svgz' : '//cdn.optimizely.com/img/15841360337/3e85c43e556d4d67b02406e1b66f0bfe.svgz'}" />
                <a href="https://ldv.co.nz/price-list/">Price list</a>
            </li>
            <li class="test_drive_ldvt3">
                <img src="${variant === 'v3' ? '//cdn.optimizely.com/img/15841360337/758d0aed211a41028642999882cd801e.svgz' : '//cdn.optimizely.com/img/15841360337/fee9ba45dfb24ea9822f1dd21143d9f8.svgz'}" />
                <a href="https://ldv.co.nz/request-a-test-drive/">Test Drive</a>
            </li>
            <li class="enquiry_ldvt3">
                <img src="${variant === 'v3' ? '//cdn.optimizely.com/img/15841360337/993b9bdf990c43a3a02b423877d81533.svgz' : '//cdn.optimizely.com/img/15841360337/628cecffa39b46f8ac9cb58d0137a8c7.svgz'}" />
                <a href="https://ldv.co.nz/contact-us/">Enquiry</a>
            </li>
            <li class="find_dealer_ldvt3">
                <img src="${variant === 'v3' ? '//cdn.optimizely.com/img/15841360337/47b108239a81437dadeb0a76821262b7.svgz' : '//cdn.optimizely.com/img/15841360337/73e75176829d4a24ad1b03365c30c3e6.svgz'}" />
                <a href="https://ldv.co.nz/find-a-dealer/">Find a Dealer</a>
            </li>
        </ul>
    </div>
`;
  }
  function init(header, variant) {
    document.body.classList.add('ldvt3', `ldvt3_${variant}`);
    if (!document.getElementById('ldvt3butterbar')) {
      const html = getLdvt3Html(variant);
      header.insertAdjacentHTML('beforeend', html);
    }
    if (window.innerWidth < 768) {
      scrollHandelr();
    }
  }

  /* eslint-disable import/extensions */

  const HEADER_SELECTOR = 'body > main > section.sticky.top-0.max-\\[768px\\]\\:relative';
  (function kamLdvt3V1() {
    if (!window.t3Start) {
      window.t3Start = true;
      Kameleoon.API.Core.runWhenElementPresent(HEADER_SELECTOR, elements => {
        init(elements[0], 'v1');
      });
    }
  })();
})();