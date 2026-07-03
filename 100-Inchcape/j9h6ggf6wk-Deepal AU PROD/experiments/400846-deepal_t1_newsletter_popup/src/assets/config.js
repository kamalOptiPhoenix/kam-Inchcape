const kamT1DeepalConfig = {
    sessionKey: 'deepal_exit_modal_shown',
    ctaUrl: 'https://www.deepal.com.au/#HomeSubscriptionForm',
    scrollThreshold: 60,
    selectors: {
        body: 'body',
    },
    goalIds: {
        'Newsletter pop-up page views T1': 421770,
        'exit intent cta_click T1': 421771,
    },
    modalHTML: `
        <div id="deepal-exit-modal-overlay" role="dialog" aria-modal="true">
            <div id="deepal-exit-modal">
                <div id="deepal-exit-modal-header"></div>
                <span id="deepal-exit-modal-close" aria-label="Close modal">×</span>
                <div id="deepal-exit-modal-content">
                    <h2 class="home_noticias_header_h1">JOIN THE DEEPAL COMMUNITY</h2>
                    <p>Become connected with DEEPAL Australia and receive the latest information on our exciting range, special offers, and upcoming events.</p>
                    <a href="https://www.deepal.com.au/#HomeSubscriptionForm"><button id="deepal-exit-modal-btn">JOIN NOW</button></a>
                </div>
            </div>
        </div>
    `,
};

export default kamT1DeepalConfig;
