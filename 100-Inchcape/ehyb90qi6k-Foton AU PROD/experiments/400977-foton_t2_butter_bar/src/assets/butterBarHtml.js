export default function butterBarHtml() {
    const pathname = window.location.pathname;
    const isAumarkSPath = pathname === '/trucks/series/aumark-s/';
    const isTunlandPath = pathname === '/ute/tunland/';
    const isSubscribePath = isAumarkSPath || isTunlandPath;
    const hideTestDriveCTA = isAumarkSPath;

    return `
        <div class="fott2-butter-bar fott2-butter-bar-visible ${
    isAumarkSPath ? 'fott2-aumark-s' : ''
}" id="fott2-butter-bar">
            <div class="fott2-top-row">
                <a href="https://www.fotonaustralia.com.au/about-us/contact-us/" class="fott2-cta-btn fott2-contact" >
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/aea5eabac18a48a8b72f4f80147c0e78.svg" alt="Contact Us Icon" />
                    Contact Us
                </a>
                ${
    !hideTestDriveCTA
        ? `
                <a href="https://www.fotonaustralia.com.au/buying-tools/book-a-test-drive/" class="fott2-cta-btn fott2-batd" >
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/32dc6038afc641078d6029142dae0a5a.svg" alt="Test Drive Icon" />
                    <span class="desktop-text">Book a Test Drive</span>
                    <span class="mobile-text">Test Drive</span>
                </a>
                `
        : ''
}
                <a href="https://www.fotonaustralia.com.au/find-a-dealer/" class="fott2-cta-btn fott2-find-dealer" >
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/3672d6516af6452b84114464d8827667.svg" alt="Dealer Icon" />
                    Find a Dealer
                </a>
                <a href="https://www.fotonaustralia.com.au/buying-tools/get-a-quote/" class="fott2-cta-btn fott2-quote">
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/0abe4b02bfce486caefbffb4f9913d68.svg" alt="Quote Icon" />
                    Get a Quote
                </a>
                ${
    isAumarkSPath
        ? `
                <a href="https://www.fotonaustralia.com.au/#form" class="fott2-cta-btn fott2-newsletter fott2-newsletter-top-row">
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/05715b5d743c45708613c6cc80018550.svg" alt="Newsletter Icon" />
                    <span class="desktop-text">Subscribe</span>
                    <span class="mobile-text">Subscribe</span>
                </a>
                `
        : ''
}
            </div>
            <div class="fott2-bottom-row ${
    isAumarkSPath ? 'fott2-bottom-row-hidden-mobile' : ''
}">
                <a href="https://www.fotonaustralia.com.au/#form" class="fott2-cta-btn fott2-newsletter">
                    <img class="fott2-butterbar-icon" src="//cdn.optimizely.com/img/15841360337/05715b5d743c45708613c6cc80018550.svg" alt="Special Offers Icon" />
                  <span class="desktop-text">Subscribe</span>
                  <span class="mobile-text">Subscribe</span>
                </a>
            </div>
        </div>
    `;
}
