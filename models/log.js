const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Workhour log schema
const LogSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        requried: true
    },
    // Logging as minutes
    hours: {
        type: Number,
        required: true
    }
});

const Log = module.exports = mongoose.model('Log', LogSchema);

// Find workhours for user
module.exports.getLogsByUsername = function(username, callback) {
    const query = {username: username};
    Log.find(query, callback);
};

// Add workhours
module.exports.addLog = function(newLog, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        newLog.save(callback);
    });
};