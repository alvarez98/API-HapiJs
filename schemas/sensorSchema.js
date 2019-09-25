const Joi = require('@hapi/joi')
module.exports = {
    create: {
        value: Joi.number().min(1).max(50).required(),
        model: Joi.string().min(3).max(50).required()
    },
    query:{
        sensorValue: Joi.string()
    },
    action: {
        dispositivo: Joi.string().required()
    }
}