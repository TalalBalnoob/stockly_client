import type { Product } from '../../types'
import api from '../axios'

export const getProducts = async () => {
	const res = await api.get<Product[]>('/Product')
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const getProduct = async ({
	queryKey,
}: {
	queryKey: [string, string | number]
}) => {
	const res = await api.get<Product>(`/Product/${queryKey[1]}`)
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const updateProduct = async (product: Product) => {
	const res = await api.put<Product>(`/Product/${product.id}`, product)
	if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}
