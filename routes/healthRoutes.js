// routes/healthRoutes.js
const express = require('express');
const { addHealthData, getHealthDatas, getHealthData, updateHealthData, deleteHealthData } = require('../controllers/healthController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addHealthData); // Route pour ajouter des données de santé
router.get('/', authMiddleware, getHealthDatas); // Route pour récupérer toutes les données de santé
router.get('/:id', authMiddleware, getHealthData); // Route pour récupérer une donnée de santé spécifique par ID
router.put('/:id', authMiddleware, updateHealthData); // Route pour mettre à jour les données de santé en utilisant l'ID
router.delete('/:id', authMiddleware, deleteHealthData); // Route pour supprimer une donnée de santé spécifique par ID

module.exports = router;
