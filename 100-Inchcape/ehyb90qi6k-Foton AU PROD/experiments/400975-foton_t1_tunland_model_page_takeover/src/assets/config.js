const kamT1FotonConfig = {
    sessionKey: 'fott1_tunland_modal',
    selectors: {
        triggerSelector: 'body',
    },
    vimeoScript: 'https://player.vimeo.com/api/player.js',
    modalHTML: `
        <div id="foton-modal" class="foton-modal-overlay">
            
            <!-- Desktop Vimeo Video -->
            <div class="desktop-video">
                <iframe 
                    id="vimeo-player-desktop"
                    class="foton-modal-video foton-iframe"
                    src="https://player.vimeo.com/video/1128821651?h=f63b7c1902&autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    title="Tunland Desktop Video">
                </iframe>
            </div>

            <!-- Mobile Vimeo Video -->
            <div class="mobile-video">
                <iframe 
                    id="vimeo-player-mobile"
                    class="foton-modal-video foton-iframe"
                    src="https://player.vimeo.com/video/1128821712?h=2824537073&autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    title="Tunland Mobile Video">
                </iframe>
            </div>

            <!-- 40% Black Overlay -->
            <div class="foton-overlay"></div>

            <!-- Gradient at bottom -->
            <div class="foton-gradient"></div>

            <!-- Close button -->
            <button class="foton-modal-close fott1-close-btn" aria-label="Close">
                <img src="//cdn.optimizely.com/img/15841360337/83e1c0374af54ef29a92ea883e07bcdf.svg" alt="Close">
            </button>

            <!-- Foton Logo -->
            <img 
                class="foton-modal-logo"
                src="//cdn.optimizely.com/img/15841360337/eb6d14458b21493b962e60e9b680cc7d.svg"
                alt="Foton"
            >

            <!-- Content -->
            <div class="foton-modal-content">
                <img 
                    class="foton-headline"
                    src="//cdn.optimizely.com/img/15841360337/f97441643c92461f8fe0e4b7f4aa3154.png"
                    alt="TUNLAND"
                >
                <p class="foton-subheadline foton-subheadline-desktop">WORK HARD. KNOCK OFF HARDER.</p>
                <p class="foton-subheadline foton-subheadline-mobile">WORK HARD. <br> KNOCK OFF HARDER.</p>

                <div class="foton-cta-container">
                  <button
                        class="foton-cta secondary fott1-explore-btn"
                    >
                        EXPLORE TUNLAND
                    </button>
                    <a
                        class="foton-cta primary fott1-book-btn"
                        href="https://www.fotonaustralia.com.au/buying-tools/book-a-test-drive"
                        target="_self"
                    >
                        BOOK A TEST DRIVE
                    </a>
                  
                </div>
            </div>

            <!-- Performance Specifications -->
            <div class="foton-performance">
                <div class="foton-performance-title">Tunland Performance</div>
                <div class="foton-performance-divider"></div>
                
                <div class="foton-performance-container">
                    <div class="foton-performance-item">
                        <img src="//cdn.optimizely.com/img/15841360337/664fed1adce5458c98f22dbb2e9285ba.svg" alt="Engine">
                        <div class="foton-performance-divider-item"></div>
                        <div class="foton-performance-text">
                            2.0-litre Aucan </br> Turbo-Diesel engine
                        </div>
                    </div>

                    <div class="foton-performance-item">
                        <img src="//cdn.optimizely.com/img/15841360337/d5e3647be8744fe3bc53aa1857b76238.svg" alt="Hybrid">
                        <div class="foton-performance-divider-item"></div>
                        <div class="foton-performance-text">
                            48V mild-hybrid </br> system
                        </div>
                    </div>

                    <div class="foton-performance-item">
                        <img src="//cdn.optimizely.com/img/15841360337/a44b85aa21954f0dadeae6dd0196824c.svg" alt="Power">
                        <div class="foton-performance-divider-item"></div>
                        <div class="foton-performance-text">
                            120kW* @ 3600rpm and 450Nm* </br> @ 1500-2400rpm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
};

export default kamT1FotonConfig;
