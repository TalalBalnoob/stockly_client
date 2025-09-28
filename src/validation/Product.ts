import * as z from 'zod'

export const CreateProductValidation = z.object({
	id: z.int().nonnegative(),
	name: z.string().nonempty("can't provide empty name"),
	description: z.string().optional(),
	storage_Note: z.string().optional(),
	price: z.number('Number only').nonnegative().nonoptional(),
	quantity: z.int().nonnegative().nonoptional(),
	isActive: z.boolean(),
})
