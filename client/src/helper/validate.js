import toast from 'react-hot-toast'

/* validate login page username */
export async function usernameValidate(values) {
	const errors = usernameVerify({}, values)

	return errors
}

/* validate login page password */
export async function passwordValidate(values) {
	const errors = passwordVerify({}, values)

	return errors
}

/* validate reset page password */
export async function resetPasswordValidate(values) {
	const errors = resetPasswordVerify({}, values)

	return errors
}

/* validate register page */
export async function registerValidate(values) {
	const errors = usernameVerify({}, values)
	passwordVerify(errors, values)
	emailVerify(errors, values)

	return errors
}

/* validate profile page */
export async function profileValidate(values) {
	const errors = emailVerify({}, values)

	return errors
}

/* validate email */
function emailVerify(error = {}, values) {
	if (!values.email) {
		error.email = toast.error('Email is required...!')
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		error.email = toast.error('Invalid email...!')
	} else if (values.email.includes(' ')) {
		error.email = toast.error('Invalid email...!')
	}

	return error
}

/* validate reset page username */
function resetPasswordVerify(error = {}, values) {
	// eslint-disable-next-line no-useless-escape
	const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

	if (!values.password) {
		error.password = toast.error('Password is required...!')
	} else if (values.password.length < 6) {
		error.password = toast.error(
			'Password must be at least 6 characters...!'
		)
	} else if (values.password.includes(' ')) {
		error.password = toast.error('Invalid password...!')
	} else if (!specialChar.test(values.password)) {
		error.password = toast.error(
			'Password must contain at least one special character...!'
		)
	} else if (values.password !== values.confirmPassword) {
		error.confirmPassword = toast.error('Password does not match...!')
	}

	return error
}

/* validate password */
function passwordVerify(error = {}, values) {
	// eslint-disable-next-line no-useless-escape
	const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

	if (!values.password) {
		error.password = toast.error('Password is required...!')
	} else if (values.password.length < 6) {
		error.password = toast.error(
			'Password must be at least 6 characters...!'
		)
	} else if (values.password.includes(' ')) {
		error.password = toast.error('Invalid password...!')
	} else if (!specialChar.test(values.password)) {
		error.password = toast.error(
			'Password must contain at least one special character...!'
		)
	}

	return error
}

/* validate username */
function usernameVerify(error = {}, values) {
	if (!values.username) {
		error.username = toast.error('Username is required...!')
	} else if (values.username.includes(' ')) {
		error.username = toast.error('Invalid username...!')
	}

	return error
}
