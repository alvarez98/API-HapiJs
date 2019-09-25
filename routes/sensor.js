const handlers = require('../controllers/sensor')
const sensorSchema = require('../schemas/sensorSchema')
const Boom = require('@hapi/boom')

module.exports = [
    {
        method: 'GET',
        path: '/registers',
        handler: handlers.listRegisters
    },
    {
        method: 'POST',
        path: '/registers',
        handler: handlers.addRegister,
        options: {
            validate: {
                payload: sensorSchema.create,
                failAction: (request, h, error) => {
                    throw Boom.boomify(new Error('Error', { status: 400 }))
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/action',
        handler: handlers.sendAction,
        options: {
            validate: {
                payload: sensorSchema.action,
                query: sensorSchema.query,
                failAction: (request, h, error) => {
                    throw Boom.boomify(new Error('Error', { status: 400 }))
                }
            }
        }


    }
]