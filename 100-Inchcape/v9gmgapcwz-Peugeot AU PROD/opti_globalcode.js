// Iframe Cross Origin Setup

window.optimizely = window.optimizely || [];

window.optimizely.push({
  "type": "waitForOriginSync",
  "canonicalOrigins": ["peugeot.com.au", "peugeotforms.pcaconnect.com.au"]
});

// Summary form submit conversion tracking

// (function formSubmitTracking() {
//   function waitUntil(predicate, time = 10000) {
//     return new Promise((resolve) => {
//       let int = setInterval(() => {
//         if (predicate()) {
//           resolve(predicate());
//           clearInterval(int);
//           int = null;
//         }
//       }, 50);
//       setTimeout(() => {
//         if (int !== null) {
//           clearInterval(int);
//           console.log("condition false");
//         }
//       }, time);
//     });
//   }

//   function push_API_only(nameOfEvent) {
//     window.optimizely = window.optimizely || [];
//     window.optimizely.push({
//       type: "event",
//       eventName: nameOfEvent,
//     });
//   }
//   const formSubmitHandler = () => {
//     jQuery(document).on(
//       "submit",
//       "form#buildbuy_testdrive_enquiry_form, form#buildbuy_email_dealer_form",
//       (e) => {
//         const formBody = e.target;
//         const wrapper = formBody.parentElement;
//         waitUntil(() =>
//           wrapper.querySelector("div.buildFormSuccessWrapper")
//         ).then(() => {
//           if (wrapper.id === "buildbuy_email_dealer") {
//             console.log("*** Form Submit Success Enquire Now ***");
//             push_API_only("make_an_enquiry_conversion");
//           } else if (wrapper.id === "buildbuy_testdrive_enquiry") {
//             console.log("*** Form Submit Success Test drive ***");
//             push_API_only("book_a_test_drive_conversion");
//           }
//         });
//       }
//     );
//   };

//   if (window.location.pathname.includes("/build-and-buy/build/summary/")) {
//     waitUntil(() => typeof window.jQuery === "function").then(
//       formSubmitHandler
//     );
//   }
// })();

// Book a test drive Conversion Metrics

(function BaTD_iframe_form_Conversion() {
    function waitUntil(predicate, time = 10000) {
        return new Promise(((resolve) => {
            let int = setInterval(() => {
                if (predicate()) {
                    resolve(predicate());
                    clearInterval(int);
                    int = null;
                }
            }, 50);
            setTimeout(() => {
                if (int !== null) {
                    clearInterval(int);
                    console.log('condition false');
                }
            }, time);
        }));
    }

    function push_API_only(nameOfEvent) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName: nameOfEvent
        });
    }

    function clickBind() {
        jQuery(document).on('click', 'form#JCCFORM_2  input#btnSubmit', () => {
            waitUntil(() => document.querySelector('div.success-message') !== null)
                .then(() => {
                    push_API_only('Book_a_Test_Drive_Conversion');
                });
        });

        if (window.location.pathname.includes('/tools/test-drive.html')) {
            window.addEventListener('message', handleMessageFromIframe);
        }
    }


    function handleMessageFromIframe(event) {
        const messageData = event.data;
        if (JSON.stringify(messageData).includes('"mainStepName":"confirmation"')) {
            push_API_only('Book_a_Test_Drive_Conversion');
        }
    }

    waitUntil(() => typeof jQuery === 'function')
        .then(clickBind);
}());


// Global Script T24 Starts

function waitForJquery() {
    return new Promise((resolve) => {
        let int = setInterval(() => {
            if (typeof window.jQuery === 'function') {
                resolve(window.jQuery);
                clearInterval(int);
                int = null;
            }
        }, 500);
        setTimeout(() => {
            if (int !== null) {
                clearInterval(int);
                console.log('condition false');
            }
        }, 10000);
    });
}
function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}
function checkCookieDuration(name) {
    const value = getCookie(name);
    if (value !== '') {
        return true;
    }
    return false;
}

function push_API_only(nameOfEvent) {
    window.optimizely = window.optimizely || [];
    window.optimizely.push({
        type: 'event',
        eventName: nameOfEvent
    });
}

function trackMetric() {
    jQuery('#main .q-modal-content .aem-Grid a[data-gtm-event-category="d1-content::Content"]').click(() => {
        if (jQuery('.pcat24').length === 0) {
            console.log('**** T24 Brochure Downloads Control ****');
            push_API_only('Brochure_Downloads');
        } else if (checkCookieDuration('T24EmailCollected')) {
            console.log('**** T24 Brochure Downloads V1 ****');
            push_API_only('Brochure_Downloads');
        }
    });
}

