import kamT56Config from './kamT56Config.js';

const GOAL_DEDUP_MS = 5000;

export default function kamT56ProcessGoal(goalName) {
    const goalId = kamT56Config.goalIds[goalName];
    if (!goalId || !Kameleoon?.API?.Goals?.processConversion) {
        return;
    }

    const dedupeStore = window.__kamT56GoalDedupe || (window.__kamT56GoalDedupe = {});
    const now = Date.now();
    const lastFired = dedupeStore[goalName];

    if (lastFired && now - lastFired < GOAL_DEDUP_MS) {
        return;
    }

    dedupeStore[goalName] = now;
    Kameleoon.API.Goals.processConversion(goalId);
}
