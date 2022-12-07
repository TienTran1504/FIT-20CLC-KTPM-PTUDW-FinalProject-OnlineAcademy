const mongoose = require('mongoose')
require('dotenv').config()

function newConnection(uri) {
    console.log(uri)
    const connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })

    connection.on('connected', () => {
        console.log(`Connected database successfully!`)
    })
    connection.on('disconnected', () => {
        console.log(`Disconnected database!`)
    })
    connection.on('error', (err) => {
        console.log(`Error: ${JSON.stringify(err)}`)
    })

    return connection
}

const conn = newConnection(process.env.URI_MONGODB)

module.exports = { conn }