import type { Order } from '../../types'
import api from '../axios'

export const getOrders = async () => {
	const res = await api.get<Order[]>('/Order')
	console.log('Fetching orders from API', res)
	if (res.status !== 200) throw new Error('Failed to fetch orders')

	return res.data
}
