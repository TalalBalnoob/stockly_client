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
	id: number
	quantity: number
	reason: string
	productId: number
	related_Order_Id?: number
}

export type StockPage = {
	items: StockChange[]
	totalCount: number
	pageNumber: number
	pageSize: number
}

export type Order = {
	id: number
	customer_name: string
	customer_contact: string
	payment_method: PaymentMethods
	payment_notes: string
	items: OrderItem[]
	order_total: number
	status: StatusOptions
	createdAt?: string
}

export type StatusOptions =
	| 'payment pending'
	| 'approved'
	| 'shipped'
	| 'delivered'
	| 'cancelled'
	| 'returned'
	| 'on hold'

export type PaymentMethods =
	| 'None'
	| 'Cash'
	| 'Bank Transfer'
	| 'Credit Card'
	| 'Debit Card'
	| 'Mada' // KSA-specific
	| 'PayPal'
	| 'Stripe'
	| 'Other'

export const statusOptions: StatusOptions[] = [
	'payment pending',
	'approved',
	'shipped',
	'delivered',
	'cancelled',
	'returned',
	'on hold',
]

export const paymentMethods: PaymentMethods[] = [
	'None',
	'Cash',
	'Bank Transfer',
	'Credit Card',
	'Debit Card',
	'Mada', // KSA-specific
	'PayPal',
	'Stripe',
	'Other',
]

export type OrderItem = {
	id: number
	// orderId?: number
	productId: number
	quantity: number
	unitPrice: number
}
