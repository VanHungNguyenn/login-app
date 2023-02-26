import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'

import styles from '../styles/Username.module.css'

const Register = () => {
	const [file, setFile] = useState(null)

	const formik = useFormik({
		initialValues: {
			email: 'doyo123@gmail.com',
			username: 'example123',
			password: 'admin@123',
		},
		validate: registerValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values, { profile: file || '' })
			console.log(values)
		},
	})

	/* formik doesn't support file upload so we need to create this handler */
	const onUpload = async (e) => {
		const base64 = await convertToBase64(e.target.files[0])
		setFile(base64)
	}

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Register</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Happy to join you!
						</span>
					</div>
					<form className='py-1' onSubmit={formik.handleSubmit}>
						<div className='profile flex justify-center py-4'>
							<label htmlFor='profile'>
								<img
									src={file || avatar}
									alt='avatar'
									className={styles.profile_img}
								/>
							</label>
							<input
								type='file'
								id='profile'
								name='profile'
								onChange={onUpload}
								hidden
							/>
						</div>
						<div className='textbox flex  flex-col items-center gap-6'>
							<input
								className={styles.textbox}
								type='email'
								placeholder='Email'
								{...formik.getFieldProps('email')}
							/>
							<input
								className={styles.textbox}
								type='text'
								placeholder='Username'
								{...formik.getFieldProps('username')}
							/>
							<input
								className={styles.textbox}
								type='password'
								placeholder='Password'
								{...formik.getFieldProps('password')}
							/>
							<button className={styles.btn} type='submit'>
								Sign In
							</button>
						</div>
						<div className='text-center py-4'>
							<span className='text-gray-500'>
								Already Register?{' '}
								<Link to='/' className='text-red-500'>
									Login Now
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
