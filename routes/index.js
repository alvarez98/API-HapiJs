const users = require('./user')
const sensor = require('./sensor')

module.exports = [
  ...users,
  ...sensor
]
