import * as z from 'zod'
import { paymentMethods, statusOptions } from '../types'

export const CreateOrderValidation = z.object({
	id: z.int().nonnegative(),
	customer_name: z.string().optional(),
	customer_contact: z.string().optional(),
	payment_method: z.enum(paymentMethods),
	payment_notes: z.string().optional(),
	status: z.enum(statusOptions),
	order_total: z.number('Number only').nonnegative().optional(),
})
