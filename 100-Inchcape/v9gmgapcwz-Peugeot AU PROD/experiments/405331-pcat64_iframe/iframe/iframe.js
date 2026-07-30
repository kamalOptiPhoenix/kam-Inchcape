/* eslint-disable no-console */
import kamT64ModifyForm, { modifySuccessMessage as kamT64ModifySuccessMessage } from '../src/assets/kamT64ModifyForm.js';
import kamT64SendHeightToParent from '../src/assets/kamT64SendHeightToParent.js';
import { initModelSelectionFromParent } from '../src/assets/kamT64SelectModelFromUrl.js';

(function kamPcat64Iframe() {
    const PARENT_ORIGIN = 'https://www.peugeot.com.au';
    let successHandled = false;

    console.log('***** iframe: script loaded and executing');

    initModelSelectionFromParent();
    console.log('***** iframe: message listener initialized');

    try {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage(
                { type: 'PCAT64_IFRAME_READY' },
                PARENT_ORIGIN
            );
            console.log('***** iframe: sent ready signal to parent');
        }
    } catch (e) {
        console.log('***** iframe: could not send ready signal', e);
    }

    function notifyParentOfSuccess() {
        if (successHandled) {
            return;
        }

        const successDiv = document.querySelector('.success');
        if (!successDiv) {
            return;
        }

        successHandled = true;

        try {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    event: 'updatevirtualpath',
                    formsLeadType: 'cold lead',
                    formsName: 'make an enquiry',
                    formsLeadID: 'PCAT64',
                    mainStepIndicator: '1',
                    mainStepName: 'confirmation',
                }, PARENT_ORIGIN);
                console.log('***** iframe: sent form success signal to parent');
            }
        } catch (e) {
            console.log('***** iframe: could not send success signal to parent', e);
        }
    }

    function handleFormSuccess() {
        notifyParentOfSuccess();

        const successDiv = document.querySelector('.success');
        if (
            successDiv
            && !successDiv.classList.contains('t64-success-modified')
        ) {
            kamT64ModifySuccessMessage();
        }
    }

    function checkSuccessMessage() {
        handleFormSuccess();
    }

    function kamT64HandleFormReady() {
        console.log('*** pcat64-iframe ***');
        document.body.classList.add('pcat64-iframe');
        kamT64ModifyForm();
        kamT64SendHeightToParent();
    }

    function kamT64HandleSuccessReady() {
        console.log('*** pcat64-iframe success ***');
        handleFormSuccess();
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
