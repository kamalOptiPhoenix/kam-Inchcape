/* eslint-disable no-console */

const PHONE_STORAGE_KEY = 'kamT140PreferredPhone';
const LEAD_MODAL_SELECTOR = '[data-test="modal:leadCapture"]';
const EMAIL_INPUT_SELECTOR = `${LEAD_MODAL_SELECTOR} input[data-test="input:email"]`;
const NEXT_BUTTON_SELECTOR = '[data-test="button:personalDetails:next"]';
const ERROR_MESSAGE = 'Please enter a valid phone number';
const MIN_DIGITS = 10;
const MAX_DIGITS = 10;
const WATCH_INTERVAL_MS = 300;

const PHONE_FIELD_HTML = `
<div class="SPC_WIDGET-MuiFormControl-root SPC_WIDGET-MuiTextField-root SPC_WIDGET-PROD412 SPC_WIDGET-MuiFormControl-fullWidth kamT140PreferredPhone">
  <div class="SPC_WIDGET-MuiInputBase-root SPC_WIDGET-MuiInput-root SPC_WIDGET-MuiInput-underline SPC_WIDGET-MuiInputBase-fullWidth SPC_WIDGET-MuiInput-fullWidth SPC_WIDGET-MuiInputBase-formControl SPC_WIDGET-MuiInput-formControl">
    <input
      aria-invalid="false"
      name="preferredPhone"
      placeholder="Preferred Phone Number"
      type="tel"
      inputmode="numeric"
      autocomplete="tel"
      minlength="${MIN_DIGITS}"
      maxlength="${MAX_DIGITS}"
      data-test="input:preferredPhone"
      class="SPC_WIDGET-MuiInputBase-input SPC_WIDGET-MuiInput-input"
      value=""
    />
  </div>
  <p class="SPC_WIDGET-MuiFormHelperText-root Mui-error kamT140PreferredPhone__error" hidden>${ERROR_MESSAGE}</p>
</div>
`;

function kamT140NormalizePhone(value) {
    return String(value || '').replace(/\D/g, '').slice(0, MAX_DIGITS);
}

function kamT140IsPhoneValid(value) {
    const digits = kamT140NormalizePhone(value);
    return digits.length >= MIN_DIGITS && digits.length <= MAX_DIGITS && /^\d+$/.test(digits);
}

function kamT140StorePreferredPhone(value) {
    const digits = kamT140NormalizePhone(value);
    if (!digits) {
        localStorage.removeItem(PHONE_STORAGE_KEY);
        return;
    }
    localStorage.setItem(PHONE_STORAGE_KEY, digits);
}

export function kamT140GetPreferredPhone() {
    return localStorage.getItem(PHONE_STORAGE_KEY) || '';
}

function kamT140SetPhoneError(fieldRoot, input, hasError) {
    if (!fieldRoot || !input) {
        return;
    }

    const errorEl = fieldRoot.querySelector('.kamT140PreferredPhone__error');
    const underline = fieldRoot.querySelector('.SPC_WIDGET-MuiInput-root');

    input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    if (underline) {
        underline.classList.toggle('Mui-error', hasError);
    }
    if (errorEl) {
        errorEl.hidden = !hasError;
    }
}

function kamT140BindPhoneField(fieldRoot) {
    const input = fieldRoot.querySelector('input[data-test="input:preferredPhone"]');
    if (!input || input.dataset.kamT140PhoneBound === 'true') {
        return;
    }

    input.dataset.kamT140PhoneBound = 'true';

    const stored = kamT140GetPreferredPhone();
    if (stored) {
        input.value = stored;
    }

    Kameleoon.API.Utils.addEventListener(input, 'input', () => {
        const next = kamT140NormalizePhone(input.value);
        if (input.value !== next) {
            input.value = next;
        }
        kamT140StorePreferredPhone(next);
        kamT140SetPhoneError(fieldRoot, input, false);
    });
}

function kamT140InjectPhoneField() {
    const modal = document.querySelector(LEAD_MODAL_SELECTOR);
    if (!modal || modal.querySelector('.kamT140PreferredPhone')) {
        return false;
    }

    // Personal-details step only — email is not in the DOM on Location step
    const emailInput = modal.querySelector('input[data-test="input:email"]');
    const emailField = emailInput && emailInput.closest('.SPC_WIDGET-MuiFormControl-root');
    if (!emailField) {
        return false;
    }

    emailField.insertAdjacentHTML('afterend', PHONE_FIELD_HTML);

    const phoneField = modal.querySelector('.kamT140PreferredPhone');
    if (!phoneField) {
        return false;
    }

    kamT140BindPhoneField(phoneField);
    console.log('%c *** T140 add mobile field ***', 'color:red;background:pink');
    return true;
}

function kamT140ObserveLeadModal() {
    const modal = document.querySelector(LEAD_MODAL_SELECTOR);
    if (!modal || modal.dataset.kamT140PhoneObs === 'true') {
        return;
    }

    modal.dataset.kamT140PhoneObs = 'true';

    const observer = new MutationObserver(() => {
        kamT140InjectPhoneField();
    });

    observer.observe(modal, { childList: true, subtree: true });
    kamT140InjectPhoneField();
}

function kamT140HandleNextClick(event) {
    const el = event.target.nodeType === 1 ? event.target : event.target.parentElement;
    const nextBtn = el && el.closest && el.closest(NEXT_BUTTON_SELECTOR);

    if (!nextBtn) {
        return;
    }

    const modal = document.querySelector(LEAD_MODAL_SELECTOR);
    if (!modal || !modal.contains(nextBtn)) {
        return;
    }

    const phoneField = modal.querySelector('.kamT140PreferredPhone');
    const phoneInput = phoneField && phoneField.querySelector('input[data-test="input:preferredPhone"]');
    if (!phoneInput) {
        return;
    }

    const phoneValue = kamT140NormalizePhone(phoneInput.value);

    if (!kamT140IsPhoneValid(phoneValue)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        kamT140SetPhoneError(phoneField, phoneInput, true);
        phoneInput.focus();
        return;
    }

    kamT140StorePreferredPhone(phoneValue);
    kamT140SetPhoneError(phoneField, phoneInput, false);
}

/**
 * First-land race: lead modal opens before/while experiment loads, then Location →
 * Personal details remounts React nodes. One-shot runWhenElementPresent can fire on a
 * transient email node (or miss the remount). Persistent poll + MutationObserver covers both.
 */
function kamT140StartPersistentWatch() {
    if (window.__kamT140PreferredPhoneKeepAlive) {
        window.clearInterval(window.__kamT140PreferredPhoneKeepAlive);
    }

    const tick = () => {
        if (document.querySelector(LEAD_MODAL_SELECTOR)) {
            kamT140ObserveLeadModal();
            kamT140InjectPhoneField();
        }
    };

    tick();
    window.__kamT140PreferredPhoneKeepAlive = window.setInterval(tick, WATCH_INTERVAL_MS);

    // Fast path when email appears (still useful; poll covers remounts)
    Kameleoon.API.Core.runWhenElementPresent(EMAIL_INPUT_SELECTOR, () => {
        kamT140InjectPhoneField();
    });

    Kameleoon.API.Core.runWhenElementPresent(LEAD_MODAL_SELECTOR, () => {
        kamT140ObserveLeadModal();
        kamT140InjectPhoneField();
    });
}

export default function kamT140AddPreferredPhone() {
    if (window.__kamT140PreferredPhoneBound) {
        return;
    }

    window.__kamT140PreferredPhoneBound = true;

    kamT140StartPersistentWatch();
    document.addEventListener('click', kamT140HandleNextClick, true);
}
