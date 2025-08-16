import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { initial, orderAtom } from '../../atoms/orderAtom'
import OrderItemCard from '../../components/orders/OrderItemCard'
import type { statusOptions } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../../services/api/orders'
import { useRef } from 'react'

export const Route = createFileRoute('/orders/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const [order, setOrder] = useAtom(orderAtom)

	const errorRef = useRef<string>(null)
	const navigate = useNavigate()

	const mutation = useMutation({
		mutationFn: createOrder,
	})

	const createNewProduct = async () => {
		mutation.mutate(order, {
			onSuccess: () => {
				setOrder(initial)
				errorRef.current = ''
				navigate({ to: '/orders' })
			},
			onError: () => {
				errorRef.current = 'Something went wrong'
			},
		})
	}

	const totalPrice = () => {
		let basePrice = 0

		order.items.forEach((item) => {
			basePrice += item.unitPrice * item.quantity
		})

		return basePrice
	}

	return (
		<div>
			<div className='card bg-base-300 rounded-box grid h-fit gap-y-5 px-5 py-3'>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					customer name:
					<input
						type='text'
						value={order?.customer_Name}
						onChange={(e) =>
							setOrder((prev) =>
								prev ? { ...prev, customer_Name: e.target.value } : prev,
							)
						}
						className='input'
					/>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					customer contact:
					<input
						type='text'
						value={order?.customer_Contact}
						onChange={(e) =>
							setOrder((prev) =>
								prev ? { ...prev, customer_Contact: e.target.value } : prev,
							)
						}
						className='input'
					/>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Status:
					<select
						value={order?.status}
						disabled
						onChange={(e) =>
							setOrder((prev) =>
								prev
									? { ...prev, status: e.target.value as statusOptions }
									: prev,
							)
						}
						className='select'>
						<option
							value='approved'
							defaultChecked>
							Approved
						</option>
						<option value='shipped'>Shipped</option>
						<option value='delivered'>Delivered</option>
						<option value='cancelled'>Cancelled</option>
						<option value='returned'>Returned</option>
					</select>
				</label>
				<label
					htmlFor=''
					className='flex items-baseline justify-start gap-5'>
					Total Price:
					<input
						type='number'
						disabled
						value={totalPrice()}
						className='input'
					/>
				</label>
				<div>
					<label className='label'>
						<span className='label-text'>Items</span>
					</label>
					<div className='mx-2 my-4 grid grid-cols-2 gap-3'>
						{order?.items.map((item) => (
							<OrderItemCard item={item} />
						))}
						<Link to='/orders/addProduct'>
							<button className='btn btn-soft w-full'>Add Product</button>
						</Link>
					</div>
				</div>
				<p className='text-center text-red-600'>{errorRef.current}</p>
				<button
					type='button'
					className='btn-primary btn'
					onClick={createNewProduct}>
					Save Order
				</button>
				<button
					type='button'
					className='btn-outline btn-error btn'
					onClick={() => {
						setOrder(initial)
						navigate({ to: '/orders' })
					}}>
					Cancel
				</button>
			</div>
		</div>
	)
}
