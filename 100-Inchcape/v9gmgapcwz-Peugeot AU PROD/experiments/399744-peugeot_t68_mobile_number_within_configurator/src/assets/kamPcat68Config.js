/* eslint-disable no-console */
import { goals } from '../../goals.js';

function kamPcat68ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}

const kamPcat68Config = {
    getEnquireFormHTML: (modelname = '') => `
  <div class="pcat68-callback-card pcat68-callback-card-v1">
  <h2>Need expert advice on your configuration?</h2>

  <p class="pcat68-desc">
    Our PEUGEOT product specialists are standing by for personalised guidance on your build, or any questions you may have about the PEUGEOT ${modelname}.
  </p>

  <div class="pcat68-form-group">
    <label for="pcat68-name">NAME</label>
    <input id="pcat68-name" class="pcat68-input pcat68-name" type="text" maxlength="255" autocomplete="name" />
    <div class="pcat68-field-error pcat68-error-hidden" aria-live="polite">This field required</div>
  </div>

  <div class="pcat68-form-group">
    <label for="pcat68-phone">PHONE</label>
    <input id="pcat68-phone" class="pcat68-input pcat68-phone" type="tel" maxlength="10" autocomplete="tel" inputmode="numeric" />
    <div class="pcat68-field-error pcat68-error-hidden" aria-live="polite">This field required</div>
  </div>

  <p class="pcat68-note">
    Your number will only be used to assist with this configuration. No pressure. No spam. We are here to bring pleasure back into your drive.
  </p>

  <button class="pcat68-btn">REQUEST CALLBACK</button>
</div>
    `,
    getEnquireFormHTMLV2: (modelname = '') => `
  <div class="pcat68-callback-card pcat68-callback-card-v2">
    <img class="pcat68-callback-icon" src="//cdn.optimizely.com/img/15841360337/99219f26df5142d8901e7d98a9570077.png" alt="" aria-hidden="true" />
    <div class="pcat68-col-first">
      <h2>Need expert advice on your configuration?</h2>
  <p class="pcat68-desc">
    Our PEUGEOT product specialists are standing by for personalised guidance on your build, or any questions you may have about the PEUGEOT ${modelname}.
  </p>
   <p class="pcat68-note">
    Your number will only be used to assist with this configuration. No pressure. No spam. We are here to bring pleasure back into your drive.
  </p>
    </div>
  
<div class="pcat68-col-second">
  <div class="pcat68-form-group">
    <label for="pcat68-name">NAME</label>
    <input id="pcat68-name" class="pcat68-input pcat68-name" type="text" maxlength="255" autocomplete="name" />
    <div class="pcat68-field-error pcat68-error-hidden" aria-live="polite">This field required</div>
  </div>

  <div class="pcat68-form-group">
    <label for="pcat68-phone">PHONE</label>
    <input id="pcat68-phone" class="pcat68-input pcat68-phone" type="tel" maxlength="10" autocomplete="tel" inputmode="numeric" />
    <div class="pcat68-field-error pcat68-error-hidden" aria-live="polite">This field required</div>
  </div>
  <button class="pcat68-btn">REQUEST CALLBACK</button>
</div>

</div>
    `,
    getThankYouHTML: () => `
  <div class="pcat68-thankyou-wrap">
    <img class="pcat68-thankyou-icon" src="//cdn.optimizely.com/img/15841360337/99219f26df5142d8901e7d98a9570077.png" alt="" aria-hidden="true" />
    <h2 class="pcat68-thankyou-title">Thank you!</h2>
    <p class="pcat68-thankyou-desc">A PEUGEOT product specialist will get in touch soon.</p>
  </div>
    `,
    init: (variation) => {
        document.body.classList.add('pcat68');
        if (variation !== 'v1' && variation !== 'v2') return;
        if (variation === 'v1') {
            const trimDetailsSecondaryColumn = document.querySelector('.trimDetailsWrapper .trimDetailsSecondaryColumn');
            if (trimDetailsSecondaryColumn) {
                const modelnameEl = document.querySelector(
                    '.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemModel .tdOfferBoxItemText'
                );
                const modelname = modelnameEl.textContent.trim();
                trimDetailsSecondaryColumn.insertAdjacentHTML('beforeend', kamPcat68Config.getEnquireFormHTML(modelname));

                kamPcat68Config.bindEvents(trimDetailsSecondaryColumn);
            }
        } else if (variation === 'v2') {
            const trimDetailsPrimaryColumn = document.querySelector('.trimDetailsWrapper .trimDetailsPrimaryColumn');
            const trimDetailsPromotionRow = trimDetailsPrimaryColumn.querySelector('.trimDetailsPromotionRow');
            if (trimDetailsPrimaryColumn) {
                const modelnameEl = document.querySelector(
                    '.trimDetailsOfferBox .tdOfferBoxItem.tdOfferBoxItemModel .tdOfferBoxItemText'
                );
                const modelname = modelnameEl.textContent.trim();
                trimDetailsPromotionRow.insertAdjacentHTML('afterend', kamPcat68Config.getEnquireFormHTMLV2(modelname));
                kamPcat68Config.bindEvents(trimDetailsPrimaryColumn);
            }
        }
    },
    bindEvents: (rootEl) => {
        const card = rootEl.querySelector('.pcat68-callback-card');
        if (!card) return;

        const nameInput = card.querySelector('.pcat68-name');
        const phoneInput = card.querySelector('.pcat68-phone');
        const submitBtn = card.querySelector('.pcat68-btn');
        if (!nameInput || !phoneInput || !submitBtn) return;

        const setFieldError = (inputEl, hasError) => {
            if (!inputEl) return;
            const errEl = inputEl.parentElement.querySelector('.pcat68-field-error');
            inputEl.classList.toggle('pcat68-has-error', hasError);
            inputEl.setAttribute('aria-invalid', hasError ? 'true' : 'false');
            if (errEl) errEl.classList.toggle('pcat68-error-hidden', !hasError);
        };

        const normalizeName = value => value.replace(/[^A-Za-z\s]/g, '');
        const normalizePhone = value => value.replace(/\D/g, '').slice(0, 10);
        const getDealerValue = (selector) => {
            const el = document.querySelector(selector);
            return el && el.value ? el.value.trim() : '';
        };
        const submitDealerEnquiry = (fullName, phoneNumber) => {
            const dealerEmail = getDealerValue('form#buildbuy_testdrive_enquiry_form #buildDealerEmail');
            const dealerName = getDealerValue('form#buildbuy_testdrive_enquiry_form #buildDealerName');
            const dealerCode = getDealerValue('form#buildbuy_testdrive_enquiry_form #buildDealerCode');
            const firstName = fullName.split(/\s+/)[0] || 'Blank';
            const storedUserEmail = (localStorage.getItem('userEmail') || '').trim();
            const enquiryEmail = storedUserEmail || 'noemail@provided.com.au';
            const endpoint = `https://configurator.peugeot.com.au/ssl/forms/responsive_ajax/buildbuy_email_dealer.asp?dealerEmail=${encodeURIComponent(dealerEmail)}&dealerName=${encodeURIComponent(dealerName)}&dealerCode=${encodeURIComponent(dealerCode)}`;

            const body = new URLSearchParams({
                fEmailDealer_Title: 'Other',
                fEmailDealer_FirstName: firstName,
                fEmailDealer_LastName: 'Blank',
                fEmailDealer_Email: enquiryEmail,
                fEmailDealer_Phone: phoneNumber,
                fEmailDealer_EmptyCheck: '',
                buildDealerEmail: dealerEmail,
                buildDealerName: dealerName,
                buildDealerCode: dealerCode,
                fEmailDealerEnq_Terms: 'True',
                fEmailDealer_Comment: 'I need assistance with my configuration'
            }).toString();

            return fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    accept: 'text/html, */*; q=0.01',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    cid: '7',
                    key: 'SMG4H8P90',
                    posseid: '1218',
                    'x-requested-with': 'XMLHttpRequest'
                },
                body
            });
        };

        nameInput.addEventListener('input', () => {
            const next = normalizeName(nameInput.value);
            if (nameInput.value !== next) nameInput.value = next;
            setFieldError(nameInput, false);
        });

        phoneInput.addEventListener('input', () => {
            const next = normalizePhone(phoneInput.value);
            if (phoneInput.value !== next) phoneInput.value = next;
            setFieldError(phoneInput, false);
        });

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const nameVal = (nameInput.value || '').trim();
            const phoneVal = (phoneInput.value || '').trim();

            const isNameValid = nameVal.length > 0 && /^[A-Za-z\s]+$/.test(nameVal);
            const isPhoneValid = phoneVal.length > 0 && phoneVal.length <= 10 && /^\d+$/.test(phoneVal);

            setFieldError(nameInput, !isNameValid);
            setFieldError(phoneInput, !isPhoneValid);

            if (!isNameValid || !isPhoneValid) return;

            submitBtn.disabled = true;
            submitDealerEnquiry(nameVal, phoneVal)
                .then((response) => {
                    if (!response || response.ok === false) {
                        submitBtn.disabled = false;
                        return;
                    }
                    console.log('*** Phone number captured goal triggered ***');
                    kamPcat68ProcessGoal('Phone numbers captured');
                    card.innerHTML = kamPcat68Config.getThankYouHTML();
                    card.classList.add('pcat68-thankyou-card');
                })
                .catch(() => {
                    submitBtn.disabled = false;
                });
        });
    }
};

export default kamPcat68Config;
