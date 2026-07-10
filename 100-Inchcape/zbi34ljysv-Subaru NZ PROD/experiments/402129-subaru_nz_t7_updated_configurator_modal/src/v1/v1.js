/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamSubnzT7ModalHtml from '../assets/kamSubnzT7ModalHtml.js';
import kamSubnzT7AppendLeadCaptureForm from '../assets/kamSubnzT7AppendLeadCaptureForm.js';
import kamSubnzT7ClickBind from '../assets/kamSubnzT7ClickBind.js';

(function kamSubnzT7V1() {
    function init() {
        console.log('*** T1 Subaru NZ - Configurator Upfront Lead Capture V1***');
        document.body.classList.add('subtnz01');
        kamSubnzT7ModalHtml();
        kamSubnzT7AppendLeadCaptureForm();
        kamSubnzT7ClickBind();
    }

    if (!window.kamSubnzT7Start) {
        window.kamSubnzT7Start = true;
        console.log('[SUBNZT7] waiting for body + jQuery');
        Kameleoon.API.Core.runWhenConditionTrue(
            () => document.body != null && typeof jQuery === 'function',
            init,
        );
    } else {
        console.log('[SUBNZT7] init skipped — kamSubnzT7Start already set');
    }
}());
