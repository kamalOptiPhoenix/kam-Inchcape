const kamSubt138Config = {
    selectors: {
        searchBarContent: '#search-bar-content',
        mobileTrack: '.subt138-mobile-track',
        mobileDots: '.subt138-mobile-dots button',
        desktopGrid: '.subt138_custom-grid',
        mobileCarousel: '.subt138-mobile-carousel',
    },

    html: {
        gridMarkup: `
            <section class="subt138_custom-grid">
                <div class="subt138_grid">

                    <div class="subt138_top">

                        <a href="https://www.subaru.com.au/outback/2026" class="subt138_outback">
                            <img src="https://cdn.optimizely.com/img/15841360337/08ca1a9a33a5445f9679fb716cc14800.jpg" alt="Outback">
                        </a>

                        <a href="https://www.subaru.com.au/uncharted/2026" class="subt138_uncharted">
                            <img src="https://cdn.optimizely.com/img/15841360337/85dd67b9db6d44ba89a8c12f8ed7f055.jpg" alt="Uncharted">
                        </a>

                        <a href="https://www.subaru.com.au/wilderness/2026" class="subt138_wilderness">
                            <img src="https://cdn.optimizely.com/img/15841360337/87482eb2e6b24ad7ae582559808d29f1.jpg" alt="Wilderness">
                        </a>

                    </div>

                    <div class="subt138_bottom">

                        <a href="https://www.subaru.com.au/special-offers/my26-forester-awd-hybrid-driveaway-offer" class="subt138_forester">
                            <img src="https://cdn.optimizely.com/img/15841360337/aaa213e4b08c4c9d9511f88d81bdf663.jpg" alt="Forester">
                        </a>

                        <a href="https://www.subaru.com.au/trailseeker/2026" class="subt138_trailseeker">
                            <img src="https://cdn.optimizely.com/img/15841360337/81f0f50a3c014e298a59969a7d20e3bc.jpg" alt="Trailseeker">
                        </a>

                    </div>
                    
                     <div class="subt138-mobile-dots">
        <button class="is-active"></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
    </div>

                </div>
            </section>
             <div class="subt138-mobile-carousel">
        <div class="subt138-mobile-track">
        
        <a href="https://www.subaru.com.au/outback/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/8bf9f99102f44f29a1ea1275b6095fb1.jpg" alt="Outback">
            </a>
            
             <a href="https://www.subaru.com.au/uncharted/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/61f4a8ff928447d284e33903f53533ed.jpg" alt="Uncharted">
            </a>
            
             <a href="https://www.subaru.com.au/wilderness/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/333625f2944f48fdaf83ae3487ad03d7.jpg" alt="Wilderness">
            </a>

            <a href="https://www.subaru.com.au/special-offers/my26-forester-awd-hybrid-driveaway-offer">
                <img src="https://cdn.optimizely.com/img/15841360337/4abf4348be91416d9ea6ca0bc420b706.jpg" alt="Forester">
            </a>

            <a href="https://www.subaru.com.au/trailseeker/2026">
                <img src="https://cdn.optimizely.com/img/15841360337/9ff815457f4f4e5da0a15cb356d5f62f.jpg" alt="Trailseeker">
            </a>

        </div>

        <div class="subt138-mobile-dots">
            <button class="is-active"></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>

    </div>`,
    },
};

export default kamSubt138Config;
