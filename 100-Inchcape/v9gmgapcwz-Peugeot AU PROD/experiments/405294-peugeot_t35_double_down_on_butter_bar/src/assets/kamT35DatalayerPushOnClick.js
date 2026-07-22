export default function kamT35DatalayerPushOnClick() {
    Kameleoon.API.Utils.addEventListener(document, 'click', (event) => {
        if (!event.target.closest('.t21DownlaodBrochure')) {
            return;
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'uaevent',
            eventCategory: 'd1-showroom::Stickybar',
            eventAction: '',
            eventLabel: 'DOWNLOAD A BROCHURE'
        });
    });
}
