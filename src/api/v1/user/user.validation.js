const Joi = require('@hapi/joi');

exports.validateSignUpUserData = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required(),
});