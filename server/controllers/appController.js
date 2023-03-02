const UserModel = require('../model/User.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const otpGenerator = require('otp-generator')

// middleware for verifying user
const verifyUser = async (req, res, next) => {
	try {
		const { username } = req.method === 'GET' ? req.query : req.body

		const user = await UserModel.findOne({ username })

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		req.user = user

		next()
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' })
	}
}

/* POST: localhost:8080/api/register */
const register = async (req, res) => {
	try {
		const { username, password, email, profile } = req.body

		// check existing user
		const existingUser = await UserModel.findOne({ username })

		if (existingUser) {
			return res.status(409).json({ message: 'User already exists' })
		}

		// check for existing email
		const existingEmail = await UserModel.findOne({ email })

		if (existingEmail) {
			return res.status(409).json({ message: 'Email already exists' })
		}

		if (password) {
			// hash the password
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)

			// create new user
			const newUser = new UserModel({
				username,
				password: hashedPassword,
				email,
				profile: profile || '',
			})

			// save user to database
			await newUser.save()

			return res
				.status(201)
				.json({ message: 'User register successfully' })
		}

		return res.status(400).json({ message: 'Missing password' })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* POST: localhost:8080/api/authenticate */
const authenticate = async (req, res) => {
	res.json({
		message: 'Authenticate successful',
	})
}

/* POST: localhost:8080/api/login */
const login = async (req, res) => {
	try {
		const { username, password } = req.body

		// check existing user
		const existingUser = await UserModel.findOne({ username })

		if (!existingUser) {
			return res.status(404).json({ message: 'User not found' })
		}

		// check password
		const validPassword = await bcrypt.compare(
			password,
			existingUser.password
		)

		if (!validPassword) {
			return res.status(401).json({ message: 'Invalid password' })
		}

		// jwt token
		const token = jwt.sign(
			{
				userId: existingUser._id,
				username: existingUser.username,
			},
			JWT_SECRET,
			{ expiresIn: '24h' }
		)

		return res.status(200).json({
			message: 'Login successful',
			token,
			username: existingUser.username,
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* POST: localhost:8080/api/user/:username */
const getUser = async (req, res) => {
	try {
		const { username } = req.params

		if (!username) {
			return res.status(400).json({ message: 'Missing username' })
		}

		// remove password
		const user = await UserModel.findOne({ username }).select('-password')

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* GET http://localhost:8080/api/generateOTP */
const generateOTP = async (req, res) => {
	req.app.locals.OTP = await otpGenerator.generate(6, {
		lowerCaseAlphabets: false,
		upperCaseAlphabets: false,
		specialChars: false,
	})

	res.status(200).json({
		message: 'Generate OTP successful',
		code: req.app.locals.OTP,
	})
}

/* GET http://localhost:8080/api/verifyOTP */
const verifyOTP = async (req, res) => {
	try {
		const { code } = req.query

		if (parseInt(req.app.locals.OTP) === parseInt(code)) {
			req.app.locals.OTP = null // reset otp value
			req.app.locals.resetSession = true // start session for reset password

			return res.status(200).json({
				message: 'Verify OTP successful',
			})
		}

		return res.status(401).json({ message: 'Invalid OTP' })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* GET http://localhost:8080/api/createResetSession */
const createResetSession = async (req, res) => {
	try {
		if (req.app.locals.resetSession) {
			req.app.locals.resetSession = false // reset session
			return res
				.status(200)
				.json({ message: 'Create reset session successful' })
		}

		return res.status(401).json({ message: 'Session expired' })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* PUT http://localhost:8080/api/updateuser */
const updateUser = async (req, res) => {
	try {
		const { userId } = req.user

		if (!userId) {
			return res.status(400).json({ message: 'Missing id' })
		}

		const body = req.body

		UserModel.findByIdAndUpdate(userId, body, (err, user) => {
			if (err) {
				return res.status(500).json({ message: err.message })
			}

			return res.status(200).json({ message: 'Update user successful' })
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

/* PUT http://localhost:8080/api/resetpassword */
const resetPassword = async (req, res) => {
	try {
		if (!req.app.locals.resetSession) {
			return res.status(401).json({ message: 'Session expired' })
		}

		const { username, password } = req.body

		UserModel.findOne({ username }).then(async (user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			const salt = await bcrypt.genSalt(10)

			const hashedPassword = await bcrypt.hash(password, salt)

			user.password = hashedPassword

			user.save((err) => {
				if (err) {
					return res.status(500).json({ message: err.message })
				}

				return res.status(200).json({
					message: 'Reset password successful',
				})
			})
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = {
	register,
	authenticate,
	login,
	getUser,
	generateOTP,
	verifyOTP,
	createResetSession,
	updateUser,
	resetPassword,
	verifyUser,
}
