/* eslint-disable import/extensions */
import kamSubt138Config from './kamSubt138Config.js';
import kamSubt138InitCarousel from './kamSubt138InitCarousel.js';
import {
    kamSubt138GetOrCreatePersistRoot,
    kamSubt138GetPersistRoot,
} from './kamSubt138PersistRoot.js';

let reattachScheduled = false;

function isCorrectlyPlaced(searchBarContent, root) {
    return root.isConnected
        && root.parentElement === searchBarContent.parentElement
        && searchBarContent.nextElementSibling === root;
}

function placeMarkup(searchBarContent) {
    const root = kamSubt138GetOrCreatePersistRoot();

    if (!isCorrectlyPlaced(searchBarContent, root)) {
        searchBarContent.insertAdjacentElement('afterend', root);
    }
}

function kamSubt138ReattachIfNeeded() {
    if (reattachScheduled) {
        return;
    }

    reattachScheduled = true;

    window.requestAnimationFrame(() => {
        reattachScheduled = false;

        const anchor = document.querySelector(
            kamSubt138Config.selectors.searchBarContent
        );

        if (!anchor) {
            return;
        }

        const root = kamSubt138GetPersistRoot();

        if (!root || !isCorrectlyPlaced(anchor, root)) {
            placeMarkup(anchor);

            window.requestAnimationFrame(() => {
                kamSubt138InitCarousel();
            });
        }
    });
}

function startPersistObserver() {
    if (window.__subt138ObserverStarted) {
        return;
    }

    window.__subt138ObserverStarted = true;

    const observer = new MutationObserver(kamSubt138ReattachIfNeeded);
    observer.observe(document.body, { childList: true, subtree: true });
    window.__subt138Observer = observer;
}

export default function kamSubt138InsertMarkup(searchBarContent) {
    placeMarkup(searchBarContent);
    startPersistObserver();
    kamSubt138ReattachIfNeeded();
}
