import kamPcat58Config from './kamPcat58Config.js';

export default function kamPcat58ProcessGoal(goalName) {
    const goalId = kamPcat58Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
