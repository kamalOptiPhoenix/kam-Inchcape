// t60-modal-config.js
const T60_MODELS = {
    'T60 Max Plus': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/019a3a87ceb94fa8956141d3f1a9eaff.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/e5f6706900664ca9972e2c3dae7fe7a1.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/9f28f17fb0d5480f9b6c7a2aa1190e26.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/63d6b3d70f1e47b5a4d17fef103f41c2.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/c14e2acc4eb943499f836b709148c39c.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/72e083cd71694ecbb1030cb50cb78dc8.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/mgrb2fps/ldv-nz-my24-t60-max-plus.pdf'
    },
    'T60 Elite': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/177c456e7e154600aee54d5f30ce4b96.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/aa7586a76586492b848b974e40ef1d0c.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/adde0171c6624aa4bd9c2d706f7c0b72.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/fbe2358e4bf6401595e5a84349d7405c.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/d729b07cf3694e6687ed5c1680e90592.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/b05f6e221d764833ae8b8e59f11dd4cc.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/dn3o0rtq/1250-ldv-nz-my23-salespack-warranty-t60.pdf'
    },
    'T60 Lux': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/177c456e7e154600aee54d5f30ce4b96.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/ef9ca5bd6f4642878dc266ab2724e2d1.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/55508fec1eaf400c85236ea08a73eb79.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/fbe2358e4bf6401595e5a84349d7405c.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/2e9c1e3402944b6db70484480db6df02.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/b4183dc96f86451b999720faff46a1d8.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/dn3o0rtq/1250-ldv-nz-my23-salespack-warranty-t60.pdf'
    },
    G10: {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/1463c21a37c34c829dd7b8fc683e5a17.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/4d9c796d4dfe48b791d88a867e557aae.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/960506cd7c9c4ae7810a87cd0f013e53.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/72c1d975d8c0427fb61bd049987a0426.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/d88a56bfa3b343ab91d789274a247977.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/8b48f753f6f44c26beb7610da9818c7e.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/lnwawt4w/1250-ldv-nz-my23-salespack-warranty-g10.pdf'
    },
    'Deliver 9 Big': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/fac7a0d77d3048869c9488b6e95e91f3.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/6034626c95e24944822feb974377f34b.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/42c176c2640941bb9d32fda5b76569a3.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/295901d7db664d3ca8ab543ae61edf93.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/76c088945c554c10a70569e8a53c71ae.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/ab78b7150b8244b2b36510348676229a.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/bdrhhz0y/fa-1167-ldv-nz-my24-deliver9big-salespack-warranty.pdf'
    },
    'Deliver 9 Bigger': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/44ff363f5be747c28e9a3bdbe2d9be7a.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/1c2c017779da4db89ccdadd9c6ca421d.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/db5163ccc89e4fe6a4a62783d767669a.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/295901d7db664d3ca8ab543ae61edf93.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/76c088945c554c10a70569e8a53c71ae.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/ab78b7150b8244b2b36510348676229a.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/c0yfjft2/fa-1167-ldv-nz-my24-deliver9bigger-salespack-warranty.pdf'
    },
    'Deliver 9 Biggest': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/6e16da5c4d9c406ea0c153371c5853f3.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/6034626c95e24944822feb974377f34b.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/42c176c2640941bb9d32fda5b76569a3.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/295901d7db664d3ca8ab543ae61edf93.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/76c088945c554c10a70569e8a53c71ae.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/ab78b7150b8244b2b36510348676229a.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/ztyhgor2/fa-1167-ldv-nz-my24-deliver9biggest-salespack-warranty.pdf'
    },
    'eDeliver 9 Big': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/44ff363f5be747c28e9a3bdbe2d9be7a.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/d8a8c30fbd9640a6b7b1b335cee762db.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/a1383fdd527f4226a3dd5b6b2a420d4c.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/9d1793d1b5454fd3be473704ee3f304d.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/d92d65c8ce0546eb80d810498995a3d6.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/60e2188ca69e4b63bc371cdb3cb0c8b9.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/1zxdxwun/ldv-nz-my24-edeliver-9-big.pdf'
    },
    'eDeliver 9 Bigger': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/23297f7397c54fdbac41d4093e37f385.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/bbb8a6bf16ab48de92c964610f87ca89.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/81a817b06e0541349dde904ac48ff93c.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/22888aa00b1a4aaf841512d5408e277b.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/6e7a8bc9458c434c89ff4e389ea26d09.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/52373fc90a69410789ab7808f930337b.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/srqj35ip/ldv-nz-my24-edeliver-9-bigger.pdf'
    },
    'eDeliver 3': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/1c174c388d6b475a846aa3b45101fba3.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/515389f6db8d49bda5220dc8a4785a0b.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/5194a2e8ce5242fdabe0d24df8480b42.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/bac5ed16635b4b2f838c5483d7c34d51.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/a571fb6d6e704b419841316423a95d9a.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/e18d054ccc5f4ac08dc65611fcf9479a.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/qqrdfohj/ldv-nz-my24-edeliver-3.pdf'
    },
    'Deliver 9 12-seater minibus': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/6e16da5c4d9c406ea0c153371c5853f3.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/757920d98d4e47cea2e4e8378581849b.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/1fd120f6a0ed4d93b34d43e1061fa5d6.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/fb20da62a4bc410b90bc6f5e0089b061.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/93a358c0672a43bc80bdb505c82cfb98.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/e7ca80aae2894540a2c610ff8a6c1573.svg'
        },
        brochureUrl: 'https://ldv.co.nz/brochure-page/'
    },
    'Deliver 9 14-seater minibus': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/6e16da5c4d9c406ea0c153371c5853f3.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/757920d98d4e47cea2e4e8378581849b.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/224f799e95e8405b9fb2cfd7d9e17a04.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/fb20da62a4bc410b90bc6f5e0089b061.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/93a358c0672a43bc80bdb505c82cfb98.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/8a8fe76e753841f8b8775e8bbd3aa751.svg'
        },
        brochureUrl: 'https://ldv.co.nz/brochure-page/'
    },
    'Deliver 9 Cab Chassis': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/44ff363f5be747c28e9a3bdbe2d9be7a.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/47c2a87034ae4f838a4a9c3a7ef06aaf.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/d444bf971649451db71caa884053bd0e.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/9d1793d1b5454fd3be473704ee3f304d.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/9a1eeaf2e8ea438a98b71ac003c4d600.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/598861fadfeb45de97ec03509899f398.svg'
        },
        brochureUrl: 'https://ldv.co.nz/brochure-page/'
    },
    'eDeliver 9 Cab Chassis': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/c32274470fc549ac8b7cdd9df344ec36.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/6d25c8116eff48728396bd31ea1af0e4.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/20cb86398b26455296b662183dc0afa8.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/41092a41f4a74b2fbb91f62586e709b2.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/8e416bb2ee2e425bb1077ce10df3cb72.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/3c11d8e3a8d34e96a6efdbbe3920323c.svg'
        },
        brochureUrl: 'https://ldv.co.nz/brochure-page/'
    },
    'Deliver 7': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/d55246c42cb6425fa9e956799641e3f4.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/2fa33ad307b548faaca25c3466edbd54.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/8de11a278e694cecb844f513c945f4d1.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/58e861e435d844f2b9328a96ffa1d643.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/886dbed7e9b2422f98026c4f173a5e07.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/ceac65cf35ee4474a63ea971a97950ba.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/ucolzk2b/fa-1261-05-ldv-nz-my24-d7-salespack-warranty.pdf'
    },
    'Terron 9': {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/aaf6c3d979a9487db9c2e0b773e56d98.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/c9bb1321371848969724e1fededac831.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/d8479f7a4b0a41ccb85bd50e1915c190.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/573ec6ef11fb42559fe6159d0b177299.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/03e7f917ff914cce9e8493f65a463905.svg',
            brochure: '//cdn.optimizely.com/img/15841360337/e96e6374241e4821b3fcb127053dafd7.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/qywlffbv/terron-9-v1.pdf'
    },
    D90: {
        desktop: {
            priceList: '//cdn.optimizely.com/img/15841360337/38b75e836e5340b0a1048867ad988e75.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/6ecdcdfb62ed451abb0f6f759be73316.png',
            brochure: '//cdn.optimizely.com/img/15841360337/5be62a749dbe4c048b48b91c480eb459.svg'
        },
        mobile: {
            priceList: '//cdn.optimizely.com/img/15841360337/2a1429f1bb9d4d05959da4be614886a7.svg',
            testDrive: '//cdn.optimizely.com/img/15841360337/b6f1f9190e554976b4beecffef817c33.png',
            brochure: '//cdn.optimizely.com/img/15841360337/9a24be734b78420dbb0c5d4a4c5b92c5.svg'
        },
        brochureUrl: 'https://ldv.co.nz/media/osfjsbc0/fad-2723-04-ldv-d90-brochure-5.pdf'
    }
};

