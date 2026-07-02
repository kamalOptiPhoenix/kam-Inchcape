/* eslint-disable no-script-url */
const kamT5DeepalConfig = {
    goalIds: {
        'Modal pageviews T5': 421554,
    },
    modalConfigs: {
        S07: {
            heading: 'Interested in the S07?',
            actions: {
                brochure: {
                    desktopImage:
                        '//cdn.optimizely.com/img/15841360337/f0330ddf90e84336baa0e4f3d14f433b.jpg',
                    mobileImage:
                        '//cdn.optimizely.com/img/15841360337/216a5599e38f4d889aa773577bd6d033.jpg',
                    href: 'javascript:void(0);',
                    target: '_self',
                },
                testDrive: {
                    desktopImage:
                        '//cdn.optimizely.com/img/15841360337/9be7d20a7ca44a3491ba026ac00f0b2f.png',
                    mobileImage:
                        '//cdn.optimizely.com/img/15841360337/e60808b49f23474daa26375133e2dc87.png',
                    href: 'https://www.deepal.com.au/buying-tools/book-a-test-drive/',
                    target: '_self',
                },
                quote: {
                    desktopImage:
                        '//cdn.optimizely.com/img/15841360337/03190cd6dbc4415ea379bc376dda7e80.png',
                    mobileImage:
                        '//cdn.optimizely.com/img/15841360337/4ecc2e3690554f85977b5c8368ec292c.png',
                    href: 'https://www.deepal.com.au/buying-tools/get-a-quote/',
                    target: '_self',
                },
            },
        },
        E07: {
            heading: 'Interested in the E07?',
            actions: {
                brochure: {
                    desktopImage:
                        '//cdn.optimizely.com/img/15841360337/6e75b34f90a14ec3b0ef1dd6f1c61b5d.png',
                    mobileImage:
                        '//cdn.optimizely.com/img/15841360337/aa458c2f68f649df992b9b2bfa1b8bf5.png',
                    href: 'https://www.deepal.com.au/media/u1slviml/deepal_e07_spec_sheet_lr-r.pdf',
                    target: '_blank',
                },
                testDrive: {
                    desktopImage:
                        '//cdn.optimizely.com/img/15841360337/8e606d7f516e40ac804f356a6d68e3c8.png',
                    mobileImage:
                        '//cdn.optimizely.com/img/15841360337/99e714aabf3e49a1aaea3c1b14c3dd86.png',
                    href: 'https://www.deepal.com.au/buying-tools/book-a-test-drive/',
                    target: '_self',
                },
                quote: {
                    desktopImage:
                        '//cdn.optimizely.com/img/15841360337/f885479677d44f30a73750298880ddfe.png',
                    mobileImage:
                        '//cdn.optimizely.com/img/15841360337/05940b4a1aab4145b4e64a1882f96a08.png',
                    href: 'https://www.deepal.com.au/buying-tools/get-a-quote/',
                    target: '_self',
                },
            },
        },
    },
};

