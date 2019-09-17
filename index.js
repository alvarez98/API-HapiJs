const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const mongoose = require('mongoose');

const url = process.env.URLDB
const dbName = process.env.DBNAME

const server = Hapi.server({
  port: process.env.PORT || 4000,
  host: 'localhost'
})

async function init () {
  try {
    server.route(routes)

    await server.start()
    mongoose.connect(`${url}/${dbName}`, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
     });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log(`Connected Mongo: ${url}`);
      console.log(`Database: ${dbName}`);
    });
    
    console.log(`Server running on port ${server.info.uri}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}


process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
init()
