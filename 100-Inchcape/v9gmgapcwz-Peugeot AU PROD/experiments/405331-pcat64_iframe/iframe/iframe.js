/* eslint-disable no-console */
import kamT64ModifyForm, { modifySuccessMessage as kamT64ModifySuccessMessage } from '../src/assets/kamT64ModifyForm.js';
import kamT64SendHeightToParent from '../src/assets/kamT64SendHeightToParent.js';
import { initModelSelectionFromParent } from '../src/assets/kamT64SelectModelFromUrl.js';

(function kamPcat64Iframe() {
    console.log('***** iframe: script loaded and executing');

    initModelSelectionFromParent();
    console.log('***** iframe: message listener initialized');

    try {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage(
                { type: 'PCAT64_IFRAME_READY' },
                'https://www.peugeot.com.au'
            );
            console.log('***** iframe: sent ready signal to parent');
        }
    } catch (e) {
        console.log('***** iframe: could not send ready signal', e);
    }

    function checkSuccessMessage() {
        const successDiv = document.querySelector('.success');
        if (
            successDiv
            && !successDiv.classList.contains('t64-success-modified')
        ) {
            kamT64ModifySuccessMessage();
        }
    }

    function kamT64HandleFormReady() {
        console.log('*** pcat64-iframe ***');
        document.body.classList.add('pcat64-iframe');
        kamT64ModifyForm();
        kamT64SendHeightToParent();
    }

    function kamT64HandleSuccessReady() {
        console.log('*** pcat64-iframe success ***');
        kamT64ModifySuccessMessage();
    }

    if (window.__kam405331Initialized) {
        return;
    }
    window.__kam405331Initialized = true;

    if (!window.t64IframeStart) {
        window.t64IframeStart = true;

        Kameleoon.API.Core.runWhenElementPresent('#general_enquiry_form', kamT64HandleFormReady);
        Kameleoon.API.Core.runWhenElementPresent('#general_enquiry .success', kamT64HandleSuccessReady);

        checkSuccessMessage();

        const observer = new MutationObserver(() => {
            checkSuccessMessage();
        });

        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.body,
            () => {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            },
        );
    }
}());
