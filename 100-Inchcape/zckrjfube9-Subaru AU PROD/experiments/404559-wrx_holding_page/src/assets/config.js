const assets = {
    owners: '//cdn.optimizely.com/img/15841360337/1ce462c13a2341c6a7a66e083601be2b.jpg',
    used: '//cdn.optimizely.com/img/15841360337/51e6b463300844949612c8db471f610d.png'
};

const awardsSliderImages = [
    '//cdn.optimizely.com/img/15841360337/72b0b387cdb54779847f1abe0e8b1074.jpg',
    '//cdn.optimizely.com/img/15841360337/9e3a7f4bc46d4bbb8a1c15b181aba8d2.jpg',
    '//cdn.optimizely.com/img/15841360337/73952fa697304147ad323511693eb709.jpg',
    '//cdn.optimizely.com/img/15841360337/52db21f3f09e4aeca0f8c990499e96f5.jpg',
    '//cdn.optimizely.com/img/15841360337/e1161ea6f61d4d57b92414d20cc81e43.jpg',
    '//cdn.optimizely.com/img/15841360337/76dec8d198134838b564d7d6a279731f.jpg',
    '//cdn.optimizely.com/img/15841360337/e88e6727012f47e2977ef5641ea6c4f2.jpg',
    '//cdn.optimizely.com/img/15841360337/04d87c78659c47ebb1d97eb7fdc3577e.jpg',
    '//cdn.optimizely.com/img/15841360337/389bd277d97b49f89269a959ed5ba7e0.jpg'
];

const awardsYears = ['1993', '1995', '1996', '1997', '2001', '2003', '2004', '2005', '2006'];

const genImages = {
    gen1: [
        '//cdn.optimizely.com/img/15841360337/baf0213052804b598c47c9fdb6a5804b.jpg',
        '//cdn.optimizely.com/img/15841360337/bae0afcd6a4c49349b355d78973f0fd6.jpg',
        '//cdn.optimizely.com/img/15841360337/3297038456d044c385d535a60da36256.jpg'
    ],
    gen2: [
        '//cdn.optimizely.com/img/15841360337/3540d2e645a246d79f69e1e59d38f63e.jpg',
        '//cdn.optimizely.com/img/15841360337/ac925b7d0edf404599d25d9f44c60e07.jpg',
        '//cdn.optimizely.com/img/15841360337/0bbd72cb73544c8988a4dcc6387ba097.jpg'
    ],
    gen3: [
        '//cdn.optimizely.com/img/15841360337/9f3fff459e944a478a7738c482ba78fb.jpg',
        '//cdn.optimizely.com/img/15841360337/2c00beb402e348c4a82ea2d2633ed6d1.jpg'
    ],
    gen4: [
        '//cdn.optimizely.com/img/15841360337/a1dcd196d9c04a47a7e2dc2fa4c2d5ea.jpg',
        '//cdn.optimizely.com/img/15841360337/60544d5ccc9a451cb62698e9d3568adf.jpg',
        '//cdn.optimizely.com/img/15841360337/eb7e893d16ce43fdae30fc4cd1f12af2.jpg'
    ]
};

const bodyHtml = `
<div id="wrx-body" class="wrx-body modelPage"></div>
`;

const heroHtml = `
<section class="wrx-hero modelHeroImg" aria-label="Subaru WRX STI"></section>
`;

