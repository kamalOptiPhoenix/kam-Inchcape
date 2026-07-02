import kamT6DeepalConfig from './config.js';

export default function kamT6DeepalProcessGoal(goalName) {
    const goalId = kamT6DeepalConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
