/* eslint-disable import/extensions */
import { hrefMap } from './config.js';

export default function handleListPage() {
    function handleRedirect(event, anchorElement) {
        const matchedEntry = Object.entries(hrefMap)
            .sort(([a], [b]) => b.length - a.length)
            .find(([key]) => anchorElement.href.includes(key));

        if (matchedEntry) {
            event.preventDefault();
            event.stopPropagation();
            const [, redirectUrl] = matchedEntry;
            window.location.href = redirectUrl;
        }
    }

    function handleClick(event) {
        const button = event.target.closest('a.SPC_WIDGET-MuiButton-root');
        const image = event.target.closest('.SPC_WIDGET-MuiBox-root img');

        if (button) {
            handleRedirect(event, button);
        } else if (image) {
            const anchor = image.closest('a');
            if (anchor) {
                handleRedirect(event, anchor);
            }
        }
    }

    Kameleoon.API.Utils.addEventListener(document, 'click', handleClick, true);
}
