const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Déclaration des routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/workouts', workoutRoutes);
// Default route
app.get("/", (req, res) => {
    res.send("Hello from Node API Server Updated for Store App");
});
// Gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
