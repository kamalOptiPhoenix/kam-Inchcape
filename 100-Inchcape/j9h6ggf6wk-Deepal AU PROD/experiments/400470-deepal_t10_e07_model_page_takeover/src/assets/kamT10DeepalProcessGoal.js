import kamT10DeepalConfig from './config.js';

export default function kamT10DeepalProcessGoal(goalName) {
    const goalId = kamT10DeepalConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
