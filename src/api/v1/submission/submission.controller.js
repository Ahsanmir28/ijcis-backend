const appRoot = require('app-root-path');
const Files = require(appRoot + '/src/model/file');
const submissionValidation = require('./submission-validation');
const logger = require(appRoot + '/src/logger').apiLogger;


exports.getFilesByJournalId = async (req, res) => {
    try {
        const { journal_id } = req.params;
        logger.info('In getJournalByUserId - Validating  journal input data');
        // const {error} = sectionValidation.validateGetSectionByJournalId.validate(req.params, {
        //     abortEarly: false,
        // });
        // if (error) {
        //     logger.info(`Validation error ${JSON.stringify(error.details)}`);
        //     return res.status(400).json({
        //         message: 'Invalid Request. Please check and try again.',
        //         error: error.details,
        //     });
        // }
        console.log('req.query', req.query);
        console.log('req.params', req.params);
        logger.info('All validations passed');
        const files = await Files.find({
            journal_id: journal_id,
        });
        return res.status(200).json({
            message: 'Files found',
            data: files,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }}

exports.uploadSubmissionFiles = async (req, res) => {
    try {
        const { id } = req.body;
        logger.info('In getJournalByUserId - Validating  journal input data');
        // const {error} = sectionValidation.validateGetSectionByJournalId.validate(req.params, {
        //     abortEarly: false,
        // });
        // if (error) {
        //     logger.info(`Validation error ${JSON.stringify(error.details)}`);
        //     return res.status(400).json({
        //         message: 'Invalid Request. Please check and try again.',
        //         error: error.details,
        //     });
        // }
        console.log('req.query', req.query);
        console.log('req.params', req.params);
        logger.info('All validations passed');
        const files = await Files.create(req.body);
        return res.status(200).json({
            message: 'Files saved',
            data: files,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }}