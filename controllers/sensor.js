const Boom = require('@hapi/boom')
const { sensorModel } = require('../models/DB')
const Mongoose = require('mongoose');

async function addRegister (request, h) {
    console.log(request.payload)
    try {
        const Value = new sensorModel({
            _id: new Mongoose.Types.ObjectId(),
            value: request.payload.value,
            model:request.payload.model,
            date: Date.now()  
         })
        const result = await Value.save(function (err) {
            if (err) console.log(err);
            console.log('Register successfully saved.')
        })
        return h.response(Value).code(201)

    } catch (err) {
        console.log(err)
        return Boom.boomify(new Error('Error', { status: 400 }))
    }
}

async function listRegisters (request, h) {
    try {
        let values = await sensorModel.find()
        return h.response(values).code(200)
    } catch (error) {
        console.log(error)
        return Boom.boomify(new Error('Error', { status: 500 }))
    }
}

module.exports = {
    addRegister,
    listRegisters
}