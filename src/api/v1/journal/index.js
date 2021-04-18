const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const journalController = require ('./journal.controller');
const auth = require(appRoot + '/src/middleware');

router.post('/', journalController.saveJournal);

router.get('/:id', journalController.getJournalById);

router.get('/user_id/:id', journalController.getJournalByUserId);

router.delete('/:id', journalController.delJournalById);

module.exports = router;