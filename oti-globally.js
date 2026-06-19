// Iframe Cross Origin Setup

window.optimizely = window.optimizely || [];

window.optimizely.push({
  "type": "waitForOriginSync",
  "canonicalOrigins": ["subaru.com.au", "vmc-prd.inchcape.digital"]
});

console.log(`*** Global Code Running on ${window.location.host} ***`);

// T99 global code starts

(function globalT99() {
	function waitUntil(predicate, time = 30000) {
		return new Promise((resolve) => {
			let int = setInterval(() => {
				if (predicate()) {
					resolve(predicate());
					clearInterval(int);
					int = null;
				}
			}, 500);
			setTimeout(() => {
				if (int !== null) {
					clearInterval(int);
					console.log('condition false');
				}
			}, time);
		});
	}

	function push_API_only(nameOfEvent) {
		window.optimizely = window.optimizely || [];
		window.optimizely.push({
			type: 'event',
			eventName: nameOfEvent,
		});
	}

	function init_goals_T99(offerSubmitButton) {
		console.log('** init global special-offers');
		if (offerSubmitButton) {
			offerSubmitButton.addEventListener('click', (event) => {
				if (!offerSubmitButton.disabled) {
					console.log('** T99 Goal1 enquire_now_conversion triggered ');
					push_API_only('enquire_now_conversion');
				}
			});
		}
	}

	(window.location.pathname.includes('/special-offers/subaru-forester-sti-sport') 
  || window.location.pathname.includes('/special-offers/impreza-driveaway')
	|| window.location.pathname.includes('/special-offers/crosstrek-2-0l-driveaway')
	|| window.location.pathname.includes('/special-offers/crosstrek-2-0r-driveaway')
	|| window.location.pathname.includes('/special-offers/crosstrek-2-0s-driveaway')
	|| window.location.pathname.includes('/special-offers/outback-touring-xt')
	|| window.location.pathname.includes('/special-offers/outback-awd-driveaway')
	|| window.location.pathname.includes('/special-offers/subaru-forester-2-5-i-luxury')) &&
		waitUntil(() => document.getElementById('offerSubmit')).then(init_goals_T99);
})();


// T99 global code Ends


// Segment Detection For Cookieless Multiple Models 

(function localStorageChangeDetect() {
  function handleUserSegmentChange(newValue) {
    console.log("*** userSegment changed ****");
    if (newValue) {
      const SegmentObj = JSON.parse(newValue);
      localStorage.setItem("RecentConfiguredSegment", SegmentObj.segment);
      localStorage.setItem("RecentConfiguredModel", SegmentObj.LastConfigured.nameplate.name);
      if (localStorage.getItem('userSegment')) {
        // The user is visiting the site for the first time
        localStorage.setItem('VisitedSite', true);
        sessionStorage.setItem('FirstSession', true);
      }
    }
  }

  function startIntervalCheck() {
    console.log('*** Interval Started to check ***');
    const checkInterval = setInterval(() => {
      const userSegment = localStorage.getItem("userSegment");
      if (userSegment) {
				console.log('*** Interval Stopped Found Segment ***');
        handleUserSegmentChange(userSegment);
        clearInterval(checkInterval); // Stop checking once the value is found
      }
    }, 500); // Check every 500 milliseconds
  }

  if (window.location.pathname.includes("/configure")) {
    // Start the interval check for userSegment
    startIntervalCheck();

    window.addEventListener("storage", (event) => {
      if (event.key === "userSegment") {
        handleUserSegmentChange(event.newValue);
      }
    });

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "userSegment") {
        handleUserSegmentChange(value);
      }
    };
  }
})();

// Segment Detection Code Ends 

