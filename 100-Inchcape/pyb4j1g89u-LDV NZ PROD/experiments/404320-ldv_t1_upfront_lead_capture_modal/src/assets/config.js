/* eslint-disable camelcase */
/* eslint-disable id-length */
/* eslint-disable no-tabs */
/* eslint-disable no-useless-escape */
import kamLdvt1ProcessGoal from './kamLdvt1ProcessGoal.js';

const config = {
    html: `
   <section class="brochure_T1 form_modal hidden fixed z-50 left-0 top-0 w-full h-full overflow-auto shadow-lg">
    <div class="form_modal-content relative mx-auto">
      
      <button class="form_modalClose flex justify-end hover:cursor-pointer absolute top-4 xl:top-[20px] right-4 xl:right-[20px] z-[1000] w-5 xl:w-[50px]">
       <img src="//cdn.optimizely.com/img/15841360337/b595eebaf07447f98ca9513cf5bf5326.svgz"></img>  
      </button>

      

      <div class="flex lg:flex-row w-full h-full sm:flex flex-col">
        
        <div class="brochure_T1_content flex flex-col text-container px-0 py-0 lg:px-0 lg:py-0" >
          
          <div class="lg:px-10 lg:py-10 shadow-lg" style="background-color: #ffffff;">

              <div class="text-center lg:mt-0 brochure_T1_header_wrapper">              
                  <div class="flex justify-center flex-col">
                 <p class= "brochure_T1_heading">Download A brochure</p>
             <p class= "brochure_T1_line"></p>
                  </div>
                  <div class="w-full px-4 lg:px-0 py-8">
                    <p class= "brochure_T1_Description">Please enter your details so that you’re able to download your digital brochure.</p>
                  </div>
              </div>
              <div>


<div class="brochure_T1_form_wrapper"></div>
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
        const allDnwloadBtn = document.querySelectorAll('.btn[download]');
        allDnwloadBtn.forEach((brochureTrigger) => {
            if (brochureTrigger.textContent.trim() === 'Download Brochure') {
                brochureTrigger.classList.add('brochureTrigger');
                Kameleoon.API.Utils.addEventListener(brochureTrigger, 'click', (e) => {
                    const stored = localStorage.getItem('brochure_T1_userData');
                    const userData = stored ? JSON.parse(stored) : {};
                    // If user has already submitted details, allow normal behavior
                    if (userData.email) return;

                    e.preventDefault(); // Stop native download

                    const pdfUrl = brochureTrigger.getAttribute('href');
                    if (pdfUrl && pdfUrl.endsWith('.pdf')) {
                        sessionStorage.setItem('pdfUrl', pdfUrl);
                    }

                    // Show modal
                    document.body.classList.add('T1_ShowNoScroll', 'T1_Show');
                    kamLdvt1ProcessGoal('Pop-up appearances T1');
                });
            }
        });
    },
    validation: {
        Email: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    validateForm: (form) => {
        let isFormValid = true;
        const inputs = Array.from(form.elements);

        inputs.forEach((input) => {
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
        const brochure_T1_form = document.querySelector(
            '.brochure_T1_form_wrapper form'
        );
        Kameleoon.API.Utils.addEventListener(
            brochure_T1_form,
            'submit',
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                const isFormValid = config.validateForm(brochure_T1_form);
                brochure_T1_form.classList.add('was-validated');

                if (isFormValid) {
                    // ✅ Cache user details
                    const firstNameInput = brochure_T1_form.querySelector('[name="firstName"]');
                    const lastNameInput = brochure_T1_form.querySelector('[name="lastName"]');
                    const emailInput = brochure_T1_form.querySelector('[name="email"]');

                    const firstName = firstNameInput ? firstNameInput.value : '';
                    const lastName = lastNameInput ? lastNameInput.value : '';
                    const email = emailInput ? emailInput.value : '';


                    localStorage.setItem(
                        'brochure_T1_userData',
                        JSON.stringify({
                            firstName,
                            lastName,
                            email
                        })
                    );
                    const storedPdfUrl = sessionStorage.getItem('pdfUrl');
                    window.open(storedPdfUrl, '_blank');
                    brochure_T1_form.submit();
                    kamLdvt1ProcessGoal('Contact Details conversions T1');
                }
            }
        );

        Kameleoon.API.Utils.addEventListener(
            document.querySelector('.brochure_T1'),
            'click',
            (event) => {
                const isBackdropClick = event.target === event.currentTarget;
                const isCloseBtn = event.target.closest('.form_modalClose');

                if (isBackdropClick || isCloseBtn) {
                    document.body.classList.remove('T1_ShowNoScroll', 'T1_Show');
                }
            }
        );
    },
    populateFormFromSession: () => {
        const userData = JSON.parse(
            localStorage.getItem('brochure_T1_userData') || '{}'
        );

        if (Object.keys(userData).length) {
            const form = document.querySelector('.brochure_T1_form_wrapper form');

            if (form) {
                if (userData.firstName) form.querySelector('[name="firstName"]').value = userData.firstName;
                if (userData.lastName) form.querySelector('[name="lastName"]').value = userData.lastName;
                if (userData.email) form.querySelector('[name="email"]').value = userData.email;
                if (userData.consent !== undefined) form.querySelector('[name="customCheckBox"]').checked = userData.consent;
            }
        }
    },
    fetchForm: () => fetch('https://ldv.co.nz/')
        .then(res => res.text())
        .then((htmlStr) => {
            const parser = new DOMParser();
            const parsedDoc = parser.parseFromString(htmlStr, 'text/html');
            const form = parsedDoc.querySelector(
                '.needs-validation:not(#popUpForm .needs-validation)'
            );
            return form;
        }),

    changeFormStyle: () => {
        const brochure_form = document.querySelector(
            '.brochure_T1_form_wrapper form'
        );
        brochure_form.classList.add('brochure_T1_form');

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
            submit_btn.textContent = 'Download Brochure';
        }
    }
};
export default config;
