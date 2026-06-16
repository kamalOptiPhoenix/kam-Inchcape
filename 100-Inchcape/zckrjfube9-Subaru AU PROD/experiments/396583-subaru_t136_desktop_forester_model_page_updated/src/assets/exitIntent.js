/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

const exitIntent = {
    shown: false,
    modalId: 'subt136-exit-intent-modal',
    overlayId: 'subt136-exit-intent-overlay',
    brochureUrl: 'https://docs.subaru.com.au/Subaru-Forester-brochure.pdf',
    privacyUrl: 'https://www.subaru.com.au/privacy-policy',

    HTML: `
    <div id="subt136-exit-intent-overlay" class="subt136-exit-overlay">
        <div id="subt136-exit-intent-modal" class="subt136-exit-modal">
            <button class="subt136-exit-close" aria-label="Close modal">&times;</button>
            
            <div class="subt136-exit-content" id="subt136-exit-initial-content">
                <div class="subt136-exit-top-section">
                    <h2 class="subt136-exit-headline">Before you go...</h2>
                    <p class="subt136-exit-subheadline">Get the Forester brochure</p>
                    
                    <p class="subt136-exit-description">Compare features, specs and pricing at your own pace.</p>
                    
                    <div class="subt136-exit-car-image">
                        <img src="https://cdn.oem-production.subaru.com.au/media/uhniabbl/my26-forester-awd-touring-front-daybreakpearl.png" alt="Subaru Forester" />
                    </div>
                    
                    <a href="https://docs.subaru.com.au/Subaru-Forester-brochure.pdf" 
                       class="subt136-exit-download-link" 
                       target="_blank"
                       rel="noopener noreferrer">
                        <span>Download</span>
                    </a>
                </div>
                
                <div class="subt136-exit-divider"></div>
                
                <div class="subt136-exit-bottom-section">
                    <div class="subt136-exit-form-wrapper">
                        <p class="subt136-exit-form-intro">Why not send a copy of the brochure straight to your inbox for later?</p>
                        
                        <form class="subt136-exit-form" id="subt136-exit-form">
                            <div class="subt136-exit-form-group">
                                <input 
                                    type="email" 
                                    id="subt136-exit-email" 
                                    name="email" 
                                    placeholder="Email" 
                                    required 
                                    class="subt136-exit-input"
                                />
                                <span class="subt136-exit-error" id="subt136-email-error">Please enter a valid email address</span>
                            </div>
                            
                            <p class="subt136-exit-tagline">Access anytime, even after you leave.</p>
                            
                            <div class="subt136-exit-checkbox-group">
                                <input 
                                    type="checkbox" 
                                    id="subt136-exit-privacy" 
                                    name="privacy" 
                                    required 
                                    class="subt136-exit-checkbox"
                                />
                                <label for="subt136-exit-privacy" class="subt136-exit-checkbox-label">
                                    Please confirm you have read and agreed to our 
                                    <a href="https://www.subaru.com.au/privacy-policy" target="_blank" rel="noopener noreferrer" class="subt136-exit-privacy-link">Privacy Collection Statement</a> 
                                    by checking this box.
                                </label>
                            </div>
                            
                            <button type="submit" class="subt136-exit-submit" disabled>Email my brochure</button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="subt136-exit-content subt136-exit-success-content" id="subt136-exit-success-content" style="display: none;">
                <div class="subt136-exit-top-section">
                    <h2 class="subt136-exit-headline">Thanks for downloading!</h2>
                    <p class="subt136-exit-subheadline-success">Your brochure is available through the following link:</p>
                    
                    <div class="subt136-exit-car-image">
                        <img src="https://cdn.oem-production.subaru.com.au/media/uhniabbl/my26-forester-awd-touring-front-daybreakpearl.png" alt="Subaru Forester" />
                    </div>
                    
                    <a href="https://docs.subaru.com.au/Subaru-Forester-brochure.pdf" 
                       class="subt136-exit-download-link" 
                       target="_blank"
                       rel="noopener noreferrer">
                        <span>Download</span>
                    </a>
                </div>
                
                <div class="subt136-exit-divider"></div>
                
                <div class="subt136-exit-bottom-section">
                    <p class="subt136-exit-success-message">Your brochure has been sent to your email.<br/>Please check your inbox!</p>
                </div>
            </div>
        </div>
    </div>
    `,

    injectHTML() {
        if (document.getElementById(this.overlayId)) return;
        document.body.insertAdjacentHTML('beforeend', this.HTML);
    },

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    async hashEmail(email) {
        // Hash email using SHA256
        const msgBuffer = new TextEncoder().encode(email.toLowerCase().trim());
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    },

    triggerAnalyticsEvent(hashedEmail) {
        // Trigger digitalData event
        if (window.digitalData && window.digitalData.events && window.digitalData.events.pushAndUpdate) {
            window.digitalData.events.pushAndUpdate({
                event: '_formNavigate',
                form: {
                    name: 'email brochure',
                    stage: 'submitted',
                    details: {
                        dealerContact: false,
                        vehicleSelected: [
                            {
                                make: 'subaru',
                                model: 'forester'
                            }
                        ]
                    }
                },
                user: {
                    emailHashed: hashedEmail
                }
            });
            console.log('Analytics event triggered with hashed email:', hashedEmail);
        } else {
            console.warn('digitalData.events.pushAndUpdate not available');
        }
    },

    updateSubmitButton() {
        const emailInput = document.getElementById('subt136-exit-email');
        const privacyCheckbox = document.getElementById('subt136-exit-privacy');
        const submitButton = document.querySelector('.subt136-exit-submit');

        if (!emailInput || !privacyCheckbox || !submitButton) return;

        const emailValid = this.validateEmail(emailInput.value);
        const privacyChecked = privacyCheckbox.checked;

        submitButton.disabled = !(emailValid && privacyChecked);
    },

    showSuccessState() {
        const initialContent = document.getElementById('subt136-exit-initial-content');
        const successContent = document.getElementById('subt136-exit-success-content');

        if (initialContent && successContent) {
            initialContent.style.display = 'none';
            successContent.style.display = 'block';
        }
    },

    bindFormEvents() {
        const form = document.getElementById('subt136-exit-form');
        const emailInput = document.getElementById('subt136-exit-email');
        const privacyCheckbox = document.getElementById('subt136-exit-privacy');
        const emailError = document.getElementById('subt136-email-error');

        if (!form || !emailInput || !privacyCheckbox) return;

        // Email validation on blur
        Kameleoon.API.Utils.addEventListener(emailInput, 'blur', () => {
            if (emailInput.value && !this.validateEmail(emailInput.value)) {
                emailInput.classList.add('error');
                emailError.classList.add('visible');
            } else {
                emailInput.classList.remove('error');
                emailError.classList.remove('visible');
            }
        });

        // Update button state on input
        Kameleoon.API.Utils.addEventListener(emailInput, 'input', () => {
            if (emailInput.classList.contains('error')) {
                emailInput.classList.remove('error');
                emailError.classList.remove('visible');
            }
            this.updateSubmitButton();
        });

        Kameleoon.API.Utils.addEventListener(privacyCheckbox, 'change', () => {
            this.updateSubmitButton();
        });

        // Form submission
        Kameleoon.API.Utils.addEventListener(form, 'submit', async (e) => {
            e.preventDefault();

            if (!this.validateEmail(emailInput.value)) {
                emailInput.classList.add('error');
                emailError.classList.add('visible');
                return;
            }

            if (!privacyCheckbox.checked) {
                return;
            }

            // Disable submit button during API call
            const submitButton = document.querySelector('.subt136-exit-submit');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                // Call the encryption API with hardcoded values and user's email
                const response = await fetch('https://www.subaru.com.au/api/encryption/encrypt', {
                    method: 'POST',
                    headers: {
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.9',
                        'content-type': 'application/json',
                        'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
                        'sec-ch-ua-mobile': '?1',
                        'sec-ch-ua-platform': '"Android"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin'
                    },
                    body: JSON.stringify({
                        encryptedEmail: emailInput.value,
                        encryptedPhone: '07878787878',
                        encryptedFirstName: 'noname',
                        encryptedLastName: 'noname'
                    }),
                    mode: 'cors',
                    credentials: 'include'
                });

                if (response.ok) {
                    // Hash email and trigger analytics event
                    const hashedEmail = await this.hashEmail(emailInput.value);
                    this.triggerAnalyticsEvent(hashedEmail);

                    // Success - show success state instead of closing
                    this.showSuccessState();
                } else {
                    // API error
                    console.error('API Error:', response.status, response.statusText);
                    alert('There was an error processing your request. Please try again.');

                    // Re-enable submit button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Email my brochure';
                    }
                }
            } catch (error) {
                // Network or other error
                console.error('Submission error:', error);
                alert('There was an error processing your request. Please try again.');

                // Re-enable submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Email my brochure';
                }
            }
        });
    },

    bindCloseEvents() {
        const overlay = document.getElementById(this.overlayId);
        const closeBtn = document.querySelector('.subt136-exit-close');

        if (!overlay || !closeBtn) return;

        // Close on X button click
        Kameleoon.API.Utils.addEventListener(closeBtn, 'click', () => {
            this.close();
        });

        // Close on overlay click (not modal content)
        Kameleoon.API.Utils.addEventListener(overlay, 'click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });

        // Close on ESC key
        Kameleoon.API.Utils.addEventListener(document, 'keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                this.close();
            }
        });
    },

    show() {
        if (this.shown) return;
        this.shown = true;

        const overlay = document.getElementById(this.overlayId);
        if (!overlay) return;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        const overlay = document.getElementById(this.overlayId);
        if (!overlay) return;

        overlay.classList.remove('active');
        document.body.style.overflow = '';
    },

    detectExitIntent() {
        let hasShown = false;

        Kameleoon.API.Utils.addEventListener(document, 'mouseleave', (e) => {
            // Only trigger if mouse is leaving from the top of the page
            if (e.clientY <= 0 && !hasShown) {
                hasShown = true;
                this.show();
            }
        });
    },

    init() {
        this.injectHTML();
        this.bindFormEvents();
        this.bindCloseEvents();
        this.detectExitIntent();
    }
};

export default exitIntent;
