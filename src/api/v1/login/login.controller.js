const appRoot = require('app-root-path');
const loginValidation = require('./login.validation');
const logger = require(appRoot + '/src/logger').apiLogger;
const twilioUtil = require(appRoot + '/src/util/twilio-util');
const User = require(appRoot + '/src/model/user');
const constant = require(appRoot + '/src/constant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createLogin = async (req, res) => {
    try {
        const body = ({
            email,
            password,
        } = req.body);
        logger.info('In createLogin - Validating  Login input data');
        const { error } = loginValidation.validateLoginUserData.validate(body, {
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
        const loginUser = await User.findOne({
            email: email,
        });
        console.log('loginUserpassword', loginUser);
        if (!loginUser) {
            return res.status(404).json({
                message: 'Email is incorrect'
            });
        }
        logger.info('Going to compare password');
        let match = await bcrypt.compare(password, loginUser.password);
        if (!match) {
            return res.status(400).json({
                message: "Incorrect Password.",
            });
        }
        logger.info('Returning back User data with success code 200');
        let token = await jwt.sign({ id: loginUser._id }, constant.JWT_SECRET_LOGIN);
        return res.status(200).json({
            data: loginUser,
            token: token,
            message: 'Login is successfully'
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}