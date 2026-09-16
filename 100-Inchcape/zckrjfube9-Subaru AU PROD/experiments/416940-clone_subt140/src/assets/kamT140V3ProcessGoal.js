/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { goals } from '../../goals.js';

const POPUP_VIEWS_GOAL_NAME = 'Pop-up views T140';

function kamT140V3ProcessGoal(goalName) {
    const goalId = goals[goalName];
    const canFireGoal = Boolean(
        goalId
        && typeof Kameleoon !== 'undefined'
        && Kameleoon.API
        && Kameleoon.API.Goals
        && Kameleoon.API.Goals.processConversion
    );

    if (!goalId) {
        console.warn('*** T140 V3 goal ID missing — update goals.js ***', goalName);
        return;
    }

    if (canFireGoal) {
        Kameleoon.API.Goals.processConversion(goalId);
        console.log(
            '%c *** Kameleoon Goal  Processed ***',
            'background:#fff;color:#000',
            goalName,
            goalId
        );
    }
}

export default function kamT140V3TriggerPopupViewsGoal() {
    kamT140V3ProcessGoal(POPUP_VIEWS_GOAL_NAME);
}
