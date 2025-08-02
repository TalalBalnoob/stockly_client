import type { Product } from '../../types'
import api from '../axios'

export const getProducts = async () => {
	const res = await api.get<Product[]>('/Product')
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}
