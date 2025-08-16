import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getProducts } from '../../services/api/products'
import { Trash } from 'lucide-react'
import { useAtom } from 'jotai'
import { itemsLitsAtom } from '../../atoms/orderAtom'
import type { OrderItem, Product } from '../../types'

export const Route = createFileRoute('/orders/addProduct')({
	component: RouteComponent,
})

function RouteComponent() {
	const query = useQuery({ queryKey: ['products'], queryFn: getProducts })
	const [itemList, setItemList] = useAtom(itemsLitsAtom)

	const addNewProductToList = (product: Product) => {
		setItemList((prev: OrderItem[]) => {
			// Check if already in the list
			if (prev.some((item) => item.productId === product.id)) {
				return prev // no changes
			}
			// Add new product
			return [
				...prev,
				{
					productId: product.id,
					quantity: 1,
					unitPrice: product.price,
					id: 0,
				},
			]
		})
	}

	return (
		<div>
			<div className='flex justify-end'>
				<Link to='/orders/new'>
					<button className='btn btn-success'>Done</button>
				</Link>
			</div>
			<table className='col-auto table'>
				{/* head */}
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{query.data?.map((product) => (
						<tr>
							<th>{product.id}</th>
							<td>{product.name}</td>
							<td>{product.price}$</td>
							<td>{product.quantity > 0 ? product.quantity : 'Sold out'}</td>
							<td>
								{itemList?.some((item) => item.productId === product.id) ? (
									<>
										<input
											type='number'
											className='input'
											value={
												itemList.find((item) => item.productId === product.id)
													?.quantity
											}
											onChange={(e) => {
												const value = Number(e.target.value)
												if (value < 1) return
												setItemList((prev) =>
													prev.map((item) =>
														item.productId === product.id
															? {
																	...item,
																	quantity:
																		value <= product.quantity
																			? value
																			: item.quantity,
																}
															: item,
													),
												)
											}}
										/>
										<button
											className='btn btn-warning'
											onClick={() => {
												setItemList((prev) =>
													prev.filter((item) => item.productId !== product.id),
												)
											}}>
											<Trash />
										</button>
									</>
								) : (
									<button
										className='btn btn-primary'
										onClick={() => addNewProductToList(product)}>
										Add
									</button>
								)}
							</td>
						</tr>
					))}
					{query.isLoading && (
						<tr>
							<td
								colSpan={4}
								className='text-center'>
								Loading...
							</td>
						</tr>
					)}
					{query.isError && (
						<tr>
							<td
								colSpan={4}
								className='text-center text-red-500'>
								{query.error instanceof Error
									? query.error.message
									: 'An error occurred'}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
