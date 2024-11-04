// controllers/healthController.js
const HealthData = require('../models/HealthData');

// Ajout de données de santé
const addHealthData = async (req, res) => {
    const { heartRate, steps, hydration } = req.body;

    try {
        // Création d'un nouvel objet HealthData
        const healthData = new HealthData({
            userId: req.user.id, // Utilisation de userId au lieu de user
            heartRate,
            steps,
            hydration,
            date: Date.now(),
        });

        // Sauvegarde des données de santé
        await healthData.save();
        res.json(healthData); // Renvoie les données de santé créées
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

// Récupération de toutes les données de santé
const getHealthDatas = async (req, res) => {
    try {
        // Récupération des données de santé de l'utilisateur
        const healthDatas = await HealthData.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(healthDatas); // Renvoie toutes les données de santé
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

// Récupération d'une seule donnée de santé par ID
const getHealthData = async (req, res) => {
    const { id } = req.params; // Récupération de l'ID à partir des paramètres de la requête

    try {
        // Recherche d'une seule donnée de santé par ID
        const healthData = await HealthData.findOne({ userId: req.user.id, _id: id });

        if (!healthData) {
            return res.status(404).json({ message: 'Données de santé non trouvées.' });
        }

        res.json(healthData); // Renvoie la donnée de santé trouvée
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

// Mise à jour des données de santé
const updateHealthData = async (req, res) => {
    const { id } = req.params; // Récupération de l'ID à partir des paramètres de la requête
    const { heartRate, steps, hydration } = req.body;

    try {
        // Recherche et mise à jour des données de santé de l'utilisateur par ID
        const healthData = await HealthData.findOneAndUpdate(
            { userId: req.user.id, _id: id }, // Recherche par userId et ID
            { $set: { heartRate, steps, hydration, date: Date.now() } },
            { new: true } // Renvoie le document mis à jour
        );

        if (!healthData) {
            return res.status(404).json({ message: 'Données de santé non trouvées.' });
        }

        res.json(healthData); // Renvoie les données de santé mises à jour
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};


// Suppression des données de santé
const deleteHealthData = async (req, res) => {
    const { id } = req.params; // Récupération de l'ID à partir des paramètres de la requête

    try {
        // Suppression des données de santé de l'utilisateur par ID
        const healthData = await HealthData.findOneAndDelete({ userId: req.user.id, _id: id });

        if (!healthData) {
            return res.status(404).json({ message: 'Aucune donnée de santé trouvée pour cet ID.' });
        }

        res.json({ message: 'Données de santé supprimées avec succès.' }); // Confirmation de la suppression
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
};

// Exposition des fonctions pour utilisation dans les routes
module.exports = {
    addHealthData,
    getHealthDatas, // Renvoie toutes les données de santé
    getHealthData,  // Renvoie une seule donnée de santé par ID
    updateHealthData,
    deleteHealthData, // Ajout de la fonction deleteHealthData à l'export
};
