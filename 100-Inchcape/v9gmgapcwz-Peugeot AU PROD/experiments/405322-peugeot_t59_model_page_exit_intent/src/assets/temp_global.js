console.log('*** Global Code  2:29 ***');

const globalGoals = {
	'KAM - Make an Enquiry Conversion': 420578,
	'KAM - Book a Test Drive Conversion': 420579,
	'Enquire now conversion global': 424164
};

(function globalTrackingAndTargeting() {
	const modules = {
		tracking: {
			push_API_only: (eventName) => {
				window.optimizely = window.optimizely || [];
				window.optimizely.push({
					type: 'event',
					eventName,
				});
			},

			processGoal: (goalId) => {
				if (!goalId) {
					return;
				}

				window.kameleoonQueue = window.kameleoonQueue || [];
				window.kameleoonQueue.push([
					'Kameleoon.API.Goals.processConversion',
					goalId,
				]);

				console.log(
					'%c*** Kameleoon goal queued ***',
					'background: green; color: black;',
					goalId
				);
			},

			formSubmitHandler: () => {
				// Prevent attaching the listener multiple times
				if (window.__kameleoonGlobalSubmitHandlerAttached) {
					return;
				}

				window.__kameleoonGlobalSubmitHandlerAttached = true;

				document.addEventListener('submit', (e) => {
					const form = e.target;

					if (
						!form.matches(
							'form#buildbuy_testdrive_enquiry_form, form#buildbuy_email_dealer_form'
						)
					) {
						return;
					}

					console.log('*** Form Submitted ***');

					const wrapper = form.parentElement;

					Kameleoon.API.Core.runWhenConditionTrue(
						() => !!wrapper?.querySelector('.buildFormSuccessWrapper'),
						() => {
							if (wrapper.id === 'buildbuy_email_dealer') {
								console.log(
									'%c*** make_an_enquiry_conversion goal triggered ***',
									'background: yellow; color: black;'
								);

								modules.tracking.push_API_only('make_an_enquiry_conversion');

								modules.tracking.processGoal(
									globalGoals['KAM - Make an Enquiry Conversion']
								);
							} else if (wrapper.id === 'buildbuy_testdrive_enquiry') {
								console.log(
									'%c*** book_a_test_drive_conversion goal triggered ***',
									'background: yellow; color: black;'
								);

								modules.tracking.push_API_only('book_a_test_drive_conversion');

								modules.tracking.processGoal(
									globalGoals['KAM - Book a Test Drive Conversion']
								);
							}
						}
					);
				});
			},

			enquiryFormHandler: () => {
				if (window.__kameleoonGlobalEnquiryHandlerAttached) {
					return;
				}

				window.__kameleoonGlobalEnquiryHandlerAttached = true;

				document.addEventListener('click', (e) => {
					if (!e.target.closest('form#general_enquiry_form input[type="submit"]')) {
						return;
					}

					Kameleoon.API.Core.runWhenConditionTrue(
						() => document.querySelector('div.success') !== null,
						() => {
							console.log(
								'%c*** enquire_now_conversion_global goal triggered ***',
								'background: yellow; color: black;'
							);

							modules.tracking.push_API_only('enquire_now_conversion_global');
							modules.tracking.processGoal(
								globalGoals['Enquire now conversion global']
							);
						}
					);
				});
			},

			enquiryIframeHandler: () => {
				if (window.__kameleoonGlobalEnquiryIframeHandlerAttached) {
					return;
				}

				window.__kameleoonGlobalEnquiryIframeHandlerAttached = true;

				Kameleoon.API.Utils.addEventListener(window, 'message', (event) => {
					const messageData = event.data;

					if (
						JSON.stringify(messageData).includes('"mainStepName":"confirmation"')
					) {
						console.log(
							'%c*** enquire_now_conversion_global goal triggered ***',
							'background: yellow; color: black;'
						);

						modules.tracking.push_API_only('enquire_now_conversion_global');
						modules.tracking.processGoal(
							globalGoals['Enquire now conversion global']
						);
					}
				});
			},
		},

		targeting: {
			pages: {
				configuratorSummary: () =>
					window.location.pathname.includes('/build-and-buy/build/summary/'),
				enquiry: () =>
					window.location.pathname.includes('/tools/enquiry.html'),
			},

			bodyReady: () => document.body !== null,
		},
	};

	Kameleoon.API.Core.runWhenConditionTrue(
		() =>
			modules.targeting.pages.configuratorSummary() &&
			modules.targeting.bodyReady(),
		() => {
			console.log(
				'*** Global Tracking and Targeting [ configuratorSummary page ] ***'
			);

			modules.tracking.formSubmitHandler();
		}
	);

	Kameleoon.API.Core.runWhenConditionTrue(
		() => modules.targeting.bodyReady(),
		() => {
			console.log('*** Global Enquiry Tracking ***');

			modules.tracking.enquiryFormHandler();
		}
	);

	Kameleoon.API.Core.runWhenConditionTrue(
		() =>
			modules.targeting.pages.enquiry() && modules.targeting.bodyReady(),
		() => {
			console.log('*** Global Enquiry Tracking [ enquiry page ] ***');

			modules.tracking.enquiryIframeHandler();
		}
	);
})();
