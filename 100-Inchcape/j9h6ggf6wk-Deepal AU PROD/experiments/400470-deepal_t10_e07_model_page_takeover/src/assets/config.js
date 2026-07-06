const kamT10DeepalConfig = {
    sessionKey: 't10_deepal_modal',
    selectors: {
        triggerSelector: '.hero-banner__content',
    },
    gifSrc: 'https://cdn.optimizely.com/img/15841360337/6d1595539be642679559aeaf01d233b2.gif',
    vimeoScript: 'https://player.vimeo.com/api/player.js',
    goalIds: {
        'Explore the E07 click T10': 421534,
        'Book a Test Drive click T10': 421536,
        'Close Modal click T10': 421535,
    },
    modalHTML: `
        <div id="deepal-modal" class="deepal-modal-overlay" style="display:none;">
            
            <!-- Desktop Vimeo Video -->
            <div class="desktop-video" style="padding:56.25% 0 0 0;position:relative;">
                <iframe 
                    id="vimeo-player-desktop"
                    class="deepal-modal-video"
                    src="https://player.vimeo.com/video/1113133092?h=ecde29bfa1&autoplay=1&muted=1&loop=1&background=1"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                    title="Desktop E07">
                </iframe>
            </div>

            <!-- Mobile Vimeo Video -->
            <div class="mobile-video">
                <iframe 
                    id="vimeo-player-mobile"
                    class="deepal-modal-video"
                    src="https://player.vimeo.com/video/1113133064?h=0724f76ed1&autoplay=1&muted=1&loop=1&background=1&controls=0&title=0&byline=0&portrait=0"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    title="Mobile E07">
                </iframe>
            <div class="video-gradient-overlay"></div>
            </div>

            <!-- Close button -->
            <button class="deepal-modal-close" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                <line x1="2.70711" y1="1.29289" x2="30.9914" y2="29.5772" stroke="white" stroke-width="2"/>
                <line x1="1.43157" y1="29.5772" x2="29.7158" y2="1.29289" stroke="white" stroke-width="2"/>
            </svg>
            </button>


            <!-- Logo -->
            <img 
                class="deepal-modal-logo"
                src="https://www.deepal.com.au/media/0zqhnaek/en-horizontal-white-1.png"
                alt="Deepal"
            >

            <!-- Content -->
            <div class="deepal-modal-content">
                <h2 class="deepal-headline">
                    DEEPAL E07
                    <img
                        id="multitruck-gif"
                        class="deepal-multitruck"
                        src="https://cdn.optimizely.com/img/15841360337/6d1595539be642679559aeaf01d233b2.gif"
                        alt="multitruck"
                    >
                </h2>
                <p class="deepal-subheadline">For a multiverse of possibilities</p>

                <div class="deepal-cta-container">
                    <a
                        class="deepal-cta primary"
                        href="https://www.deepal.com.au/buying-tools/book-a-test-drive/"
                        target="_blank"
                    >
                        BOOK A TEST DRIVE
                    </a>
                    <button class="deepal-cta secondary">
                            EXPLORE THE E07
                    </button>
                </div>
            </div>

            <!-- Metrics -->
            <div class="deepal-metrics">
                <span class="deepal-metrics-title">E07 AWD Performance</span>
                <div class="deepal-divider"></div>

                <div class="deepal-metrics-container">
                    <div class="deepal-metric">
                        <img src="//cdn.optimizely.com/img/15841360337/d6d82cebc6c3447db217e89d320a8bb9.svg" alt="Range">
                        <span class="metric-divider"></span>
                        <div class="deepal-text">
                            <strong>WLTP Driving Range*:</strong><br>510kms
                        </div>
                    </div>

                    <div class="deepal-metric">
                        <img src="//cdn.optimizely.com/img/15841360337/1919c75865a44d328baeac0f2aa190ca.svg" alt="Charge">
                        <span class="metric-divider"></span>
                        <div class="deepal-text">
                            <strong>DC Charge time 30%-80%**:</strong><br>15 minutes
                        </div>
                    </div>

                    <div class="deepal-metric">
                        <img src="//cdn.optimizely.com/img/15841360337/1dec3dfd5e8b4974a113967210bd70e3.svg" alt="Speed">
                        <span class="metric-divider"></span>
                        <div class="deepal-text">
                            <strong>Acceleration (0–100 km/h)***:</strong><br>3.96 seconds
                        </div>
                    </div>
                </div>

                <div class="deepal-footnote">Overseas Model Shown</div>
            </div>
        </div>
    `,
};

export default kamT10DeepalConfig;
