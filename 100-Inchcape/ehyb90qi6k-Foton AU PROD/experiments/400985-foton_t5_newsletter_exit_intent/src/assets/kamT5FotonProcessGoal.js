import kamT5FotonConfig from './config.js';

export default function kamT5FotonProcessGoal(goalName) {
    const goalId = kamT5FotonConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
