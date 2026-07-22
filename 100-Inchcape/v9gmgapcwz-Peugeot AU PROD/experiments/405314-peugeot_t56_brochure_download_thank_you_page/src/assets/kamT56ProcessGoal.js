import kamT56Config from './kamT56Config.js';

export default function kamT56ProcessGoal(goalName) {
    const goalId = kamT56Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
