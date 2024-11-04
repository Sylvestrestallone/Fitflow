const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: String, required: true },
    duration: { type: Number },
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number },
            reps: { type: Number },
        },
    ],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
