import kamT5DeepalConfig from './config.js';

export default function kamT5DeepalProcessGoal(goalName) {
    const goalId = kamT5DeepalConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
