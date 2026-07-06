const kamT5FotonConfig = {
    sessionKey: 'deepal_exit_modal_shown',
    formUrl: 'https://www.fotonaustralia.com.au/#form',
    goalIds: {
        'Foton Exit Intent CTA click T5': 0,
    },
    modalHTML: `
        <div id="deepal-exit-modal-overlay" role="dialog" aria-modal="true">
            <div id="deepal-exit-modal">
                <div id="deepal-exit-modal-header"></div>
                <span id="deepal-exit-modal-close" aria-label="Close modal">×</span>
                <div id="deepal-exit-modal-content">
                    <h2 class="home_noticias_header_h1">JOIN THE FOTON COMMUNITY</h2>
                    <p>Become connected with FOTON Australia and receive the latest information on our commercial vehicle range, special offers, and upcoming events.</p>
                    <a href="https://www.fotonaustralia.com.au/#form"><button id="deepal-exit-modal-btn">JOIN NOW</button></a>
                </div>
            </div>
        </div>
    `,
};

export default kamT5FotonConfig;
