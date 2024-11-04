
//controllers/authcontroller

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret } = require('../config/keys');

exports.register = async (req, res) => {
    try {
        const { email, password, name, age, weight, height } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        user = new User({
            email,
            password, // Ne pas hacher ici, le middleware le fera
            name,
            age,
            weight,
            height,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe invalide' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Mot de passe fourni :", password);
        console.log("Mot de passe haché dans la base de données :", user.password);
        console.log("Résultat de la comparaison des mots de passe :", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe invalide' });
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                age: user.age,
                weight: user.weight,
                height: user.height
            }
        });

    } catch (error) {
        console.error("Erreur serveur lors de la connexion :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
