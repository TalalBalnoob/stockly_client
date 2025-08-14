import { createFileRoute, Link } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { orderAtom } from '../../atoms/orderAtom'
import OrderItemCard from '../../components/orders/OrderItemCard'

export const Route = createFileRoute('/orders/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const [order, setOrder] = useAtom(orderAtom)

	const deleteItemFromList = (orderItemProductId: number) => {
		setOrder((prev) => {
			const newItemList = prev.items.filter((item) => {
				return item.productId !== orderItemProductId
			})
			console.log(newItemList, orderItemProductId)
			return { ...prev, items: newItemList }
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
					<input
						type='number'
						value={order?.status}
						onChange={(e) =>
							setOrder((prev) =>
								prev ? { ...prev, status: e.target.value } : prev,
							)
						}
						className='input'
					/>
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
							<OrderItemCard
								item={item}
								deleteItemFromList={deleteItemFromList}
							/>
						))}
					</div>
					<Link to='/orders/addProduct'>
						<button className='btn btn-soft w-full'>Add Product</button>
					</Link>
				</div>
				<button
					type='button'
					className='btn-primary btn'
					onClick={() => {}}>
					Save Order
				</button>
			</div>
		</div>
	)
}
