console.log('*** Global Code ***');

const globalGoals = {
	'KAM - Make an Enquiry Conversion': 420578,
	'KAM - Book a Test Drive Conversion': 420579,
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

								Kameleoon.API.Goals.processConversion(
									globalGoals['KAM - Make an Enquiry Conversion']
								);
							} else if (wrapper.id === 'buildbuy_testdrive_enquiry') {
								console.log(
									'%c*** book_a_test_drive_conversion goal triggered ***',
									'background: lightgreen; color: black;'
								);

								modules.tracking.push_API_only('book_a_test_drive_conversion');

								Kameleoon.API.Goals.processConversion(
									globalGoals['KAM - Book a Test Drive Conversion']
								);
							}
						}
					);
				});
			},
		},

		targeting: {
			pages: {
				configuratorSummary: () =>
					window.location.pathname.includes('/build-and-buy/build/summary/'),
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
})();
