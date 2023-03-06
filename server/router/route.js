const router = require('express').Router()
/* import all controllers */
const controller = require('../controllers/appController')
const { Auth, localVariables } = require('../middleware/auth')
const registerMail = require('../controllers/mailer')

// post method
router.route('/register').post(controller.register)
router.route('/registerMail').post(registerMail) // send the mail
router
	.route('/authenticate')
	.post(controller.verifyUser, (req, res) => res.end()) // authenticate
router.route('/login').post(controller.verifyUser, controller.login) // log in

// get method
router.route('/user/:username').get(controller.getUser)
router
	.route('/generateOTP')
	.post(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

// put method
router.route('/updateuser').put(Auth, controller.updateUser)
router
	.route('/resetpassword')
	.put(controller.verifyUser, controller.resetPassword)

module.exports = router
