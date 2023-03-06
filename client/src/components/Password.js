import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook'
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import styles from '../styles/Username.module.css'

const Password = () => {
	const navigate = useNavigate()

	const { username } = useAuthStore((state) => state.auth)

	const { isLoading, apiData, serverError } = useFetch(`user/${username}`)

	useFetch(`user/${username}`)

	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate: passwordValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			let loginPromise = verifyPassword({
				username: username,
				password: values.password,
			})

			toast.promise(loginPromise, {
				loading: 'Loading...',
				success: 'Login Success',
				error: 'Login Failed',
			})

			loginPromise.then((res) => {
				let { token } = res.data
				localStorage.setItem('token', token)
				navigate('/profile')
			})
		},
	})

	if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
	if (serverError)
		return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>
							Hello {apiData?.firstName || apiData?.username}!
						</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							Explore More by connecting with us.
						</span>
					</div>
					<form className='py-1' onSubmit={formik.handleSubmit}>
						<div className='profile flex justify-center py-4'>
							<img
								src={apiData?.profile || avatar}
								alt='avatar'
								className={styles.profile_img}
							/>
						</div>
						<div className='textbox flex  flex-col items-center gap-6'>
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
								Forgot Password?{' '}
								<Link to='/recovery' className='text-red-500'>
									Recover Now
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Password
