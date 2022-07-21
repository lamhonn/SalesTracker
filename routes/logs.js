const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Log = require('../models/log');
const User = require('../models/user');

// New log
router.post('/new', (req, res, next) => {
    let newLog = new Log({
        username: req.User.username,
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

router.get('/get', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({log: req.log})
});

module.exports = router;