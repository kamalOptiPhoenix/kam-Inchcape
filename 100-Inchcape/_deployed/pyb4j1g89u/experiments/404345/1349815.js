"use strict";

(function () {
  const goals = {
    'Pop-up appearances T5': 423374,
    'Contact Details conversions T5': 423375
  };
  function kamLdvt5ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
      Kameleoon.API.Goals.processConversion(goalId);
    }
  }

  /* eslint-disable camelcase */

  const config = {
    html: `
   <section class="brochure_T5 form_modal hidden fixed z-50 left-0 top-0 w-full h-full overflow-auto shadow-lg">
    <div class="form_modal-content relative mx-auto">
      
      <button class="form_modalClose flex justify-end hover:cursor-pointer absolute top-4 xl:top-[20px] right-4 xl:right-[20px] z-[1000] w-5 xl:w-[50px]">
       <img src="//cdn.optimizely.com/img/15841360337/b595eebaf07447f98ca9513cf5bf5326.svgz"></img>  
      </button>

      

      <div class="flex lg:flex-row w-full h-full sm:flex flex-col">
        
        <div class="brochure_T5_content flex flex-col text-container px-0 py-0 lg:px-0 lg:py-0" >
          
          <div class="lg:px-10 lg:py-10 shadow-lg" style="background-color: #ffffff;">

              <div class="text-center lg:mt-0 brochure_T5_header_wrapper">              
                  <div class="flex justify-center flex-col">
                 <p class= "brochure_T5_heading">Download Pricelist</p>
             <p class= "brochure_T5_line"></p>
                  </div>
                  <div class="w-full px-4 lg:px-0 py-8">
                    <p class= "brochure_T5_Description">Please enter your details so that you’re able to download your digital pricelist.</p>
                  </div>
              </div>
              <div>


<div class="brochure_T5_form_wrapper"></div>
<div class="--Roboto loader">
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  <p class="mt-3">Processing your request...</p>
</div>
              </div>

          </div> 

        </div>
      </div>
    
    </div>
  </section>
`,
    handleDwnloadBtn: () => {
      const originalBtn = [...document.querySelectorAll('section button.btn-Primary')].find(btn => {
        const onclick = btn.getAttribute('onclick') || '';
        const text = btn.textContent.trim().toLowerCase();
        return onclick.includes('.pdf') && text.includes('pricelist');
      });
      if (!originalBtn || originalBtn.classList.contains('t5CustomBrochureBtn')) return;

      // ✅ Extract PDF URL from inline onclick
      const onclickText = originalBtn.getAttribute('onclick') || '';
      const match = onclickText.match(/'([^']+\.pdf[^']*)'/);
      const pdfUrl = match ? match[1] : '';
      if (!pdfUrl) return;

      // ✅ Hide original button
      originalBtn.style.display = 'none';

      // ✅ Create and insert custom button HTML
      const customBtnHTML = `
        <button 
          class="btn btn-Primary w-full my-3 h-12 pt-1.5 md:w-auto md:h-12 md:min-w-[225px] md:min-h-12 px-5 text-center t5CustomBrochureBtn"
          data-pdf="${pdfUrl}">
          DOWNLOAD PRICELIST
        </button>
      `;
      originalBtn.insertAdjacentHTML('afterend', customBtnHTML);

      // ✅ Add listener to new button
      const newBtn = originalBtn.nextElementSibling;
      Kameleoon.API.Utils.addEventListener(newBtn, 'click', () => {
        const userData = JSON.parse(localStorage.getItem('brochure_T1_userData') || '{}');
        if (userData.email) {
          // If details already filled, open PDF
          window.open(newBtn.getAttribute('data-pdf'), '_self');
        } else {
          // Else show modal
          document.body.classList.add('T5_Show', 'T5_ShowNoScroll');
          console.log('*** Pop-up appearances T5 goal triggered ***');
          kamLdvt5ProcessGoal('Pop-up appearances T5');
        }
      });
    },
    validation: {
      Email: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    validateForm: form => {
      let isFormValid = true;
      const inputs = Array.from(form.elements);
      inputs.forEach(input => {
        // Skip hidden and disabled fields
        if (input.type === 'hidden' || input.disabled || input.hidden) return;
        const isValid = input.checkValidity();
        const feedback = input.parentNode.querySelector('.invalid-feedback');
        if (!isValid) {
          isFormValid = false;
          if (feedback) {
            if (input.validity.valueMissing) {
              feedback.textContent = 'This field is required.';
            } else if (input.validity.patternMismatch) {
              feedback.textContent = 'Please follow the requested format.';
            } else if (input.validity.typeMismatch) {
              feedback.textContent = 'Please enter a valid value.';
            } else {
              feedback.textContent = 'Invalid input.';
            }
          }
          input.classList.add('is-invalid');
        } else {
          if (feedback) feedback.textContent = '';
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });
      return isFormValid;
    },
    clickBind: () => {
      const brochure_T5_form = document.querySelector('.brochure_T5_form_wrapper form');
      Kameleoon.API.Utils.addEventListener(brochure_T5_form, 'submit', event => {
        event.preventDefault();
        event.stopPropagation();
        const isFormValid = config.validateForm(brochure_T5_form);
        brochure_T5_form.classList.add('was-validated');
        if (isFormValid) {
          // ✅ Cache user details
          const firstNameInput = brochure_T5_form.querySelector('[name="firstName"]');
          const lastNameInput = brochure_T5_form.querySelector('[name="lastName"]');
          const emailInput = brochure_T5_form.querySelector('[name="email"]');
          const firstName = firstNameInput ? firstNameInput.value : '';
          const lastName = lastNameInput ? lastNameInput.value : '';
          const email = emailInput ? emailInput.value : '';
          localStorage.setItem('brochure_T1_userData', JSON.stringify({
            firstName,
            lastName,
            email
          }));
          const PdfUrl = document.querySelector('.t5CustomBrochureBtn').getAttribute('data-pdf');
          window.open(PdfUrl, '_blank');
          console.log('*** Contact Details conversions T5 goal triggered ***');
          kamLdvt5ProcessGoal('Contact Details conversions T5');
          brochure_T5_form.submit();
        }
      });
      Kameleoon.API.Utils.addEventListener(document.querySelector('.brochure_T5'), 'click', event => {
        const isBackdropClick = event.target === event.currentTarget;
        const isCloseBtn = event.target.closest('.form_modalClose');
        if (isBackdropClick || isCloseBtn) {
          document.body.classList.remove('T5_ShowNoScroll', 'T5_Show');
        }
      });
    },
    populateFormFromSession: () => {
      const userData = JSON.parse(localStorage.getItem('brochure_T1_userData') || '{}');
      if (Object.keys(userData).length) {
        const form = document.querySelector('.brochure_T5_form_wrapper form');
        if (form) {
          if (userData.firstName) form.querySelector('[name="firstName"]').value = userData.firstName;
          if (userData.lastName) form.querySelector('[name="lastName"]').value = userData.lastName;
          if (userData.email) form.querySelector('[name="email"]').value = userData.email;
          if (userData.consent !== undefined) form.querySelector('[name="customCheckBox"]').checked = userData.consent;
        }
      }
    },
    fetchForm: () => fetch('https://ldv.co.nz/').then(res => res.text()).then(htmlStr => {
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(htmlStr, 'text/html');
      const form = parsedDoc.querySelector('.needs-validation:not(#popUpForm .needs-validation)');
      return form;
    }),
    changeFormStyle: () => {
      const brochure_form = document.querySelector('.brochure_T5_form_wrapper form');
      brochure_form.classList.add('brochure_T5_form');
      const firstName = brochure_form.querySelector('[name="firstName"]');
      if (firstName) {
        const firstName_wrapper = firstName.closest('div.inputField');
        firstName_wrapper.classList.add('firstName_wrapper');
        firstName.placeholder = 'First Name*';
        firstName.pattern = '^[A-Za-zs]+$';
      }
      const lastName = brochure_form.querySelector('[name="lastName"]');
      if (lastName) {
        const lastName_wrapper = lastName.closest('div.inputField');
        lastName_wrapper.classList.add('lastName_wrapper');
        lastName.placeholder = 'Last Name*';
        lastName.pattern = '^[A-Za-zs]+$';
      }
      const email = brochure_form.querySelector('[name="email"]');
      if (email) {
        email.placeholder = 'Email Address*';
      }
      const policy = brochure_form.querySelector('.rte-Main-specification');
      if (policy) {
        policy.innerHTML = 'I would like to receive marketing information including (but not limited to) offers, promotions and information about the new goods and services by LDV New Zealand. By clicking "Download Brochure", I consent to the collection, use and disclosure of my personal data provided is this form, by LDV New Zealand, for the purpose set out in the Privacy Policy accessible "<a href="/privacy-policy/" title="Privacy Policy">here.</a>"';
      }
      const submit_btn = brochure_form.querySelector('button[type="submit"]');
      if (submit_btn) {
        submit_btn.classList.remove('btn-Black', 'h-[48px]');
        submit_btn.classList.add('btn-Primary', 'h-[50px]');
        submit_btn.textContent = 'Download Pricelist';
      }
    }
  };

  /* eslint-disable camelcase */

  function init() {
    const bodyEl = document.querySelector('body');
    console.log('*** LDV T5 - Pricelist Lead Capture ***');
    bodyEl.classList.add('ldvt5');

    // HTML and Event Bind
    if (!document.querySelector('.brochure_T5')) {
      bodyEl.insertAdjacentHTML('afterbegin', config.html);
      config.fetchForm().then(form => {
        const brochure_T5_form_wrapper = document.querySelector('.brochure_T5_form_wrapper');
        if (!brochure_T5_form_wrapper.querySelector('form')) {
          brochure_T5_form_wrapper.append(form);
          config.changeFormStyle();
          config.populateFormFromSession();
          config.handleDwnloadBtn();
          config.clickBind();
        }
      });
    }
  }

  /* eslint-disable import/extensions */

  (function kamLdvt5V1() {
    if (!window.t5Start) {
      window.t5Start = true;
      Kameleoon.API.Core.runWhenElementPresent('body', init);
    }
  })();
})();