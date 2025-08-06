import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createProduct } from '../../services/api/products'
import type { Product } from '../../types'

export const Route = createFileRoute('/products/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const [product, setProduct] = useState<Product | null>()
	const navigate = useNavigate()

	const mutation = useMutation({
		mutationKey: ['createProduct'],
		mutationFn: createProduct,
	})

	useEffect(() => {
		setProduct({
			id: 0,
			name: '',
			description: '',
			quantity: 0,
			price: 0,
			isActive: true,
			imageUrl: null,
		})
	}, [])

	useEffect(() => {
		if (mutation.isSuccess && mutation.data) {
			setProduct(mutation.data)
		}
	}, [mutation.isSuccess, mutation.data])

	const handleCreateProduct = () => {
		if (!product) return

		mutation.mutate(product, {
			onSuccess: () => {
				toast.success('Product has been Created', { theme: 'colored' })
				navigate({ to: '/products' })
			},
			onError: (err) => {
				console.log(err.message)
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
					onClick={handleCreateProduct}>
					Save Product
				</button>
			</div>
		</div>
	)
}
