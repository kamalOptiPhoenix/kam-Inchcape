"use strict";

(function () {
  /* eslint-disable no-tabs */
  /* eslint-disable no-mixed-spaces-and-tabs */
  function getT2Html(modelname) {
    const isMobile = window.innerWidth <= 768;
    const brochureText = isMobile ? 'Download Brochure' : 'Download a Brochure';

    // Map showroom model names to configure URLs
    const modelToConfigureUrl = {
      solterra: 'https://www.subaru.co.nz/configure',
      crosstrek: 'https://www.subaru.co.nz/configure/trim-levels/NZCT',
      forester: 'https://www.subaru.co.nz/configure/trim-levels/NZFOR26',
      outback: 'https://www.subaru.co.nz/configure/trim-levels/NZOUT',
      impreza: 'https://www.subaru.co.nz/configure/trim-levels/NZIMP',
      wrx: 'https://www.subaru.co.nz/configure/trim-levels/NZWRX',
      brz: 'https://www.subaru.co.nz/configure/trim-levels/NZBRZ'
    };

    // Get the configure URL for the model, default to generic configure if not found
    const configureUrl = modelToConfigureUrl[modelname?.toLowerCase()] || 'https://www.subaru.co.nz/configure';
    return `
		<div id="t2butterbar" class="t2butterbar">
			<ul class="t2butterbar__list">
				<li class="t2butterbar__item t2butterbar__item--brochure">
					<img src="//cdn.optimizely.com/img/15841360337/23c4c8f7000b4fd890a41a2d3bf75029.svg" class="t2butterbar__icon" />
					<a href="https://www.subaru.co.nz/buying/download-a-brochure" class="t2butterbar__link t2butterbar__link--brochure">${brochureText}</a>
				</li>
				<li class="t2butterbar__item t2butterbar__item--build-price">
					<img src="//cdn.optimizely.com/img/15841360337/3b543308327a4841910aab57444b3d2e.svg" class="t2butterbar__icon" />
					<a href="${configureUrl}" class="t2butterbar__link t2butterbar__link--build-price">Build and Price</a>
				</li>
				<li class="t2butterbar__item t2butterbar__item--test-drive">
					<img src="//cdn.optimizely.com/img/15841360337/63a1777615fa420097b590d48bb715bf.svg" class="t2butterbar__icon" />
					<a href="https://www.subaru.co.nz/buying/book-a-test-drive" class="t2butterbar__link t2butterbar__link--test-drive">Book a Test Drive</a>
				</li>
				<li class="t2butterbar__item t2butterbar__item--dealer">
					<img src="//cdn.optimizely.com/img/15841360337/b73f0e933c414255ad29654900373924.svg" class="t2butterbar__icon" />
					<a href="https://www.subaru.co.nz/buying/dealers" class="t2butterbar__link t2butterbar__link--dealer">Locate a Dealer</a>
				</li>
				
			</ul>
		</div>
	`;
  }
  let lastScrollY = window.scrollY;
  function showBarFixed() {
    const bar = document.getElementById('t2butterbar');
    if (!bar) return;
    bar.classList.remove('at-top', 'hidden');
    bar.classList.add('fixed-top');
  }
  function moveBarAboveNav() {
    const bar = document.getElementById('t2butterbar');
    const header = document.querySelector('.header-regions-wrapper .site.header');
    if (!bar || !header) return;

    // Put bar before header
    header.insertAdjacentElement('beforebegin', bar);
    bar.classList.remove('fixed-top', 'hidden');
    bar.classList.add('at-top');
  }
  function handleScroll() {
    const currentY = window.scrollY;
    const scrollingUp = currentY < lastScrollY;
    lastScrollY = currentY;

    // === At very top of page ===
    if (currentY === 0) {
      moveBarAboveNav();
      return;
    }

    // === SCROLLING UP ===
    if (scrollingUp) {
      showBarFixed();
    }
  }

  /* eslint-disable no-unused-expressions */

  (function v1() {
    function init() {
      console.log('*** Subaru NZ T2 - Butter Bar v3 ***');
      document.body.classList.add('subnzt2');
      const t2Header = document.querySelector('.header-regions-wrapper .site.header');
      const modelname = window.location.pathname.split('/').filter(Boolean).pop();
      const t2Html = getT2Html(modelname);
      if (!document.getElementById('t2butterbar')) {
        t2Header.insertAdjacentHTML('beforebegin', t2Html);
        moveBarAboveNav(); // Initial render
        Kameleoon.API.Utils.addEventListener(window, 'scroll', handleScroll, {
          passive: true
        });

        // Add click listener to navigation toggle
        const navToggle = document.querySelector('.navigation__toggle');
        if (navToggle) {
          Kameleoon.API.Utils.addEventListener(navToggle, 'click', () => {
            const butterBar = document.getElementById('t2butterbar');
            if (!butterBar) return;
            if (navToggle.classList.contains('is-open')) {
              butterBar.classList.add('nav-open');
            } else {
              butterBar.classList.remove('nav-open');
            }
          });
        }
      }
    }
    if (!window.subnzt2Start) {
      window.subnzt2Start = true;
      Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('.header-regions-wrapper .site.header'), init);
    }
  })();
})();