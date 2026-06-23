/* global jQuery */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import kamT38FormRequest from '../assets/kamT38FormRequest.js';
import kamT38AddDataWithCookie from '../assets/kamT38AddDataWithCookie.js';
import kamT38CheckCookieDuration from '../assets/kamT38CheckCookieDuration.js';
import kamT38ClickEventBind from '../assets/kamT38ClickEventBind.js';
import kamT38CloseModalClickEvent from '../assets/kamT38CloseModalClickEvent.js';
import kamT38EmailValidation from '../assets/kamT38EmailValidation.js';
import kamT38HtmlAddV2 from '../assets/kamT38HtmlAddV2.js';
import kamT38PdfDownload from '../assets/kamT38PdfDownload.js';

(function kamT38V2() {
    function kamT38V2Init() {
        console.log('**** PCAT38 V2 Started ****');
        jQuery('body').addClass('pcat38');
        kamT38HtmlAddV2();
        kamT38ClickEventBind(
            kamT38PdfDownload,
            kamT38AddDataWithCookie,
            kamT38CheckCookieDuration,
            kamT38FormRequest,
            kamT38EmailValidation
        );
        kamT38CloseModalClickEvent();
    }

  

    Kameleoon.API.Core.runWhenConditionTrue(
        () => document.querySelector('body.build-buy-summary') !== null
            && document.querySelector('.promotionBox') !== null,
        () => {
          
            kamT38V2Init();
        }
    );
}());
