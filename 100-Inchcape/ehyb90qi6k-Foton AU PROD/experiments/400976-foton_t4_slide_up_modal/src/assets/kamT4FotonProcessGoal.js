import kamT4FotonConfig from './config.js';

export default function kamT4FotonProcessGoal(goalName) {
    const goalId = kamT4FotonConfig.goalIds[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
