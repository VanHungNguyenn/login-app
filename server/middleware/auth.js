const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const Auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]

		// retrieve the user details for the logged in user
		await jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					message: 'Authentication failed',
				})
			}

			req.user = decoded
			next()
		})
	} catch (error) {
		res.status(401).json({
			message: 'Authentication failed',
		})
	}
}

const localVariables = (req, res, next) => {
	req.app.locals = {
		OTP: null,
		resetSession: false,
	}
	next()
}

module.exports = { Auth, localVariables }
