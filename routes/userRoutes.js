const express = require('express');
const {
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUsers); // Récupération de tous les utilisateurs
router.get('/:id', authMiddleware, getUserProfile); // Récupération d'un utilisateur spécifique par ID
router.put('/:id', authMiddleware, updateUserProfile); // Mise à jour d'un utilisateur spécifique par ID
router.delete('/:id', authMiddleware, deleteUserAccount); // Suppression d'un utilisateur spécifique par ID

module.exports = router;
