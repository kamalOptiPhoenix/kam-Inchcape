import { sendUrlToIframe } from './kamT64SelectModelFromUrl.js';
import kamT64ProcessGoal from './kamT64ProcessGoal.js';

export default function kamT64InitParent() {
    console.log('*** Peugeot T64 - Embedded Enquiry Form ***');
    document.body.classList.add('PCAT64');
    const testDriveUrl = 'https://peugeotforms.inchcape.com.au/webforms/make-an-enquiry/';
    const testDriveUrlWithTest64 = 'https://peugeotforms.inchcape.com.au/webforms/make-an-enquiry/?Test64kam=true';

    const allIframes = document.querySelectorAll('iframe');
    let existingTestDriveIframe = null;

    allIframes.forEach((iframe) => {
        const src = iframe.getAttribute('src') || '';
        if (src.includes('peugeotforms.inchcape.com.au/webforms/make-an-enquiry')) {
            existingTestDriveIframe = iframe;
            if (!src.includes('Test64kam=true')) {
                iframe.src = testDriveUrlWithTest64;
            }
            if (!iframe.classList.contains('T64Iframe')) {
                iframe.classList.add('T64Iframe');
            }
        }
    });

    if (!existingTestDriveIframe) {
        const Footer = document.querySelector('footer');
        if (Footer && !document.querySelector('.T64Iframe')) {
            Footer.insertAdjacentHTML(
                'beforebegin',
                `<iframe class="T64Iframe t64-iframe-responsive" scrolling="no" height="100%" width="100%" data-responsive="true" src="${testDriveUrlWithTest64}"></iframe>`
            );
        }
    }

    let iframeReady = false;

    let retryCount = 0;
    const maxRetries = 10;
    function sendUrlWithRetry() {
        sendUrlToIframe();
        retryCount += 1;
        if (retryCount < maxRetries) {
            setTimeout(sendUrlWithRetry, 2000);
        } else {
            console.log('***** parent: max retries reached, iframe may not be loaded');
        }
    }
    setTimeout(sendUrlWithRetry, 2000);

    let cachedIframe = document.querySelector('iframe.T64Iframe');

    let t64StyleElement = document.getElementById('t64-iframe-height-style');
    if (!t64StyleElement) {
        document.head.insertAdjacentHTML(
            'beforeend',
            '<style id="t64-iframe-height-style"></style>'
        );
        t64StyleElement = document.getElementById('t64-iframe-height-style');
    }

    function updateIframeHeight(height) {
        if (cachedIframe && height) {
            cachedIframe.setAttribute('data-height', height);
            cachedIframe.classList.add('t64-iframe-height-set');
            t64StyleElement.textContent = `.t64-iframe-height-set[data-height="${height}"] { height: ${height}px !important; }`;
        }
    }

    Kameleoon.API.Utils.addEventListener(window, 'message', (event) => {
        if (event.origin !== 'https://peugeotforms.inchcape.com.au') {
            return;
        }

        const messageData = event.data;

        if (messageData && messageData.type === 'PCAT64_IFRAME_READY') {
            console.log('***** parent: received iframe ready signal');
            iframeReady = true;
            setTimeout(() => sendUrlToIframe(), 100);
            return;
        }

        if (
            messageData
            && messageData.mainStepName === 'confirmation'
            && messageData.formsLeadID === 'PCAT64'
        ) {
            console.log('*** form submitted PCAT64 goal fired ***');
            kamT64ProcessGoal('enquire now embedded form conversions T64');
            kamT64ProcessGoal('Enquire now conversion global');
        }

        if (!cachedIframe) {
            cachedIframe = document.querySelector('iframe.T64Iframe');
        }
        if (!cachedIframe) {
            return;
        }

        if (
            messageData
            && messageData.type === 'PCAT64_IFRAME_HEIGHT'
            && messageData.height
        ) {
            updateIframeHeight(messageData.height);
            return;
        }

        if (
            messageData
            && typeof messageData.indexOf === 'function'
            && messageData.indexOf('T64StylingHeight') !== -1
        ) {
            const height = parseInt(messageData.split('-')[1], 10);
            updateIframeHeight(height);
        }
    });

    if (cachedIframe) {
        Kameleoon.API.Utils.addEventListener(cachedIframe, 'load', () => {
            setTimeout(() => {
                sendUrlToIframe();
            }, 500);
        });
    }
}
