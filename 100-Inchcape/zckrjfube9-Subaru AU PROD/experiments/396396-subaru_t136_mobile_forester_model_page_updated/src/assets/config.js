/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable max-len */
// <span class="subt136-footnote">*<span class="subt136-tooltip"></span></span>

const domInjector = (() => {
    const observers = new Map(); // ✅ reuse observers per parent

    const inject = ({
        targetSelector,
        targetRelativeSelector,
        html,
        position = 'beforeend',
        uniqueId, // ✅ MUST be data attribute like [data-my-section]
        parentSelector,
        /** 'parent' = dedupe within parent only. 'document' = at most one node matching uniqueId on the whole page (use when multiple parents share the same class, e.g. two .Vo8hB_ClC_). */
        uniqueScope = 'parent'
    }) => {
        const getParent = () => document.querySelector(parentSelector);
        const getTarget = () => {
            const parent = getParent();
            if (targetRelativeSelector) {
                return parent ? parent.querySelector(targetRelativeSelector) : null;
            }
            return document.querySelector(targetSelector);
        };

        const isAlreadyInserted = (parent) => {
            if (!uniqueId) return false;
            if (uniqueScope === 'document') {
                return !!document.querySelector(uniqueId);
            }
            return !!(parent && parent.querySelector(uniqueId));
        };

        const insert = () => {
            const parent = getParent();
            const target = getTarget();

            if (!parent || !target) return;

            if (!parent.contains(target)) return;

            if (isAlreadyInserted(parent)) return;

            target.insertAdjacentHTML(position, html);
            // // console.log('✅ Injected:', uniqueId);
        };

        // ✅ Initial run
        insert();

        const parent = getParent();
        if (!parent) return;

        // ✅ Reuse single observer per parent
        if (!observers.has(parentSelector)) {
            let timeout;

            const observer = new MutationObserver(() => {
                Kameleoon.API.Utils.clearTimeout(timeout);

                timeout = Kameleoon.API.Utils.setTimeout(() => {
                    const parentEl = getParent();
                    if (!parentEl) return;

                    // 🔥 Re-run all injectors tied to this parent
                    observers.get(parentSelector).callbacks.forEach(cb => cb());
                }, 150);
            });

            observer.observe(parent, {
                childList: true,
                subtree: true
            });

            observers.set(parentSelector, {
                observer,
                callbacks: []
            });
        }

        // ✅ Register this inject function
        observers.get(parentSelector).callbacks.push(insert);
    };

    return { inject };
})();
const config = {
    HTMLs: {
        section2: `
        <section class="subt136-forester" data-subt136-section2>
         <div class="subt136-forester__container">

    <!-- LEFT CONTENT -->
    <div class="subt136-forester__content">
      <h2>Subaru Forester </br> The Smart Choice Medium SUV</h2>

      <p>
        Discover the all-new Subaru Forester, the next-generation medium SUV, available in petrol and Hybrid e-Boxer variants. Smarter, safer and more capable than ever, it combines a bold new design, advanced safety and cutting-edge technology, delivering the performance and efficiency for both everyday driving and spontaneous getaways - with the strong Hybrid variant offering over 1,000km of driving range<span class="subt136-footnote">*<span class="subt136-tooltip">2026 Subaru Forester Hybrid's range of over 1000km is based on a theoretical value calculated by multiplying the fuel consumption rate under the test conditions specified in Australian Design Rules (ADR) 81/02 by the fuel tank capacity. Actual real-world results may vary based on individual driving circumstances e.g. traffic conditions, driving style, vehicle modifications, fuel quality, climatic conditions etc.</span> </span> per tank.
      </p>

      <p>
       With Symmetrical All-Wheel Drive standard across every model, the Subaru Forester is built to help you Own the Road and Conquer the Wild. From city streets to dirt road adventures, it pairs a practical, spacious interior with the strength to handle more - including up to 1,800kg braked towing capacity<span class="subt136-footnote">*<span class="subt136-tooltip">
   Maximum vehicle braked towing capacity is 1,800kg for petrol variants and 1,200kg for hybrid variants. "Towing capacity" refers to the maximum total weight of a trailer and its load. "Braked" indicates the towing capacity when the trailer is equipped with its own brakes. Towing is subject to regulatory requirements. Speak with your Subaru Retailer for more information and Genuine Subaru towing accessories. 
  </span></span>.
      </p>

      <p>
      Inside, an 11.6” touchscreen with wireless Apple CarPlay® and Android Auto™<span class="subt136-footnote">*<span class="subt136-tooltip">Compatible Apple® or Android™ device required. </span></span> keeps you connected, while Subaru EyeSight® Driver Assist and safety technologies help protect you on every drive.
      </p>

      <p>
      From weekday routines to weekend escapes, the versatile all-new Subaru Forester is ready for whatever’s next. Now available to test drive, with stock ready for immediate delivery.<span class="subt136-footnote">* <span class="subt136-tooltip">Note: all variants may not be available, check with your Subaru Retailer to confirm
</span></span>
      </p>

      <div class="subt136-forester__cta">
        <a href="https://www.subaru.com.au/book-test-drive?model=Forester"
           class="subt136-forester__btn subt136-forester__btn--outline ">
          Book a Test Drive
        </a>

        <a href="https://www.subaru.com.au/configure"
           class="subt136-forester__btn subt136-forester__btn--primary">
          Build and Price Your Forester
        </a>
      </div>
    </div>

    <!-- RIGHT IMAGE -->
    <div class="subt136-forester__image">
      <img src="//cdn.optimizely.com/img/15841360337/b8174b9395424908a4452b587d194997.png" alt="Subaru Forester" />
    </div>

    </div>
    </section>`,
        section4: `
   <section class="subt136-ownership" data-subt136-section4>

  <div class="subt136-ownership__top">

    <!-- LEFT IMAGE -->
    <div class="subt136-ownership__image">
      <img src="//cdn.optimizely.com/img/15841360337/d97517774137409a93f163bf9cffa3da.png" alt="Subaru Forester">
    </div>

    <!-- RIGHT CONTENT -->
    <div class="subt136-ownership__content">
      <h2>Ownership - Life with a Subaru Forester</h2>

      <p>
       The highly versatile Subaru Forester makes sense from day one. Built for the way you drive, it’s designed to handle everything from daily commutes to days spent off the beaten track.
      </p>
</br>
      <p>
       A Subaru Forester has the capability, practicality and confidence to take on changing plans and new adventures. But just as importantly, it’s also designed for easy ownership.
      </p>
</br>
      <p>
      Subaru’s reputation for reliability, strong resale value and efficiency for its class means it’s a car you can depend on, both now and down the track.
      </p>

      <ul class="subt136-ownership__list">
        <li><div class="subt136-ownership__check" aria-hidden="true"><i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt="" /></i></div><div class="subt136-ownership__list-item-body">5 Year/Unlimited Km Warranty<span class="subt136-footnote">*<span class="subt136-tooltip">Every new Subaru comes with a 5 Year/Unlimited Km warranty period, unless the vehicle is used as a hire car, taxi, ride share, rental, driving school, delivery or courier vehicle in which case the warranty period is 5 Year/150,000 Km (whichever occurs first). For full warranty terms and conditions, visit <a href="https://www.subaru.com.au/owners/warranty" target="_blank">www.subaru.com.au/owners/warranty</a>. </span></span></div></li>
        <li><div class="subt136-ownership__check" aria-hidden="true"><i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt="" /></i></div><div class="subt136-ownership__list-item-body">5 Year/75,000 Km Capped Price Servicing<span class="subt136-footnote">*<span class="subt136-tooltip">Every eligible Model Year 2026 onward Subaru Forester comes with Subaru's 5 Year/75,000 Km Capped Price Servicing Program. Available at participating Subaru Retailers only and does not apply to rental and some other classes of vehicles. For full Capped Price Servicing Terms and Conditions visit <a href="https://www.subaru.com.au/service/pricing/capped-price-servicing" target="_blank">www.subaru.com.au/service/pricing/capped-price-servicing</a>. </span></span></div></li>
        <li><div class="subt136-ownership__check" aria-hidden="true"><i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt="" /></i></div><div class="subt136-ownership__list-item-body">12 Months Subaru Roadside Assistance Program<span class="subt136-footnote">*<span class="subt136-tooltip">12 month Club Membership and Roadside Assistance Offer is standard upon activation with the relevant Motoring Club in each state. To receive this benefit the customer must opt into the 12 month Club Membership and Roadside Assistance Offer at time of vehicle delivery. Eligible customers are those retail and novated lease customers who purchase a new Subaru and have less than 5 vehicles under the Club Membership offer. Customers must provide a valid phone number and residential address, as well as date of birth. Fleet, Government and Rental companies are excluded. Terms and conditions apply. For more information, visit <a href="https://www.subaru.com.au/roadside-assistance-program" target="_blank">www.subaru.com.au/roadside-assistance-program</a>.</span></span></div></li>
        
      </ul>
    </div>

  </div>

  <!-- FINANCIAL SECTION -->
  <div class="subt136-finance">

    <div class="subt136-finance__content">
      <h3>Subaru Financial Services<span class="subt136-footnote">*<span class="subt136-tooltip">Finance to approved applicants only. Credit criteria, fees, charges and T&Cs apply. Finance is provided by IFSA Pty Ltd ABN 39 651 319 774 trading as Subaru Financial Services, managed by Allied Retail Finance Pty Ltd ABN 31 609 859 985 Australian Credit Licence 483211.
</span></span></h3>

      <p>
       Subaru Financial Services offers flexible car loans<span class="subt136-footnote">*<span class="subt136-tooltip"> *Credit criteria, fees, charges and terms and conditions apply. Approved applicants only. Finance is provided by IFSA Pty Ltd ABN 39 651 319 774 trading as Subaru Financial Services, managed by Allied Retail Finance Pty Ltd ABN 31 609 859 985 Australian Credit Licence 483211.</span></span> with competitive, personalised rates tailored to you.
      </p>
</br>
      <p>
       With a Guaranteed Future Value<span class="subt136-footnote">*<span class="subt136-tooltip">*The Guaranteed Future Value (GFV) is the minimum future value of your vehicle as determined by Subaru Financial Services (SFS) and set out in your contract. At the end of the term, you can select from three options: (1) sell or trade in the vehicle and repay your loan balance; (2) return the vehicle to us; or (3) retain the vehicle by paying the GFV amount, which is a final amount owed to us at the end of the loan term. Total interest payable on the loan will be higher than a loan with no GFV.</span></span> agreement, you’ll benefit from lower repayments<span class="subt136-footnote">*<span class="subt136-tooltip">Monthly repayments will be lower compared to a similar loan term with no GFV or no equivalent balloon final payment. Available on new and demonstrator Subaru vehicles for selected models only. Vehicle eligibility is subject to change. If you decide to return your car at the end of your term,  Subaru Financial Services (SFS), or another person or entity with SFS’s agreement will purchase the vehicle from you for the GFV, which will be applied to reduce your outstanding loan amount. However, you will need to pay us an additional amount if the vehicle is damaged or you have travelled excess kilometres. Credit criteria, fees, charges and terms and conditions apply. Approved applicants only. Finance is provided by IFSA Pty Ltd ABN 39 651 319 774 trading as Subaru Financial Services, managed by Allied Retail Finance Pty Ltd ABN 31 609 859 985 Australian credit licence 483211.</span></span>, with Subaru guaranteeing the vehicle’s value at the end of the term to cover the final payment. It’s a smart alternative to a standard loan or paying upfront.
      </p>
</br>
      <p>
        Everything is handled by Subaru specialists, making the process simple, seamless and unmistakably Subaru.
      </p>

      <h4>What happens at the end of your term?</h4>

      <div class="subt136-finance__options">
        <div class="subt136-card">
          <img src="//cdn.optimizely.com/img/15841360337/2cd845b30922472bbe8ce0785becd16b.svg" alt="upgrade icon" class="subt136-card__icon">
          <div class="subt136-card__text-wrapper">
          <p class="subt136-card__title">Upgrade</p>
          <p class="subt136-card__title__para">Use your current car as a trade in and upgrade to a new Subaru. (Must meet loan approval criteria)</p>
          </div>
        </div>

        <div class="subt136-card">
        <img src="//cdn.optimizely.com/img/15841360337/a782e524bb6c42828c1cd73639695bd3.svg" alt="retain icon" class="subt136-card__icon">
        <div class="subt136-card__text-wrapper">
          <p class="subt136-card__title">Retain</p>
          <p class="subt136-card__title__para">Pay out the loan and keep your current Subaru. We can help with finance if required.</p>
          </div>
        </div>

        <div class="subt136-card">
        <img src="//cdn.optimizely.com/img/15841360337/06be72f072b8460cbd4722265d460478.svg" alt="return icon" class="subt136-card__icon">
        <div class="subt136-card__text-wrapper">
          <p class="subt136-card__title">Return</p>
          <p class="subt136-card__title__para">Simply return your Subaru and have nothing more to pay. (Your car must meet the Fair Wear & Tear Guide and agreed KMs)</p>
          </div>
        </div>
      </div>

      <a href="https://www.subaru.com.au/financial-services/calculators" class="subt136-forester__btn subt136-forester__btn--primary subt136-repayment-btn">Calculate your repayments</a>
    </div>

    <!-- RIGHT IMAGE -->
    <div class="subt136-finance__image">
      <img src="//cdn.optimizely.com/img/15841360337/0b81358967b84577b95679c1a3e99d71.png" alt="Subaru Forester">
    </div>

  </div>

  <!-- COMPARISON TABLE -->
  <div class="subt136-table">
    <h3>How Forester compares in the Medium SUV class</h3>
<div class="subt136-table-mobile-scroll">
    <table>
      <thead>
        <tr>
          <th style="border-top-left-radius: 12px;">Feature</th>
          <th>Subaru Forester</th>
          <th style="border-top-right-radius: 12px;">Typical Midsize SUV</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>AWD capability</td>
          <td>Standard Symmetrical <br /> All-Wheel Drive</td>
          <td>Often optional or grade-dependent</td>
        </tr>
        <tr>
          <td>Ground clearance<span class="subt136-footnote">*<span class="subt136-tooltip">Ground clearance at kerb weight</span></span></td>
          <td>220mm</td>
          <td>Often lower</td>
        </tr>
        <tr>
          <td>Safety technology</td>
          <td>Subaru EyeSight® - standard <br /> 
Driver Monitoring System<span class="subt136-footnote">*<span class="subt136-tooltip">Driver Monitoring System – Driver Focus performance and capability dependent on environmental and technical conditions. Refer to owners manual for full details.</span></span> - standard
<br /> Vision Assist - standard
</td>
          <td>Varies by model or grade</td>
        </tr>
        <tr>
          <td>Visibility</td>
          <td>Best in class</td>
          <td>Varies</td>
        </tr>
        <tr>
          <td>Practical Space</td>
          <td>Up to 496L cargo space<span class="subt136-footnote">*<span class="subt136-tooltip">Cargo volume rear seat up, to ceiling</span></span></td>
          <td>Varies</td>
        </tr>
        <tr>
          <td style="border-bottom-left-radius: 12px;">All-terrain capability</td>
          <td>Tested for the range of Australian roads</td>
          <td style="border-bottom-right-radius: 12px;">Varies</td>
        </tr>
      </tbody>
    </table>
   </div>
  </div>

</section>
   `,
        newHeadline: '<div class="subt136-new-headline" data-subt136-section-new-headline> Discover everything you need about the new Subaru Forester </div>',
        techContent: `<section class="subt136-tech-section" data-subt136-tech-content>
  <div class="subt136-tech-container">
    
    <!-- Left Content -->
    <div class="subt136-tech-left">
      <h2 class="subt136-tech-title">
        Technology - Keep everyone <br />
        connected & entertained
      </h2>

      <a href="/forester/technology" class="subt136-tech-link" target="_self">
        <span class="subt136-tech-plus"><img src="//cdn.optimizely.com/img/15841360337/f7509a4d908c431dacbe22904aa28df0.svg" alt="plus icon"></span>
        Learn more
      </a>
    </div>

    <!-- Right Content -->
    <div class="subt136-tech-right">
      <p class="subt136-tech-description">
        Experience a suite of advanced entertainment and connectivity features
        designed to elevate every drive. At the heart of it all:
      </p>

      <ul class="subt136-tech-list">
        <li>A larger 11.6" touchscreen</li>
        <li>Wireless Apple CarPlay® and Android Auto™<span class="subt136-footnote">*<span class="subt136-tooltip">Compatible Apple® or Android™ device required.</span></span> for seamless connection on the go</li>
        <li>Front seat wireless phone charging<span class="subt136-footnote">*<span class="subt136-tooltip">Compatible Qi enabled and compliant device required</span></span></li>
        <li>USB-A and USB-C ports are available for both front and rear passengers</li>
      </ul>

      <p class="subt136-tech-footer">
        In selected Hybrid variants, a new 12.3" digital instrument cluster<span class="subt136-footnote">*<span class="subt136-tooltip">Not available on Subaru Forester AWD Hybrid</span></span>
        brings essential driving information to life with crisp LCD clarity and precision.
      </p>
    </div>

  </div>
</section>  `,
        interiorContent: `<section class="subt136-tech-section" data-subt136-interior-content>
  <div class="subt136-tech-container">

    <div class="subt136-tech-left">
      <h2 class="subt136-tech-title">
        Interior - Space to live, comfort to explore
      </h2>

      <a href="/forester/interior" class="subt136-tech-link" target="_self">
        <span class="subt136-tech-plus"><img src="//cdn.optimizely.com/img/15841360337/f7509a4d908c431dacbe22904aa28df0.svg" alt="plus icon"></span>
        Learn more
      </a>
    </div>

    <div class="subt136-tech-right">
      <p class="subt136-tech-description">
        Take a seat inside the all-new Subaru Forester and you will find a completely redesigned
        high-tech cabin that is quieter, more refined, more comfortable and more inviting than ever.
      </p>

      <ul class="subt136-tech-list">
        <li>New ergonomic seats designed to reduce fatigue on longer drives</li>
        <li>A roomy cabin that suits weekday commuting, weekends away and longer roadtrips</li>
        <li>A hands-free power tailgate<span class="subt136-footnote">*<span class="subt136-tooltip">Powered tailgate with kick sensor not available in Subaru Forester AWD and Forester AWD Hybrid.</span></span> with a new foot-activated kick sensor to make loading easier</li>
        <li>A spacious cargo area featuring anchor points and multiple shopping and luggage hooks</li>
      </ul>
    </div>

  </div>
</section>`,
        performanceContent: `
<section class="subt136-tech-section" data-subt136-performance-content>
  <div class="subt136-tech-container subt136-tech-container--single">
    
    <div class="subt136-tech-full">
      <h2 class="subt136-tech-title">
        Performance - Tackle challenging terrain
      </h2>

      <p class="subt136-tech-description">
        The Subaru Forester is engineered to tackle rough and uneven terrain
        with confidence, while still feeling composed in everyday driving.
        Here’s what you get:
      </p>

      <ul class="subt136-tech-list">
        <li>220mm of ground clearance<span class="subt136-footnote">*<span class="subt136-tooltip">Ground clearance at kerb weight</span></span></li>
        <li>Enhanced X-Mode traction control that now activates even in reverse</li>
        <li>
          Subaru Intelligent Drive (SI-Drive) let’s you fine-tune engine response
          to better adapt to winding roads, highways and varied driving conditions
          eg with two distinct drive modes
        </li>
        <li>Symmetrical All-Wheel Drive for stable, predictable traction</li>
        <li>
          Braked towing capacity of up to 1800kg in petrol variants and
          1200kg in hybrid variants<span class="subt136-footnote">*<span class="subt136-tooltip">Maximum vehicle braked towing capacity is 1,800kg for petrol variants and 1,200kg for hybrid variants. "Towing capacity" refers to the maximum total weight of a trailer and its load. "Braked" indicates the towing capacity when the trailer is equipped with its own brakes. Towing is subject to regulatory requirements. Speak with your Subaru Retailer for more information and Genuine Subaru towing accessories.</span></span>
        </li>
      </ul>
    </div>

  </div>
</section>`,
        capableContent: `<section class="subt136-tech-section" data-subt136-capable-content>
  <div class="subt136-tech-container subt136-tech-container--single">
    
    <div class="subt136-tech-full">
      <h2 class="subt136-tech-title">
        A truly capable Hybrid SUV
      </h2>

      <p class="subt136-tech-description">
        Take your adventures further in a hybrid SUV variant designed for everyday ease and weekend capability.
        Subaru's all-new strong Hybrid e-Boxer system brings a more effortless, confidence-inspiring drive
        to drivers who want added fuel efficiency, versatility and the freedom to go further.
      </p>

      <p class="subt136-tech-description">
        Paired with Subaru’s legendary Symmetrical All-Wheel Drive, you get to take on more — on road or off.
      </p>

      <ul class="subt136-tech-list">
        <li>Over 1000km<span class="subt136-footnote">*<span class="subt136-tooltip">2026 Subaru Forester Hybrid's range of over 1000km is based on a theoretical value calculated by multiplying the fuel consumption rate under the test conditions specified in Australian Design Rules (ADR) 81/02 by the fuel tank capacity. Actual real-world results may vary based on individual driving circumstances e.g. traffic conditions, driving style, vehicle modifications, fuel quality, climatic conditions etc
</span></span> driving range per tank</li>
        <li>2.5L e-Boxer engine with high-output electric motor</li>
        <li>Symmetrical All-Wheel Drive for enhanced grip and control</li>
        <li>Confident capability across changing road and trail conditions</li>
        <li>Regenerative breaking charges the 1.1 kWh lithium-ion battery - no need to plug in</li>
        <li>6.2-litres/100km hybrid fuel economy<span class="subt136-footnote">*<span class="subt136-tooltip">All performance data measured using 95RON test fuel as required by Australian Design Rule 81/02. Vehicles tested in accordance with ADR 81/02. Fuel consumption and carbon dioxide (CO2) emission figures quoted are measured in accordance with Australian Design Rule 81/02 and are for comparison purposes only. Real world results may vary based on individual driving circumstances e.g. traffic conditions, driving style, vehicle modifications, fuel quality, climatic conditions etc. Quoted figures may not reflect real world fuel consumption and carbon dioxide (CO2) emissions.</span></span></li>
      </ul>
    </div>

  </div>
</section>`,
        designContent: `<section class="subt136-tech-section" data-subt136-design-content>
<div class="subt136-tech-container subt136-tech-container--single">
    
    <div class="subt136-tech-full">
      <h2 class="subt136-tech-title">
       Design - Re-imagined design that invites adventure
      </h2>

      <p class="subt136-tech-description">
       Blending a head-turning new look with its signature rugged personality, the all-new Subaru Forester brings a fresh sense of presence to the medium SUV class.
      </p>

     

      <ul class="subt136-tech-list">
        <li>A bold new grille and striking headlight design</li>
        <li>Geometric trim accents and contours</li>
        <li>Outstanding driver visibility with slimline pillars and expansive windows</li>
        <li>Intelligent cornering lamps to enhance visibility when turning</li>
      </ul>
    </div>

    

  </div>
</section>`,
        safetyContent: `<section class="subt136-tech-section" data-subt136-safety-content>
        <div class="subt136-tech-container subt136-tech-container--single">
    
    <div class="subt136-tech-full">
      <h2 class="subt136-tech-title">
       Safety Systems - Subaru EyeSight® has you covered
      </h2>

      <p class="subt136-tech-description">
    This world-renowned preventative safety system monitors the vehicle’s surroundings to support the driver through warnings, as well as braking and steering intervention, helping to reduce driver burden, prevent accidents and save lives.
      </p>


      <ul class="subt136-tech-list">
        <li>Emergency Driving Stop System (EDSS)<span class="subt136-footnote">*<span class="subt136-tooltip">Emergency Driving Stop System (EDSS) operates only when Lane Centering Function is operating. Refer to Owner's Manual for full details</span></span> - if you become unresponsive while driving, this intelligent feature activates automatically and can bring the vehicle to a controlled stop</li>
        <li>Adaptive Cruise Control</li>
        <li>Lane Centring System</li>
        <li>Pre-Collision Braking System</li>
        <li>Speed Limiter and Speed Sign Recognition</li>
      </ul>
    </div>

  </div>
        </section>`,
        youtubeContent: `<section class="subt136-tech-section" data-subt136-youtube-content>
        <p>You will see how this feature activates automatically<span class="subt136-footnote">*<span class="subt136-tooltip">Emergency Driving Stop System (EDSS) operates only when Lane Centering Function is operating. Refer to Owner's Manual for full details.</span></span> and can bring the vehicle to a controlled stop plus alert other road users should you become unresponsive while driving.</p>
        </section>`,
        visionAssistContent: `<section class="subt136-tech-section" data-subt136-vision-assist-content>
       <div class="subt136-tech-container subt136-tech-container--single">
    
    <div class="subt136-tech-full">
      <h2 class="subt136-tech-title">
       Safety Systems - Subaru Vision Assist
      </h2>

      <p class="subt136-tech-description">
       Subaru's Vision Assist enhances driver awareness and confidence by using smart sensors and cameras to detect blind spots, approaching vehicles and potential obstacles.
      </p>

      <p class="subt136-tech-description subt136-mb0">
       <strong>Reverse Automatic Braking</strong>
      </p>

        <p class="subt136-tech-description">Sonar sensors on Forester's rear bumper and the integrated reverse camera help you reverse with confidence, by detecting obstacles, alerting the driver and if necessary, taking action to apply the brakes to help avoid a collision.</p>

        <p class="subt136-tech-description subt136-mb0"><strong>Blind Spot Monitoring</strong></p>

        <p class="subt136-tech-description">Blind Spot Monitor uses rear and side sensors to make lane changes safer, by warning of vehicles detected in the blind spot.</p>

        <p class="subt136-tech-description subt136-mb0"><strong>Rear Cross Traffic Alert</strong></p>

        <p class="subt136-tech-description">The Rear Cross Traffic Alert warns the driver that another car is approaching when reversing out of a car space.</p>

        <p class="subt136-tech-description subt136-mb0"><strong>Panoramic 360 Degree View Monitor</strong></p>

        <p class="subt136-tech-description">The 360 Degree View Monitor uses multiple cameras to create a bird’s-eye view of your surroundings, helping you spot obstacles with ease. In park, you can switch between different angles around the vehicle for added confidence when manoeuvring.</p>

     
    </div>

  </div>
        </section>`,
        DMSContent: `<section class="subt136-tech-section" data-subt136-dms-content>
        <div class="subt136-tech-container">

    <div class="subt136-tech-left">
      <h2 class="subt136-tech-title">
       Safety Systems - Subaru's Driver Monitoring System (DMS)<span class="subt136-footnote">*<span class="subt136-tooltip">Driver Monitoring System – Driver Focus performance and capability dependent on environmental and technical conditions. Refer to owners manual for full details.</span></span>
      </h2>
    </div>

    <div class="subt136-tech-right">
      <p class="subt136-tech-description">
       An advanced driver-assist technology that uses facial recognition to enhance safety and convenience - alerting drivers to signs of distraction or drowsiness, while also personalising cabin settings for up to five recognised users.<span class="subt136-footnote">*<span class="subt136-tooltip">Auto door mirror and auto driver’s seat adjustment only is only available in the Forester AWD Hybrid Sport</span></span>
      </p>
    </div>
  </div>
        </section>`,
        SGPContent: `<section class="subt136-tech-section" data-subt136-sgp-content>
      <h2 class="subt136-tech-title">
       Safety Design - Subaru Global Platform
      </h2>
        </section>`,
        boxerContent: `<section class="subt136-tech-section full-device-width" data-subt136-boxer-content>
        <div class="subt136-ownership__top">

    <!-- LEFT IMAGE -->
    <div class="subt136-ownership__image">
      <img src="//cdn.optimizely.com/img/15841360337/6f63cfbe337745d2aad712ab2d4fa93f.png" alt="Subaru Forester">
    </div>

    <!-- RIGHT CONTENT -->
    <div class="subt136-ownership__content">
      <h2>Safety Design - Subaru Boxer Engine</h2>

      <p>
       The Subaru Boxer engine is smarter and safer than traditional engines. Sitting lower and flatter, the iconic Boxer gives you a low centre of gravity and better handling. Plus, if a severe frontal collision occurs, it will slide below the cabin – not through it.
      </p>
    </div>
    </div>
        </section>`,
        familyContent: `<section class="subt136-tech-section full-device-width" data-subt136-family-content>
        <div class="subt136-finance">

    <div class="subt136-finance__content">
    <div class="subt136-finance-content__wrapper">
      <h3>An SUV That Fits Friends & Families</h3>

        <ul class="subt136-tech-list">
        <li>A roomy cabin with space for five</li>
        <li>ISOFIX anchor points for 2 ISOFIX-compliant child restraints</li>
        <li>Cabin space that comfortably supports 2 car seats across the rear</li>
        <li>Rear door child locks</li>
        <li>Flexible cargo space for prams, sports bags and weekend gear</li>
        <li>Up to 496L of cargo space in petrol variants and 484L in Hybrid variants with the rear seats up</li>
        <li>Rear USB-A and USB-C ports to help keep passengers powered up</li>
       </ul>
      </div>
      
    </div>

    <!-- RIGHT IMAGE -->
    <div class="subt136-finance__image">
    <div class="subt136-family-image-wrapper">
      <img src="//cdn.optimizely.com/img/15841360337/d833fb1d1afd464c9a3d5246c246814f.png" alt="Subaru Forester">
    </div>
      </div>
  </div>

        </section>`,
        towingContent: `<section class="subt136-tech-section full-device-width" data-subt136-towing-content>
           <div class="subt136-ownership__top">

    <!-- LEFT IMAGE -->
    <div class="subt136-ownership__image">
      <img src="//cdn.optimizely.com/img/15841360337/71d167f0c1094e2bb3733a8300d41c2e.png" alt="Subaru Forester">
    </div>

    <!-- RIGHT CONTENT -->
    <div class="subt136-ownership__content">
      <h2>Towing Capability</h2>

      <p>
       Take your adventures further with the Subaru Forester’s impressive towing capability. Whether it’s camping, boating or towing a trailer full of gear, Subaru Forester gives you the confidence to bring more along for the journey.
      </p>

         <ul class="subt136-tech-list">
         <li>Up to 1,800kg<span class="subt136-footnote">*<span class="subt136-tooltip">Maximum vehicle braked towing capacity is 1,800kg for petrol variants. "Towing capacity" refers to the maximum total weight of a trailer and its load. "Braked" indicates the towing capacity when the trailer is equipped with its own brakes. Towing is subject to regulatory requirements. Speak with your Subaru Retailer for more information and Genuine Subaru towing accessories. 
</span></span> braked towing capacity (petrol variants)</li>
         <li>Up to 1,200kg<span class="subt136-footnote">*<span class="subt136-tooltip">Maximum vehicle braked towing capacity is 1,200kg for hybrid variants. "Towing capacity" refers to the maximum total weight of a trailer and its load. "Braked" indicates the towing capacity when the trailer is equipped with its own brakes. Towing is subject to regulatory requirements. Speak with your Subaru Retailer for more information and Genuine Subaru towing accessories.</span></span> braked towing capacity (Hybrid variants)</li>
         <li>2.5L direct-injection Boxer engine for dependable performance</li>
         <li>Hybrid system combining petrol engine and electric motor for efficient capability</li>
         </ul>
        <a href="https://www.subaru.com.au/great-australian-detour" class="subt136-tech-link" target="_self">
        <span class="subt136-tech-plus"><img src="//cdn.optimizely.com/img/15841360337/f7509a4d908c431dacbe22904aa28df0.svg" alt="plus icon"></span>
        Learn more
      </a>
    </div>
    </div>
        </section>`,
        tabsContent: `<div class="subaru-tab-container" data-subt136-tabs>
  <div class="tab-headers">
     <ul class="tab-vehicle-list">
         <li class="tab-vehicle-item">
            <div class="tab-vehicle-content active-vehicle" data-vehicle="forester">
               <div class="tab-vehicle-title">Forester</div>
               <img src="https://cdn-image-handler.oem-production.subaru.com.au/vehicle/2026/forester/my26-forester-awd-front-riverrockpearl-660x230.png" alt="Forester" class="tab-vehicle-img" loading="lazy">
            </div>
         </li>
         <li class="tab-vehicle-item">
            <div class="tab-vehicle-content" data-vehicle="outback">
               <div class="tab-vehicle-title">Outback</div>
               <img src="https://cdn-image-handler.oem-production.subaru.com.au/vehicle/2025/outback/my25-outback-awd-icesilvermetallic-660x230.png" alt="Outback" class="tab-vehicle-img" loading="lazy">
            </div>
         </li>
         <li class="tab-vehicle-item">
            <div class="tab-vehicle-content" data-vehicle="crosstrek">
               <div class="tab-vehicle-title">Crosstrek</div>
               <img src="https://cdn-image-handler.oem-production.subaru.com.au/vehicle/2026/crosstrek/my26-crosstrek-awd-2.0l-front-crystal-white-pearl.png" alt="Crosstrek" class="tab-vehicle-img" loading="lazy">
            </div>
         </li>
      </ul>
  </div>

  <div class="panels-wrapper">
    <div class="tab-panel active-panel" id="panel-forester">
      <div class="subt136-tab-panel">
        <div>
          <img class="subt136-tab-img" src="https://cdn.oem-production.subaru.com.au/media/uhniabbl/my26-forester-awd-touring-front-daybreakpearl.png" alt="Forester" loading="lazy">
        <div class="subt136-tab-caption"><p style="text-align: center;">Forester AWD Touring</p></div>
          </div>
        <div>
          <img src="https://cdn.oem-production.subaru.com.au/media/bpyhoued/forester-badge.png" class="KYcZVhraKW" loading="lazy" alt="Forester">
          <div class="subt136-tab-subtitle">Key features</div>

        <ul class="subt136-ownership__list">
<div class="subt136-left-column" aria-hidden="true">
 <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">Option of 2.0-litre Boxer engine or Hybrid e-Boxer engine<span class="subt136-footnote">*<span class="subt136-tooltip">Subaru Crosstrek AWD 2.0L, Crosstrek AWD 2.0R and Crosstrek 2.0S feature 2.0-litre Boxer engine. Subaru Crosstrek AWD Hybrid L and Crosstrek AWD Hybrid S feature e-Boxer engine.</span></span></div>
        </li>

        <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">220mm ground clearance<span class="subt136-footnote">*<span class="subt136-tooltip">Ground clearance at kerb weight.</span></span></div>
        </li>

         <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">Ladder style roof rails</div>
        </li>
</div>
       
<div class="subt136-right-column" aria-hidden="true">
 <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">EyeSight® Driver Assist technology<span class="subt136-footnote">*<span class="subt136-tooltip">Emergency Driving Stop System (EDSS) operates only when Lane Centering Function is operating. Refer to Owner's Manual for full details.</span></span></div>
        </li>

        <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">X-Mode - 2 mode</div>
        </li>

         <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">1,000kms a tank in hybrid variants<span class="subt136-footnote">*<span class="subt136-tooltip">2026 Subaru Forester Hybrid's range of over 1000km is based on a theoretical value calculated by multiplying the fuel consumption rate under the test conditions specified in Australian Design Rules (ADR) 81/02 by the fuel tank capacity. Actual real-world results may vary based on individual driving circumstances e.g. traffic conditions, driving style, vehicle modifications, fuel quality, climatic conditions etc.</span></span></div>
        </li>
</div>

       
        
      </ul>
                                                                                                                                                                                                                                                                              
          <p class="subt136-tech-description">
           Built for those who refuse to be confined, it’s smarter, safer, and more capable than ever. Born from a legacy of adventure the Subaru Forester has always been the SUV that does it all—confidence on every road, comfort for every journey, and capability when it counts. Now, it’s evolved again. With a bold new design, advanced safety, cutting-edge tech, and the choice of Subaru’s signature Boxer engine or new strong Hybrid e-Boxer engine, the all-new Subaru Forester is ready for what’s next.
          </p>
           <a class="subt136-forester__btn subt136-forester__btn--primary subt136-repayment-btn subt136-tabs-comparison" href="https://www.subaru.com.au/showroom" target="_self">Compare the Subaru range</a>
        </div>
      </div>
    </div>

    <div class="tab-panel" id="panel-outback">
      <div class="subt136-tab-panel">
        <div>
          <img class="subt136-tab-img" src="https://cdn.oem-production.subaru.com.au/media/hzukgbvm/my25-outback-awd-touring-xt-sapphirebluepearl-modelwalk-656x320.webp" alt="Outback" loading="lazy">
          <div class="subt136-tab-caption"><p style="text-align: center;">Outback AWD Touring XT</p></div>
          </div>
        <div>
          <img src="https://cdn.oem-production.subaru.com.au/media/50enxdtl/outback-badge.png" class="xKUK_OzNZg" loading="lazy" alt="Outback">
          <div class="subt136-tab-subtitle">Key features</div>
          <ul class="subt136-ownership__list">

        <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">Up to 2,400kg braked towing capacity<span class="subt136-footnote">*<span class="subt136-tooltip">Subaru Outback AWD, Outback AWD Sport and Outback AWD Touring feature 2,000kg towing capacity with trailer brakes. Subaru Outback AWD Sport XT and Outback AWD Touring XT feature a 2,400kg towing capacity with trailer brakes and requires fitment of Electric Brake Controller if towing mass is greater than 2,000kgs and is only capable of towing a trailer with a maximum of 2 axles. Towing capacity is subject to regulatory requirements, tow bar and vehicle design and towing equipment limitations. Requires fitment of optional tow bar accessory. Refer to Owner’s Manual for towing instructions. For further information, ask your local Subaru Retailer.</span></span></div>
        </li>

         <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">522L cargo space, 1267L with rear seats down</div>
        </li>

         <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">11.6" Infotainment screen</div>
        </li>

        
        
      </ul>

            <p class="subt136-tech-description"> The Subaru Outback is the perfect SUV perfect for growing families. Loaded with advanced safety and entertainment technology, great space and smart storage it’s one of the best cars on Australian roads, tracks and highways. Continuing to push boundaries with the incarnation of the all-new, turbocharged Subaru Outback range, it is the ultimate vehicle for any Australian family adventure​
            </p>
            <a class="subt136-forester__btn subt136-forester__btn--primary subt136-repayment-btn subt136-tabs-comparison" href="https://www.subaru.com.au/showroom" target="_self">Compare the Subaru range</a>                                                                                                                                                                                                                                                                  
          </div>
      </div>
    </div>

    <div class="tab-panel" id="panel-crosstrek">
      <div class="subt136-tab-panel">
        <div>
          <img class="subt136-tab-img" src="https://cdn.oem-production.subaru.com.au/media/vvnhsw4u/my26-crosstrek-awd-20l-front-crystal-white-pearl.png" alt="Crosstrek" loading="lazy">
         <div class="subt136-tab-caption"><p style="text-align: center;">Crosstrek AWD 2.0L</p></div>
          </div>
        <div>
          <img src="https://cdn.oem-production.subaru.com.au/media/i3rjpi1k/home-page-crosstrek-badge-1.png" class="xKUK_OzNZg" loading="lazy" alt="Crosstrek">
          <div class="subt136-tab-subtitle">Key features</div>
          <ul class="subt136-ownership__list">

        <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">Compact agility with spacious interior and up to 992-litre cargo capacity (rear seats down)<span class="subt136-footnote">*<span class="subt136-tooltip">496-litre cargo space, 1174-litres with rear seats down available in Subaru Forester petrol variants. 484-litre cargo volume, 1162-litres with rear seats down available in the Subaru Forester Hybrid variants.</span></span></div>
        </li>

         <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">Subaru's Symmetrical All-Wheel Drive with X-Mode for all-terrain confidence</div>
        </li>

         <li>
        <div class="subt136-ownership__check" aria-hidden="true">
        <i class="subt136-ownership__check-icon"><img src="//cdn.optimizely.com/img/15841360337/e97fb67b5afe46b5a03f769acc0aa53d.svg" alt=""></i>
        </div>
        <div class="subt136-ownership__list-item-body">Available in Hybrid and Petrol powertrains</div>
        </li>

        
        
      </ul>
                                                                                                                                                                                                                                                                              
          <p class="subt136-tech-description">
          Ready to inspire you to move to the beat of your own drum, the Subaru Crosstrek sets a new benchmark, combining an irresistible sporty attitude with unmatched off-road capability, human-centred design comfort, intuitive technology and cutting-edge safety features.
          </p>
          <a class="subt136-forester__btn subt136-forester__btn--primary subt136-repayment-btn subt136-tabs-comparison" href="https://www.subaru.com.au/showroom" target="_self">Compare the Subaru range</a>
        </div>
      </div>
    </div>
  </div>
</div>`


    },
    isMobile: () => window.innerWidth <= 768,

    swapMobileElements: () => {
        if (!config.isMobile()) return;

        const foresterSection = document.querySelector('[data-subt136-section2]');
        if (!foresterSection) return;

        const cta = foresterSection.querySelector('.subt136-forester__cta');
        const image = foresterSection.querySelector('.subt136-forester__image');
        const content = foresterSection.querySelector('.subt136-forester__content');

        if (!cta || !image || !content) return;

        // Move CTA after image (swap positions)
        if (image.nextSibling !== cta) {
            content.appendChild(image);
            content.appendChild(cta);
        }

        // Move tech-left link after tech-right in all tech sections
        const techContainers = Kameleoon.API.Utils.querySelectorAll('.subt136-tech-container');
        techContainers.forEach((container) => {
            const techLeft = container.querySelector('.subt136-tech-left');
            const techRight = container.querySelector('.subt136-tech-right');
            const techLink = techLeft ? techLeft.querySelector('.subt136-tech-link') : null;

            if (techLink && techRight) {
                techRight.appendChild(techLink);
            }
        });

        const el = document.querySelector('#cid-62492 .anVEuPfQf3');

        if (el) {
            el.textContent = 'Awards & Recognition';
        }

        const insertSeparators = (selectors) => {
            selectors.forEach((selector) => {
                const elements = Kameleoon.API.Utils.querySelectorAll(selector);
                if (!elements.length) {
                    console.warn(`No elements found for selector "${selector}"`);
                    return;
                }
                elements.forEach((el) => {
                    if (el.nextSibling.classList.contains('subt136-icon-separator')) return;
                    el.insertAdjacentHTML('afterend', '<div class="subt136-icon-separator"></div>');
                });
            });
        };

        insertSeparators([
            '#cid-62675 #ImageIcon-1',
            '#cid-62675 #ImageIcon-2',
            '#cid-62678 #ImageIcon-1'
        ]);

        // Replace image src for #cid-62675 on mobile - hide original and inject mobile version
        const replaceTechImage = () => {
            const techImageBlock = document.querySelector('#cid-62675 .IVbDH3tw6m');
            if (techImageBlock) {
                // Hide the original block
                techImageBlock.style.display = 'none';

                // Check if mobile version already injected
                if (!document.querySelector('[data-subt136-tech-mobile]')) {
                    const mobileHTML = `
                    <div class="subt136-tech-mobile-wrapper" data-subt136-tech-mobile>
                        <div class="subt136-tech-mobile-hero">
                            <img src="https://cdn.optimizely.com/img/15841360337/511d186752af464297dfd12e70a2889e.png" loading="lazy" alt="Subaru Forester AWD Hybrid Sport">
                            <div class="subt136-tech-mobile-caption">
                                <p>Subaru Forester AWD Hybrid Sport</p>
                            </div>
                        </div>
                    </div>`;

                    techImageBlock.insertAdjacentHTML('afterend', mobileHTML);
                }
            } else {
                // Retry if elements not found yet
                Kameleoon.API.Utils.setTimeout(replaceTechImage, 100);
            }
        };
        replaceTechImage();

        // Replace image src for #cid-62676 (Interior) on mobile - hide original and inject mobile version
        const replaceInteriorImage = () => {
            const interiorImageBlock = document.querySelector('#cid-62676 .IVbDH3tw6m');
            if (interiorImageBlock) {
                // Hide the original block
                interiorImageBlock.style.display = 'none';

                // Check if mobile version already injected
                if (!document.querySelector('[data-subt136-interior-mobile]')) {
                    const mobileHTML = `
                    <div class="subt136-interior-mobile-wrapper" data-subt136-interior-mobile>
                        <div class="subt136-interior-mobile-hero">
                            <div class="subt136-interior-mobile-icons">
                                <div class="subt136-interior-mobile-icon">
                                    <img src="https://cdn.oem-production.subaru.com.au/media/bucoezpf/5-seats.gif" alt="5 seats">
                                    <div class="subt136-interior-mobile-icon-label">
                                        <span>5 seats</span>
                                    </div>
                                </div>
                                <div class="subt136-icons-divider"></div>
                                <div class="subt136-interior-mobile-icon">
                                    <img src="https://cdn.oem-production.subaru.com.au/media/neigzyqy/60-40-split-rear-seatback.gif" alt="60/40 Split Rear Seatback">
                                    <div class="subt136-interior-mobile-icon-label">
                                        <span>60/40 Split Rear Seatback</span>
                                    </div>
                                </div>
                                <div class="subt136-icons-divider"></div>
                                <div class="subt136-interior-mobile-icon">
                                    <img src="https://cdn.oem-production.subaru.com.au/media/pyifdmeu/air-conditioning-dual-zone-climate-control.gif" alt="Air-conditioning – Dual Zone Climate Control">
                                    <div class="subt136-interior-mobile-icon-label">
                                        <span>Air-conditioning – Dual Zone Climate Control</span>
                                    </div>
                                </div>
                                <div class="subt136-icons-divider"></div>
                                <div class="subt136-interior-mobile-icon">
                                    <img src="https://cdn.oem-production.subaru.com.au/media/n03gak3z/8-way-power-seat.gif" alt="8-way Power Seat">
                                    <div class="subt136-interior-mobile-icon-label">
                                        <span>8-way Power Seat</span>
                                        <span class="subt136-footnote">*</span>
                                    </div>
                                </div>
                            </div>
                            <img src="https://cdn.optimizely.com/img/15841360337/78b585ed29df4637bc12f1cec74f4a32.png" loading="lazy" alt="Subaru Forester AWD Touring">
                            <div class="subt136-interior-mobile-caption">
                                <p>Subaru Forester AWD Touring</p>
                            </div>
                        </div>
                    </div>`;

                    interiorImageBlock.insertAdjacentHTML('afterend', mobileHTML);
                }
            } else {
                // Retry if elements not found yet
                Kameleoon.API.Utils.setTimeout(replaceInteriorImage, 100);
            }
        };
        replaceInteriorImage();
    },

    moveReactBlocks: () => {
        // moving review section above model compare section

        const reviewSection = document.querySelector('.NFhp0A6EUn');
        const modelCompareSection = document.querySelector('.customContentPage .Q7fRqbxtJd');

        if (!reviewSection || !modelCompareSection) return;

        const reviewSectionReact = reviewSection.closest('div[id^="react_"]');
        const modelCompareSectionReact = modelCompareSection.closest('div[id^="react_"]');

        if (!reviewSectionReact || !modelCompareSectionReact) return;

        if (reviewSectionReact.previousSibling !== modelCompareSectionReact) {
            modelCompareSectionReact.parentNode.insertBefore(reviewSectionReact, modelCompareSectionReact);
            // // console.log('✅ Moved');
        }

        // move technology and interior sections


        // const headings = document.querySelectorAll('.FxFnug863P .anVEuPfQf3 h2');

        const techReact = document.querySelector('#cid-62675') ? document.querySelector('#cid-62675').closest('div[id^="react_"]') : null;
        const interiorReact = document.querySelector('#cid-62676') ? document.querySelector('#cid-62676').closest('div[id^="react_"]') : null;


        if (!modelCompareSection) return;

        const modelCompareReact = modelCompareSection.closest('div[id^="react_"]');
        if (!modelCompareReact) return;

        // ✅ Move Technology AFTER model compare
        if (techReact && modelCompareReact.nextSibling !== techReact) {
            modelCompareReact.parentNode.insertBefore(
                techReact,
                modelCompareReact.nextSibling
            );
            // console.log('✅ Technology moved after model compare');
        }

        // Inject custom tech block: domInjector expects STRING selectors, not Elements (Element → "[object HTMLDivElement]" error).
        if (techReact) {
            domInjector.inject({
                parentSelector: `#${techReact.id}`,
                targetRelativeSelector: '.tqQQ5puA4B.qn23cDY3tW',
                html: config.HTMLs.techContent,
                position: 'afterend',
                uniqueId: '[data-subt136-tech-content]',
                uniqueScope: 'document'
            });
        }


        // ✅ Move Interior AFTER Technology (optional - adjust if needed)
        if (interiorReact && techReact && techReact.nextSibling !== interiorReact) {
            techReact.parentNode.insertBefore(
                interiorReact,
                techReact.nextSibling
            );
            // console.log('✅ Interior moved after Technology');
        }

        // Inject custom interior block (same pattern as tech)
        if (interiorReact && interiorReact.id) {
            domInjector.inject({
                parentSelector: `#${interiorReact.id}`,
                targetRelativeSelector: '.tqQQ5puA4B.qn23cDY3tW',
                html: config.HTMLs.interiorContent,
                position: 'afterend',
                uniqueId: '[data-subt136-interior-content]',
                uniqueScope: 'document'
            });
        }


        // move navigation after newheadline

        const navigation = document.querySelector('.XdXNCvU5i3');
        const newHeadline = document.querySelector('.subt136-new-headline');
        if (navigation && newHeadline) {
            newHeadline.parentNode.insertBefore(navigation, newHeadline.nextSibling);
        }

        // move Design section after capable section

        const designSectionEl = document.querySelector('#cid-62673');
        const capableSectionEl = document.querySelector('#cid-62674');
        const designSection = designSectionEl ? designSectionEl.closest('div[id^="react_"]') : null;
        const capableSection = capableSectionEl ? capableSectionEl.closest('div[id^="react_"]') : null;
        if (designSection && capableSection) {
            capableSection.parentNode.insertBefore(designSection, capableSection.nextSibling);
        }


        // move towing section before accessories section

        const towingSectionEl = document.querySelector('#cid-62712');
        const accessoriesSectionEl = document.querySelector('#cid-62547');
        const towingSection = towingSectionEl ? towingSectionEl.closest('div[id^="react_"]') : null;
        const accessoriesSection = accessoriesSectionEl ? accessoriesSectionEl.closest('div[id^="react_"]') : null;
        if (towingSection && accessoriesSection) {
            accessoriesSection.parentNode.insertBefore(towingSection, accessoriesSection);
        }
    },
    featureNavOrder: [
        'Technology',
        'Interior',
        'Performance',
        'Hybrid',
        'Reviews',
        'Design',
        'Safety Systems',
        'Towing',
        'Accessories',
        'Gallery'
    ],

    _featureNavOrderIndex(label) {
        const key = (label || '').trim();
        if (key === 'Safety') {
            return config.featureNavOrder.indexOf('Safety Systems');
        }
        const i = config.featureNavOrder.indexOf(key);
        return i !== -1 ? i : 999;
    },

    reorderFeatureNav() {
        const roots = Kameleoon.API.Utils.querySelectorAll('.XdXNCvU5i3');
        for (let r = 0; r < roots.length; r += 1) {
            const root = roots[r];
            const ul = root.querySelector('ul');
            if (!ul) continue;

            const lis = [];
            for (let c = 0; c < ul.children.length; c += 1) {
                if (ul.children[c].tagName === 'LI') lis.push(ul.children[c]);
            }
            if (!lis.length) continue;

            let topLi = null;
            const navLis = [];
            for (let i = 0; i < lis.length; i += 1) {
                const li = lis[i];
                const a = li.querySelector('a');
                const text = a ? a.textContent.replace(/\s+/g, ' ').trim() : '';
                if (a && (a.classList.contains('DxvRogjkmL') || /^TOP$/i.test(text))) {
                    topLi = li;
                } else {
                    navLis.push(li);
                }
            }

            for (let j = 0; j < navLis.length; j += 1) {
                const li = navLis[j];
                const a = li.querySelector('a');
                const text = a ? a.textContent.replace(/\s+/g, ' ').trim() : '';
                if (text === 'Finance') {
                    li.parentNode.removeChild(li);
                }
            }

            const remaining = [];
            for (let c = 0; c < ul.children.length; c += 1) {
                const li = ul.children[c];
                if (li.tagName === 'LI' && li !== topLi) remaining.push(li);
            }
            remaining.sort((a, b) => {
                const ta = a.querySelector('a') ? a.querySelector('a').textContent.replace(/\s+/g, ' ').trim() : '';
                const tb = b.querySelector('a') ? b.querySelector('a').textContent.replace(/\s+/g, ' ').trim() : '';
                return config._featureNavOrderIndex(ta) - config._featureNavOrderIndex(tb);
            });

            for (let k = 0; k < remaining.length; k += 1) {
                ul.appendChild(remaining[k]);
            }
            if (topLi && topLi.parentNode === ul) {
                ul.appendChild(topLi);
            }

            for (let n = 0; n < ul.children.length; n += 1) {
                const li = ul.children[n];
                if (li.tagName !== 'LI') continue;
                const a = li.querySelector('a');
                if (!a || a.classList.contains('DxvRogjkmL')) continue;
                const label = a.textContent.replace(/\s+/g, ' ').trim();
                if (label !== 'Safety Systems') continue;
                const span = a.querySelector('span');
                if (span && !span.querySelector('svg')) {
                    span.textContent = 'Safety';
                } else {
                    a.textContent = 'Safety';
                }
            }
        }
    },

    /** Capable block (#cid-62674): keep hero img src when React overwrites it */
    capableSectionImageUrl: '//cdn.optimizely.com/img/15841360337/fe3866c02cd54c918540736805b98c0a.png',
    _capableImgObserver: null,

    observeCapableSectionImage() {
        if (config._capableImgObserver) return;

        const root = document.querySelector('#cid-62674');
        if (!root) {
            Kameleoon.API.Core.runWhenElementPresent('#cid-62674', () => {
                if (!config._capableImgObserver) config.observeCapableSectionImage();
            }, 15000);
            return;
        }

        const url = config.capableSectionImageUrl;
        const base = url.split('/').pop() || '';
        const fileId = base.replace(/\.[^.]+$/, '');

        const patch = () => {
            const img = document.querySelector('#cid-62674 img');
            if (!img || !fileId) return;
            const cur = (img.getAttribute('src') || img.src || '');
            if (cur.indexOf(fileId) !== -1) return;
            img.src = url;
        };

        let timer;
        const debounced = () => {
            Kameleoon.API.Utils.clearTimeout(timer);
            timer = Kameleoon.API.Utils.setTimeout(patch, 50);
        };

        patch();
        config._capableImgObserver = new MutationObserver(debounced);
        config._capableImgObserver.observe(root, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });
    },

    /** SGP block (#cid-62700): keep section image src when React overwrites it */
    sgpSectionImageUrl: '//cdn.optimizely.com/img/15841360337/b2a3fa6264364cde8f3536581718fe50.png',
    _sgpImgObserver: null,

    observeSgpSectionImage() {
        if (config._sgpImgObserver) return;

        const root = document.querySelector('#cid-62700');
        if (!root) {
            Kameleoon.API.Core.runWhenElementPresent('#cid-62700', () => {
                if (!config._sgpImgObserver) config.observeSgpSectionImage();
            }, 15000);
            return;
        }

        const url = config.sgpSectionImageUrl;
        const base = url.split('/').pop() || '';
        const fileId = base.replace(/\.[^.]+$/, '');

        const patch = () => {
            const img = document.querySelector('#cid-62700 .IVbDH3tw6m img');
            if (!img || !fileId) return;
            const cur = (img.getAttribute('src') || img.src || '');
            if (cur.indexOf(fileId) !== -1) return;
            img.src = url;
        };

        let timer;
        const debounced = () => {
            Kameleoon.API.Utils.clearTimeout(timer);
            timer = Kameleoon.API.Utils.setTimeout(patch, 50);
        };

        patch();
        config._sgpImgObserver = new MutationObserver(debounced);
        config._sgpImgObserver.observe(root, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });
    },

    restructureUI: () => {
        domInjector.inject({
            targetSelector: '.gXRHtZp55h .Q7fRqbxtJd',
            parentSelector: '.gXRHtZp55h',
            html: config.HTMLs.section2,
            position: 'afterbegin',
            uniqueId: '[data-subt136-section2]'
        });

        domInjector.inject({
            targetSelector: '.gXRHtZp55h',
            parentSelector: '.gXRHtZp55h',
            html: config.HTMLs.section4,
            position: 'beforeend',
            uniqueId: '[data-subt136-section4]'
        });

        // First .RfaLGDNWSW inside FIRST .Vo8hB_ClC_ only — not document-wide .RfaLGDNWSW (avoids mismatch with duplicate stacks).
        // uniqueScope 'document' ensures a single headline even if dedupe under parent ever fails.
        domInjector.inject({
            parentSelector: '.Vo8hB_ClC_',
            targetRelativeSelector: '.RfaLGDNWSW',
            html: config.HTMLs.newHeadline,
            position: 'afterend',
            uniqueId: '[data-subt136-section-new-headline]',
            uniqueScope: 'document'
        });

        config.moveReactBlocks();
        config.reorderFeatureNav();
        Kameleoon.API.Utils.setTimeout(() => {
            config.reorderFeatureNav();
        }, 400);
        Kameleoon.API.Utils.setTimeout(() => {
            config.reorderFeatureNav();
        }, 1200);

        // performance content change
        // insert performance content afterbegin of #cid-62678 .tqQQ5puA4B.JDuvqrq_5y
        const performanceTarget = document.querySelector('#cid-62678 .tqQQ5puA4B');
        if (performanceTarget) {
            performanceTarget.insertAdjacentHTML('afterbegin', config.HTMLs.performanceContent);
            // console.log('✅ Performance content injected');
        }

        // capable content change
        const capableTarget = document.querySelector('#cid-62674 .tqQQ5puA4B');
        if (capableTarget) {
            capableTarget.insertAdjacentHTML('afterbegin', config.HTMLs.capableContent);
            // console.log('✅ Capable content injected');
        }
        config.observeCapableSectionImage();

        // design content change
        const designTarget = document.querySelector('#cid-62673 .tqQQ5puA4B');
        if (designTarget) {
            designTarget.insertAdjacentHTML('afterbegin', config.HTMLs.designContent);
            // console.log('✅ Design content injected');
        }

        // safety content change
        const safetyTarget = document.querySelector('#cid-62707 .bdoBCtd4bD');
        if (safetyTarget) {
            safetyTarget.insertAdjacentHTML('afterbegin', config.HTMLs.safetyContent);
            // console.log('✅ Safety content injected');
        }

        // youtube content change
        const youtubeTarget = document.querySelector('#cid-62701 .UmdTQMBfGY p');
        if (youtubeTarget) {
            youtubeTarget.insertAdjacentHTML('afterend', config.HTMLs.youtubeContent);
            // console.log('✅ Youtube content injected');
        }

        // vision assist content change
        const visionAssistTarget = document.querySelector('#cid-62671 .tqQQ5puA4B');
        if (visionAssistTarget) {
            visionAssistTarget.insertAdjacentHTML('beforeend', config.HTMLs.visionAssistContent);
            // console.log('✅ Vision Assist content injected');
        }

        // DMS content change
        const DMSTarget = document.querySelector('#cid-62694 .tqQQ5puA4B');
        if (DMSTarget) {
            DMSTarget.insertAdjacentHTML('beforeend', config.HTMLs.DMSContent);
            // console.log('✅ DMS content injected');
        }

        // SGP content change
        const SGPTarget = document.querySelector('#cid-62700 .tqQQ5puA4B');
        if (SGPTarget) {
            SGPTarget.insertAdjacentHTML('afterbegin', config.HTMLs.SGPContent);
            // console.log('✅ SGP content injected');
        }
        config.observeSgpSectionImage();

        // Boxer content change
        const boxerSectionEl = document.querySelector('#cid-62700');
        const BoxerTarget = boxerSectionEl ? boxerSectionEl.closest('div[id^="react_"]') : null;
        if (BoxerTarget) {
            BoxerTarget.insertAdjacentHTML('afterend', config.HTMLs.boxerContent);
            // console.log('✅ Boxer content injected');
        }

        const familyTarget = document.querySelector('.subt136-tech-section[data-subt136-boxer-content]');
        if (familyTarget) {
            familyTarget.insertAdjacentHTML('afterend', config.HTMLs.familyContent);
            // console.log('✅ Family content injected');
        }

        // towing content change
        const towingTarget = document.querySelector('#cid-62712 .bdoBCtd4bD');
        if (towingTarget) {
            towingTarget.insertAdjacentHTML('afterend', config.HTMLs.towingContent);
            // console.log('✅ Towing content injected');
        }
        // insert tabs content afterend of .Vo8hB_ClC_ .RfaLGDNWSW
        domInjector.inject({
            parentSelector: '.Vo8hB_ClC_',
            targetRelativeSelector: '.RfaLGDNWSW',
            html: config.HTMLs.tabsContent,
            position: 'afterend',
            uniqueId: '[data-subt136-tabs]',
            uniqueScope: 'document'
        });


        config.tabsFunctionality();
        config.initTooltipEdgeAdjust();
        config.swapMobileElements();
    },
    initTooltipEdgeAdjust: () => {
        if (document.body.getAttribute('data-subt136-tooltip-edge-bound')) return;
        document.body.setAttribute('data-subt136-tooltip-edge-bound', 'true');

        const adjust = (footnoteEl) => {
            if (!footnoteEl) return;
            const tooltip = footnoteEl.querySelector('.subt136-tooltip');
            if (!tooltip) return;

            // reset to authored CSS position first
            tooltip.style.left = '';
            tooltip.style.right = '';

            const rect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const gap = 8;

            // if touching/overflowing left viewport edge, push right
            if (rect.left < gap) {
                const shiftRight = gap - rect.left;
                tooltip.style.left = `${-130 + shiftRight}px`;
            }

            // if touching/overflowing right viewport edge, pull left
            const rectAfterLeftFix = tooltip.getBoundingClientRect();
            if (rectAfterLeftFix.right > viewportWidth - gap) {
                const overflow = rectAfterLeftFix.right - (viewportWidth - gap);
                const currentLeft = parseFloat(tooltip.style.left || '-130');
                tooltip.style.left = `${currentLeft - overflow}px`;
            }
        };

        const reset = (footnoteEl) => {
            if (!footnoteEl) return;
            const tooltip = footnoteEl.querySelector('.subt136-tooltip');
            if (!tooltip) return;
            tooltip.style.left = '';
            tooltip.style.right = '';
        };

        document.addEventListener('mouseenter', (e) => {
            const t = e.target;
            const footnote = t && t.closest ? t.closest('.subt136-footnote') : null;
            if (!footnote) return;
            adjust(footnote);
        }, true);

        document.addEventListener('mouseleave', (e) => {
            const t = e.target;
            const footnote = t && t.closest ? t.closest('.subt136-footnote') : null;
            if (!footnote) return;
            reset(footnote);
        }, true);
    },
    tabsFunctionality: () => {
        const root = document.querySelector('.subaru-tab-container');
        if (!root) return;

        const setActive = (vehicleKey) => {
            if (!vehicleKey) return;
            const triggers = root.querySelectorAll('.tab-vehicle-content');
            for (let i = 0; i < triggers.length; i += 1) {
                const el = triggers[i];
                const isActive = el.getAttribute('data-vehicle') === vehicleKey;
                if (isActive) {
                    el.classList.add('active-vehicle');
                } else {
                    el.classList.remove('active-vehicle');
                }
            }

            const panels = root.querySelectorAll('.tab-panel');
            for (let i = 0; i < panels.length; i += 1) {
                const p = panels[i];
                const isActive = p.id === `panel-${vehicleKey}`;
                if (isActive) {
                    p.classList.add('active-panel');
                } else {
                    p.classList.remove('active-panel');
                }
            }
        };

        // Ensure initial state is consistent (in case React reorders / re-injects)
        const initial = root.querySelector('.tab-vehicle-content.active-vehicle');
        const initialKey = initial ? initial.getAttribute('data-vehicle') : 'forester';
        setActive(initialKey);

        // Click handler (event delegation)
        if (!root.getAttribute('data-subt136-tabs-bound')) {
            root.setAttribute('data-subt136-tabs-bound', 'true');
            Kameleoon.API.Utils.addEventListener(root, 'click', (e) => {
                const t = e.target;

                const compareCta = t && t.closest ? t.closest('.subt136-tabs-comparison') : null;
                if (compareCta && root.contains(compareCta)) {
                    e.preventDefault();
                    const btn = document.querySelector('.Vo8hB_ClC_ .RfaLGDNWSW button');
                    if (btn) btn.click();
                    return;
                }

                const trigger = t && t.closest ? t.closest('.tab-vehicle-content') : null;
                if (!trigger || !root.contains(trigger)) return;
                e.preventDefault();
                setActive(trigger.getAttribute('data-vehicle'));
            });
        }
    }

};
export default config;
