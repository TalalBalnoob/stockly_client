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
