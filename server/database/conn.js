const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

async function connect() {
	const mongod = await MongoMemoryServer.create()
	const uri = mongod.getUri()

	mongoose.set('strictQuery', true)
	const db = await mongoose.connect(uri)
	console.log('Connected to database')

	return db
}

module.exports = connect
