const WorkoutPlan = require('../models/WorkoutPlan');
const { success, error } = require('../utils/response');

// Création d'un plan d'entraînement
exports.createWorkoutPlan = async (req, res) => {
    try {
        const workoutPlan = new WorkoutPlan({
            userId: req.user.id,
            ...req.body,
        });
        await workoutPlan.save();
        success(res, workoutPlan, 'Workout plan created successfully');
    } catch (err) {
        error(res, 'Failed to create workout plan');
    }
};

// Récupération de tous les plans d'entraînement de l'utilisateur
exports.getWorkoutPlans = async (req, res) => {
    try {
        const plans = await WorkoutPlan.find({ userId: req.user.id });
        success(res, plans, 'Workout plans retrieved successfully');
    } catch (err) {
        error(res, 'Failed to retrieve workout plans');
    }
};

// Récupération d'un plan d'entraînement spécifique par ID
exports.getWorkoutPlan = async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await WorkoutPlan.findOne({ userId: req.user.id, _id: id });
        if (!plan) {
            return error(res, 'Workout plan not found', 404);
        }
        success(res, plan, 'Workout plan retrieved successfully');
    } catch (err) {
        error(res, 'Failed to retrieve workout plan');
    }
};

// Mise à jour d'un plan d'entraînement
exports.updateWorkoutPlan = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlan = await WorkoutPlan.findOneAndUpdate(
            { userId: req.user.id, _id: id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedPlan) {
            return error(res, 'Workout plan not found', 404);
        }
        success(res, updatedPlan, 'Workout plan updated successfully');
    } catch (err) {
        error(res, 'Failed to update workout plan');
    }
};

// Suppression d'un plan d'entraînement
exports.deleteWorkoutPlan = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPlan = await WorkoutPlan.findOneAndDelete({ userId: req.user.id, _id: id });
        if (!deletedPlan) {
            return error(res, 'Workout plan not found', 404);
        }
        success(res, null, 'Workout plan deleted successfully');
    } catch (err) {
        error(res, 'Failed to delete workout plan');
    }
};
