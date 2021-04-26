const express = require('express');
const router = express.Router();
const user = require ('./user');
const login = require('./login');
const verification = require('./verification');
const journal = require ('./journal');
const contact = require ('./contact');

router.use('/user', user);
router.use('/login', login);
router.use('/verification',verification);
router.use('/journal',journal);
router.use('/contact',contact);

module.exports = router;