import type { Order } from '../../types'
import api from '../axios'

export const getOrders = async () => {
	const res = await api.get<Order[]>('/Order')
	if (res.status !== 200) throw new Error('Failed to fetch orders')

	return res.data
}

export const createOrder = async (newOrder: Order) => {
	const res = await api.post('/Order', newOrder)
	if (res.status !== 200) throw new Error('Something went wrong')

	return res.data
}
