const schedule = require('node-schedule');

exports.scheduleReminder = (userId, message, time) => {
    schedule.scheduleJob(time, function () {
        console.log(`Reminder for user ${userId}: ${message}`);
        // Ici, implémentez la logique de notification push (Firebase Cloud Messaging ou autre service)
    });
};