// Build modal dynamically with responsive images
function buildModal(modelName) {
    const model = T60_MODELS[modelName];
    if (!model) return '';

    const isMobile = window.innerWidth <= 768;
    const images = isMobile ? model.mobile : model.desktop;

    return `
        <div class="t60-modal-overlay" id="t60-modal">
            <div class="t60-modal-container">
                <button class="t60-modal-close">&times;</button>
                <div class="t60-modal-content">
                    <h2 class="t60-modal-title">INTERESTED IN THE ${modelName.toUpperCase()}</h2>
                    <div class="t60-modal-divider"></div>
                    <p class="t60-modal-subtitle">Here are some options that can further assist you</p>

                    <div class="t60-modal-actions">
                        
                        <!-- Price List -->
                        <a href="https://ldv.co.nz/media/0isdvjsy/ldv-pricelist-august-25.pdf" target="_blank" class="t60-action-item small">
                            <div class="t60-action-image">
                                <img src="${images.priceList}" alt="Price List" />
                            </div>
                            <div class="t60-action-btn t60-price-btn">
                                <img src="//cdn.optimizely.com/img/15841360337/2998c12530b0478f85239cc982388a33.svg" alt="Price List Icon" />
                                <span>PRICE LIST</span>
                            </div>
                        </a>

                        <!-- Test Drive -->
                        <a href="https://ldv.co.nz/request-a-test-drive/" target="_blank" class="t60-action-item large">
                            <div class="t60-action-image">
                                <img src="${images.testDrive}" alt="Book a Test Drive" />
                            </div>
                            <div class="t60-action-btn t60-testdrive-btn large">
                                <img src="//cdn.optimizely.com/img/15841360337/790168dad33a4cb388bf1ebdae8e28dc.svg" alt="Book a Test Drive Icon" />
                                <span>BOOK A TEST DRIVE</span>
                            </div>
                        </a>

                        <!-- Brochure -->
                        <a href="${model.brochureUrl || 'https://ldv.co.nz/brochure-page/'}" target="_blank" class="t60-action-item small">
                            <div class="t60-action-image">
                                <img src="${images.brochure}" alt="Download Brochure" />
                            </div>
                            <div class="t60-action-btn t60-brochure-btn">
                                <img src="//cdn.optimizely.com/img/15841360337/e9c7afc859b84afb9a7db1d6d7564a72.svg" alt="Download Brochure Icon" />
                                <span>DOWNLOAD BROCHURE</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Config object
const T60_MODAL_CONFIG = {
    modalId: 't60-modal',
    sessionStorageKey: 't60ModalShown',
    selectors: {
        functionalitySection: '#Functionality .rte-Main-Grey-Dark-Color, .rte-Main-h2',
        gallerySection: '#Gallery .rte-Main-Grey-Dark-Color',
        functionalityText: 'FUNCTIONALITY'
    },
    timings: {
        showDelay: 100,
        closeDelay: 300
    },
    buildModal
};

export { T60_MODELS };
export default T60_MODAL_CONFIG;
