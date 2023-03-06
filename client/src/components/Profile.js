import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import useFetch from '../hooks/fetch.hook'
import { updateUser } from '../helper/helper'

import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'

const Profile = () => {
	const navigate = useNavigate()

	const { apiData } = useFetch()

	const [file, setFile] = useState(null)

	const formik = useFormik({
		initialValues: {
			firstName: apiData?.firstName || '',
			lastName: apiData?.lastName || '',
			mobile: apiData?.mobile || '',
			email: apiData?.email || '',
			address: apiData?.address || '',
		},
		enableReinitialize: true,
		validate: profileValidate,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = await Object.assign(values, {
				profile: file || apiData?.profile || '',
			})
			let updatePromise = updateUser(values)

			toast.promise(updatePromise, {
				loading: 'Loading...',
				success: 'Profile updated successfully',
				error: 'Something went wrong',
			})
		},
	})

	/* formik doesn't support file upload so we need to create this handler */
	const onUpload = async (e) => {
		const base64 = await convertToBase64(e.target.files[0])
		setFile(base64)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	return (
		<div className='container mx-auto'>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='flex justify-center items-center h-screen'>
				<div className={`${styles.glass} ${extend.glass}`}>
					<div className='title flex flex-col items-center'>
						<h4 className='text-5xl font-bold'>Profile</h4>
						<span className='py-4 text-xl w-2/3 text-center text-gray-500'>
							You can update the details.
						</span>
					</div>
					<form className='py-1' onSubmit={formik.handleSubmit}>
						<div className='profile flex justify-center py-4'>
							<label htmlFor='profile'>
								<img
									src={file || apiData?.profile || avatar}
									alt='avatar'
									className={`${styles.profile_img} ${extend.profile_img}`}
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
							<div className='name flex gap-10 w-3/4'>
								<input
									className={`${styles.textbox} ${extend.textbox}`}
									type='text'
									placeholder='First Name'
									{...formik.getFieldProps('firstName')}
								/>
								<input
									className={`${styles.textbox} ${extend.textbox}`}
									type='text'
									placeholder='Last Name'
									{...formik.getFieldProps('lastName')}
								/>
							</div>
							<div className='name flex gap-10 w-3/4'>
								<input
									className={`${styles.textbox} ${extend.textbox}`}
									type='text'
									placeholder='Mobile'
									{...formik.getFieldProps('mobile')}
								/>
								<input
									className={`${styles.textbox} ${extend.textbox}`}
									type='email'
									placeholder='Email'
									{...formik.getFieldProps('email')}
								/>
							</div>

							<input
								className={`${styles.textbox} ${extend.textbox}`}
								type='text'
								placeholder='Address'
								{...formik.getFieldProps('address')}
							/>

							<button className={styles.btn} type='submit'>
								Update
							</button>
						</div>
						<div className='text-center py-4'>
							<span className='text-gray-500'>
								Come back later?{' '}
								<Link
									to='/'
									className='text-red-500'
									onClick={handleLogout}
								>
									Logout
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Profile
