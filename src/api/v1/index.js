const express = require('express');
const router = express.Router();
const user = require ('./user');
const login = require('./login');
const verification = require('./verification');

router.use('/user', user);
router.use('/login', login);
router.use('/verification',verification);

module.exports = router;