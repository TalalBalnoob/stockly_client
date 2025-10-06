import type { HomeStats } from '../../types'
import api from '../axios'

export const getHomePageStats = async () => {
	const res = await api.get<HomeStats>('/Home')
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}
