/* eslint-disable no-irregular-whitespace, no-useless-escape, no-param-reassign, max-len, no-console */
import { restyleGallery } from './initGallery.js';

const config = {
    dom: {
        sections: [...document.querySelectorAll('section')]
    },
    html: {
        section4Html: '<div class="kgmt5-custom-section-4"><div style="padding:177.78% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1193431678?autoplay=1&muted=1&loop=1&background=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KGM Torres Hybrid Launch"></iframe></div><script src="https://player.vimeo.com/api/player.js"><\/script></div>',
        section5Html: `<div class="kgmt5-custom-section-5 px-3 p-5">
        <h3 class="kgmt5-title">Self charging. </br> Intelligent power. </br> Crafted for Life.​</h3>
         <p>&nbsp;</p>
        <p class="kgmt5-description">The Torres Hybrid was created with a clear intent. Not to chase trends, but to create a vehicle that would remain relevant as the world changes. That philosophy is built into its hybrid system.</p>
        <p>&nbsp;</p>
        <p class="kgmt5-description">Rather than asking drivers to adapt to new routines or technologies, the Torres Hybrid blends electric and petrol power in a way that supports real world driving. The system automatically selects the most efficient power source at any moment, allowing electric driving where it makes sense and petrol power when it is needed.​</p>
        <p>&nbsp;</p>
        <p class="kgmt5-description">Because it is self-charging, there is no need to plug in or plan charging stops. The battery is replenished through regenerative braking and intelligent engine generated charging, ensuring electric power is always available when it delivers the greatest benefit.​</p>
        <p>&nbsp;</p>
        <p class="kgmt5-description">A dedicated hybrid transmission manages power flow smoothly between the engine and electric motor, delivering linear acceleration and a natural driving feel across a wide range of conditions.</p>
        <p>&nbsp;</p>
        <p class="kgmt5-description">The result is a vehicle that feels intuitive, confident and built to last.​</p>
        <p class="kgmt5-description">Not experimental. Not over complicated.​ Just intelligent power, crafted for life.</p>
        <div class="kgmt5-sec5-btn-wrapper ">
        <a class="kgmt5-sec5-btn primary-button  flex items-center justify-center" href="https://kgm.co.nz/brochure-page/">Download Brochure</a>
      </div>
        </div>`,
        section7Html: `<div class="kgmt5-custom-section-7">
<h3 class="kgmt5-title kgmt5-sec7-heading">Compare the Torres Range</h3>
<div class="kgmt5-sec7-carousel-wrap">
  <button type="button" class="kgmt5-sec7-arrow kgmt5-sec7-arrow--prev" aria-label="Previous model">
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 2L4 20L18 38" stroke="currentColor" stroke-width="3.5"/></svg>
  </button>
  <div class="kgmt5-sec7-scroll" tabindex="0">
    <div class="kgmt5-sec7-card">
      <div class="kgmt5-sec7-card-image">
        <img src="//cdn.optimizely.com/img/15841360337/3bf3e48c7abb48fdabd2f46bd95fe3e1.png" alt="Torres Hybrid" />
      </div>
      <h4 class="kgmt5-sec7-model">Torres Hybrid</h4>
      <p class="kgmt5-sec7-price">$49,990 RRP*</p>
      <div class="kgmt5-sec7-specs">
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Engine</span><span class="kgmt5-sec7-spec-value">1.5 GDI Turbo plus 130kW electric motor with 130kW inverter</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Transmission</span><span class="kgmt5-sec7-spec-value">Dedicated Hybrid Transmission (e-DHT)</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Power</span><span class="kgmt5-sec7-spec-value">150kW</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Wheels</span><span class="kgmt5-sec7-spec-value">17&quot; Alloy wheels and 225/60R tyres</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Interior</span><span class="kgmt5-sec7-spec-value">Synthetic leather interior</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Comfort</span><span class="kgmt5-sec7-spec-value">Dual zone air conditioning, Heated front seats</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">In car entertainment</span><span class="kgmt5-sec7-spec-value">Dual 12.3&quot; display screens with Apple CarPlay&reg; &amp; Android Auto&trade;</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Capacities</span><span class="kgmt5-sec7-spec-value">1,662 litres max cargo space, 1.3 tonne braked towing</span></div>
      </div>
    </div>
    <div class="kgmt5-sec7-card">
      <div class="kgmt5-sec7-card-image">
        <img src="//cdn.optimizely.com/img/15841360337/2b35cc7ae7c94294b40d89a3b42c8052.png" alt="Torres Hybrid Ultimate" />
      </div>
      <h4 class="kgmt5-sec7-model">Torres Hybrid Ultimate</h4>
      <p class="kgmt5-sec7-price">$54,990 RRP*</p>
      <div class="kgmt5-sec7-specs">
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Engine</span><span class="kgmt5-sec7-spec-value">1.5 GDI Turbo plus 130kW electric motor with 130kW inverter</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Transmission</span><span class="kgmt5-sec7-spec-value">Dedicated Hybrid Transmission (e-DHT)</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Power</span><span class="kgmt5-sec7-spec-value">150kW</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Wheels</span><span class="kgmt5-sec7-spec-value">18&quot; Alloy diamond cut wheels and 225/60R tyres</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Interior</span><span class="kgmt5-sec7-spec-value">Leather interior</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Comfort</span><span class="kgmt5-sec7-spec-value">Dual zone air conditioning, Heated front &amp; rear seats, Ventilated front seats</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">In car entertainment</span><span class="kgmt5-sec7-spec-value">Dual 12.3&quot; display screens with Apple CarPlay&reg; &amp; Android Auto&trade;</span></div>
        <div class="kgmt5-sec7-spec-row"><span class="kgmt5-sec7-spec-label">Capacities</span><span class="kgmt5-sec7-spec-value">1,662 litres max cargo space, 1.3 tonne braked towing</span></div>
      </div>
    </div>
  </div>
  <button type="button" class="kgmt5-sec7-arrow kgmt5-sec7-arrow--next" aria-label="Next model">
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 2L20 20L6 38" stroke="currentColor" stroke-width="3.5"/></svg>
  </button>
</div>
<div class="kgmt5-sec7-btn-wrapper">
  <a class="kgmt5-sec7-btn primary-button  flex items-center justify-center" href="https://kgm.co.nz/brochure-page/">Download Brochure</a>
</div>
</div>`
    },
    restylePage: () => {
        // change hero image
        const heroImage = document.querySelector('.bannerSwiper .banner-img.w-full');
        if (heroImage) {
            heroImage.src = '//cdn.optimizely.com/img/15841360337/c9d5d77944e049deb97057a66dcf15a0.png';
        }

        // remove .Praktika-Extended class from h3 elemnt inside #Main Body Copy
        const mainBodyCopyHeader = document.querySelector('#Main\\ Body\\ Copy h3');
        if (mainBodyCopyHeader) {
            mainBodyCopyHeader.classList.remove('Praktika-Extended');
        }

        // waitfor then hide section 2
        const section2 = document.querySelector('a[href="#Colour"]').closest('section');
        console.log('%c [KGMT5] section 2 element: ', 'color: #4CAF50; font-weight: bold;', section2);
        if (section2) {
            section2.classList.add('hide-section', 'kgmt5-section-2');
        }

        // change href of section 3 button

        const section3BATD = document.querySelector('a.primary-button[href="/torres-hybrid-book-a-test-drive/"]');
        if (section3BATD) {
            section3BATD.href = 'https://kgm.co.nz/book-a-test-drive/';
            section3BATD.closest('div').classList.add('kgmt5-sec2-btn-wrapper');
            const section3Element = section3BATD.closest('section');
            if (section3Element) {
                section3Element.classList.add('kgmt5-section-3');
                section3Element.insertAdjacentHTML('afterend', config.html.section4Html);
            }
        }

        // change textcontent of kgmt5-sec2-btn-wrapper a elements to "Book a Test Drive" and FIND A DEALER
        const section2Btns = document.querySelectorAll('.kgmt5-sec2-btn-wrapper a');
        console.log('%c [KGMT5] section 2 buttons: ', 'color: #4CAF50; font-weight: bold;', section2Btns);
        section2Btns[0].textContent = 'Book a Test Drive';
        section2Btns[0].classList.add('kgmt5-sec2-batd-btn');
        section2Btns[1].textContent = 'Find a Dealer';

        // remove Praktika-Extended class from section2Btns
        section2Btns.forEach(btn => btn.classList.remove('Praktika-Extended'));

        const section4 = document.querySelector('.kgmt5-custom-section-4');
        if (section4) {
            section4.insertAdjacentHTML('afterend', config.html.section5Html);
        }

        // section 6 restyle
        const section6 = document.querySelector('div.filterDiv.color_0.relative').closest('section');
        if (section6) {
            section6.classList.add('kgmt5-section-6');
            section6.insertAdjacentHTML('afterbegin', '<h3 class="kgmt5-title">Torres Colours</h3>');
        }

        // hide section.bannerSwiper next to #Variants\ Header
        const variantsHeader = document.querySelector('#Variants\\ Header');
        if (variantsHeader) {
            const bannerSwiper = variantsHeader.nextElementSibling;
            if (bannerSwiper) {
                bannerSwiper.classList.add('hide-section');
            }
        }

        // insert html after kgmt5-section-6
        const section6Element = document.querySelector('.kgmt5-section-6');
        if (section6Element) {
            section6Element.insertAdjacentHTML('afterend', config.html.section7Html);
        }

        // change images of section 8
        const section8 = document.getElementById('Spec');
        if (section8) {
            const images = section8.querySelectorAll('img');
            if (images.length > 0) {
                images[0].src = '//cdn.optimizely.com/img/15841360337/b2176097d92b4eaeaa9860dff1c5de9e.png';
                images[1].src = '//cdn.optimizely.com/img/15841360337/0796d43c6e6b4027854e13815b50aa65.png';
                images[2].src = '//cdn.optimizely.com/img/15841360337/d16b62cfdba242aaa796dc40047d7a04.png';
            }
        }
        // remove .Praktika-Extended class from all h2 elements and div elements with class
        // .tiImageDescs inside section 8
        const section8H2s = section8.querySelectorAll('h2.Praktika-Extended');
        section8H2s.forEach(h2 => h2.classList.remove('Praktika-Extended'));
        const section8ImageDescs = section8.querySelectorAll('div.tiImageDescs.Praktika-Extended');
        section8ImageDescs.forEach(desc => desc.classList.remove('Praktika-Extended', 'text-justify'));

        // insert download brochure button at the end of section 8 first div with class .tiImageDescs
        const section8FirstImageDesc = section8.querySelector('div.tiImageDescs');
        if (section8FirstImageDesc) {
            section8FirstImageDesc.insertAdjacentHTML('afterend', '<div class="kgmt5-sec8-btn-wrapper"><a class="kgmt5-sec8-btn primary-button flex items-center justify-center" href="https://kgm.co.nz/brochure-page/">Download Brochure</a></div>');
        }

        // change images of section 10
        const section10 = document.getElementById('Smart');
        if (section10) {
            const images = section10.querySelectorAll('img');
            if (images.length > 0) {
                images[0].src = '//cdn.optimizely.com/img/15841360337/1ec0ffcfa30c441a8422e89f286fab9a.png';
                images[1].src = '//cdn.optimizely.com/img/15841360337/f7c62a6aa9f14e57a162d1aad348dec7.png';
                images[2].src = '//cdn.optimizely.com/img/15841360337/db76b87b31d24ba09b08223a50e78a51.png';
            }
        }

        // remove .Praktika-Extended class from all h2 elements and div elements with class
        // .tiImageDescs inside section 10
        const section10H2s = section10.querySelectorAll('h2.Praktika-Extended');
        section10H2s.forEach(h2 => h2.classList.remove('Praktika-Extended'));
        const section10ImageDescs = section10.querySelectorAll('div.tiImageDescs.Praktika-Extended');
        section10ImageDescs.forEach(desc => desc.classList.remove('Praktika-Extended', 'text-justify'));

        // change href of section 10 download brochure button
        const section10BrochureButton = document.querySelector('a.primary-button[href="/media/2u0p4l1n/torres-hybrid-brochure-compressed.pdf"]');
        if (section10BrochureButton) {
            section10BrochureButton.href = 'https://kgm.co.nz/brochure-page/';
            section10BrochureButton.classList.add('kgmt5-sec10-btn');
            section10BrochureButton.classList.remove('Praktika-Extended');
            section10BrochureButton.textContent = 'Download Brochure';
        }

        // remove .Praktika-BoldExtended class from .formContainer h1#bookatestdrive element
        const bookATestDriveHeader = document.querySelector('.formContainer h1#bookatestdrive');
        if (bookATestDriveHeader) {
            bookATestDriveHeader.classList.remove('Praktika-BoldExtended');
        }

        // add * after placeholder of all input elements .formGrid .noBackground input
        const formInputs = document.querySelectorAll('.formGrid .noBackground input');
        formInputs.forEach((input) => {
            input.placeholder += ' *';
        });
        // add * for select#preferredDealer element option disabled and selected
        const preferredDealerSelect = document.querySelector('select#preferredDealer');
        if (preferredDealerSelect) {
            const defaultOption = preferredDealerSelect.querySelector('option[disabled][selected]');
            if (defaultOption) {
                defaultOption.textContent += ' *';
            }
        }

        // remove .Praktika-Extended class from #Terms\ and\ Conditions h3 element
        const termsHeader = document.querySelector('#Terms\\ and\\ Conditions h3');
        if (termsHeader) {
            termsHeader.classList.remove('Praktika-Extended');
        }


        restyleGallery();
    }
};
export default config;
