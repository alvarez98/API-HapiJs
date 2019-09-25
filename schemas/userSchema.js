const Joi = require('@hapi/joi')


module.exports = {
    create: {
        name: Joi.string().min(1).max(100).required(),
        password: Joi.string().min(2).max(10).required(),
        email: Joi.string().email().required(),
        ipServer: Joi.string().ip({
            version: [
                'ipv4',
                'ipv6'
            ]
        }).required()
    },
    userIdParam: {
        userId: Joi.string().required()
    }
}

