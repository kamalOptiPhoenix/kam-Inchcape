// Summary form submit conversion tracking

(function formSubmitTracking() {
    const KAM_MAKE_AN_ENQUIRY_CONVERSION = 420578;
    const KAM_BOOK_A_TEST_DRIVE_CONVERSION = 420579;
    function push_API_only(nameOfEvent) {
        window.optimizely = window.optimizely || [];
        window.optimizely.push({
            type: 'event',
            eventName: nameOfEvent,
        });
    }

    const formSubmitHandler = () => {
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
                            push_API_only('make_an_enquiry_conversion');
                            if (Kameleoon?.API?.Goals?.processConversion) {
                                Kameleoon.API.Goals.processConversion(KAM_MAKE_AN_ENQUIRY_CONVERSION);
                            }
                        } else if (wrapper.id === 'buildbuy_testdrive_enquiry') {
                            console.log('%c *** book_a_test_drive_conversion goal triggered ***', 'background-color: white');
                            push_API_only('book_a_test_drive_conversion');
                            if (Kameleoon?.API?.Goals?.processConversion) {
                                Kameleoon.API.Goals.processConversion(KAM_BOOK_A_TEST_DRIVE_CONVERSION);
                            }
                        }
                    }
                );
            }
        );
    };

    if (window.location.pathname.includes('/build-and-buy/build/summary/')) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => typeof window.jQuery === 'function',
            formSubmitHandler
        );
    }
}());