const introHtml = `
<section class="modelIntro wrx-intro">
  <div id="intro" class="intro">
    <div class="intro__container container">
      <h1 class="h2">We farewell a legend as a new era of performance exhilaration looms on the horizon</h1>
      <div class="intro__content">
        <div class="intro__para intro__para--one">
          <p>The ultimate in turbocharged performance, the Subaru WRX STI has been delivering adrenaline pumping thrills to driving enthusiasts and racing professionals alike for over 25 years.</p>
          <p>Powered by the legendary turbo EJ sports Boxer engine, the Subaru WRX STI is a car for drivers who live for the road and is engineered to make every single moment an unforgettable experience.</p>
        </div>
        <div class="intro__para intro__para--two intro__hidden-text-1 nr-hidden">
          <p>With production of the EJ25 engine ending in 2020, we have unfortunately had to stop accepting orders for the current generation Subaru WRX STI.</p>
          <p>As we await the next thrilling chapter in the Subaru WRX STI story, let’s take a journey through the past to revisit the development of a legend while celebrating our fantastic Subaru WRX STI owner family.</p>
        </div>
        <div id="intro-toggle__one" class="intro__toggle">
          <div class="intro__toggle-button" role="button" tabindex="0">
            <p>View More</p>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="intro-divider"></div>
    <div class="intro__container container">
      <h2 class="h2">A storied history that’s only just the beginning</h2>
      <div class="intro__content">
        <div class="intro__para intro__para--one">
          <p>The Subaru WRX STI derives its variant name from Subaru Tecnica International – STI – the performance division of Subaru Corporation in Japan. Founded in 1988, Subaru Tecnica International’s mission is to deliver the world’s most enjoyable driving experience, by fine tuning the synergy between man and machine.</p>
          <p>STI quickly made a bold statement by breaking the 100,000km world speed record, driving a Legacy (Liberty) at a blistering average speed of 223km/h for 447 hours, 44 minutes and 9.9 seconds, continuously (this record stood until Apr 2005).</p>
          <p class="intro__hidden-text-2 nr-hidden">It is credited with a golden era of Australian and world rallying success that contributed to the ‘Rex family’s loyal fan base, which has seen both WRX and WRX STI achieve remarkable sales success in Australia.</p>
        </div>
        <div class="intro__para intro__para--two intro__hidden-text-2 nr-hidden">
          <p>Following the enormous appeal of the first generation Impreza WRX, which went on sale in Australia in February 1994, the STI variant took the turbocharged fun factor to an even greater level. </p>
          <p>Performance car enthusiast appetites went into overdrive in October 1998, when the Impreza WRX 22B STI was displayed at Sydney Motor Show. With only 425 available worldwide, just five were imported to Australia - and one of those remains in Subaru Australia’s Museum collection to this day.</p>
          <p>The era of the large bonnet scoop and rear wing had arrived.</p>
        </div>
        <div id="intro-toggle__two" class="intro__toggle">
          <div class="intro__toggle-button" role="button" tabindex="0">
            <p>View More</p>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const ownersHtml = `
<section id="wrx-owners" class="wrx-owners">
  <div>
    <section class="highlight">
      <div class="highlight__inner">
        <div class="highlight__copy">
          <h2 class="highlight__title">Caring for your Subaru WRX STI</h2>
          <p>If you own a new or used Subaru WRX you’re already in the club – with full access to a range of benefits and peace of mind the moment you drive out of a showroom.</p>
          <p>Whether determining service pricing, seeking warranty information or joining our roadside assistance program, visit the Subaru Owners section.</p>
          <div class="highlight__link">
            <a class="btn btn--primary" href="/owners">Visit Subaru Owners</a>
            <a class="btn btn--secondary" href="https://www.subaru.com.au/service-booking">Book a Service</a>
          </div>
        </div>
        <div class="highlight__image" style="background-image: url(${assets.owners});"></div>
      </div>
    </section>
  </div>
</section>
`;

const usedCarsHtml = `
<section id="wrx-used" class="wrx-used">
  <div>
    <section class="highlight">
      <div class="highlight__inner">
        <div class="highlight__copy">
          <h2 class="highlight__title">Certified Subaru used cars</h2>
          <p>Have your heart set on a Subaru WRX STI? Click below to browse our current Subaru certified Used cars, Subaru demonstrators and used vehicles.</p>
          <a class="btn btn--primary" href="https://www.subaru.com.au/used/cars/Subaru/WRX">Browse used cars</a>
        </div>
        <div class="highlight__image" style="background-image: url(${assets.used});"></div>
      </div>
    </section>
  </div>
</section>
`;

const sti22bHtml = `
<div id="sti22b" class="sti22b">
  <div class="sti22b__container container">
    <div class="sti22b__inner">
      <div class="sti22b__bg"></div>
      <div class="sti22b__content">
        <h2>1998 Impreza WRX STI 22B</h2>
        <p>Perhaps the most iconic WRX STI of all, the Impreza WRX STI 22B was a special edition to commemorate Subaru’s 40th anniversary. Featuring a larger 2.2-litre engine and widebody based on the WRC winning rally car, only 424 examples were produced (24 for export outside of Japan, 5 for Australia), making it extremely desirable.</p>
      </div>
      <div class="sti22b__image"></div>
    </div>
  </div>
