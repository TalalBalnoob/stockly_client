import { useQuery } from '@tanstack/react-query'
import type { OrderItem } from '../../types'
import { getProduct } from '../../services/api/products'
import { X } from 'lucide-react'
import { itemsLitsAtom } from '../../atoms/orderAtom'
import { useAtom } from 'jotai'

type propsType = {
	item: OrderItem
}

const OrderItemCard = ({ item }: propsType) => {
	const [, setItemList] = useAtom(itemsLitsAtom)

	const query = useQuery({
		queryKey: ['product', item.productId],
		queryFn: getProduct,
	})

	const deleteItemFromList = () => {
		setItemList((prev) => {
			return prev.filter((currentItem) => {
				return currentItem.productId !== query.data?.id
			})
		})
	}

	const UpdateItemFromList = (newItem: OrderItem) => {
		setItemList((prev) => {
			return prev.map((currentItem) => {
				if (currentItem.productId === newItem.productId) {
					return newItem
				} else {
					return currentItem
				}
			})
		})
	}

	if (!query.data) return <></>

	return (
		<div className='card card-border bg-base-100 w-full'>
			<div className='card-body'>
				<div className='card-actions items-center justify-between'>
					<h2 className='card-title'>{query.data.name}</h2>
					<button
						onClick={() => deleteItemFromList()}
						className='btn btn-circle btn-xs bg-red-600'>
						<X />
					</button>
				</div>
				<div>
					<label
						htmlFor=''
						className='flex items-baseline justify-start gap-2'>
						Quantity:
						<input
							type='number'
							width={50}
							value={item.quantity}
							className='input w-20'
							onChange={(e) => {
								if (
									Number(e.target.value) > 0 &&
									Number(e.target.value) <= query.data.quantity
								) {
									item.quantity = Number(e.target.value)
									UpdateItemFromList(item)
								}
							}}
						/>
					</label>
					<label
						htmlFor=''
						className='flex items-baseline justify-start gap-2'>
						Price:
						<input
							type='number'
							width={50}
							value={item.unitPrice}
							className='input w-20'
							onChange={(e) => {
								item.unitPrice = Number(e.target.value)
								UpdateItemFromList(item)
							}}
						/>
					</label>
				</div>
			</div>
		</div>
	)
}

export default OrderItemCard
