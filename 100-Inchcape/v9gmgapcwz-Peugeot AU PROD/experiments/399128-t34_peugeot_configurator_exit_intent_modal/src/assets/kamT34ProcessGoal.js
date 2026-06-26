import kamT34Config from './kamT34Config.js';

export default function kamT34ProcessGoal(goalName) {
    const goalId = kamT34Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
