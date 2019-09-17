const handlers = require('../controllers/user')
const userSchema  = require('../schemas/userSchema')
const Boom = require('@hapi/boom')
module.exports = [
    {
        method: 'GET',
        path: '/users',
        handler: handlers.listUsers
    },
    {
        method: 'POST',
        path: '/users',
        handler: handlers.createUser,
        options: {
            validate: {
                payload: userSchema.create,
                failAction: (request, h, error) => {
                    throw error
                    // throw Boom.boomify(new Error('Error', { status: 400 }))
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{userId}',
        handler: handlers.findUser,
        options: {
            validate: {
                params: userSchema.userIdParam,
                failAction: (request, h, error) => {
                    console.log(error)
                  throw  Boom.boomify(new Error('Error', { status: 400 }))
                }
            }
        }
    }

]