const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const userController = require ('./user.controller');
const auth = require(appRoot + '/src/middleware');

router.post('/', userController.createUser);

module.exports = router; 