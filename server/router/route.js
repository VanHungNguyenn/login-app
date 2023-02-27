const { Router } = require('express')
const router = Router()
const { register } = require('../controllers/appController')

/* import all controllers */
const controller = require('../controllers/appController')

// post method
router.route('/register').post(controller.register)
// router.route('/registerMail').post() // send the mail
router.route('/authenticate').post((req, res) => res.end()) // authenticate
router.route('/login').post(controller.login) // log in

// get method
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

// put method
router.route('/updateuser').put(controller.updateUser)
router.route('/resetpassword').put(controller.resetPassword)

module.exports = router
