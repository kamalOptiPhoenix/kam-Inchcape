import kamSubt139Config from './kamSubt139Config.js';

let reattachScheduled = false;

function kamSubt139GetLastSummaryWrapper() {
    const wrappers = document.querySelectorAll(kamSubt139Config.selectors.customiseSummary);

    return wrappers[wrappers.length - 1] || null;
}

function kamSubt139IsBrochureWrapCorrectlyPlaced(lastWrapper) {
    const brochureWrap = document.querySelector(kamSubt139Config.selectors.brochureWrap);

    return Boolean(brochureWrap && lastWrapper && lastWrapper.nextElementSibling === brochureWrap);
}

function kamSubt139RemoveOrphanBrochureWraps() {
    const lastWrapper = kamSubt139GetLastSummaryWrapper();
    const brochureWraps = document.querySelectorAll(kamSubt139Config.selectors.brochureWrap);

    brochureWraps.forEach((brochureWrap) => {
        if (!lastWrapper || lastWrapper.nextElementSibling !== brochureWrap) {
            brochureWrap.remove();
        }
    });
}

function kamSubt139PlaceBrochureButton() {
    const lastWrapper = kamSubt139GetLastSummaryWrapper();

    if (!lastWrapper) {
        return;
    }

    kamSubt139RemoveOrphanBrochureWraps();

    if (kamSubt139IsBrochureWrapCorrectlyPlaced(lastWrapper)) {
        return;
    }

    lastWrapper.insertAdjacentHTML('afterend', kamSubt139Config.html.brochureBtn);
}

function kamSubt139EnsureModal() {
    const modalOverlays = document.querySelectorAll(kamSubt139Config.selectors.modalOverlay);

    modalOverlays.forEach((modalOverlay, index) => {
        if (index > 0) {
            modalOverlay.remove();
        }
    });

    if (!document.querySelector(kamSubt139Config.selectors.modalOverlay)) {
        document.body.insertAdjacentHTML('beforeend', kamSubt139Config.html.modal);
    }
}

export function kamSubt139ReattachIfNeeded() {
    if (reattachScheduled) {
        return;
    }

    reattachScheduled = true;

    window.requestAnimationFrame(() => {
        reattachScheduled = false;
        kamSubt139EnsureModal();
        kamSubt139PlaceBrochureButton();
    });
}

export function kamSubt139StartSpaObserver() {
    if (window.__kamSubt139ObserverStarted) {
        return;
    }

    window.__kamSubt139ObserverStarted = true;

    const observer = new MutationObserver(kamSubt139ReattachIfNeeded);
    observer.observe(document.body, { childList: true, subtree: true });
    window.__kamSubt139Observer = observer;
}

export default function kamSubt139InsertMarkup() {
    kamSubt139EnsureModal();
    kamSubt139PlaceBrochureButton();
    kamSubt139StartSpaObserver();
    kamSubt139ReattachIfNeeded();
}
