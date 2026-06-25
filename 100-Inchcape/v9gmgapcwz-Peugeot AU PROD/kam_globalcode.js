console.log('*** Global Code ***');
const pageURL = window.location.href;
const globalGoals = {
    'KAM - Make an Enquiry Conversion': 420578,
    'KAM - Book a Test Drive Conversion': 420579,
};
const optimizelyGoals = [
    'make_an_enquiry_conversion',
    'book_a_test_drive_conversion'
];
(function globalTrackingAndTargeting() {
    const modules = {
        tracking: {
            push_API_only: (nameOfEvent) => {
                window.optimizely = window.optimizely || [];
                window.optimizely.push({
                    type: 'event',
                    eventName: nameOfEvent,
                });
            },
            formSubmitHandler: () => {
                jQuery(document).on(
                    'submit',
                    'form#buildbuy_testdrive_enquiry_form, form#buildbuy_email_dealer_form',
                    (e) => {
                        const formBody = e.target;
                        const wrapper = formBody.parentElement;
                        Kameleoon.API.Core.runWhenConditionTrue(
                            () => wrapper.querySelector('div.buildFormSuccessWrapper'),
                            () => {
                                if (wrapper.id === 'buildbuy_email_dealer') {
                                    console.log('%c *** make_an_enquiry_conversion goal triggered ***', 'background-color: white');
                                    modules.tracking.push_API_only('make_an_enquiry_conversion');
                                    if (Kameleoon?.API?.Goals?.processConversion) {
                                        Kameleoon.API.Goals.processConversion(globalGoals['KAM - Make an Enquiry Conversion']);
                                    }
                                } else if (wrapper.id === 'buildbuy_testdrive_enquiry') {
                                    console.log('%c *** book_a_test_drive_conversion goal triggered ***', 'background-color: white');
                                    modules.tracking.push_API_only('book_a_test_drive_conversion');
                                    if (Kameleoon?.API?.Goals?.processConversion) {
                                        Kameleoon.API.Goals.processConversion(globalGoals['KAM - Book a Test Drive Conversion']);
                                    }
                                }
                            }
                        );
                    }
                );
            }
        },
        targeting: {
            pages: {
               configuratorSummary: () => window.location.pathname.includes('/build-and-buy/build/summary/'),
            }
        }
    }
     // Scripts running on configuratorSummary page
     Kameleoon.API.Core.runWhenConditionTrue(modules.targeting.pages.configuratorSummary, () => {
        console.log('*** Global Tracking and Targeting [ configuratorSummary page ] ***');
        modules.tracking.formSubmitHandler();
     });
})();
