/* eslint-disable import/extensions */
import kamSubt138Config from './kamSubt138Config.js';
import SUBT138_BUILD_VERSION from './kamSubt138Version.js';

export const PERSIST_ROOT_ID = 'subt138-persist-root-v3';

let persistRoot = null;

function kamSubt138RestorePersistRootFromWindow() {
    const storedRoot = window.__subt138PersistRoot;

    if (storedRoot?.id === PERSIST_ROOT_ID) {
        persistRoot = storedRoot;
    }
}

function kamSubt138StorePersistRootOnWindow() {
    window.__subt138PersistRoot = persistRoot;
}

export function kamSubt138CleanupOrphanRoots() {
    document.querySelectorAll('[id^="subt138-persist-root"]').forEach((element) => {
        if (element.id !== PERSIST_ROOT_ID) {
            element.remove();
        }
    });
}

export function kamSubt138GetPersistRoot() {
    kamSubt138RestorePersistRootFromWindow();

    return persistRoot || document.getElementById(PERSIST_ROOT_ID);
}

export function kamSubt138GetOrCreatePersistRoot() {
    kamSubt138RestorePersistRootFromWindow();
    kamSubt138CleanupOrphanRoots();

    if (!persistRoot) {
        persistRoot = document.createElement('div');
        persistRoot.id = PERSIST_ROOT_ID;
        persistRoot.dataset.subt138Build = SUBT138_BUILD_VERSION;
        persistRoot.innerHTML = kamSubt138Config.html.gridMarkup;
        kamSubt138StorePersistRootOnWindow();
    }

    return persistRoot;
}
