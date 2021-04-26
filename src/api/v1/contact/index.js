const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const contactController = require ('./contact.controller');
const auth = require(appRoot + '/src/middleware');

router.get('/journal_id/:id', contactController.getContactByJournalId);
router.post('/', contactController.saveContact);

module.exports = router;