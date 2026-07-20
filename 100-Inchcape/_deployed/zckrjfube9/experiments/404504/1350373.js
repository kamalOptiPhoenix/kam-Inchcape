"use strict";

(function () {
  const bodyHtml = `
<div id="liberty-body" class="liberty-body modelPage"></div>
`;
  const heroHtml = `
<section class="liberty-hero">
  <picture class="liberty-hero__picture">
    <source media="(min-width: 1440px)" srcset="//cdn.optimizely.com/img/15841360337/972109e07b7640a096806e0488389103.jpg">
    <source media="(min-width: 992px)" srcset="//cdn.optimizely.com/img/15841360337/f8587b1010634f9895807caafb912e3e.jpg">
    <source media="(min-width: 768px)" srcset="//cdn.optimizely.com/img/15841360337/900e0b55e7834bc09e2200bc3f59e953.jpg">
    <img class="liberty-hero__img" src="//cdn.optimizely.com/img/15841360337/7813c6e00b734b6d8a3b291f31e56578.jpg" alt="Subaru Liberty">
  </picture>
</section>
`;
  const introHtml = `
<section class="modelIntro liberty-intro">
  <div class="container">
    <div class="modelIntro__content">
      <h1>Dear Liberty</h1>
      <div class="liberty-intro__content">
        <div class="liberty-intro__para liberty-intro__para--one">
          <p>You arrived in 1989 like a breath of fresh air on a sultry summer’s day. You set new standards, not just for Subaru but for the medium sized sedan market.</p>
          <p>Families loved your smooth ride; the choice of wagon or sedan was hard as your wagons drove like sedans and your sedans had the space of wagons.</p>
          <p>And then you added the turbo charged Liberty GT models. They were “Grand Tourers” in every sense of the word, winning Rallies and hearts wherever you went and establishing a fine pedigree for your offspring, the incredible WRX.</p>
          <p>In fact, you started a whole new family with your descendants as numerous as the stars in the Subaru constellation…Impreza, WRX, Forester, Outback, and Tribeca. How many children have been kept safe by you, young adults learnt to drive with you and new families taken their first holiday with you?</p>
          <p>So many memories and so many achievements. Like winning Subaru’s first ever World Rally Event in New Zealand, winning Subaru’s first Wheels Car of the Year Award, winning Subaru’s first Japanese Car of the Year Award and so many “Australia’s Best Medium car” Awards.</p>
          <p>And not just awards, but hearts and minds were also won. You showed what a Subaru can be and you never looked back, getting better and better with each of your six generations, while spawning new models which in turn grew to become family favourites.</p>
          <p>With a Subaru Liberty, everyone knew they were in safe hands.</p>
        </div>
        <div class="liberty-intro__para liberty-intro__para--two nr-hidden">
          <p>But times change and so your customers now look to different models to meet their needs, models like Impreza sedan with its refined driving experience and Liberty like pedigree.</p>
          <p>Outback, having been born from the Liberty Wagon in 1996, can meet the needs of growing families with large cabins and cargo areas, sedan like driving feel and the freedom of abundant ground clearance and Subaru’s famous Symmetrical All-Wheel Drive.</p>
          <p>Your groundbreaking Symmetrical All-Wheel Drive system is also used in WRX, Forester and XV so you’re never really far away.</p>
          <p>In fact, given your legendary reliability, extraordinary build quality and wonderful driving fun, we’ll be seeing you on Australia’s roads for years to come as your owners continue to enjoy their Subaru Liberty.</p>
          <p>As we said when we first met you: “One drive and you’ll know why we called it Liberty.”</p>
        </div>
        <div class="liberty-intro__toggle">
          <div class="liberty-intro__toggle-button" role="button" tabindex="0">
            <p>View More</p>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
  const galleryHtml = `
<div id="liberty-gallery" class="liberty-gallery spacing-bottom">
  <div class="container">
    <h2 class="h2 text-center">Liberty Gallery</h2>
    <section class="fullGallery">
      <div class="fullGallery__row fullGallery__row--odd">
        <div class="fullGallery__item" data-model="Subaru Liberty - 5th Generation"><div class="fullGallery__image" style="background-image: url('https://cdn.optimizely.com/img/15841360337/bfb5d43bec9a488ebd3c642b36ac2edc.jpg');"></div></div>
        <div class="fullGallery__item" data-model="Subaru Liberty - 4th Generation"><div class="fullGallery__image" style="background-image: url('https://cdn.optimizely.com/img/15841360337/7f469a1930b64a8ea040b4c2d426e73f.jpg');"></div></div>
        <div class="fullGallery__item" data-model="Subaru Liberty - 2nd Generation"><div class="fullGallery__image" style="background-image: url('https://cdn.optimizely.com/img/15841360337/ed28a67a82d943ca80f317ac91825b7b.jpg');"></div></div>
      </div>
      <div class="fullGallery__row fullGallery__row--even nr-hidden">
        <div class="fullGallery__item" data-model="Subaru Liberty - 1st Generation"><div class="fullGallery__image" style="background-image: url('https://cdn.optimizely.com/img/15841360337/4b3b062ae019442a9b8c8d3dc908b693.jpg');"></div></div>
        <div class="fullGallery__item" data-model="Subaru Liberty - 3rd Generation"><div class="fullGallery__image" style="background-image: url('https://cdn.optimizely.com/img/15841360337/c423a200241c41a6b3ee2022d4b8a465.jpg');"></div></div>
        <div class="fullGallery__item" data-model="Subaru Liberty - 6th Generation"><div class="fullGallery__image" style="background-image: url('https://cdn.optimizely.com/img/15841360337/021b3d3594fe4055af33b37ddf270a37.jpg');"></div></div>
      </div>
      <p class="text-center"><a class="btn btn--secondary fullGallery__btn" role="button" tabindex="0">Load more</a></p>
    </section>
  </div>
  <section class="mediaModal">
    <div class="mediaModal__wrap">
      <div id="nr-gallery-close" class="mediaModal__closeBtn" role="button" tabindex="0">Close Modal</div>
      <div id="nr-gallery-img" class="mediaModal__imgDiv">
        <img class="mediaModal__img" src="" alt="">
      </div>
      <div class="mediaModal__copy"><h3 id="nr-gallery-title" class="h3 mediaModal__title"></h3></div>
    </div>
  </section>
</div>
`;
  const modelTileHtml = `
<div class="model-tile">
  <div class="model-tile__background"></div>
  <div class="model-tile__inner">
    <div class="model-tile__image"><img src="" alt="" /></div>
    <div class="model-tile__content">
      <div class="model-tile__model-logo"><img src="" alt="" /></div>
      <div class="model-tile__desc"></div>
      <div class="model-tile__text">
        <div class="model-tile__bullets"><ul></ul></div>
        <div class="model-tile__cta"><a class="btn btn--primary"></a></div>
      </div>
      <div class="model-tile__actions">
        <div class="model-tile__byo"><a>Build your own</a></div>
        <div class="model-tile__brochure"><a>Download brochure</a></div>
        <div class="model-tile__test-drive"><a>Request a test drive</a></div>
      </div>
    </div>
  </div>
</div>
`;
  const sedanHtml = `
<div class="models-section">
  <div id="model-sedan" class="models-section__model model-sedan container">
    <div class="panel-title">
      <h2 class="panel-title__category">Sedans</h2>
      <p class="panel-title__desc">Missing Subaru Liberty’s sporty silhouette? The compact Subaru Impreza or aggressive Subaru WRX are ready to satisfy.</p>
    </div>
    <div class="models-container"></div>
  </div>
</div>
`;
  const suvHtml = `
<div class="models-section">
  <div id="model-suv" class="models-section__model model-suv container">
    <div class="panel-title panel-title--suv">
      <h2 class="panel-title__category">SUV</h2>
      <p class="panel-title__desc">Looking for the same practicality of the Subaru Liberty wagon? Our SUV range includes models that deliver this in spades.</p>
    </div>
    <div class="models-container"></div>
  </div>
</div>
`;
  const ownersHtml = `
<section id="liberty-owners" class="liberty-owners">
  <div>
    <section class="highlight">
      <div class="highlight__inner">
        <div class="highlight__copy">
          <h2 class="highlight__title">Caring for your Subaru Liberty</h2>
          <p>If you own a new or used Subaru Liberty you’re already in the club – with full access to a range of benefits and peace of mind the moment you drive out of a showroom. Whether determining service pricing, seeking warranty information or joining our roadside assistance program, visit the Subaru Owners section.</p>
          <div class="highlight__link">
            <a class="btn btn--primary" href="/owners">Visit Subaru Owners</a>
            <a class="btn btn--secondary" href="https://www.subaru.com.au/service-booking">Book a Service</a>
          </div>
        </div>
        <div class="highlight__image" style="background-image: url(https://cdn.optimizely.com/img/15841360337/09729be3a03d42429a367e5662421f82.png);"></div>
      </div>
    </section>
  </div>
</section>
`;
  const usedCarsHtml = `
<section id="liberty-used" class="liberty-used">
  <div>
    <section class="highlight">
      <div class="highlight__inner">
        <div class="highlight__copy">
          <h2 class="highlight__title">Certified Subaru used cars</h2>
          <p>Have your heart set on a Subaru Liberty? Click below to browse our current Subaru certified Used cars, Subaru demonstrators and used vehicles.</p>
          <a class="btn btn--primary" href="https://www.subaru.com.au/used/cars?query=(C.Make.Subaru._.Model.Liberty.)">Browse Subaru Liberty used cars</a>
        </div>
        <div class="highlight__image" style="background-image: url(https://cdn.optimizely.com/img/15841360337/4392f73059a540e6906845cec53606a6.png);"></div>
      </div>
    </section>
  </div>
</section>
`;
  const awardsHtml = `
<div id="liberty-awards" class="liberty-awards container">
  <h2>Awards &amp; Accolades</h2>
  <div class="liberty-awards__images">
    <div><img src="//cdn.optimizely.com/img/15841360337/f0512e7fcf7844a6b2320ee6bc846cec.png" alt="Best Car Award" /></div>
    <div><img src="//cdn.optimizely.com/img/15841360337/6f7a824276164dbbb3dcabb9eaa6953e.png" alt="Engine of the Year" /></div>
    <div><img src="//cdn.optimizely.com/img/15841360337/1be45c49120f4253aaebe12b57ff1a48.png" alt="Ancap Safety" /></div>
  </div>
  <div class="liberty-awards__awards">
    <p><b>2015</b> - Australasian New Car Assessment Program 5 star ANCAP safety rating</p>
    <p><b>2009</b> - Australia’s Best Cars, Prestige Car, Liberty 3.6R Premium</p>
    <p>- Australasian New Car Assessment Program 5 star ANCAP safety rating</p>
    <p><b>2008</b> - International Engine of the Year Award, 2.0 - 2.5-litre class, (2.5-litre turbocharged horizontally-opposed Boxer engine)</p>
    <p><b>2006</b> - International Engine of the Year Award, 2.0 - 2.5-litre class, (2.5-litre turbocharged horizontally-opposed Boxer engine)</p>
  </div>
  <div class="liberty-awards__awards liberty-awards__section-two nr-hidden">
    <p><b>2005</b> - Australia’s Best Cars, Best Luxury Car under $57,000, Subaru Liberty 3.0R</p>
    <p><b>2004</b> - Australia’s Best Cars, Best Mid-Size Car over $28,000, Subaru Liberty 2.5i</p>
    <p><b>2001</b> - Australia’s Best Cars, Best Mid-Size Car over $25,000, Subaru Liberty RX</p>
    <p><b>2000</b> - Australia’s Best Cars, Best Mid-Size Car over $25,000, Subaru Liberty RX</p>
    <p>- Which Car, Gold Medal, Medium Car Category, Subaru Liberty</p>
    <p>- Autocar, New Zealand, Car of the Year, Subaru Liberty</p>
    <p>- Autocar, New Zealand, Best Medium Car, Subaru Liberty</p>
    <p>- J.D. Power and Associates/Top Gear U.K. Customer Satisfaction Study,Gold Award – Subaru Liberty</p>
    <p><b>1999</b> - NRMA/RACV, Best Mid-Size Car – Subaru Liberty RX</p>
    <p><b>1998</b> - Wheels Magazine, Wheels Car of the Year – Subaru Liberty Wagon</p>
    <p><b>1994</b> - Wheels Magazine, Car of the Year – Subaru Liberty</p>
  </div>
  <div class="liberty-awards__toggle">
    <div class="liberty-awards__toggle-button" role="button" tabindex="0">
      <p>View More</p>
      <span></span>
    </div>
  </div>
</div>
`;
  const modelData = {
    wrx: {
      name: 'WRX',
      image: '//cdn.optimizely.com/img/15841360337/90d4c182bc8f42808bcb91ecb74ab412.png',
      logo: '//cdn.optimizely.com/img/15841360337/11853c7f8b00474ea18fe8e8e98f95d0.png',
      desc: 'Built for pure driving excitement the Subaru WRX delivers raw power and attitude in a distinctively racing-style sports body. With high performance handling and intelligent driver assist features, the WRX has the very latest protective, preventative and predicative safety.',
      bullets: ['2.0-litre injected, turbocharged horizontally-opposed Boxer 4-cylinder, petrol engine', '197kW @ 5600rpm', '350Nm @ 2400-5200rpm'],
      ctaLink: 'https://www.subaru.com.au/wrx-and-wrx-sti/',
      byoLink: 'https://www.subaru.com.au/configure',
      brochureLink: 'https://www.subaru.com.au/brochure-download?model=wrx%20or%20wrx%20sti',
      testDriveLink: 'https://www.subaru.com.au/book-test-drive?model=wrx%20or%20wrx%20sti'
    },
    impreza: {
      name: 'Impreza',
      image: '//cdn.optimizely.com/img/15841360337/d60aa16d40fc4ce88cb850a698e53443.png',
      logo: '//cdn.optimizely.com/img/15841360337/63db74cf5ab3460ab0a45e6e45a80543.svg',
      desc: 'Spending time with friends is one of the best things about life. That’s why you’ll love the Subaru Impreza and your friends will too. Loaded from head to toe with advanced driving and entertainment technology, it’s fun for the driver and backseat ones as well.',
      bullets: ['2.0-litre horizontally-opposed Boxer 4-cylinder, petrol engine', '115kW @ 6000rpm', '196Nm @ 4000rpm'],
      ctaLink: 'https://www.subaru.com.au/impreza/',
      byoLink: 'https://www.subaru.com.au/configure',
      brochureLink: 'https://www.subaru.com.au/brochure-download?model=impreza',
      testDriveLink: 'https://www.subaru.com.au/book-test-drive?model=impreza'
    },
    forester: {
      name: 'Forester',
      image: '//cdn.optimizely.com/img/15841360337/0a3c35b0e266409abd1c409f39ef2318.png',
      logo: '//cdn.optimizely.com/img/15841360337/08e60edf8f9f43ec8ac352783ae06c95.svg',
      desc: 'Whether tackling off-road adventures or a run to the gelato shop, the Forester delivers technology, entertainment, comfort and performance in spades.  And now there’s even more reason to get behind the wheel, as the Subaru Forester 2.5i-S AWD was named the 2018 Best Small SUV at the 2018 Drive Car of the Year Awards.',
      bullets: ['2.5-litre horizontally-opposed Boxer 4-cylinder, petrol engine', '136kW @ 5800rpm', '239Nm @ 4400rpm'],
      ctaLink: 'https://www.subaru.com.au/forester',
      byoLink: 'https://www.subaru.com.au/configure',
      brochureLink: 'https://www.subaru.com.au/brochure-download?model=forester',
      testDriveLink: 'https://www.subaru.com.au/book-test-drive?model=forester'
    },
    outback: {
      name: 'Outback',
      image: '//cdn.optimizely.com/img/15841360337/bac31c5f734c47429a49d067aa8650f6.png',
      logo: '//cdn.optimizely.com/img/15841360337/19f1620ee14348e8b3b1bad646b01cff.svg',
      desc: 'After 25 years of continuous innovation, a new generation of adventure begins with the launch of the most technologically advanced, and luxurious Subaru Outback ever. Whether it’s the all-new Outback AWD, the Outback AWD Sport, or Subaru’s flagship, luxurious Outback AWD Touring - adventure is calling, and the choice is yours.',
      bullets: ['2.5-litre horizontally-opposed Boxer 4-cylinder, petrol engine', '138kW @ 5800rpm', '245Nm @ 3400-4600rpm'],
      ctaLink: 'https://www.subaru.com.au/outback',
      byoLink: 'https://www.subaru.com.au/configure',
      brochureLink: 'https://www.subaru.com.au/brochure-download?model=outback',
      testDriveLink: 'https://www.subaru.com.au/book-test-drive?model=outback'
    }
  };
  function htmlParser(html) {
    return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
  }
  function bindIntroToggle(root) {
    const button = root.querySelector('.liberty-intro__toggle-button');
    if (!button) return;
    function toggleIntro() {
      {
        button.querySelector('p').textContent = 'View Less';
        button.querySelector('span').classList.add('rotate');
        root.querySelector('.liberty-intro__para--two').classList.remove('nr-hidden');
      }
    }
    button.addEventListener('click', toggleIntro);
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleIntro();
      }
    });
  }
  function bindGallery(root) {
    const loadMoreBtn = root.querySelector('.fullGallery__btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        root.querySelector('.fullGallery__row--even').classList.remove('nr-hidden');
        loadMoreBtn.classList.add('nr-hidden');
      });
    }
    root.querySelectorAll('.fullGallery__item').forEach(item => {
      item.addEventListener('click', e => {
        const bgImg = e.currentTarget.querySelector('.fullGallery__image').style.backgroundImage;
        const img = bgImg.substring(5, bgImg.length - 2);
        const imgText = e.currentTarget.getAttribute('data-model');
        const modalImgDiv = root.querySelector('#nr-gallery-img');
        const modalImg = root.querySelector('.mediaModal__img');
        modalImgDiv.style.backgroundImage = bgImg;
        modalImg.src = img;
        root.querySelector('#nr-gallery-title').textContent = imgText;
        root.querySelector('.mediaModal').classList.add('mediaModal--visible');
      });
    });
    const closeBtn = root.querySelector('#nr-gallery-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        root.querySelector('.mediaModal').classList.remove('mediaModal--visible');
      });
    }
  }
  function modelTile(data) {
    const tile = htmlParser(modelTileHtml);
    tile.querySelector('.model-tile__desc').textContent = data.desc;
    tile.querySelector('.model-tile__cta a').textContent = `Explore ${data.name}`;
    tile.querySelector('.model-tile__cta a').href = data.ctaLink;
    tile.querySelector('.model-tile__image img').src = data.image;
    tile.querySelector('.model-tile__image img').alt = `${data.name} Image`;
    tile.querySelector('.model-tile__model-logo img').src = data.logo;
    tile.querySelector('.model-tile__model-logo img').alt = `${data.name} Logo`;
    data.bullets.filter(Boolean).forEach(bullet => {
      const listItem = document.createElement('li');
      listItem.textContent = bullet;
      tile.querySelector('.model-tile__bullets ul').append(listItem);
    });
    tile.querySelector('.model-tile__byo a').href = data.byoLink;
    tile.querySelector('.model-tile__brochure a').href = data.brochureLink;
    tile.querySelector('.model-tile__test-drive a').href = data.testDriveLink;
    return tile;
  }
  function bindAwardsToggle(root) {
    const button = root.querySelector('.liberty-awards__toggle-button');
    if (!button) return;
    function toggleAwards() {
      {
        button.querySelector('p').textContent = 'View Less';
        button.querySelector('span').classList.add('rotate');
        root.querySelector('.liberty-awards__section-two').classList.remove('nr-hidden');
      }
    }
    button.addEventListener('click', toggleAwards);
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAwards();
      }
    });
  }
  function buildPage() {
    const footer = document.getElementById('clientFooter');
    if (!footer || document.getElementById('liberty-body')) {
      return;
    }
    console.log('%c liberty-holding-page experiment started', 'color: green; background-color: white;');
    document.body.classList.add('liberty-holding-page');
    const page = htmlParser(bodyHtml);
    footer.parentNode.insertBefore(page, footer);
    page.insertAdjacentHTML('beforeend', heroHtml);
    page.insertAdjacentHTML('beforeend', introHtml);
    bindIntroToggle(page);
    const galleryNode = htmlParser(galleryHtml);
    page.appendChild(galleryNode);
    bindGallery(galleryNode);
    const sedanNode = htmlParser(sedanHtml);
    sedanNode.querySelector('.models-container').appendChild(modelTile(modelData.wrx));
    sedanNode.querySelector('.models-container').appendChild(modelTile(modelData.impreza));
    page.appendChild(sedanNode);
    const suvNode = htmlParser(suvHtml);
    suvNode.querySelector('.models-container').appendChild(modelTile(modelData.forester));
    suvNode.querySelector('.models-container').appendChild(modelTile(modelData.outback));
    page.appendChild(suvNode);
    page.insertAdjacentHTML('beforeend', ownersHtml);
    page.insertAdjacentHTML('beforeend', usedCarsHtml);
    const awardsNode = htmlParser(awardsHtml);
    page.appendChild(awardsNode);
    bindAwardsToggle(awardsNode);
  }
  const configHTML = {
    buildPage
  };

  /* eslint-disable no-console */

  (function libertyHoldingPage() {
    function init() {
      configHTML.buildPage();
    }
    Kameleoon.API.Core.runWhenConditionTrue(() => document.getElementById('clientFooter') && document.getElementById('mega-nav'), init);
  })();
})();