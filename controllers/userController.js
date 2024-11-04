const User = require('../models/User');
const bcrypt = require('bcryptjs'); // N'oubliez pas d'importer bcrypt si vous l'utilisez

// Récupération de tous les utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Ne pas renvoyer le mot de passe
        return res.status(200).json({
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve users'
        });
    }
};

// Récupération d'un profil utilisateur par ID
exports.getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password'); // Ne pas renvoyer le mot de passe
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
            message: 'User profile retrieved successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve user profile'
        });
    }
};

// Mise à jour du profil utilisateur
exports.updateUserProfile = async (req, res) => {
    const { id } = req.params;

    // Filtrage des données à mettre à jour
    const updateData = { ...req.body };
    
    // Optionnel: Si le mot de passe est inclus, vous pouvez le hacher à nouveau ici
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: 'User profile updated successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update user profile'
        });
    }
};

// Suppression du compte utilisateur
exports.deleteUserAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'User account deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete user account'
        });
    }
};
