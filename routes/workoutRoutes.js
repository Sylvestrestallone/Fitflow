const express = require('express');
const {
    createWorkoutPlan,
    getWorkoutPlans,
    getWorkoutPlan,
    updateWorkoutPlan,
    deleteWorkoutPlan,
} = require('../controllers/workoutController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route pour créer un plan d'entraînement
router.post('/', authMiddleware, createWorkoutPlan);

// Route pour récupérer tous les plans d'entraînement
router.get('/', authMiddleware, getWorkoutPlans);

// Route pour récupérer un plan d'entraînement spécifique par ID
router.get('/:id', authMiddleware, getWorkoutPlan);

// Route pour mettre à jour un plan d'entraînement
router.put('/:id', authMiddleware, updateWorkoutPlan);

// Route pour supprimer un plan d'entraînement
router.delete('/:id', authMiddleware, deleteWorkoutPlan);

module.exports = router;