</div>
`;

const reviewsHtml = `
<div class="wrx-reviews">
  <div class="wrx-reviews__container container">
    <h2 class="wrx-reviews__title">Respected amongst experts</h2>
    <div class="wrx-reviews__inner splide">
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide">
            <p class="wrx-reviews__review">A modern classic. <a href="https://www.drive.com.au/reviews/2020-subaru-wrx-sti-spec-r/">Read full article</a></p>
            <div class="wrx-reviews__bottom-section">
              <p class="wrx-reviews__name">James Ward, Caradvice</p>
              <p class="wrx-reviews__date">July 26, 2020</p>
            </div>
          </li>
          <li class="splide__slide">
            <p class="wrx-reviews__review">WRX STi is such a pure driving experience that only real drivers need apply. It’s a hoot to drive it like you mean it - very satisfying - but hard work for ordinary driving in traffic. Classic performance car paradox. <a href="https://autoexpert.com.au/subaru-wrx">Read full article</a></p>
            <div class="wrx-reviews__bottom-section">
              <p class="wrx-reviews__name">John Cadogan, Autoexpert</p>
              <p class="wrx-reviews__date">November 27, 2017</p>
            </div>
          </li>
          <li class="splide__slide">
            <p class="wrx-reviews__review">The cabin’s nice, but it’s all about how the STI grips and goes, and I’m glad to say this thing still grips like a limpet and goes like a scalded cat. <a href="https://practicalmotoring.com.au/car-reviews/2018-subaru-wrx-sti-spec-r-review/">Read full article</a></p>
            <div class="wrx-reviews__bottom-section">
              <p class="wrx-reviews__name">Isaac Bober, Practical Motoring</p>
              <p class="wrx-reviews__date">September 7, 2017</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;

const ryiHtml = `
<div class="ryi">
  <div class="ryi__container container">
    <div class="ryi__inner">
      <div class="ryi__image"></div>
      <div class="ryi__content">
        <h2>Register your interest</h2>
        <p>Be the first to hear about the next chapter in the Subaru WRX STI story. Register your interest and we’ll keep you updated with the latest news.</p>
        <a class="btn btn--primary" href="https://www.subaru.com.au/wrx-and-wrx-sti/">Register your interest</a>
      </div>
    </div>
  </div>
</div>
`;

function htmlParser(html) {
    return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
}

