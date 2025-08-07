import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { getProduct, updateProductStock } from '../../../services/api/products'
import { useEffect, useState } from 'react'
import type { Product } from '../../../types'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/products/$productId/stock')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { productId } = useParams({ from: '/products/$productId/stock' })
	const [product, setProduct] = useState<Product | null>()
	const [changeReason, setChangeReason] = useState<string>('')

	const query = useQuery({
		queryKey: ['product', productId],
		queryFn: getProduct,
	})

	const mutation = useMutation({
		mutationKey: ['updateProduct'],
		mutationFn: updateProductStock,
	})

	useEffect(() => {
		if (query.isSuccess && query.data) {
			setProduct(query.data)
		}
	}, [query.isSuccess, query.data])

	const handleUpdateStock = () => {
		if (!product) return

		mutation.mutate(
			{
				productId: product.id,
				quantity: product.quantity,
				reason: changeReason ?? 'No reason provided',
			},
			{
				onSuccess: () => {
					toast.success('Stock has been updated', { theme: 'colored' })
					navigate({ to: '/products' })
				},
			},
		)
	}

	return (
		<div>
			<div className='card bg-base-300 rounded-box grid h-fit gap-y-5 px-5 py-3'>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Name:
					<input
						type='text'
						value={changeReason}
						onChange={(e) => setChangeReason(e.target.value)}
						className='input'
					/>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Quantity change:
					<input
						type='number'
						value={product?.quantity}
						placeholder='50, -40'
						onChange={(e) =>
							setProduct((prev) =>
								prev ? { ...prev, quantity: Number(e.target.value) } : prev,
							)
						}
						className='input'
					/>
				</label>
				<button
					type='button'
					className='btn-primary btn'
					onClick={handleUpdateStock}>
					Save Changes
				</button>
			</div>
		</div>
	)
}
