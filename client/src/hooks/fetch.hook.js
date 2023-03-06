import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUsername } from '../helper/helper'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

export default function useFetch(query) {
	const [getData, setData] = useState({
		isLoading: false,
		apiData: undefined,
		status: null,
		serverError: null,
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				setData((prev) => ({
					...prev,
					isLoading: true,
				}))

				const username = !query ? await getUsername() : ''

				const { data, status } = !query
					? await axios.get(`api/user/${username}`)
					: await axios.get(`api/${query}`)

				if (status === 200) {
					setData((prev) => ({
						...prev,
						apiData: data,
						status,
						isLoading: false,
					}))
				}

				setData((prev) => ({ ...prev, isLoading: false }))
			} catch (error) {
				setData((prev) => ({
					...prev,
					serverError: error,
					isLoading: false,
				}))
			}
		}

		fetchData()
	}, [query])

	return getData
}
