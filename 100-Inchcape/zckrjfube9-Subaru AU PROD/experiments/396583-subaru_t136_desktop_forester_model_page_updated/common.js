import { goals } from './goals.js';

const GOAL_NAME = 'BaTD (click) T136_Desktop';
const HEADER_BANNER_SELECTOR = '#header-banner';
const CTA_FIELD = 'ctaButton';

function subt136ProcessBatdClickGoal() {
    const goalId = goals[GOAL_NAME];

    if (
        goalId
        && typeof Kameleoon !== 'undefined'
        && Kameleoon.API
        && Kameleoon.API.Goals
        && Kameleoon.API.Goals.processConversion
    ) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}

function subt136HandleHeaderBannerCtaClick(event) {
    const headerBanner = document.querySelector(HEADER_BANNER_SELECTOR);
    if (!headerBanner) return;

    const target = event.target;
    if (!target) return;

    const closest = target.closest ? target.closest(`a[data-field="${CTA_FIELD}"]`) : null;
    if (!closest) return;

    if (!headerBanner.contains(closest)) return;

    subt136ProcessBatdClickGoal();
}

// Event delegation: works for both control and v1, regardless of React re-render timing.
(function subt136InitCommonGoalListener() {
    if (window.__subt136BatdCommonBound) return;
    window.__subt136BatdCommonBound = true;

    if (typeof Kameleoon !== 'undefined' && Kameleoon.API && Kameleoon.API.Utils && Kameleoon.API.Utils.addEventListener) {
        Kameleoon.API.Utils.addEventListener(document, 'click', subt136HandleHeaderBannerCtaClick);
    } else {
        document.addEventListener('click', subt136HandleHeaderBannerCtaClick);
    }
}());
