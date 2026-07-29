import { goals } from '../../goals.js';

export default function kamPcat72ProcessGoal(goalName) {
    const goalId = goals[goalName];
    if (goalId && Kameleoon?.API?.Goals?.processConversion) {
        Kameleoon.API.Goals.processConversion(goalId);
    }
}