// qaCookie | START
// use parameter in URL to create cookies
// for QA purposes
(function () {
    window.URLSearchParams =
        window.URLSearchParams ||
        function (string) {
            this.searchString = string;
            this.has = function (paramKey) {
                var hasParam = false;
                var allParamArray = this.searchString
                    .replace(/^\?/, '')
                    .split('&');
                for (var i = 0; i < allParamArray.length; i++) {
                    if (paramKey === allParamArray[i].split('=')[0]) {
                        hasParam = true;
                        break;
                    }
                }
                return hasParam;
            };
            this.get = function (paramKey) {
                var results = new RegExp(
                    '[\\?&]' + paramKey + '=([^&#]*)'
                ).exec(this.searchString);
                if (!this.has(paramKey) && results === null) {
                    return null;
                } else {
                    return results ? decodeURIComponent(results[1]) : '';
                }
            };
        };
    function getDomain() {
        var dom = window.location.hostname.split('.');
        if (dom.length > 2) {
            dom.shift();
        }
        return dom.join('.');
    }
    function init() {
        var params = new URLSearchParams(window.location.search);
        var cookieDomain = getDomain();
        var cookieName = '';
        var cookieValue = 'true';
        if (params.has('qaCookie')) {
            cookieName = params.get('qaCookie');
            // cookie value is either true or the value of the qaValue parameter if it exists
            if (params.has('qaValue')) {
                cookieValue = params.get('qaValue');
            }
            document.cookie =
                cookieName +
                '=' +
                cookieValue +
                '; path=/; domain=.' +
                cookieDomain +
                '';
        }
    }
    init();
})();
// qaCookie | END

