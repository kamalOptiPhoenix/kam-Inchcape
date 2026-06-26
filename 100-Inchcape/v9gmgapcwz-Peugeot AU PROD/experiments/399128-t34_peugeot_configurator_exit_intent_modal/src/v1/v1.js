/* eslint-disable no-console */
/* eslint-disable import/extensions */
import kamT34CarImgData from '../assets/kamT34CarImgData.js';
import kamT34ExitIntentEvents from '../assets/kamT34ExitIntentEvents.js';
import kamT34ModalBuildSummary from '../assets/kamT34ModalBuildSummary.js';
import kamT34ModalBuild from '../assets/kamT34ModalBuild.js';

(function kamT34V1() {
    const modelData = kamT34CarImgData;

    function kamT34V1Init() {
        if (window.__kamT34BuildInitialized) {
            return;
        }
        window.__kamT34BuildInitialized = true;

        console.log('*** PCAT34 ***');
        window.jQuery('body').addClass('pcat34');
        const currentModel = document.getElementById('js-trim-img').alt;
        sessionStorage.setItem('t34CurrentModal', currentModel);
        kamT34ModalBuild(modelData[currentModel]);
        kamT34ExitIntentEvents();
    }

    function kamT34V1InitSummary() {
        if (window.__kamT34SummaryInitialized) {
            return;
        }
        window.__kamT34SummaryInitialized = true;

        console.log('*** PCAT34 Summary Init ***');
        window.jQuery('body').addClass('pcat34');
        const currentModel = sessionStorage.getItem('t34CurrentModal') || document.getElementById('js-trim-img').alt;
        kamT34ModalBuildSummary(modelData[currentModel]);
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function' && document.querySelectorAll('.psList').length > 0
        && localStorage.getItem('userEmail') !== null && document.querySelectorAll('.trimDetailsTitle').length > 0
        && document.querySelectorAll('body.buildandBuy.colours, body.buildandBuy.vehicle, body.buildandBuy.accessories').length > 0,
        kamT34V1Init
    );

    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.jQuery === 'function'
        && document.querySelectorAll('.psList').length > 0 && localStorage.getItem('userEmail') !== null
        && sessionStorage.getItem('t34ModalShowed') !== null && document.querySelectorAll('.trimDetailsTitle').length > 0
        && document.querySelectorAll('body.build-buy-summary').length > 0,
        kamT34V1InitSummary
    );
}());
