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
                query: sensorSchema.query,
                failAction: (request, h, error) => {
                    throw Boom.boomify(new Error('Error', { status: 400 }))
                }
            }
        }
    }
]