//Cookie World Code Start
/* eslint-disable max-len */
(function global_Cookie_World() {
    function waitUntil(predicate, time = 30000) {
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

    if (window.location.href.indexOf('cookieWorldScrollToSummary') > -1) {
        console.log('**** Scroll To Summary Cookie World Updated ****');

        waitUntil(() => typeof window.jQuery === 'function' && document.querySelectorAll('button[data-test="customise:summary:continuetocheckoutv4"]:not([disabled])').length > 0)
            .then(() => {
                jQuery('button[data-test="customise:summary:continuetocheckoutv4"]:not([disabled])').click();
                setTimeout(() => {
                    jQuery('button[data-test="customise:summary:continuetocheckoutv4"]:not([disabled])').click();
                }, 1500);
            });
    }
}());

//Cookie World Code End

// T81 global code

(function global() {
    function waitUntil(predicate, time = 30000) {
        return new Promise(((resolve) => {
            let int = setInterval(() => {
                if (predicate()) {
                    resolve(predicate());
                    clearInterval(int);
                    int = null;
                }
            }, 500);
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

    function init_goals() {
        jQuery(document).on('submit', '.brochureDownload__email form', () => {
            setTimeout(() => {
                if (jQuery('.brochureDownload__email form .field-validation-error:visible').length === 0) {
                    push_API_only('Brochure_Downloads');
                    push_API_only('Download_a_Brochure_Conversion_email');
                  	sessionStorage.setItem('BrochureDownloaded', true);
                }
            }, 100);
        });
    }

    // eslint-disable-next-line no-unused-expressions
    window.location.pathname.includes('brochure-download')
    && waitUntil(() => typeof window.jQuery === 'function').then(() => {
        init_goals();
    });

    waitUntil(() => window.location.href.includes('/book-test-drive?page=thanks'))
      .then(() => {
        push_API_only('Book_a_Test_Drive_Conversion');
      })
}());

// T81 global code Ends

// Configurator Tracking Starts

// (function () {
//     function push_API_only(nameOfEvent) {
//         window.optimizely = window.optimizely || [];
//         window.optimizely.push({
//             type: 'event',
//             eventName: nameOfEvent
//         });
//     }
//     function waitUntil(predicate, time = 10000) {
//         return new Promise(((resolve) => {
//             let int = setInterval(() => {
//                 if (predicate()) {
//                     resolve(predicate());
//                     clearInterval(int);
//                     int = null;
//                 }
//             }, 500);
//             setTimeout(() => {
//                 if (int !== null) {
//                     clearInterval(int);
//                     console.log('condition false');
//                 }
//             }, time);
//         }));
//     }

//     function init_goals_configurator() {
//         console.log('*** OPTI Configurator Tracking Code ***');
//         let summaryFlag = true;
//         let contactDeatilsCaptured = true;
//         window.addEventListener('scroll', () => {
//             if (document.querySelector('#customise_summary')) {
//                 setTimeout(() => {
//                     const headerPosition = document.querySelector('#customise_summary').getBoundingClientRect();
//                     const headerOnScreen = (headerPosition.top < window.innerHeight && headerPosition.bottom >= 0);
//                     if (headerOnScreen) {
//                         if (summaryFlag) {
//                             summaryFlag = false;
//                             push_API_only('OPTI_Configurator_Completions');
//                         }
//                         if (contactDeatilsCaptured && sessionStorage.getItem('T37EmailCollected') !== null) {
//                             contactDeatilsCaptured = false;
//                             push_API_only('Contact_Details_Captured');
//                         }
//                     }
//                 }, 3000);
//             }
//         });
//         jQuery(document).on('click', 'button[data-test="customise:summary:continuetocheckoutv4"]', () => {
//             push_API_only('OPTI_Configurator_Completions');
//             if (sessionStorage.getItem('T37EmailCollected') !== null) {
//                 push_API_only('Contact_Details_Captured');
//             }
//         });
//     }
//     if (window.location.pathname.indexOf('/configure') !== -1) {
//         waitUntil(() => typeof window.jQuery === 'function')
//             .then(init_goals_configurator);
//     }
// }());

// Configurator Tracking Ends

// VMC Tracking Starts

(function () {
    function push_API_only(nameOfEvent) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName: nameOfEvent
        });
    }

    function waitUntil(predicate, time = 30000) {
        return new Promise(((resolve) => {
            let int = setInterval(() => {
                if (predicate()) {
                    resolve(predicate());
                    clearInterval(int);
                    int = null;
                }
            }, 500);
            setTimeout(() => {
                if (int !== null) {
                    clearInterval(int);
                    console.log('condition false');
                }
            }, time);
        }));
    }
    function handleMessageFromIframe(event) {
        try {
            const messageData = event.data;
            const dataObj = JSON.parse(messageData);
            if (dataObj.form.name === 'value my car' && dataObj.form.stage === 'valuation completed') {
                console.log('*** Value My Car Conversion Success ***');
                push_API_only('Value_My_Car_conversion');
								push_API_only('value_my_car_completions_global');
            }
					if (dataObj.form.name === 'value my car' && dataObj.form.stage === 'valuation partially completed') {
                console.log('*** Value My Car Conversion partially completed ***');
								push_API_only('value_my_car_completions_global');
            }
        } catch (error) {
            // console.error('Error parsing JSON:', error);
        }
    }

    if (window.location.pathname.indexOf('/value-my-car') !== -1) {
        waitUntil(() => typeof window.jQuery === 'function').then(() => {
            sessionStorage.setItem('ValueMyCarVisited', true);
            window.addEventListener('message', handleMessageFromIframe);
        });
    }
}());

// VMC Tracking Ends

// T107 & T118 global start

(function () {

    if (!window.location.pathname.includes('/checkout/next-steps')) return;

    function defineOptiReady() {
        const listeners = [];
        const doc = window.document;
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        let observer;

        function ready(selector, fn) {
            listeners.push({ selector, fn });
            if (!observer) {
                observer = new MutationObserver(check);
                observer.observe(doc.documentElement, {
                    childList: true,
                    subtree: true
                });
            }
            check();
        }

        function check() {
            for (let i = 0, len = listeners.length; i < len; i++) {
                const listener = listeners[i];
                const elements = doc.querySelectorAll(listener.selector);
                for (let j = 0; j < elements.length; j++) {
                    const element = elements[j];
                    if (!element.ready) element.ready = [];
                    if (!element.ready[i]) {
                        element.ready[i] = true;
                        listener.fn.call(element, element);
                    }
                }
            }
        }

        window.optiready = ready;
    }

    function push_API_only(eventName) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName
        });
    }

    function emailValidation(mail) {
        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return regexEmail.test(mail);
    }

    function init_goal() {
    
        const btn = document.querySelector(
            '.CHECKOUT_LITE_WIDGET-MuiDialogContent-root button.CHECKOUT_LITE_WIDGET-MuiButton-root'
        );

        if (btn) {
            btn.addEventListener('click', () => {
                const emailInput = document.querySelector('#save_configuration\\:modal\\:email_input');
                const checkbox = document.querySelector('#save_configuration\\:modal\\:checkbox');

                if (emailInput && checkbox && emailValidation(emailInput.value) && checkbox.checked) {
                	console.log('*** global save_my_build_conversion_t107 Goal triggered');
                    push_API_only('save_my_build_conversion_t107');
                }
            });
        }
    }

    defineOptiReady();
    window.optiready('.CHECKOUT_LITE_WIDGET-MuiDialogContent-root', init_goal);
})();

