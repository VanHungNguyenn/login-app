import axios from 'axios'
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

// get username from token
export async function getUsername() {
	const token = localStorage.getItem('token')

	if (!token) {
		return Promise.reject('Token not found')
	}

	let decode = jwt_decode(token)

	return decode.username
}

// authentication
export async function authenticate(username) {
	try {
		return await axios.post('/api/authenticate', { username })
	} catch (error) {
		return { error: 'Username does not exist' }
	}
}

// get user information
export async function getUser({ username }) {
	try {
		const { data } = await axios.get(`/api/user/${username}`)
		return { data }
	} catch (error) {
		return { error: 'Username does not exist' }
	}
}

// register user
export async function registerUser(credentials) {
	try {
		const {
			data: { message },
			status,
		} = await axios.post('/api/register', credentials)

		let { username, email } = credentials

		if (status === 201) {
			await axios.post('/api/registerMail', {
				username,
				userEmail: email,
				text: message,
			})
		}

		return Promise.resolve({ message })
	} catch (error) {
		return Promise.reject({ error })
	}
}

// login function
export async function verifyPassword({ username, password }) {
	try {
		if (username) {
			const { data } = await axios.post('/api/login', {
				username,
				password,
			})

			return Promise.resolve({ data })
		}
	} catch (error) {
		return Promise.reject({ error })
	}
}

// update user function
export async function updateUser(response) {
	try {
		const token = await localStorage.getItem('token')

		const data = await axios.put('/api/updateuser', response, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return Promise.resolve({ data })
	} catch (error) {
		return Promise.reject({ error })
	}
}

// generate OTP
export async function generateOTP(username) {
	try {
		const {
			data: { code },
			status,
		} = await axios.post('/api/generateOTP', {
			params: {
				username,
			},
		})

		if (status === 201) {
			let {
				data: { email },
			} = await getUser({ username })
			let text = `Your OTP is ${code}. Please enter this code to verify your account.`
			await axios.post('/api/registerMail', {
				username,
				userEmail: email,
				text,
				subject: 'OTP Verification',
			})
		}

		return Promise.resolve({ code })
	} catch (error) {
		return Promise.reject({ error })
	}
}

export async function verifyOTP({ username, code }) {
	try {
		const { data, status } = await axios.get('/api/verifyOTP', {
			params: {
				username,
				code,
			},
		})

		return Promise.resolve({ data, status })
	} catch (error) {
		return Promise.reject({ error })
	}
}

export async function resetPassword({ username, pasword }) {
	try {
		const { data, status } = await axios.put('/api/resetpassword', {
			username,
			pasword,
		})

		return Promise.resolve({ data, status })
	} catch (error) {
		return Promise.reject({ error })
	}
}
