export type Product = {
	id: number
	name: string
	description: string
	price: number
	quantity: number
	imageUrl: string | null
	isActive: boolean
	createdAt?: string
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
	totel_amount: number
	status: string
	createdAt: string
}

export type OrderItem = {
	id: number
	orderId: number
	productId: number
	quantity: number
	unitPrice: number
}
