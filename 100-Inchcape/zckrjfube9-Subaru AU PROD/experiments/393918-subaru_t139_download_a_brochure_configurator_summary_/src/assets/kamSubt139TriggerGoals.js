import kamSubt139Config from './kamSubt139Config.js';

function kamSubt139ProcessGoal(goalName) {
    const goalId = kamSubt139Config.goalIds[goalName];

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

export function kamSubt139TriggerBrochureCtaClickGoal() {
    kamSubt139ProcessGoal(kamSubt139Config.goalNames.brochureCtaClick);
}

export function kamSubt139TriggerDownloadTextLinkClickGoal() {
    kamSubt139ProcessGoal(kamSubt139Config.goalNames.downloadTextLinkClick);
}

export function kamSubt139TriggerEmailConversionGoal() {
    kamSubt139ProcessGoal(kamSubt139Config.goalNames.emailConversion);
}
