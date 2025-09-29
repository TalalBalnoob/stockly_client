import type { Order } from '../../types'
import api from '../axios'

export const getOrders = async () => {
	const res = await api.get<Order[]>('/Order')
	if (res.status !== 200) throw new Error('Failed to fetch orders')

	return res.data
}

export const getOrder = async (id: number) => {
	const res = await api.get<Order>('/Order/' + id)
	if (res.status !== 200) throw new Error('Failed to fetch orders')

	return res.data
}

export const createOrder = async (newOrder: Order) => {
	const res = await api.post('/Order', newOrder)
	if (res.status !== 200) throw new Error('Something went wrong')

	return res.data
}

export const updateOrder = async (order: Order) => {
	const res = await api.put<Order>(`/order/${order.id}`, order)
	if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const setOrderState = async ({
	id,
	value,
}: {
	id: number
	value: string
}) => {
	let res: Axios.AxiosXHR<unknown>

	switch (value) {
		case 'cancelled':
			res = await api.put(`order/cancel/${id}`)
			break
		case 'shipped':
			res = await api.put(`order/ship/${id}`)
			break
		case 'delivered':
			res = await api.put(`order/deliver/${id}`)
			break
		case 'returned':
			res = await api.put(`order/return/${id}`)
			break
	}

	return res!.data
}

export const deleteOrder = async (id: number) => {
	const res = await api.delete(`/Order/${id}`)
	if (res.status !== 204) throw new Error('Failed to delete order')

	return res.data
}
