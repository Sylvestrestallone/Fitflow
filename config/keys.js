module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    dbUri: process.env.DB_URI || 'mongodb://localhost:3400/fitflow_app'
};
