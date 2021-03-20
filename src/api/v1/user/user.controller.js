const appRoot = require('app-root-path');
const User = require(appRoot + '/src/model/user');
const userValidation = require('./user.validation');
const logger = require(appRoot + '/src/logger').apiLogger;
const twilioUtil = require(appRoot + '/src/util/twilio-util');
const sendingSMS = twilioUtil.sendSMS();
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const body = ({
            name,
            email,
            password,
            phone_number,
        } = req.body);
        logger.info('In createUser - Validating  user input data');
        const { error } = userValidation.validateSignUpUserData.validate(body, {
            abortEarly: false,
        });
        if (error) {
            logger.info(`Validation error ${JSON.stringify(error.details)}`);
            return res.status(400).json({
                message: 'Invalid Request. Please check and try again.',
                error: error.details,
            });
        }
        logger.info('All validations passed');
        let salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);
        const user = await User.create(req.body);
        const smsSend = await sendingSMS.send({ phone_number });
        if (!smsSend) {
            return res.status(400).json({
                message: `Error in sending verification code. Please try again later`,
            });
        }
        logger.info('Returning back User data with success code 200');
        return res.status(202).json({
            data: user,
            message: 'User created successfully'
        });
    } catch (error) {
        console.log('error')
        return res.status(500).json({
            message: 'Server error'
        })
    }     
}