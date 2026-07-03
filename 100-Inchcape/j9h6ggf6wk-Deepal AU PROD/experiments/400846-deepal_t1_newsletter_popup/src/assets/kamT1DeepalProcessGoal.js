import kamT1DeepalConfig from './config.js';

export default function kamT1DeepalProcessGoal(goalName) {
    const goalId = kamT1DeepalConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
