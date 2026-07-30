"use strict";

(function () {
  /**
  * Gets model name from URL path using regex pattern
  */

  /**
  * Maps URL model names to form model values
  */
  function mapModelNameToValue(modelName) {
    if (!modelName) return null;
    const modelNameLower = modelName.toLowerCase();

    // Mapping from URL model names to form values
    const modelMap = {
      '2008-hybrid-suv': '2008 Hybrid',
      '2008-suv': '2008 Hybrid',
      // Default 2008 to Hybrid
      '3008-suv': '3008 Hybrid',
      '5008-hybrid-suv': '5008 Hybrid',
      '308-hybrid': '308 Hybrid',
      '408-hybrid': '408 Hybrid',
      'partner-van': 'Partner Van',
      'new-e-partner-van': 'New E-Partner Van',
      'diesel-expert-van': 'Expert Van',
      'e-expert': 'E-Expert Van',
      // For /models/expert-van/e-expert.html
      'expert-van': 'Expert Van',
      'boxer-van': 'Boxer Van'
    };
    return modelMap[modelNameLower] || null;
  }

  /**
  * Maps URL paths to model values
  * Can be used in both parent and iframe
  */
  function getModelFromUrl(url) {
    // Extract pathname from URL
    let pathname;
    try {
      const urlObj = new URL(url);
      pathname = urlObj.pathname;
    } catch (e) {
      // If URL parsing fails, try to extract pathname manually
      const match = url.match(/\/models\/[^?#]*/i);
      pathname = match ? match[0] : '';
    }

    // Handle special case: /models/expert-van/e-expert.html
    if (pathname.includes('/models/expert-van/e-expert')) {
      return 'E-Expert Van';
    }

    // Extract model name from path using regex
    const match = pathname.match(/\/models\/([^\/]+)\.html/);
    if (match && match[1]) {
      const modelName = match[1].trim();
      return mapModelNameToValue(modelName);
    }

    // Fallback to old pattern matching for edge cases
    const pathnameLower = pathname.toLowerCase();

    // Expert Van - check e-expert first (most specific)
    if (pathnameLower.includes('/models/expert-van/e-expert')) {
      return 'E-Expert Van';
    }

    // 2008 - check hybrid-suv before suv
    if (pathnameLower.includes('/models/2008-hybrid-suv')) {
      return '2008 Hybrid';
    }
    if (pathnameLower.includes('/models/2008-suv')) {
      return '2008 Hybrid';
    }

    // 3008
    if (pathnameLower.includes('/models/3008-suv')) {
      return '3008 Hybrid';
    }

    // 5008 - check hybrid-suv first
    if (pathnameLower.includes('/models/5008-hybrid-suv')) {
      return '5008 Hybrid';
    }

    // 308 - check hybrid first
    if (pathnameLower.includes('/models/308-hybrid')) {
      return '308 Hybrid';
    }
    if (pathnameLower.includes('/models/308')) {
      return '308 Hybrid';
    }

    // 408 - check hybrid first
    if (pathnameLower.includes('/models/408-hybrid')) {
      return '408 Hybrid';
    }
    if (pathnameLower.includes('/models/408')) {
      return '408 Hybrid';
    }

    // Partner Van - check new-e-partner first
    if (pathnameLower.includes('/models/new-e-partner-van')) {
      return 'New E-Partner Van';
    }
    if (pathnameLower.includes('/models/partner-van')) {
      return 'Partner Van';
    }

    // Expert Van - check diesel-expert first
    if (pathnameLower.includes('/models/diesel-expert-van')) {
      return 'Expert Van';
    }
    if (pathnameLower.includes('/models/expert-van')) {
      return 'Expert Van';
    }

    // Boxer Van
    if (pathnameLower.includes('/models/boxer-van')) {
      return 'Boxer Van';
    }
    return null;
  }

  // Track retry attempts to avoid infinite loops
  let retryCount = 0;
  const MAX_RETRIES = 10;

  /**
  * Selects the model in the dropdown if it exists
  */
  function selectModelInIframe(modelValue) {
    if (!modelValue) return;
    const modelSelect = document.querySelector('#model');
    if (!modelSelect) {
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        // Retry after a short delay
        setTimeout(() => selectModelInIframe(modelValue), 500);
      } else {
        retryCount = 0; // Reset for next attempt
      }
      return;
    }

    // Reset retry count on success
    retryCount = 0;

    // Find the option with matching value
    const options = modelSelect.querySelectorAll('option');
    let foundOption = null;
    options.forEach(option => {
      if (option.value === modelValue) {
        foundOption = option;
      }
    });
    if (foundOption) {
      // Only set if value is different to avoid unnecessary events
      if (modelSelect.value !== modelValue) {
        modelSelect.value = modelValue;

        // Trigger change event to ensure HTMX and other listeners are notified
        const changeEvent = new Event('change', {
          bubbles: true
        });
        modelSelect.dispatchEvent(changeEvent);

        // Also dispatch the custom modelChanged event
        document.body.dispatchEvent(new Event('modelChanged'));
      }
    }
  }

  // Track if message listener has been initialized to prevent duplicates
  let messageListenerInitialized = false;

  /**
  * Listens for messages from parent to select model based on URL or explicit model name
  */
  function initModelSelectionFromParent() {
    // Prevent duplicate listeners
    if (messageListenerInitialized) {
      console.log('***** iframe: message listener already initialized, skipping');
      return;
    }
    messageListenerInitialized = true;
    console.log('***** iframe: setting up message listener from parent');
    Kameleoon.API.Utils.addEventListener(window, 'message', event => {
      // Security check: verify origin (parent is peugeot.com.au, iframe is peugeotforms.inchcape.com.au)
      // Allow messages from peugeot.com.au origin
      if (!event.origin.includes('peugeot.com.au') && !event.origin.includes('peugeotforms.inchcape.com.au')) {
        return;
      }
      if (event.data && event.data.type === 'PCAT64_SELECT_MODEL_FROM_URL' && (event.data.url || event.data.modelValue)) {
        console.log('***** iframe received message from parent');
        console.log('***** event.data.url', event.data.url);
        console.log('***** event.data.modelValue', event.data.modelValue);

        // Prefer explicit model value if provided, otherwise derive from URL
        const incomingModelValue = event.data.modelValue || null;
        const modelValue = incomingModelValue || (event.data.url ? getModelFromUrl(event.data.url) : null);
        console.log('***** iframe extracted modelValue', modelValue);
        if (modelValue) {
          // Cache globally so it can also be reused on submit if needed
          try {
            window.pcat64SelectedModelFromParent = modelValue;
          } catch (e) {
            // Fail silently if window is not writable for some reason
          }
          console.log('***** iframe selecting model in dropdown', modelValue);
          selectModelInIframe(modelValue);
        }
      }
    });
  }

  /**
  * Maps model values to their image URLs from mega nav
  */
  function getModelImage(modelValue) {
    const modelImages = {
      '2008 Hybrid': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/2008/my25-2008-hybrid/2008-hybrid-model-fly-out-White.png',
      '3008 Hybrid': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/3008/2024/3008-hybrid/Peugeot-MY24-3008-MHEV-Sprite-810x455--.png',
      '308 Hybrid': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/308/my25-hybrid/308-hybrid-model-fly-out-Obsession-Blue-810x455.png',
      '408 Hybrid': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/408/408-hybrid/408-hybrid-model-fly-out-Okenite-White-R.png',
      '5008 Hybrid': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/5008-hybrid-model-fly-out-Ingaro-Blue-v2.png',
      'Boxer Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/boxer/2023/Boxer-LWB-810x455-White-R2.png',
      'E-Expert Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/expert/e-expert/Model-fly-out-810x455-E-Expert.png',
      'E-Partner Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-e-partner/my25-peugeot-e-partner-electric-van-810x455.png',
      'Expert Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/expert/2025-diesel/expert-facelift-model-fly-out-ice-white-v2.png',
      'New Boxer Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/boxer/2023/Boxer-LWB-810x455-White-R2.png',
      'New E-Partner Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-e-partner/my25-peugeot-e-partner-electric-van-810x455.png',
      'New Partner Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-ice/Partner-ICE-Models-Web-810x455-White-R.png',
      'Partner Van': 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/partner/my25-ice/Partner-ICE-Models-Web-810x455-White-R.png'
    };
    return modelImages[modelValue] || 'https://www.peugeot.com.au/content/dam/peugeot/australia/models/5008/2025-hybrid/5008-hybrid-model-fly-out-Ingaro-Blue-v2.png'; // Default to 5008 Hybrid
  }

  /**
  * Gets model name from URL path using regex pattern
  */
  function getModelName() {
    const path = window.location.pathname;
    const match = path.match(/\/models\/([^\/]+)\.html/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return '';
  }

  /**
  * Maps URL model names to form model values
  */
  function mapModelNameToValue$1(modelName) {
    if (!modelName) return null;
    const modelNameLower = modelName.toLowerCase();

    // Mapping from URL model names to form values
    const modelMap = {
      '2008-hybrid-suv': '2008 Hybrid',
      '2008-suv': '2008 Hybrid',
      '3008-suv': '3008 Hybrid',
      '5008-hybrid-suv': '5008 Hybrid',
      '308-hybrid': '308 Hybrid',
      '408-hybrid': '408 Hybrid',
      'partner-van': 'Partner Van',
      'new-e-partner-van': 'New E-Partner Van',
      'diesel-expert-van': 'Expert Van',
      'e-expert': 'E-Expert Van',
      'expert-van': 'Expert Van',
      'boxer-van': 'Boxer Van'
    };
    return modelMap[modelNameLower] || null;
  }

  /**
  * Gets model name from URL or form
  */
  function getCurrentModel() {
    // First priority: Check if model was set from parent message
    if (window.pcat64SelectedModelFromParent) {
      return window.pcat64SelectedModelFromParent;
    }

    // Try to get from form field (may have been set by selectModelInIframe)
    const modelField = document.querySelector('#model');
    if (modelField && modelField.value) {
      return modelField.value;
    }

    // Try to get from current URL path using getModelName()
    const modelName = getModelName();
    if (modelName) {
      // Handle special case: /models/expert-van/e-expert.html
      if (window.location.pathname.includes('/models/expert-van/e-expert')) {
        return 'E-Expert Van';
      }
      const mappedModel = mapModelNameToValue$1(modelName);
      if (mappedModel) return mappedModel;
    }

    // Fallback: Try to get from current URL using getModelFromUrl
    const currentUrl = window.location.href;
    const model = getModelFromUrl(currentUrl);
    if (model) return model;
    return '5008 Hybrid'; // Default
  }
  function namesAreSame(firstName, lastName) {
    return firstName !== '' && lastName !== '' && firstName.toLowerCase() === lastName.toLowerCase();
  }

  /**
  * Updates the form header with model-specific content
  */
  function updateFormHeader() {
    const header = document.querySelector('.t64-form-header');
    if (!header) return;
    const currentModel = getCurrentModel();
    const modelImage = getModelImage(currentModel);
    const heading = header.querySelector('.t64-form-heading');
    const description = header.querySelector('.t64-form-description');
    if (heading) heading.textContent = `QUESTION ABOUT THE PEUGEOT ${currentModel.toUpperCase()}?`;
    if (description) description.textContent = `Send your questions about the PEUGEOT ${currentModel}, and your local PEUGEOT dealer will get in touch.`;

    // Update image in wrapper
    const wrapper = document.querySelector('.t64-form-content-wrapper');
    if (wrapper) {
      const imageContainer = wrapper.querySelector('.t64-form-image-container');
      if (imageContainer) {
        const image = imageContainer.querySelector('.t64-form-image');
        if (image) {
          image.src = modelImage;
          image.alt = currentModel;
        }
      }
    }
  }
  function kamT64ModifyForm() {
    const form = document.querySelector('#general_enquiry_form');
    if (!form) return;

    // Initialize model selection from parent
    initModelSelectionFromParent();

    // Get current model
    const currentModel = getCurrentModel();
    const modelImage = getModelImage(currentModel);

    // Ensure a hidden field is present so the selected model name is always submitted
    let modelHiddenField = form.querySelector('input[name="pcat64ModelName"]');
    if (!modelHiddenField) {
      modelHiddenField = document.createElement('input');
      modelHiddenField.type = 'hidden';
      modelHiddenField.name = 'pcat64ModelName';
      form.appendChild(modelHiddenField);
    }
    modelHiddenField.value = currentModel;

    // Set enquiry type to "General Enquiry" (basic)
    const enquiryTypeField = document.querySelector('#enquiryType');
    if (enquiryTypeField) {
      enquiryTypeField.value = 'basic';
      // Make it hidden but keep it in the form
      const enquiryTypeWrapper = enquiryTypeField.closest('.imf-input-wrapper');
      if (enquiryTypeWrapper) {
        enquiryTypeWrapper.classList.add('t64-hidden');
      }
    }

    // Hide model field but set it to current model
    const modelField = document.querySelector('#model');
    if (modelField) {
      // Set the model value
      const modelOption = modelField.querySelector(`option[value="${currentModel}"]`);
      if (modelOption) {
        modelField.value = currentModel;
        // Trigger change event to ensure HTMX and other listeners are notified
        const changeEvent = new Event('change', {
          bubbles: true
        });
        modelField.dispatchEvent(changeEvent);
        document.body.dispatchEvent(new Event('modelChanged'));
      }

      // Hide the model field wrapper
      const modelWrapper = modelField.closest('.imf-input-wrapper');
      if (modelWrapper) {
        modelWrapper.classList.add('t64-hidden');
      }
    }

    // Add or update header with headline and description above form
    const header = document.querySelector('.t64-form-header');
    if (!header) {
      const headerHTML = `
      <div class="t64-form-header">
        <h2 class="t64-form-heading">QUESTION ABOUT THE PEUGEOT ${currentModel.toUpperCase()}?</h2>
        <p class="t64-form-description">Send your questions about the PEUGEOT ${currentModel}, and your local PEUGEOT dealer will get in touch.</p>
      </div>
    `;
      form.insertAdjacentHTML('beforebegin', headerHTML);
    } else {
      // Update existing header if model changed
      updateFormHeader();
    }

    // Wrap form and image in a container for side-by-side layout
    let wrapper = form.closest('.t64-form-content-wrapper');
    if (!wrapper) {
      // Create wrapper and image container using insertAdjacentHTML
      const wrapperHTML = `
      <div class="t64-form-content-wrapper">
        <div class="t64-form-image-container">
          <img src="${modelImage}" alt="${currentModel}" class="t64-form-image" />
        </div>
      </div>
    `;
      form.insertAdjacentHTML('beforebegin', wrapperHTML);
      wrapper = form.previousElementSibling;

      // Move form into wrapper
      wrapper.appendChild(form);
    } else {
      // Update image if wrapper exists
      let imageContainer = wrapper.querySelector('.t64-form-image-container');
      if (!imageContainer) {
        const imageContainerHTML = `
        <div class="t64-form-image-container">
          <img src="${modelImage}" alt="${currentModel}" class="t64-form-image" />
        </div>
      `;
        form.insertAdjacentHTML('beforebegin', imageContainerHTML);
        imageContainer = form.previousElementSibling;
      } else {
        const image = imageContainer.querySelector('.t64-form-image');
        if (image) {
          image.src = modelImage;
          image.alt = currentModel;
        }
      }
    }

    // Create two-column layout inside form
    createTwoColumnLayout();

    // Update phone label to match design
    const phoneLabel = form.querySelector('label[for="userPhone"]');
    if (phoneLabel) {
      const abbr = phoneLabel.querySelector('abbr');
      phoneLabel.innerHTML = `PHONE${abbr ? abbr.outerHTML : ''}`;
    }

    // Update email label to match design - change to "EMAIL" and move asterisk to beginning
    const emailLabel = form.querySelector('label[for="userEmail"]');
    if (emailLabel) {
      const abbr = emailLabel.querySelector('abbr');
      emailLabel.innerHTML = `EMAIL${abbr ? `${abbr.outerHTML} ` : ''}`;
    }

    // Update privacy checkbox label to ensure asterisk is at the beginning
    updatePrivacyCheckboxLabel();

    // Also set up observer to ensure it stays correct on mobile
    setupPrivacyCheckboxLabelObserver();

    // Set up privacy accordion
    setupPrivacyAccordion();

    // Set up form validation
    setupFormValidation();

    // Set up dealer dropdown visibility on postcode entry
    setupDealerDropdown();

    // Set up mobile layout reordering
    setupMobileLayout();
  }

  /**
  * Creates two-column layout inside form:
  * Column 1: First Name, Last Name, Email, Phone
  * Column 2: Postcode, Dealer, Comments
  */
  function createTwoColumnLayout() {
    const form = document.querySelector('#general_enquiry_form');
    if (!form) return;

    // Check if columns already exist
    if (form.querySelector('.t64-form-column-1')) return;

    // Get all field wrappers
    const firstNameWrapper = form.querySelector('#firstName')?.closest('.imf-input-wrapper');
    const lastNameWrapper = form.querySelector('#lastName')?.closest('.imf-input-wrapper');
    const emailWrapper = form.querySelector('#userEmail')?.closest('.imf-input-wrapper');
    const phoneWrapper = form.querySelector('#userPhone')?.closest('.imf-input-wrapper');
    const postcodeWrapper = form.querySelector('#userPostcode')?.closest('.imf-input-wrapper');
    const dealerWrapper = form.querySelector('#dealer-wrapper');
    const commentWrapper = form.querySelector('#comment')?.closest('.imf-input-wrapper');
    const checkboxWrapper = form.querySelector('.imf-checkbox-wrapper');
    const submitWrapper = form.querySelector('.imf-btn-wrapper');
    if (!firstNameWrapper || !lastNameWrapper || !emailWrapper || !phoneWrapper || !postcodeWrapper || !commentWrapper) {
      return;
    }

    // Create column containers using insertAdjacentHTML
    const columnsHTML = `
    <div class="t64-form-column-1"></div>
    <div class="t64-form-column-2"></div>
  `;

    // Insert columns at the beginning of the form
    form.insertAdjacentHTML('afterbegin', columnsHTML);
    const column1 = form.querySelector('.t64-form-column-1');
    const column2 = form.querySelector('.t64-form-column-2');

    // Move fields to Column 1: First Name, Last Name, Email, Phone
    if (firstNameWrapper.parentNode) {
      column1.appendChild(firstNameWrapper);
    }
    if (lastNameWrapper.parentNode) {
      column1.appendChild(lastNameWrapper);
    }
    if (emailWrapper.parentNode) {
      column1.appendChild(emailWrapper);
    }
    if (phoneWrapper.parentNode) {
      column1.appendChild(phoneWrapper);
    }

    // Move fields to Column 2: Postcode, Dealer, Comments
    if (postcodeWrapper.parentNode) {
      column2.appendChild(postcodeWrapper);
    }
    if (dealerWrapper && dealerWrapper.parentNode) {
      column2.appendChild(dealerWrapper);
    }
    if (commentWrapper.parentNode) {
      column2.appendChild(commentWrapper);
    }

    // Columns are already inserted at the beginning of the form
    // No need for additional insertion logic
  }

  /**
  * Sets up privacy policy accordion
  */
  function setupPrivacyAccordion() {
    const form = document.querySelector('#general_enquiry_form');
    if (!form) return;

    // Check if accordion already exists
    if (form.querySelector('.t64-privacy-accordion')) return;

    // Privacy policy content
    const privacyContent = `
    <div class="t64-privacy-policy-text">
     Inchcape European Automotive Pty Limited (ABN 97 070 000 789) trading as PEUGEOT Automobiles Australia respects your privacy and is bound by the Australian Privacy Principles set out in the Privacy Act 1988 (Cth). PEUGEOT Automobiles Australia collects personal information to provide the product or service which you have requested. If you do not provide us with your personal information, we may not be able to respond to your enquiry. If you have consented, or if otherwise permitted by law, PEUGEOT Automobiles Australia will send you marketing communications, which may be of interest to you, including updates and special offers. If you have previously opted out of receiving marketing communications from us, by submitting this form you are consenting to receive marketing communications from us again. You are able to unsubscribe through normal channels. PEUGEOT Automobiles Australia may disclose your personal information to PEUGEOT Retailers, related companies or third parties that provide us with services, including to overseas locations (such as France, UK & USA). You may contact PEUGEOT Automobiles Australia to seek access, update or correct your personal information. If you have any concerns or queries regarding our handling of your personal information, please let us know using the "Contact Us" form on our website or write to or email the Privacy Officer using the details below, and we’ll take appropriate steps to ensure you won’t receive any direct marketing communication from us in the future. The Privacy Officer shall review, investigate and respond to any privacy compliant within 10 working days (or advise if otherwise) of receipt of such complaint. For more information, read our <a href="https://www.peugeot.com.au/privacy-policy/" target="_blank" class="privacy-link"> Privacy Policy </a> or write to the Privacy Officer at PEUGEOT Automobiles Australia, PO Box 8290, Norwest NSW 2153 or send an email to 
      <a href="mailto:privacy.officer@inchcape.com.au">privacy.officer@inchcape.com.au</a>
     
    </div>
  `;

    // Create accordion using insertAdjacentHTML
    const accordionHTML = `
    <div class="t64-privacy-accordion">
      <button type="button" class="t64-privacy-accordion-trigger" aria-expanded="false">
        <span class="t64-privacy-accordion-text">View Privacy Policy</span>
        <span class="t64-privacy-accordion-icon">
          <img src="https://cdn.optimizely.com/img/15841360337/e8c81d3df36b4fd1a9501209e84a6919.svg" alt="" />
        </span>
      </button>
      <div class="t64-privacy-accordion-content" aria-hidden="true">
        ${privacyContent}
      </div>
    </div>
  `;

    // Find the t64-form-content-wrapper to insert accordion after it
    const contentWrapper = form.closest('.t64-form-content-wrapper');

    // Get checkbox and button wrappers to move them to the end of the form
    const checkboxWrapper = form.querySelector('.imf-checkbox-wrapper');
    const submitWrapper = form.querySelector('.imf-btn-wrapper');

    // Move checkbox and button wrappers to the end of the form (before accordion will be inserted outside)
    if (checkboxWrapper && checkboxWrapper.parentNode) {
      form.appendChild(checkboxWrapper);
    }
    if (submitWrapper && submitWrapper.parentNode) {
      form.appendChild(submitWrapper);
    }

    // Insert accordion after the t64-form-content-wrapper (outside the wrapper)
    let accordion;
    if (contentWrapper && contentWrapper.parentNode) {
      contentWrapper.insertAdjacentHTML('afterend', accordionHTML);
      // Get the inserted accordion (it's the next sibling after contentWrapper)
      accordion = contentWrapper.nextElementSibling;
    } else {
      // Fallback: insert at end of form if wrapper not found
      form.insertAdjacentHTML('beforeend', accordionHTML);
      accordion = form.querySelector('.t64-privacy-accordion');
    }
    if (!accordion || !accordion.classList.contains('t64-privacy-accordion')) {
      // Fallback: query document if direct reference failed
      accordion = document.querySelector('.t64-privacy-accordion');
    }
    if (!accordion) return;
    const trigger = accordion.querySelector('.t64-privacy-accordion-trigger');
    const content = accordion.querySelector('.t64-privacy-accordion-content');

    // Ensure trigger and content exist before adding event listener
    if (!trigger || !content) return;

    // Toggle accordion on click
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      trigger.setAttribute('aria-expanded', newState.toString());
      content.setAttribute('aria-hidden', (!newState).toString());
      if (newState) {
        accordion.classList.add('t64-accordion-open');
      } else {
        accordion.classList.remove('t64-accordion-open');
      }
    });
  }

  /**
  * Sets up dealer dropdown to appear when postcode is entered
  */
  function setupDealerDropdown() {
    const postcodeField = document.querySelector('#userPostcode');
    const dealerWrapper = document.querySelector('#dealer-wrapper');
    if (!postcodeField || !dealerWrapper) return;

    // Check if postcode has 4 digits
    function checkPostcode() {
      const postcodeValue = postcodeField.value.trim();
      const isValidPostcode = /^(0[289][0-9]{2})|([1-9][0-9]{3})$/.test(postcodeValue);
      if (isValidPostcode && postcodeValue.length === 4) {
        // Show dealer wrapper if it has content
        if (dealerWrapper.querySelector('select') || dealerWrapper.querySelector('.imf-input-wrapper')) {
          dealerWrapper.classList.remove('hidden');
        }
      } else {
        // Hide dealer wrapper if postcode is invalid or empty
        dealerWrapper.classList.add('hidden');
      }
    }

    // Listen for postcode changes
    postcodeField.addEventListener('input', checkPostcode);
    postcodeField.addEventListener('change', checkPostcode);
    postcodeField.addEventListener('blur', checkPostcode);

    // Also listen for HTMX events in case dealer field is updated
    document.body.addEventListener('htmx:afterSwap', event => {
      if (event.target && (event.target.id === 'dealer-wrapper' || event.target.closest('#dealer-wrapper'))) {
        setTimeout(() => {
          checkPostcode();
        }, 200);
      }
    });

    // Initial check
    setTimeout(checkPostcode, 100);
  }

  /**
  * Sets up form validation
  */
  function setupFormValidation() {
    const form = document.querySelector('#general_enquiry_form');
    if (!form) return;

    // Function to get all required field values
    function getAllRequiredFieldValues() {
      const firstNameField = document.querySelector('#firstName');
      const lastNameField = document.querySelector('#lastName');
      const emailField = document.querySelector('#userEmail');
      const phoneField = document.querySelector('#userPhone');
      const postcodeField = document.querySelector('#userPostcode');
      const dealerField = document.querySelector('#dealer');
      const privacyCheckbox = document.querySelector('#privacyPolicy\\.checkbox') || document.querySelector('input[name="privacyPolicy"]');
      const firstNameValue = firstNameField?.value?.trim() || '';
      const lastNameValue = lastNameField?.value?.trim() || '';
      const emailValue = emailField?.value?.trim() || '';
      const phoneValue = phoneField?.value?.trim() || '';
      const postcodeValue = postcodeField?.value?.trim() || '';
      const dealerValue = dealerField?.value?.trim() || '';
      const privacyChecked = privacyCheckbox?.checked || false;
      return {
        firstNameValue,
        lastNameValue,
        emailValue,
        phoneValue,
        postcodeValue,
        dealerValue,
        privacyChecked,
        firstNameField,
        lastNameField,
        emailField,
        phoneField,
        postcodeField,
        dealerField,
        privacyCheckbox
      };
    }

    // Function to validate email with stricter rules
    function isValidEmail(email) {
      // More strict email regex that checks for:
      // - No consecutive dots
      // - No dots at start/end of local or domain parts
      // - Valid characters only
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email)) {
        return false;
      }

      // Additional checks for invalid patterns
      const parts = email.split('@');
      if (parts.length !== 2) {
        return false;
      }
      const localPart = parts[0];
      const domainPart = parts[1];

      // Check for consecutive dots
      if (localPart.includes('..') || domainPart.includes('..')) {
        return false;
      }

      // Check for dots at start/end
      if (localPart.startsWith('.') || localPart.endsWith('.')) {
        return false;
      }
      if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
        return false;
      }

      // Domain must have at least one dot
      if (!domainPart.includes('.')) {
        return false;
      }

      // Domain parts after dot cannot be empty
      const domainParts = domainPart.split('.');
      if (domainParts.some(part => part.length === 0)) {
        return false;
      }
      return true;
    }

    // Function to get email validation error message
    function getEmailError(email) {
      if (!email) {
        return 'Please fill in this field.';
      }
      if (!email.includes('@')) {
        return `Please include an '@' in the email address. '${email}' is missing an '@'.`;
      }
      if (email.endsWith('@') || email.indexOf('@') === email.length - 1) {
        return `Please enter a part following '@'. '${email}' is incomplete.`;
      }
      const parts = email.split('@');
      if (parts.length !== 2) {
        return 'Please enter a valid email address.';
      }
      const localPart = parts[0];
      const domainPart = parts[1];

      // Check for consecutive dots
      if (localPart.includes('..') || domainPart.includes('..')) {
        return 'Please enter a valid email address.';
      }

      // Check for dots at start/end
      if (localPart.startsWith('.') || localPart.endsWith('.')) {
        return 'Please enter a valid email address.';
      }
      if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
        return 'Please enter a valid email address.';
      }
      if (!domainPart.includes('.')) {
        return "Please enter a part following '@'. The email address is incomplete.";
      }

      // Check if domain parts are empty (like "jn....jnn")
      const domainParts = domainPart.split('.');
      if (domainParts.some(part => part.length === 0)) {
        return 'Please enter a valid email address.';
      }
      if (!isValidEmail(email)) {
        return 'Please enter a valid email address.';
      }
      return null;
    }

    // Function to validate phone (numbers only)
    function isValidPhone(phone) {
      // Phone should contain only digits
      return /^\d+$/.test(phone);
    }

    // Function to get phone validation error message
    function getPhoneError(phone) {
      if (!phone) {
        return 'Please fill in this field.';
      }
      if (!isValidPhone(phone)) {
        return 'Please enter numbers only.';
      }
      return null;
    }

    // Function to validate postcode
    function isValidPostcode(postcode) {
      return /^(0[289][0-9]{2})|([1-9][0-9]{3})$/.test(postcode);
    }

    // Function to get postcode validation error message
    function getPostcodeError(postcode) {
      if (!postcode) {
        return 'Please fill in this field.';
      }
      if (!isValidPostcode(postcode)) {
        return 'Please match the format requested.';
      }
      return null;
    }

    // Function to show error message below a field
    function showFieldError(field, message) {
      if (!field) return;
      const wrapper = field.closest('.imf-input-wrapper');
      if (!wrapper) return;

      // Remove existing error message
      const existingError = wrapper.querySelector('.t64-field-error');
      if (existingError) {
        existingError.remove();
      }

      // Add error message if there is one
      if (message) {
        const errorElement = document.createElement('div');
        errorElement.className = 't64-field-error';
        errorElement.textContent = message;
        wrapper.appendChild(errorElement);
        field.classList.add('t64-field-invalid');
      } else {
        field.classList.remove('t64-field-invalid');
      }
    }

    // Function to show error for checkbox
    function showCheckboxError(checkbox, message) {
      if (!checkbox) return;
      const wrapper = checkbox.closest('.imf-checkbox-wrapper');
      if (!wrapper) return;

      // Remove existing error message
      const existingError = wrapper.querySelector('.t64-field-error');
      if (existingError) {
        existingError.remove();
      }

      // Add error message if there is one
      if (message) {
        const errorElement = document.createElement('div');
        errorElement.className = 't64-field-error';
        errorElement.textContent = message;
        wrapper.appendChild(errorElement);
        checkbox.classList.add('t64-field-invalid');
      } else {
        checkbox.classList.remove('t64-field-invalid');
      }
    }

    // Function to validate individual field and show error
    function validateField(field, fieldType, forceShow = false) {
      if (!field) return;

      // Only show errors if field has been touched/interacted with, or if forced
      const shouldShowError = forceShow || touchedFields.has(field);
      if (!shouldShowError) return;
      const value = field.value?.trim() || '';
      let errorMessage = null;
      switch (fieldType) {
        case 'firstName':
        case 'lastName':
          {
            const {
              firstNameValue,
              lastNameValue,
              firstNameField,
              lastNameField
            } = getAllRequiredFieldValues();
            const nameMatchError = namesAreSame(firstNameValue, lastNameValue) ? 'First name and last name cannot be the same.' : null;
            if (!value) {
              errorMessage = 'Please fill in this field.';
            } else {
              errorMessage = nameMatchError;
            }
            const siblingField = fieldType === 'firstName' ? lastNameField : firstNameField;
            const siblingValue = fieldType === 'firstName' ? lastNameValue : firstNameValue;
            if (siblingField && (forceShow || touchedFields.has(siblingField))) {
              const siblingError = !siblingValue ? 'Please fill in this field.' : nameMatchError;
              showFieldError(siblingField, siblingError);
            }
            break;
          }
        case 'email':
          errorMessage = getEmailError(value);
          break;
        case 'phone':
          errorMessage = getPhoneError(value);
          break;
        case 'postcode':
          errorMessage = getPostcodeError(value);
          // Also show additional postcode format message if invalid
          if (errorMessage && value && !isValidPostcode(value)) {
            errorMessage = 'Please match the format requested. Valid Australian postcode';
          }
          break;
        case 'dealer':
          if (!value) {
            errorMessage = 'Please fill in this field.';
          }
          break;
      }
      if (fieldType === 'checkbox') {
        showCheckboxError(field, !field.checked ? 'This field is required' : null);
      } else {
        showFieldError(field, errorMessage);
      }
    }

    // Function to check if all required fields are filled and valid
    function checkFormComplete() {
      const {
        firstNameValue,
        lastNameValue,
        emailValue,
        phoneValue,
        postcodeValue,
        dealerValue,
        privacyChecked,
        firstNameField,
        lastNameField,
        emailField,
        phoneField,
        postcodeField,
        dealerField,
        privacyCheckbox
      } = getAllRequiredFieldValues();

      // Validate all fields and show errors (only if touched)
      validateField(firstNameField, 'firstName');
      validateField(lastNameField, 'lastName');
      validateField(emailField, 'email');
      validateField(phoneField, 'phone');
      validateField(postcodeField, 'postcode');
      validateField(dealerField, 'dealer');
      validateField(privacyCheckbox, 'checkbox');

      // Check if all required fields are filled and valid
      const isComplete = firstNameValue !== '' && lastNameValue !== '' && !namesAreSame(firstNameValue, lastNameValue) && emailValue !== '' && isValidEmail(emailValue) && phoneValue !== '' && isValidPhone(phoneValue) && postcodeValue !== '' && isValidPostcode(postcodeValue) && dealerValue !== '' && privacyChecked;

      // Get submit button
      const submitButton = form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]') || form.querySelector('.btn-primary');
      if (submitButton) {
        if (isComplete) {
          submitButton.disabled = false;
          submitButton.removeAttribute('disabled');
          submitButton.classList.remove('t64-submit-disabled');
          submitButton.classList.add('t64-submit-enabled');
        } else {
          submitButton.disabled = true;
          submitButton.setAttribute('disabled', 'disabled');
          submitButton.classList.remove('t64-submit-enabled');
          submitButton.classList.add('t64-submit-disabled');
        }
      }
    }

    // Keep track of attached listeners
    const attachedFields = new WeakSet();
    // Keep track of fields that have been touched/interacted with
    const touchedFields = new WeakSet();

    // Function to attach event listeners to all required fields
    function attachFormListeners() {
      const {
        firstNameField,
        lastNameField,
        emailField,
        phoneField,
        postcodeField,
        dealerField,
        privacyCheckbox
      } = getAllRequiredFieldValues();
      const fieldConfigs = [{
        field: firstNameField,
        type: 'firstName',
        events: ['input', 'change', 'blur']
      }, {
        field: lastNameField,
        type: 'lastName',
        events: ['input', 'change', 'blur']
      }, {
        field: emailField,
        type: 'email',
        events: ['input', 'change', 'blur']
      }, {
        field: phoneField,
        type: 'phone',
        events: ['input', 'change', 'blur']
      }, {
        field: postcodeField,
        type: 'postcode',
        events: ['input', 'change', 'blur']
      }, {
        field: dealerField,
        type: 'dealer',
        events: ['change']
      }, {
        field: privacyCheckbox,
        type: 'checkbox',
        events: ['change', 'click']
      }];
      fieldConfigs.forEach(({
        field,
        type,
        events
      }) => {
        if (field && !attachedFields.has(field)) {
          events.forEach(eventType => {
            field.addEventListener(eventType, () => {
              // Mark field as touched on any interaction
              touchedFields.add(field);
              validateField(field, type);
              checkFormComplete();
            });
          });
          // Also mark as touched on blur to show errors even if user didn't type
          if (field.type !== 'checkbox') {
            field.addEventListener('blur', () => {
              touchedFields.add(field);
              validateField(field, type);
            });
          }
          attachedFields.add(field);
        }
      });
    }

    // Use MutationObserver to watch for field changes
    const observer = new MutationObserver(mutations => {
      let shouldCheck = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
          shouldCheck = true;
        } else if (mutation.type === 'childList') {
          shouldCheck = true;
        } else if (mutation.type === 'characterData') {
          shouldCheck = true;
        }
      });
      if (shouldCheck) {
        setTimeout(checkFormComplete, 50);
      }
    });

    // Observe the form for changes
    if (form) {
      observer.observe(form, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['value', 'checked']
      });
    }

    // Initial attachment of listeners
    attachFormListeners();

    // Listen for HTMX events
    document.body.addEventListener('htmx:afterSwap', event => {
      setTimeout(() => {
        attachFormListeners();
        checkFormComplete();
      }, 200);
    });

    // Listen for model change event
    document.body.addEventListener('modelChanged', () => {
      setTimeout(() => {
        attachFormListeners();
        checkFormComplete();
        updateFormHeader();
        // Keep hidden model field in sync on any model change
        const updatedModel = getCurrentModel();
        const hiddenField = form.querySelector('input[name="pcat64ModelName"]') || modelHiddenField;
        if (hiddenField) {
          hiddenField.value = updatedModel;
        }
      }, 300);
    });

    // Periodic check as fallback
    const intervalId = setInterval(() => {
      checkFormComplete();
    }, 500);

    // Stop interval after 30 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000);

    // Check initial state (but don't show errors yet)
    setTimeout(checkFormComplete, 100);

    // Show errors on form submit attempt
    form.addEventListener('submit', e => {
      const {
        firstNameField,
        lastNameField,
        emailField,
        phoneField,
        postcodeField,
        dealerField,
        privacyCheckbox
      } = getAllRequiredFieldValues();

      // Mark all fields as touched and validate
      if (firstNameField) touchedFields.add(firstNameField);
      if (lastNameField) touchedFields.add(lastNameField);
      if (emailField) touchedFields.add(emailField);
      if (phoneField) touchedFields.add(phoneField);
      if (postcodeField) touchedFields.add(postcodeField);
      if (dealerField) touchedFields.add(dealerField);
      if (privacyCheckbox) touchedFields.add(privacyCheckbox);
      validateField(firstNameField, 'firstName', true);
      validateField(lastNameField, 'lastName', true);
      validateField(emailField, 'email', true);
      validateField(phoneField, 'phone', true);
      validateField(postcodeField, 'postcode', true);
      validateField(dealerField, 'dealer', true);
      validateField(privacyCheckbox, 'checkbox', true);
      checkFormComplete();
    });

    // Initially disable submit button
    const submitButton = form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]') || form.querySelector('.btn-primary');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('disabled', 'disabled');
      submitButton.classList.add('t64-submit-disabled');
    }
  }

  /**
  * Sets up success message modification to show model image and updated thank you message
  */
  function modifySuccessMessage() {
    const successDiv = document.querySelector('.success');
    if (!successDiv) return;

    // Check if already modified
    if (successDiv.classList.contains('t64-success-modified')) return;

    // Get current model and image
    const currentModel = getCurrentModel();
    const modelImage = getModelImage(currentModel);

    // Get the reload link if it exists
    const reloadLink = successDiv.querySelector('#general_enquiry_reload');
    const reloadLinkHTML = reloadLink ? reloadLink.outerHTML : '';

    // Get scripts if they exist
    const scripts = successDiv.querySelectorAll('script');
    const scriptsHTML = Array.from(scripts).map(script => script.outerHTML).join('');

    // Create new success message HTML with model image and updated layout
    const newSuccessHTML = `
    <div class="t64-success-wrapper">
      <h2 class="t64-success-heading">QUESTION ABOUT THE PEUGEOT  ${currentModel.toUpperCase()}?</h2>
      <p class="t64-success-description">Send your questions about the PEUGEOT ${currentModel}, and your local PEUGEOT dealer will get in touch.</p>
      <div class="t64-success-content">
        <div class="t64-success-image-container">
          <img src="${modelImage}" alt="${currentModel}" class="t64-success-image" />
        </div>
        <div class="t64-success-message">
          <h3 class="t64-success-title">THANK YOU FOR YOUR ENQUIRY</h3>
          <p class="t64-success-text">Your enquiry is being processed and your local PEUGEOT Retailer will be in touch shortly.</p>
          
        </div>
      </div>
    </div>
    
  `;

    // Replace content
    successDiv.innerHTML = newSuccessHTML;
    successDiv.classList.add('t64-success-modified');
  }

  /**
  * Sets up mobile layout to reorder header below image container
  */
  function setupMobileLayout() {
    let originalHeaderParent = null;
    let originalHeaderNextSibling = null;
    function reorderForMobile() {
      const header = document.querySelector('.t64-form-header');
      const wrapper = document.querySelector('.t64-form-content-wrapper');
      const imageContainer = wrapper?.querySelector('.t64-form-image-container');
      if (!header || !wrapper || !imageContainer) return;

      // Check if we're on mobile (max-width: 768px)
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        // Check if already reordered
        if (header.classList.contains('t64-mobile-reordered')) return;

        // Store original position
        originalHeaderParent = header.parentNode;
        originalHeaderNextSibling = header.nextSibling;

        // Move header inside wrapper, after image container
        imageContainer.insertAdjacentElement('afterend', header);
        header.classList.add('t64-mobile-reordered');
      } else {
        // Desktop: restore original order
        if (header.classList.contains('t64-mobile-reordered') && originalHeaderParent) {
          // Move header back to original position (before wrapper)
          if (originalHeaderNextSibling) {
            originalHeaderParent.insertBefore(header, originalHeaderNextSibling);
          } else {
            originalHeaderParent.insertBefore(header, wrapper);
          }
          header.classList.remove('t64-mobile-reordered');
        }
      }
    }

    // Check on load
    setTimeout(() => {
      reorderForMobile();
      updatePrivacyCheckboxLabel();
    }, 100);

    // Listen for resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        reorderForMobile();
        updatePrivacyCheckboxLabel();
      }, 100);
    });

    // Also check when form is ready (in case elements load later)
    setTimeout(() => {
      reorderForMobile();
      updatePrivacyCheckboxLabel();
    }, 500);
    setTimeout(() => {
      reorderForMobile();
      updatePrivacyCheckboxLabel();
    }, 1000);
  }

  /**
  * Updates privacy checkbox label to ensure asterisk is at the beginning
  */
  function updatePrivacyCheckboxLabel() {
    const form = document.querySelector('#general_enquiry_form');
    if (!form) return;

    // Try multiple selectors to find the privacy checkbox label
    let privacyLabel = form.querySelector('label[for="privacyPolicy.checkbox"]');
    if (!privacyLabel) {
      privacyLabel = form.querySelector('label[for*="privacyPolicy"]');
    }
    if (!privacyLabel) {
      const checkbox = form.querySelector('#privacyPolicy\\.checkbox') || form.querySelector('input[name="privacyPolicy"]');
      if (checkbox) {
        privacyLabel = checkbox.closest('.imf-checkbox-wrapper')?.querySelector('label');
      }
    }
    if (!privacyLabel) return;
    const abbr = privacyLabel.querySelector('abbr');
    if (abbr) {
      // Check if asterisk is already at the beginning
      const labelText = privacyLabel.textContent || privacyLabel.innerText || '';
      const firstChar = labelText.trim().charAt(0);

      // If asterisk is not at the beginning, reorder
      if (firstChar !== '*' && firstChar !== '∗') {
        // Get all other content (span, links, text nodes)
        const span = privacyLabel.querySelector('span');
        let otherContent = '';
        if (span) {
          otherContent = span.outerHTML;
        } else {
          // Get all content except the abbr
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = privacyLabel.innerHTML;
          const tempAbbr = tempDiv.querySelector('abbr');
          if (tempAbbr) {
            tempAbbr.remove();
          }
          otherContent = tempDiv.innerHTML.trim();
        }

        // Ensure asterisk is at the beginning
        privacyLabel.innerHTML = `${abbr.outerHTML} ${otherContent}`;
      }
    }
  }

  /**
  * Sets up observer to ensure privacy checkbox label asterisk stays at beginning
  */
  function setupPrivacyCheckboxLabelObserver() {
    const form = document.querySelector('#general_enquiry_form');
    if (!form) return;

    // Function to check and fix label
    function checkAndFixLabel() {
      updatePrivacyCheckboxLabel();
    }

    // Check immediately and multiple times to catch different load scenarios
    checkAndFixLabel();
    setTimeout(checkAndFixLabel, 100);
    setTimeout(checkAndFixLabel, 300);
    setTimeout(checkAndFixLabel, 500);

    // Use MutationObserver to watch for changes to the checkbox wrapper
    const checkboxWrapper = form.querySelector('.imf-checkbox-wrapper');
    if (checkboxWrapper) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            checkAndFixLabel();
          }
        });
      });
      observer.observe(checkboxWrapper, {
        childList: true,
        subtree: true,
        characterData: true
      });

      // Also check on resize (in case mobile layout changes affect it)
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkAndFixLabel, 100);
      });
    }

    // Also check periodically as fallback
    setTimeout(checkAndFixLabel, 500);
    setTimeout(checkAndFixLabel, 1000);
    setTimeout(checkAndFixLabel, 2000);
  }

  /**
  * Send iframe height to parent window with minimal delay.
  * Uses ResizeObserver when available, with a small fallback interval.
  */
  function kamT64SendHeightToParent() {
    if (!document.body) {
      return;
    }
    const PARENT_ORIGIN = 'https://www.peugeot.com.au';
    const sendHeight = () => {
      if (!window.parent || window.parent === window) {
        return;
      }
      const height = Math.round(document.body.getBoundingClientRect().height);
      if (!height) {
        return;
      }

      // New structured message format
      try {
        window.parent.postMessage({
          type: 'PCAT64_IFRAME_HEIGHT',
          height
        }, PARENT_ORIGIN);
      } catch (e) {
        // Fail silently and rely on legacy format below
      }

      // Legacy string format (kept for backward compatibility with parent listener)
      try {
        window.parent.postMessage(`T64StylingHeight-${height}`, '*');
      } catch (e) {
        // Ignore errors
      }
    };

    // Send initial height immediately to reduce first-paint flicker
    sendHeight();

    // Use ResizeObserver for near-instant updates when supported
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        sendHeight();
      });
      resizeObserver.observe(document.body);
    } else {
      // Fallback: poll more frequently but only when height actually changes
      let lastHeight = 0;
      setInterval(() => {
        const currentHeight = Math.round(document.body.getBoundingClientRect().height);
        if (currentHeight && currentHeight !== lastHeight) {
          lastHeight = currentHeight;
          sendHeight();
        }
      }, 300);
    }
  }

  /* eslint-disable no-console */

  (function kamPcat64Iframe() {
    const PARENT_ORIGIN = 'https://www.peugeot.com.au';
    let successHandled = false;
    console.log('***** iframe: script loaded and executing');
    initModelSelectionFromParent();
    console.log('***** iframe: message listener initialized');
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'PCAT64_IFRAME_READY'
        }, PARENT_ORIGIN);
        console.log('***** iframe: sent ready signal to parent');
      }
    } catch (e) {
      console.log('***** iframe: could not send ready signal', e);
    }
    function notifyParentOfSuccess() {
      if (successHandled) {
        return;
      }
      const successDiv = document.querySelector('.success');
      if (!successDiv) {
        return;
      }
      successHandled = true;
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({
            event: 'updatevirtualpath',
            formsLeadType: 'cold lead',
            formsName: 'make an enquiry',
            formsLeadID: 'PCAT64',
            mainStepIndicator: '1',
            mainStepName: 'confirmation'
          }, PARENT_ORIGIN);
          console.log('***** iframe: sent form success signal to parent');
        }
      } catch (e) {
        console.log('***** iframe: could not send success signal to parent', e);
      }
    }
    function handleFormSuccess() {
      notifyParentOfSuccess();
      const successDiv = document.querySelector('.success');
      if (successDiv && !successDiv.classList.contains('t64-success-modified')) {
        modifySuccessMessage();
      }
    }
    function checkSuccessMessage() {
      handleFormSuccess();
    }
    function kamT64HandleFormReady() {
      console.log('*** pcat64-iframe ***');
      document.body.classList.add('pcat64-iframe');
      kamT64ModifyForm();
      kamT64SendHeightToParent();
    }
    function kamT64HandleSuccessReady() {
      console.log('*** pcat64-iframe success ***');
      handleFormSuccess();
    }
    if (window.__kam405331Initialized) {
      return;
    }
    window.__kam405331Initialized = true;
    if (!window.t64IframeStart) {
      window.t64IframeStart = true;
      Kameleoon.API.Core.runWhenElementPresent('#general_enquiry_form', kamT64HandleFormReady);
      Kameleoon.API.Core.runWhenElementPresent('#general_enquiry .success', kamT64HandleSuccessReady);
      checkSuccessMessage();
      const observer = new MutationObserver(() => {
        checkSuccessMessage();
      });
      Kameleoon.API.Core.runWhenConditionTrue(() => document.body, () => {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    }
  })();
})();