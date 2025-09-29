export type Product = {
	id: number
	name: string
	description: string
	storage_Note: string
	price: number
	quantity: number
	isActive: boolean
	createdAt?: string
}

export type ProductsPage = {
	items: Product[]
	totalCount: number
	pageNumber: number
	pageSize: number
}

export type StockChange = {
	quantity: number
	reason: string
	productId: number
}

export type Order = {
	id: number
	customer_Name: string
	customer_Contact: string
	items: OrderItem[]
	total_amount: number
	status: StatusOptions
	createdAt?: string
}

export type StatusOptions =
	| 'approved'
	| 'shipped'
	| 'delivered'
	| 'cancelled'
	| 'returned'

export const statusOptions: StatusOptions[] = [
	'approved',
	'shipped',
	'delivered',
	'cancelled',
	'returned',
]

export type OrderItem = {
	id: number
	// orderId?: number
	productId: number
	quantity: number
	unitPrice: number
}
