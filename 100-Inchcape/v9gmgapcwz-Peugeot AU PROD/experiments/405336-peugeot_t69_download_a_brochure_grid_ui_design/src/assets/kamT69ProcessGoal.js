import kamT69Config from './kamT69Config.js';

export default function kamT69ProcessGoal(goalName) {
    const goalId = kamT69Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