function generateSliderHTML(model = 'S07') {
    const config = kamT5DeepalConfig.modalConfigs[model];

    return `
<div class="t5-slider-overlay">
 <div class="t5-slider-Wrapper">
    <div class="t5-slider-container">
    <span class="t5-close-slider">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 18 18" fill="black">
      <path d="M0.863327 0.367234C0.979442 0.250826 1.11738 0.158468 1.26924 0.0954521C1.42111 0.0324359 1.58391 0 1.74833 0C1.91275 0 2.07555 0.0324359 2.22741 0.0954521C2.37927 0.158468 2.51721 0.250826 2.63333 0.367234L9.24833 6.98473L15.8633 0.367234C15.9795 0.251014 16.1175 0.158823 16.2694 0.0959253C16.4212 0.0330276 16.584 0.000654459 16.7483 0.000654459C16.9127 0.000654459 17.0754 0.0330276 17.2273 0.0959253C17.3791 0.158823 17.5171 0.251014 17.6333 0.367234C17.7495 0.483454 17.8417 0.621426 17.9046 0.773275C17.9675 0.925123 17.9999 1.08787 17.9999 1.25223C17.9999 1.41659 17.9675 1.57934 17.9046 1.73119C17.8417 1.88304 17.7495 2.02101 17.6333 2.13723L11.0158 8.75223L17.6333 15.3672C17.7495 15.4835 17.8417 15.6214 17.9046 15.7733C17.9675 15.9251 17.9999 16.0879 17.9999 16.2522C17.9999 16.4166 17.9675 16.5793 17.9046 16.7312C17.8417 16.883 17.7495 17.021 17.6333 17.1372C17.5171 17.2535 17.3791 17.3456 17.2273 17.4085C17.0754 17.4714 16.9127 17.5038 16.7483 17.5038C16.584 17.5038 16.4212 17.4714 16.2694 17.4085C16.1175 17.3456 15.9795 17.2535 15.8633 17.1372L9.24833 10.5197L2.63333 17.1372C2.51711 17.2535 2.37914 17.3456 2.22729 17.4085C2.07544 17.4714 1.91269 17.5038 1.74833 17.5038C1.58397 17.5038 1.42122 17.4714 1.26937 17.4085C1.11752 17.3456 0.979547 17.2535 0.863327 17.1372C0.747108 17.021 0.654917 16.883 0.592019 16.7312C0.529121 16.5793 0.496748 16.4166 0.496748 16.2522C0.496748 16.0879 0.529121 15.9251 0.592019 15.7733C0.654917 15.6214 0.747108 15.4835 0.863327 15.3672L7.48083 8.75223L0.863327 2.13723C0.746919 2.02112 0.654562 1.88318 0.591546 1.73132C0.52853 1.57946 0.496094 1.41665 0.496094 1.25223C0.496094 1.08782 0.52853 0.925012 0.591546 0.77315C0.654562 0.621287 0.746919 0.483348 0.863327 0.367234Z"></path>
    </svg>
    </span>
        
        <h4 class="t5-slider-heading">${config.heading}</h4>
    <p class="t5-slider-description">Here are some options that can further assist you</p>
    <div class="t5-slider-actions">
        <a href="${config.actions.brochure.href}" target="${config.actions.brochure.target}" class="t5-slider-action-block Download_Brochure_link">
            <div class="t5-slider-action-content">
             <img src="${config.actions.brochure.desktopImage}" alt="Brochure" class="t5-slider-action-image Desktop-only">
                <img src="${config.actions.brochure.mobileImage}" alt="Brochure" class="t5-slider-action-image Mobile-only">
                <div class="t5-slider-action-bottom">
               
                <div class="t5-slider-action-label">Download brochure</div>
                </div>
            </div>
        </a>
        <a href="${config.actions.testDrive.href}" target="${config.actions.testDrive.target}" class="t5-slider-action-block Download_BATD_link">
            <div class="t5-slider-action-content">
            <img src="${config.actions.testDrive.desktopImage}" alt="Test Drive" class="t5-slider-action-image Desktop-only">
                <img src="${config.actions.testDrive.mobileImage}" alt="Test Drive" class="t5-slider-action-image Mobile-only">
                  <div class="t5-slider-action-bottom">
               
                <div class="t5-slider-action-label">book a test drive</div>
                </div>
            </div>
        </a>
        <a href="${config.actions.quote.href}" target="${config.actions.quote.target}" class="t5-slider-action-block Download_Pricelist_link">
            <div class="t5-slider-action-content">
            <img src="${config.actions.quote.desktopImage}" alt="Quote" class="t5-slider-action-image Desktop-only">
                <img src="${config.actions.quote.mobileImage}" alt="Quote" class="t5-slider-action-image Mobile-only">
                  <div class="t5-slider-action-bottom">
              
                <div class="t5-slider-action-label">get a quote</div>
                
                </div>
            </div>
        </a>
    </div>
    </div>
</div>
</div>
`;
}

export { generateSliderHTML, kamT5DeepalConfig as modalConfigs };
export default kamT5DeepalConfig;
