import kamT64Config from './kamT64Config.js';

export default function kamT64ProcessGoal(goalName) {
    const goalId = kamT64Config.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
