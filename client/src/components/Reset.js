import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidate } from '../helper/validate'

import styles from '../styles/Username.module.css'

const Reset = () => {
	const formik = useFormik({
		initialValues: {
			password: 'admin@123',
			confirm_pwd: 'admin@123',
		},
		validate: resetPasswordValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			console.log(values)
		},
	})

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass} style={{ width: '50%' }}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Reset</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Enter new password
						</span>
					</div>
					<form className='py-10' onSubmit={formik.handleSubmit}>
						<div className='textbox flex  flex-col items-center gap-6'>
							<input
								className={styles.textbox}
								type='password'
								placeholder='Password'
								{...formik.getFieldProps('password')}
							/>
							<input
								className={styles.textbox}
								type='password'
								placeholder='Repeat Password'
								{...formik.getFieldProps('confirm_pwd')}
							/>
							<button className={styles.btn} type='submit'>
								Reset
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Reset
