
//models/HealthData.js
const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    heartRate: { type: Number },
    steps: { type: Number },
    hydration: { type: Number },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthData', healthDataSchema);
