const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const mongoose = require('mongoose');

// SOCKET IO CLIENT
const WebSocket = require('ws')
const urlws = 'ws:192.168.1.78:5000'
const connection = new WebSocket(urlws)

connection.onopen = () => {
  connection.send('Message From Client')
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  temperature = format(e.data)
  console.log(temperature)
}

const format = (res) => {
  text = res.split('#')
  return {
    'Last valid input': text[0],
    'Temperature': text[1],
    'Humidity': text[2]
  }
}

const url = process.env.URLDB
const dbName = process.env.DBNAME

// SERVER HAPI

const server = Hapi.server({
  port: process.env.PORT || 4000,
  host: 'localhost'
})

async function init () {
  try {
    server.route(routes)

    // MONGOOSE CONECT
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