// T107 & T118 global end

//T124 goal tracking start
(function T124Goals() {
	function waitUntil(predicate, time = 10000) {
		return new Promise((resolve) => {
			let int = setInterval(() => {
				if (predicate()) {
					resolve(predicate());
					clearInterval(int);
					int = null;
				}
			}, 500);
			setTimeout(() => {
				if (int !== null) {
					clearInterval(int);
					console.log('condition false');
				}
			}, time);
		});
	}
	function push_API_only(nameOfEvent) {
		window.optimizely = window.optimizely || [];
		window.optimizely.push({
			type: 'event',
			eventName: nameOfEvent,
		});
	}
function clickBinds() {

  // ✅ Form submit button click tracking
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(
      ".custom-download-overlay.skippedT112 #T112_skipForm .T112Submit"
    );
    if (btn) {
      const emailInput = document.querySelector(
        ".custom-download-overlay.skippedT112 #T112_skipForm #T112_email"
      );
      const checkbox = document.querySelector(
        ".custom-download-overlay.skippedT112 #T112_skipForm #T112_agree"
      );

      if (!emailInput || !checkbox) return;

      const email = emailInput.value.trim();
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isChecked = checkbox.checked;
       const model = new URLSearchParams(window.location.search).get("model");
      if (isEmailValid && isChecked && model === "forester") {
      	
        push_API_only("contact_details_from_skip_captured");
        console.log("🚀 Optimizely event fired: contact_details_from_skip_captured");
      }
    }
  });

  // ✅ Brochure link click tracking (Forester example)
  document.addEventListener("click", function (e) {
    const link = e.target.closest(
      '.skippedT112 .each-cars a[href*="Subaru-Forester-brochure.pdf"]'
    );
     const model = new URLSearchParams(window.location.search).get("model");
    if (link && model === "forester") {
     
      push_API_only("download_text_link_when_user_skips_clicks_t124");
      console.log("🚀 Optimizely event fired: download_text_link_when_user_skips_clicks_t124");
    }
  });
}


	function initgoals() {
		console.log(`*** T124 global goals started ***`);
		
		clickBinds();
	}

(window.location.pathname === "/brochure-download") && waitUntil(() =>
		document.querySelector('.brochureDownload__methods a[data-type="download"]')
	).then(() => initgoals());
})();
//T124 goal tracking end
//T126 goal track
(function trackBATDForm() {
    function waitUntil(predicate, time = 10000) {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
                if (predicate()) {
                    resolve(predicate());
                    clearInterval(interval);
                    interval = null;
                }
            }, 50);
            setTimeout(() => {
                if (interval !== null) clearInterval(interval);
            }, time);
        });
    }
function push_API_only(nameOfEvent) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName: nameOfEvent
        });
    }

    function notifyParent() {
        if (window.parent) {
            window.parent.postMessage(
                { type: "batdSubmitted" },
                "https://www.subaru.com.au"
            );
            console.log("📤 BATD form submitted message sent to parent");
						push_API_only('book_a_test_drive_conversion_t126');
        }
    }

    function overrideDataLayer() {
        const originalPush = window.dataLayer.push;
        window.dataLayer.push = function () {
            const args = arguments[0];
            if (
                args &&
                args.event === "_formNavigate" &&
                args.form && args.form.name === "book a test drive" &&
                args.form.stage === "submitted"
            ) {
                notifyParent();
            }
            return originalPush.apply(window.dataLayer, arguments);
        };
    }

    waitUntil(() => typeof jQuery === "function" && window.location.pathname === '/book-test-drive')
        .then(overrideDataLayer);
})();


