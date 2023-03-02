const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide unique username'],
		unique: [true, 'Username already exists'],
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		unique: false,
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		unique: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	mobile: {
		type: Number,
	},
	address: {
		type: String,
	},
	profile: {
		type: String,
	},
})

module.exports = mongoose.model('User', UserSchema)
