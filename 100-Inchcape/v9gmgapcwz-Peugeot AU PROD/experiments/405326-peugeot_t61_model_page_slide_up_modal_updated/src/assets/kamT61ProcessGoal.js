import kamT61Config from './kamT61Config.js';

export default function kamT61ProcessGoal(goalName) {
    const goalId = kamT61Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