function loadSplideAssets() {
    function loadjscssfile(filename, filetype) {
        let node;
        if (filetype === 'js') {
            node = document.createElement('script');
            node.setAttribute('type', 'text/javascript');
            node.setAttribute('src', filename);
        } else if (filetype === 'css') {
            node = document.createElement('link');
            node.setAttribute('rel', 'stylesheet');
            node.setAttribute('type', 'text/css');
            node.setAttribute('href', filename);
        }
        if (node) {
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    loadjscssfile(
        'https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js',
        'js'
    );
    loadjscssfile(
        'https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css',
        'css'
    );
}

function waitForSplide(callback) {
    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.Splide === 'function',
        callback
    );
}

function bindIntroToggles(root) {
    let introOneIsHidden = true;
    let introTwoIsHidden = true;

    function bindToggle(toggleId, hiddenSelector, isSecondToggle) {
        const button = root.querySelector(`#${toggleId} .intro__toggle-button`);
        if (!button) return;

        function toggle() {
            if (isSecondToggle) {
                if (introTwoIsHidden) {
                    button.querySelector('p').textContent = 'View Less';
                    button.querySelector('span').classList.add('rotate');
                    root.querySelectorAll(hiddenSelector).forEach((text) => {
                        text.classList.remove('nr-hidden');
                    });
                    introTwoIsHidden = false;
                } else {
                    button.querySelector('p').textContent = 'View More';
                    button.querySelector('span').classList.remove('rotate');
                    root.querySelectorAll(hiddenSelector).forEach((text) => {
                        text.classList.add('nr-hidden');
                    });
                    introTwoIsHidden = true;
                }
            } else if (introOneIsHidden) {
                button.querySelector('p').textContent = 'View Less';
                button.querySelector('span').classList.add('rotate');
                root.querySelector(hiddenSelector).classList.remove('nr-hidden');
                introOneIsHidden = false;
            } else {
                button.querySelector('p').textContent = 'View More';
                button.querySelector('span').classList.remove('rotate');
                root.querySelector(hiddenSelector).classList.add('nr-hidden');
                introOneIsHidden = true;
            }
        }

        button.addEventListener('click', toggle);
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    }

    bindToggle('intro-toggle__one', '.intro__hidden-text-1', false);
    bindToggle('intro-toggle__two', '.intro__hidden-text-2', true);
}

function awardsHtml() {
    const slides = awardsSliderImages.map((src, index) => `
      <li class="splide__slide">
        <div class="slider-image-container splide__slide__container">
          <img src="${src}" alt="">
        </div>
        <p>${awardsYears[index]}</p>
      </li>
    `).join('');

    return `
<div id="wrx-awards" class="wrx-awards">
  <div class="wrx-awards__image"></div>
  <div class="wrx-awards__content container">
    <h2 class="wrx-awards__title">Subaru WRX STI Australian Rally Championship titles</h2>
    <div class="wrx-awards__awards">
      <div class="wrx-awards__awards-col">
        <p><b>1996</b> - Possum Bourne and Craig Vincent</p>
        <p><b>1997</b> - Possum Bourne and Craig Vincent</p>
        <p><b>1998</b> - Possum Bourne and Craig Vincent</p>
        <p><b>1999</b> - Possum Bourne and Craig Vincent</p>
        <p><b>2000</b> - Possum Bourne and Mark Stacey</p>
        <p><b>2001</b> - Possum Bourne and Craig Vincent</p>
      </div>
      <div class="wrx-awards__awards-col">
        <p><b>2002</b> - Possum Bourne and Mark Stacey</p>
        <p><b>2003</b> - Cody Crocker and Greg Foletta</p>
        <p><b>2004</b> - Cody Crocker and Greg Foletta</p>
        <p><b>2005</b> - Cody Crocker and Dale Moscatt</p>
        <p><b>2016</b> - Molly Taylor and Bill Hayes</p>
      </div>
    </div>
    <div class="wrx-awards__timeline splide">
      <div class="splide__track">
        <ul class="splide__list">${slides}</ul>
      </div>
    </div>
  </div>
</div>
`;
}

function bindAwardsCarousel(root) {
    waitForSplide(() => {
        const timeline = root.querySelector('.wrx-awards__timeline');
        if (!timeline || timeline.dataset.splideMounted) return;
        timeline.dataset.splideMounted = 'true';

        new window.Splide(timeline, {
            type: 'slide',
            perPage: 4,
            perMove: 1,
            gap: '25px',
            rewind: true,
            pagination: false,
            breakpoints: {
                991: { perPage: 3 },
                767: { perPage: 2, gap: '20px' },
                500: { perPage: 1, padding: '50px', gap: '20px' }
            }
        }).mount();
    });
}

function genImagesHtml(images) {
    return images.map((src) => `<div><img src="${src}" alt="" /></div>`).join('');
}

function generationsHtml() {
    return `
<div id="gen" class="gen">
  <div class="gen__container container">
    <div class="gen__inner">
      <h2 class="gen__title">Generations of Subaru WRX STI</h2>
      <div class="gen__generations">
        <div class="gen__generations-label active" data-gen="gen1" role="button" tabindex="0">
          <h3>Gen 1</h3><p>1998 - 2001</p>
        </div>
        <div class="gen__generations-label" data-gen="gen2" role="button" tabindex="0">
          <h3>Gen 2</h3><p>2001 - 2007</p>
        </div>
        <div class="gen__generations-label" data-gen="gen3" role="button" tabindex="0">
          <h3>Gen 3</h3><p>2008 - 2014</p>
        </div>
        <div class="gen__generations-label" data-gen="gen4" role="button" tabindex="0">
          <h3>Gen 4</h3><p>2015 - 2020</p>
        </div>
      </div>
      <div class="gen__content">
        <div id="gen1" class="gen__gen-content active">
          <p>The sheer level of interest in Impreza WRX STI justified a one-off production run of 400 limited edition two-door coupes for Australia in January 1999, which was virtually an instant sell-out. Producing 206 Kilowatts of power, it was only available in the signature WR blue, or white, with gold 16-inch five-spoke alloy wheels and STI performance upgrades.</p>
          <p>That prompted the decision to follow-up with 400 four-door Impreza WRX STI sedans in October 1999 – with an equally hungry response from buyers. It also produced 206kW, was available in blue steel mica or white, with gold 16-inch six-spoke alloys, suede seat inserts and STI performance upgrades.</p>
          <div class="gen__images">${genImagesHtml(genImages.gen1)}</div>
        </div>
        <div id="gen2" class="gen__gen-content">
          <p>Convinced that there was a place for the STI variant to become an ongoing part of the Impreza WRX range, Subaru Australia committed to the second generation and it launched as an ongoing variant in December 2001.</p>
          <div class="gen__images">${genImagesHtml(genImages.gen2)}</div>
        </div>
        <div id="gen3" class="gen__gen-content">
          <p>Third generation Subaru WRX STI, which launched in February, 2008, offered a second choice in the range, with both entry-level and spec.R variants.</p>
          <div class="gen__images">${genImagesHtml(genImages.gen3)}</div>
        </div>
        <div id="gen4" class="gen__gen-content">
          <p>Most recently in its fourth generation, which launched in April 2014, Subaru WRX STI for the first time offered the eye-catching rear spoiler as a delete option, combined with its highest power output of 221 kilowatts. On launch, it was also subtly distinguished from predecessors by not carrying the Impreza name – an acknowledgment of separate development paths for Impreza and WRX variant chassis’ and technology going forward.</p>
          <div class="gen__images">${genImagesHtml(genImages.gen4)}</div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

function bindGenerations(root) {
    root.querySelectorAll('.gen__generations-label').forEach((tab) => {
        function selectTab() {
            const selectedGen = tab.getAttribute('data-gen');
            if (tab.classList.contains('active')) return;

            root.querySelector('.gen__generations-label.active').classList.remove('active');
            tab.classList.add('active');
            root.querySelector('.gen__gen-content.active').classList.remove('active');
            root.querySelector(`#${selectedGen}`).classList.add('active');
        }

        tab.addEventListener('click', selectTab);
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectTab();
            }
        });
    });
}

