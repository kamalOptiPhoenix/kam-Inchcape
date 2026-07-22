/* eslint-disable no-tabs */

const ModelImages = {
    'New 408 Hybrid':
				'https://cdn.optimizely.com/img/15841360337/421762776999436191b848fba63086be.png',
    408:
				'https://cdn.optimizely.com/img/15841360337/a147bcbb08f943ac8e3ed03cf080cd8e.png',
    Expert:
				'https://cdn.optimizely.com/img/15841360337/75622d91515545be850f53e8f7101c11.png',
    'MY23 Expert Van':
				'https://cdn.optimizely.com/img/15841360337/ef7ff4035f52407c891a3072ba983fca.png',
    'MY25 Expert Van':
				'https://cdn.optimizely.com/img/15841360337/3e8e2be5c63c4af7899c0d5114d5fd8d.png',

    '308 Wagon':
				'https://cdn.optimizely.com/img/15841360337/7002a92f8bc84e939f848f6d571e5060.png',
    'E-Expert Van':
				'https://cdn.optimizely.com/img/15841360337/c97709804341400b8301a74324df5cc9.png',
    'Hybrid 2008':
				'https://cdn.optimizely.com/img/15841360337/b090585d3cb742aebb0278a00566ad03.png',
    'E-Partner Van':
				'https://cdn.optimizely.com/img/15841360337/857c7abc96024f7baeb43c819b9804ba.png',
    Partner:
				'https://cdn.optimizely.com/img/15841360337/ad108d9387634bdcbb18dec33ddf5dde.png',
    '2008 SUV':
				'https://cdn.optimizely.com/img/15841360337/2e9aba6f1d1e453a83363beac2281d9b.png',
    '308 Hatch Hybrid':
				'https://cdn.optimizely.com/img/15841360337/223d738097254803abd10fb1d5777ae5.png',
    '308 Hatch':
				'https://cdn.optimizely.com/img/15841360337/6b7f575178e84770a643f66c90ecdf46.png',
    'Boxer Van':
				'https://cdn.optimizely.com/img/15841360337/5859730be0d842b09225b2db4a550865.png',
    '5008 SUV':
				'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '5008 Hybrid':
				'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '3008 Hybrid':
				'https://cdn.optimizely.com/img/15841360337/d7f0770e93b04cc19a1d589aa2044b05.png',
    'MY23 E-Partner Van':
                'https://cdn.optimizely.com/img/15841360337/ddc0089da1dd47d4a7f8c336bca378bb.png',
    'New Boxer Van':
                'https://cdn.optimizely.com/img/15841360337/0a249412b72743409705abf48ee191a9.png'
};

const ModelImagesMobile = {
    'New 408 Hybrid':
    'https://cdn.optimizely.com/img/15841360337/421762776999436191b848fba63086be.png',
    408:
    'https://cdn.optimizely.com/img/15841360337/a147bcbb08f943ac8e3ed03cf080cd8e.png',
    Expert:
    'https://cdn.optimizely.com/img/15841360337/75622d91515545be850f53e8f7101c11.png',
    'MY23 Expert Van':
    'https://cdn.optimizely.com/img/15841360337/ef7ff4035f52407c891a3072ba983fca.png',
    'MY25 Expert Van':
    'https://cdn.optimizely.com/img/15841360337/3e8e2be5c63c4af7899c0d5114d5fd8d.png',

    '308 Wagon':
    'https://cdn.optimizely.com/img/15841360337/7002a92f8bc84e939f848f6d571e5060.png',
    'E-Expert Van':
    'https://cdn.optimizely.com/img/15841360337/c97709804341400b8301a74324df5cc9.png',
    'Hybrid 2008':
    'https://cdn.optimizely.com/img/15841360337/b090585d3cb742aebb0278a00566ad03.png',
    'E-Partner Van':
    'https://cdn.optimizely.com/img/15841360337/857c7abc96024f7baeb43c819b9804ba.png',
    Partner:
    'https://cdn.optimizely.com/img/15841360337/ad108d9387634bdcbb18dec33ddf5dde.png',
    '2008 SUV':
    'https://cdn.optimizely.com/img/15841360337/2e9aba6f1d1e453a83363beac2281d9b.png',
    '308 Hatch Hybrid':
    'https://cdn.optimizely.com/img/15841360337/223d738097254803abd10fb1d5777ae5.png',
    '308 Hatch':
    'https://cdn.optimizely.com/img/15841360337/6b7f575178e84770a643f66c90ecdf46.png',
    'Boxer Van':
    'https://cdn.optimizely.com/img/15841360337/5859730be0d842b09225b2db4a550865.png',
    '5008 SUV':
    'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '5008 Hybrid':
    'https://cdn.optimizely.com/img/15841360337/c6f1d3403313406fb38105e7843bec66.png',
    '3008 Hybrid':
    'https://cdn.optimizely.com/img/15841360337/d7f0770e93b04cc19a1d589aa2044b05.png',
    'MY23 E-Partner Van':
    'https://cdn.optimizely.com/img/15841360337/da3e13b4064f4dc789a4a1a5aa53463f.png',
    'New Boxer Van':
    'https://cdn.optimizely.com/img/15841360337/67e86320054e4f918a3b1a147666a4e1.png'
};

const fallbackImageUrl = 'https://cdn.optimizely.com/img/15841360337/2e9aba6f1d1e453a83363beac2281d9b.png';

function kamT56GetImageUrl(modelName) {
    if (window.innerWidth < 768) {
        if (ModelImagesMobile[modelName]) return ModelImagesMobile[modelName];
    }
    if (ModelImages[modelName]) return ModelImages[modelName];
    const imagesObj = window.innerWidth < 768 ? ModelImagesMobile : ModelImages;
    let imageKey = Object.keys(imagesObj).find(
        key => key.toLowerCase() === modelName.toLowerCase()
    );
    if (!imageKey) {
        imageKey = Object.keys(imagesObj).find(
            key => key.toLowerCase().includes(modelName.toLowerCase())
        );
    }
    if (window.innerWidth < 768 && imageKey && ModelImagesMobile[imageKey]) {
        return ModelImagesMobile[imageKey];
    }
    return imageKey ? ModelImages[imageKey] : fallbackImageUrl;
}

export default kamT56GetImageUrl;
