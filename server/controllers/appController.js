/* POST: localhost:8080/api/register */
const register = async (req, res) => {
	res.json({
		message: 'Register successful hehe',
	})
}

/* POST localhost:8080/api/registerMail */
const registerMail = async (req, res) => {
	res.json({
		message: 'Register successful',
	})
}

/* POST: localhost:8080/api/authenticate */
const authenticate = async (req, res) => {
	res.json({
		message: 'Authenticate successful',
	})
}

/* POST: localhost:8080/api/login */
const login = async (req, res) => {
	res.json({
		message: 'Login successful',
	})
}

/* POST: localhost:8080/api/user/:username */
const getUser = async (req, res) => {
	res.json({
		message: 'Get user successful',
	})
}

/* GET http://localhost:8080/api/generateOTP */
const generateOTP = async (req, res) => {
	res.json({
		message: 'Generate OTP successful',
	})
}

/* GET http://localhost:8080/api/verifyOTP */
const verifyOTP = async (req, res) => {
	res.json({
		message: 'Verify OTP successful',
	})
}

/* GET http://localhost:8080/api/createResetSession */
const createResetSession = async (req, res) => {
	res.json({
		message: 'Create reset session successful',
	})
}

/* PUT http://localhost:8080/api/updateuser */
const updateUser = async (req, res) => {
	res.json({
		message: 'Update user successful',
	})
}

/* PUT http://localhost:8080/api/resetpassword */
const resetPassword = async (req, res) => {
	res.json({
		message: 'Reset password successful',
	})
}

module.exports = {
	register,
	registerMail,
	authenticate,
	login,
	getUser,
	generateOTP,
	verifyOTP,
	createResetSession,
	updateUser,
	resetPassword,
}