function bindReviewsCarousel(root) {
    waitForSplide(() => {
        const reviews = root.querySelector('.wrx-reviews__inner');
        if (!reviews || reviews.dataset.splideMounted) return;
        reviews.dataset.splideMounted = 'true';

        new window.Splide(reviews, {
            type: 'slide',
            perPage: 3,
            perMove: 1,
            gap: '25px',
            rewind: true,
            pagination: false,
            arrows: false,
            breakpoints: {
                767: { perPage: 2, pagination: true },
                500: {
                    perPage: 1, padding: '20px', gap: '5px', pagination: true
                }
            }
        }).mount();
    });
}

function buildPage() {
    const footer = document.getElementById('clientFooter');
    if (!footer || document.getElementById('wrx-body')) {
        return;
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    console.log('%c Building Subaru WRX STI holding page...', 'color: #007acc; background: #fff');
    loadSplideAssets();
    document.body.classList.add('wrx-holding-page');

    const page = htmlParser(bodyHtml);
    footer.parentNode.insertBefore(page, footer);

    page.insertAdjacentHTML('beforeend', heroHtml);
    page.insertAdjacentHTML('beforeend', introHtml);
    bindIntroToggles(page);

    const awardsNode = htmlParser(awardsHtml());
    page.appendChild(awardsNode);
    bindAwardsCarousel(page);

    const generationsNode = htmlParser(generationsHtml());
    page.appendChild(generationsNode);
    bindGenerations(page);

    page.insertAdjacentHTML('beforeend', sti22bHtml);
    page.insertAdjacentHTML('beforeend', ownersHtml);
    page.insertAdjacentHTML('beforeend', usedCarsHtml);
    page.insertAdjacentHTML('beforeend', reviewsHtml);
    bindReviewsCarousel(page);
    page.insertAdjacentHTML('beforeend', ryiHtml);
}

const configHTML = {
    buildPage
};

export default configHTML;
