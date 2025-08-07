import { createFileRoute, useParams } from '@tanstack/react-router'
import { updateProduct, getProduct } from '../../../services/api/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { Product } from '../../../types'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/products/$productId/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { productId } = useParams({ from: '/products/$productId/' })
	const [product, setProduct] = useState<Product | null>()

	const mutation = useMutation({
		mutationKey: ['updateProduct'],
		mutationFn: updateProduct,
	})

	const query = useQuery({
		queryKey: ['product', productId],
		queryFn: getProduct,
	})

	useEffect(() => {
		if (query.isSuccess && query.data) {
			setProduct(query.data)
		}

		if (mutation.isSuccess && mutation.data) {
			setProduct(mutation.data)
		}
	}, [query.isSuccess, query.data, mutation.isSuccess, mutation.data])

	if (query.isError) {
		return (
			<div>
				<h1>{query.error.message}</h1>
			</div>
		)
	}

	const handleUpdateProduct = () => {
		if (!product) return

		mutation.mutate(product, {
			onSuccess: () => {
				toast.success('Product has been updated', { theme: 'colored' })
			},
		})
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
						value={product?.name}
						onChange={(e) =>
							setProduct((prev) =>
								prev ? { ...prev, name: e.target.value } : prev,
							)
						}
						className='input'
					/>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Description:
					<input
						type='text'
						value={product?.description}
						onChange={(e) =>
							setProduct((prev) =>
								prev ? { ...prev, description: e.target.value } : prev,
							)
						}
						className='input'
					/>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Price:
					<input
						type='number'
						value={product?.price}
						onChange={(e) =>
							setProduct((prev) =>
								prev ? { ...prev, price: Number(e.target.value) } : prev,
							)
						}
						className='input'
					/>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Quantity:
					<input
						type='number'
						value={product?.quantity}
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
					onClick={handleUpdateProduct}>
					Save Changes
				</button>
			</div>
		</div>
	)
}
