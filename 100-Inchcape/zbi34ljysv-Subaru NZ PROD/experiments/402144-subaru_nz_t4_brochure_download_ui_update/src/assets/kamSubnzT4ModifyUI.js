/* eslint-disable max-len */
function kamSubnzT4SetupDialogCloseButton() {
    const dialog = document.querySelector('.model-links-dialog');
    if (!dialog) return;

    const existingCloseButton = dialog.querySelector('.js-dialog-close');
    if (!existingCloseButton) return;

    existingCloseButton.classList.add('subnzt4-hidden');

    if (dialog.querySelector('.subnzt4-dialog-close')) return;

    const closeButtonHTML = `
    <button class="subnzt4-dialog-close" type="button" aria-label="Close dialog">
      <img src="//cdn.optimizely.com/img/15841360337/9580a33a875a4966bd5f037a3c109e26.svg" alt="Close">
    </button>
  `;

    dialog.insertAdjacentHTML('afterbegin', closeButtonHTML);

    const customCloseButton = dialog.querySelector('.subnzt4-dialog-close');
    if (customCloseButton) {
        Kameleoon.API.Utils.addEventListener(customCloseButton, 'click', () => {
            existingCloseButton.click();
        });
    }
}

export default function kamSubnzT4ModifyUI() {
    const form = document.querySelector('form.webform-submission-form');
    if (!form) return;

    const modelImageMap = {
        Solterra:
      '//cdn.optimizely.com/img/15841360337/5f658c1c05ff43548290c0c8f83a3ddd.png',
        'Solterra EV':
      '//cdn.optimizely.com/img/15841360337/5f658c1c05ff43548290c0c8f83a3ddd.png',
        Crosstrek:
      '//cdn.optimizely.com/img/15841360337/7bf2dab960764995b7ac7b180f01cf6f.png',
        'All-new Forester':
      '//cdn.optimizely.com/img/15841360337/b18cd88f25434c4eb358e83e92d72b86.png',
        Forester:
      '//cdn.optimizely.com/img/15841360337/b18cd88f25434c4eb358e83e92d72b86.png',
        Outback:
      '//cdn.optimizely.com/img/15841360337/ab613538f0b443e586cb9f63d2ddd6b4.png',
        Impreza:
      '//cdn.optimizely.com/img/15841360337/fe11f203c5814eccad7ca3363a2fa586.png',
        'Subaru country brochure':
      '//cdn.optimizely.com/img/15841360337/70516b5a568048f48272519a7b4733f7.png',
        'Subaru Country Brochure':
      '//cdn.optimizely.com/img/15841360337/70516b5a568048f48272519a7b4733f7.png',
    };

    const modelImageMapMobile = {
        Solterra:
      '//cdn.optimizely.com/img/15841360337/c78cdd7e1ac44e01bb5f850d20e95133.png',
        'Solterra EV':
      '//cdn.optimizely.com/img/15841360337/c78cdd7e1ac44e01bb5f850d20e95133.png',
        Crosstrek:
      '//cdn.optimizely.com/img/15841360337/4de17cb7a0c246f595787a4683f5f1b3.png',
        'All-new Forester':
      '//cdn.optimizely.com/img/15841360337/184559ddf743477ca3e919080308439c.png',
        Forester:
      '//cdn.optimizely.com/img/15841360337/184559ddf743477ca3e919080308439c.png',
        Outback:
      '//cdn.optimizely.com/img/15841360337/73eb38ae7fc548f3a72bdc1ee91731f7.png',
        Impreza:
      '//cdn.optimizely.com/img/15841360337/582429892a9e480dab2c3ff629810482.png',
        'Subaru country brochure':
      '//cdn.optimizely.com/img/15841360337/165c16ce5fe1438e89c81594897b7cd6.png',
        'Subaru Country Brochure':
      '//cdn.optimizely.com/img/15841360337/165c16ce5fe1438e89c81594897b7cd6.png',
    };

    const modelsList = form.querySelector('.model--brochure ul.list-unstyled');
    let cardsHTML = '';

    if (modelsList) {
        const modelItems = modelsList.querySelectorAll('li.views-row');
        modelItems.forEach((item) => {
            const modelWrapper = item
                .querySelector('.select-model-wrapper, .model__field-teaser')
                ?.closest('div');
            const modelId = modelWrapper?.dataset?.modelId || modelWrapper?.id?.match(/\d+/)?.[0];
            const nameEl = item.querySelector('.model__name');

            const modelName = nameEl ? nameEl.textContent.trim() : '';
            const imgAlt = nameEl ? nameEl.textContent.trim() : '';

            const nativeImgSrc = item.querySelector('img')?.src || '';
            const imgSrcDesktop = nativeImgSrc || modelImageMap[modelName] || '';
            const imgSrcMobile = nativeImgSrc || modelImageMapMobile[modelName] || imgSrcDesktop;

            const isCountryBrochure = modelName.includes('Subaru country brochure')
                || modelName.includes('Subaru Country Brochure');

            let pdfLink = '';
            if (isCountryBrochure) {
                const downloadLink = item.querySelector('a[download]');
                if (downloadLink) {
                    pdfLink = downloadLink.href || downloadLink.getAttribute('href') || '';
                }
            }

            cardsHTML += `
        <div class="brochure-card" data-model-id="${
    modelId || ''
}" data-is-country-brochure="${isCountryBrochure}" data-pdf-link="${pdfLink}">
          <div class="brochure-card__image">
            <picture>
              <source media="(max-width: 768px)" srcset="${imgSrcMobile}">
              <img src="${imgSrcDesktop}" alt="${imgAlt}" class="img-fluid" loading="lazy">
            </picture>
          </div>
          <div class="brochure-card__name">${modelName}</div>
          <div class="brochure-card__checkbox">
            <input type="checkbox" id="brochure-checkbox-${
    modelId || 'country'
}" class="brochure-checkbox" data-model-id="${
    modelId || ''
}" data-is-country-brochure="${isCountryBrochure}">
            <label for="brochure-checkbox-${
    modelId || 'country'
}">Select</label>
          </div>
        </div>
      `;
        });
    }

    const layoutHTML = `
    <div class="brochure-form-layout">
      <div class="step-1-container">
        <h2 class="step-header">
          <span class="step-number">STEP 1</span> <span class="step-title">SELECT YOUR BROCHURES</span>
        </h2>
        <div class="brochure-cards-grid">
          ${cardsHTML}
        </div>
        <div class="brochure-selection-instruction subnzt4-hidden">
          <div class="brochure-selection-instruction__icon">
            <img src="//cdn.optimizely.com/img/15841360337/7d199998dfc5409994fc06dd41e7e814.svg" alt="Point up">
          </div>
          <p class="brochure-selection-instruction__text">Select the models above to choose your brochures</p>
        </div>
        <div class="brochure-ready-instruction subnzt4-hidden">
          <div class="brochure-ready-instruction__icon">
            <img src="//cdn.optimizely.com/img/15841360337/cf53f88869fa497da51ab465f7f088b3.svg" alt="Scroll down">
          </div>
          <p class="brochure-ready-instruction__text">Ready to get your brochure? </br> Scroll down to enter your details</p>
        </div>
      </div>
      <div class="step-2-container">
        <h2 class="step-header">
          <span class="step-number">STEP 2</span> <span class="step-title">GET YOUR BROCHURES</span>
        </h2>
        <div class="step-2-placeholder">
          <p class="step-2-placeholder__text">Select a model on the left to get started</p>
          <div class="step-2-placeholder__icon">
            <img src="//cdn.optimizely.com/img/15841360337/9ca404dcf8b146459e2167045db48f10.png" alt="Envelope icon">
          </div>
        </div>
        <div class="step-2-form subnzt4-hidden">
        </div>
      </div>
    </div>
  `;

    form.insertAdjacentHTML('afterbegin', layoutHTML);

    const formContainer = form.querySelector('#edit-container');
    const step2Form = form.querySelector('.step-2-form');

    if (formContainer && step2Form) {
        const title = formContainer.querySelector('#edit-title');
        if (title) {
            step2Form.appendChild(title);
        }

        const firstNameField = formContainer
            .querySelector('#edit-first-name')
            ?.closest('.form-item');
        const lastNameField = formContainer
            .querySelector('#edit-last-name')
            ?.closest('.form-item');
        const emailField = formContainer
            .querySelector('#edit-email-address')
            ?.closest('.form-item');

        if (firstNameField) step2Form.appendChild(firstNameField);
        if (lastNameField) step2Form.appendChild(lastNameField);
        if (emailField) step2Form.appendChild(emailField);

        const dealerContact = formContainer
            .querySelector('#edit-dealer-contact')
            ?.closest('.form-item');
        const selectDealer = formContainer
            .querySelector('#edit-select-dealer')
            ?.closest('.form-item');
        const emailComms = formContainer
            .querySelector('#edit-signup-to-our-email-comms')
            ?.closest('.form-item');
        const privacyPolicy = formContainer
            .querySelector('#edit-accept-toc')
            ?.closest('.form-item');

        if (dealerContact) step2Form.appendChild(dealerContact);
        if (selectDealer) step2Form.appendChild(selectDealer);
        if (emailComms) step2Form.appendChild(emailComms);
        if (privacyPolicy) step2Form.appendChild(privacyPolicy);

        const submitButton = formContainer.querySelector('#edit-actions-submit');
        const skipButton = formContainer.querySelector('.js-direct-download');

        if (submitButton) {
            const buttonHTML = '<div class="form-buttons"></div>';
            step2Form.insertAdjacentHTML('beforeend', buttonHTML);
            const buttonContainer = step2Form.querySelector('.form-buttons');
            buttonContainer.appendChild(submitButton);
        }

        if (skipButton) {
            if (skipButton.textContent) {
                skipButton.textContent = skipButton.textContent.replace(
                    'Skip and direct download',
                    'Skip and download',
                );
            }
            const skipHTML = '<div class="skip-download-link"></div>';
            step2Form.insertAdjacentHTML('beforeend', skipHTML);
            const skipContainer = step2Form.querySelector('.skip-download-link');
            skipContainer.appendChild(skipButton);
        }
    }

    const columnOne = form.querySelector('.column-one');
    if (columnOne) {
        columnOne.classList.add('subnzt4-hidden');
    }

    const selectModelsFieldset = form.querySelector(
        '#edit-select-models--wrapper',
    );
    if (selectModelsFieldset) {
        selectModelsFieldset.classList.add('subnzt4-hidden');
    }

    if (formContainer) {
        formContainer.classList.add('subnzt4-form-container-hidden');
    }

    kamSubnzT4SetupDialogCloseButton();
}