waitForJquery().then(() => {
    console.log('**** T24 Global Script ****');
    trackMetric();
});

// T24 Ends

// T41 & T42 Global Code Starts

(function initGlobal() {
    console.log('*** T41 & T42 Global Code ***');

    function waitUntil(predicate, time = 40000) {
        return new Promise(((resolve) => {
            let int = setInterval(() => {
                if (predicate()) {
                    resolve(predicate());
                    clearInterval(int);
                    int = null;
                }
            }, 15);
            setTimeout(() => {
                if (int !== null) {
                    clearInterval(int);
                    console.log('condition false');
                }
            }, time);
        }));
    }

    function findRetailerChanges() {
        const targetSection = document
            .querySelector('div.q-mod.q-btn-bottom a[title="PEUGEOT Offers"]')
            .closest('.grid_builder_v2');
        document
            .querySelector('div.headline_text_v2')
            .insertAdjacentElement('afterend', targetSection);

        jQuery(`
        <style class="spacingChanges">
            @media only screen and (max-width: 768px) {
                .q-modal-content > .aem-Grid .grid_builder_v2:not(:nth-child(4)) .q-grid-container{
                    margin-top: 1.5rem;
                }
            }
        </style>`)
            .appendTo('head');
    }

    function EnquiryFormAnchoring() {
        const offset = window.innerWidth < 768 ? 50 : 0;
        const inter = setInterval(() => {
            window.scrollTo(0, document.querySelector('.q-modal-content > .aem-Grid').offsetTop - offset);
        }, 0);
        setTimeout(() => {
            jQuery('.hideBanner').remove();
            clearInterval(inter);
            window.scrollTo(0, document.querySelector('.q-modal-content > .aem-Grid').offsetTop - offset);
        }, 2000);
    }

    function insertCSS() {
        jQuery(`
            <style class="hideBanner">
                .gridwithbackground__wrapper,
                .q-modal-content > .q-masthead,
                .q-nav-primary {
                    display:none
                }
            </style>`)
            .appendTo('head');
    }

    waitUntil(
        () => typeof window.jQuery === 'function'
            && (window.location.href.includes('/tools/request-quote.html/?T41Variation=true')
                || window.location.href.includes('/tools/test-drive.html/?T41Variation=true'))
    ).then(() => {
        insertCSS();
    });


    // Request Quote / Test Drive Page Changes
    waitUntil(
        () => (window.location.href.includes('/tools/request-quote.html/?T41Variation=true')
            || window.location.href.includes('/tools/test-drive.html/?T41Variation=true'))
            && document.querySelector('.q-modal-content > .aem-Grid') !== null
            && typeof window.jQuery === 'function'
    ).then(() => {
        EnquiryFormAnchoring();
    });


    // Find Retailer Page Changes
    waitUntil(
        () => window.location.href.includes('/tools/find-retailer.html/?T41Variation=true')
            && document.querySelector('div.headline_text_v2') !== null
            && document.querySelector('div.q-mod.q-btn-bottom a[title="PEUGEOT Offers"]') !== null
            && typeof window.jQuery === 'function'
    ).then(() => {
        findRetailerChanges();
    });
}());

// T41 Ends



// make an enquiry Conversion Metrics start T60

(function enquiry_iframe_form_Conversion() {
    function waitUntil(predicate, time = 10000) {
        return new Promise(((resolve) => {
            let int = setInterval(() => {
                if (predicate()) {
                    resolve(predicate());
                    clearInterval(int);
                    int = null;
                }
            }, 50);
            setTimeout(() => {
                if (int !== null) {
                    clearInterval(int);
                    console.log('condition false');
                }
            }, time);
        }));
    }

    function push_API_only(nameOfEvent) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName: nameOfEvent
        });
    }

    function clickBind() {
         jQuery(document).on('click', 'form#general_enquiry_form input[type="submit"]', () => {
            waitUntil(() => document.querySelector('div.success') !== null)
                .then(() => {
                console.log('*** enquire_now_conversion_global goal triggered ***');
                 push_API_only('enquire_now_conversion_global');
                });
        });

        if (window.location.pathname.includes('/tools/enquiry.html')) {
            window.addEventListener('message', handleMessageFromIframe);
        }
    }


    function handleMessageFromIframe(event) {
        const messageData = event.data;
        if (JSON.stringify(messageData).includes('"mainStepName":"confirmation"')) {
            console.log('*** enquire_now_conversion_global goal triggered ***');
            push_API_only('enquire_now_conversion_global');
        }
    }

    waitUntil(() => typeof jQuery === 'function')
        .then(clickBind);
}());

// make an enquiry Conversion Metrics end T60
