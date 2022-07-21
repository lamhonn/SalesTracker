const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Log = require('../models/log');
const User = require('../models/user');

// New log
router.post('/new', (req, res, next) => {
    let newLog = new Log({
        username: req.body.username,
        date: req.body.date,
        hours: req.body.hours
    });
    
    Log.addLog(newLog, (err, log) => {
        if(err) {
            res.json({success: false, msg: 'Failed to log workhours'});
        } else {
            res.json({success: true, msg: "Workhours logged"});
        }
    })
});

// Get logs from db
router.get('/get/:username', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Log.getLogsByUsername(req.params.username, (err, log) => {
        if(err) throw err;
        res.json(log);
    });
});

module.exports = router;