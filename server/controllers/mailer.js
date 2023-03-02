const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const ENV = require('../config')

let nodeConfig = {
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: ENV.EMAIL,
		pass: ENV.PASSWORD,
		clientId:
			'38546557321-3l1j9ibib8c4ni2tlhkb11c8v1kapinp.apps.googleusercontent.com',
		clientSecret: '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',
		refreshToken:
			'1//042ZJO4lg9IABCgYIARAAGAQSNwF-L9Irc_BsXk_CeXZBWdvw1WuHZ2RjghPd5-96924SBEEQpGa3YIyysg6TOx_WOfIdBQJi9n0',
	},
}

let transporter = nodemailer.createTransport(nodeConfig)

let MailGenerator = new Mailgen({
	theme: 'default',
	product: {
		name: 'Login App',
		link: 'https://mailgen.js',
	},
})

const registerMail = async (req, res) => {
	const { username, userEmail, text, subject } = req.body

	let email = {
		body: {
			name: username,
			intro:
				text ||
				"Welcome to Login App! We're very excited to have you on board.",
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	}

	let emailBody = MailGenerator.generate(email)

	let message = {
		from: ENV.EMAIL,
		to: userEmail,
		subject: subject || 'Welcome to Login App!',
		html: emailBody,
	}

	transporter.sendMail(message, (err, info) => {
		if (err) {
			return res.status(500).json({ message: err.message })
		}

		return res.status(200).json({ message: 'Email sent' })
	})
}

module.exports = registerMail
