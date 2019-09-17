const Mongoose = require("mongoose");

const user = Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  email: String,
  firstname: String,
  lastname: String,
  password: String
});
const userModel = Mongoose.model('userModel', user)

const sensor = Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  value:  Number,
  model: String,
  date: Date
})

const sensorModel = Mongoose.model('sensorModel', sensor)

module.exports = {
  userModel,
  sensorModel
}

