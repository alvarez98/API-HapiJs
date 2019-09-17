const Joi = require('@hapi/joi')

module.exports = {
    create: {
        firstname: Joi.string().min(1).max(50).required(),
        lastname: Joi.string().min(1).required(),
        password: Joi.string().min(2).max(10).required(),
        email: Joi.string().email().required()
    },
    userIdParam: {
        userId: Joi.string().required()
    }
}

