const Boom = require('@hapi/boom')
const {userModel} = require('../models/DB')
const Mongoose = require("mongoose");
const requestIp = require('request-ip');

async function createUser(request, h) {
    console.log(request.payload)
    console.log(requestIp.getClientIp(request))
    try {
        if(request.payload.passGlobal === process.env.SECRET){
            const User = new userModel({
                _id: new Mongoose.Types.ObjectId(),
                email: request.payload.email,
                firstname: request.payload.firstname,
                lastname: request.payload.lastname,
                password: request.payload.password,
                ipServer: request.payload.ipServer,
                ip:requestIp.getClientIp(request)
            })
            const result = await User.save(function (err) {
                if (err) console.log(err);
                console.log('User successfully saved.')
            }) 
            return h.response(User).code(201)
        }else {
            
        }
    } catch(err) {
        console.log(err)
        return Boom.boomify(new Error('Error', { status: 400 }))
    }
}
async function listUsers (request, h) {
    try {
        let person = await userModel.find()
        return h.response(person).code(200)
    } catch (error) {
        console.log(error)
        return Boom.boomify(new Error('Error', { status: 500 }))
    }
}
async function findUser (request, h) {
    const { userId } = request.params
    try {
        console.log(userId)
        const person = await userModel.findById(userId);
        return h.response(person).code(200);
    } catch (error) {
        console.log(error)
        return Boom.boomify(new Error('Error', { status: 500 }))
    }
}

module.exports = {
    createUser, 
    listUsers,
    findUser
}