import type { Product, ProductsPage, StockChange } from '../../types'
import api from '../axios'

export const getProducts = async (pageNumber: number = 1) => {
	const res = await api.get<ProductsPage>('/Product?pageNumber=' + pageNumber)
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const getProductsWithNonDisables = async (pageNumber: number = 1) => {
	const res = await api.get<ProductsPage>(
		`/Product?pageNumber=${pageNumber}&nonDisabled=true`,
	)
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const getProduct = async (id: number) => {
	const res = await api.get<Product>(`/Product/${id}`)
	if (res.status == 404) throw new Error('Product not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const updateProduct = async (product: Product) => {
	const res = await api.put<Product>(`/Product/${product.id}`, product)
	if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}

export const createProduct = async (product: Product) => {
	const res = await api.post<Product>(`/Product`, product)
	if (res.status != 201) throw new Error('Something went wrong')

	return res.data
}

export const deleteProduct = async (productId: number) => {
	const res = await api.delete(`/product/${productId}`)
	if (res.status != 204) throw new Error('Something went wrong')

	return res.data
}

export const updateProductStock = async (stockChange: StockChange) => {
	const res = await api.post(`/stock/set/${stockChange.productId}`, {
		quantity: stockChange.quantity,
		reason: stockChange.reason,
	})
	if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}
