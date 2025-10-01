import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { OrderProductsTableColumns } from '../services/tables/orderProducts'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProductsWithNonDisables } from '../services/api/products'
import { useState } from 'react'
import type { OrderItem } from '../types'

const OrderProducts = ({
	items,
	setItems,
}: {
	items: OrderItem[]
	setItems: React.Dispatch<React.SetStateAction<OrderItem[]>>
}) => {
	const [page, setPage] = useState(1)

	const { data } = useQuery({
		queryKey: ['products', page],
		queryFn: () => getProductsWithNonDisables(page),
		placeholderData: keepPreviousData,
	})

	const table = useReactTable({
		columns: OrderProductsTableColumns,
		data: data?.items ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	const addToList = (ProductId: number) => {
		const product = data?.items.find((p) => p.id === ProductId)
		if (!product) return

		const existingItem = items.find((p) => p.productId === ProductId)
		const maxQuantity = product.quantity

		if (existingItem) {
			if (existingItem.quantity >= maxQuantity) {
				return
			}
			setItems((prev) =>
				prev.map((p) =>
					p.productId === ProductId ? { ...p, quantity: p.quantity + 1 } : p,
				),
			)
		} else {
			setItems((prev) => [
				...prev,
				{
					id: 0,
					quantity: 1,
					unitPrice: product.price,
					productId: ProductId,
				},
			])
		}
	}

	const removeFromList = (ProductId: number) => {
		setItems((prev) =>
			prev
				.map((item) =>
					item.productId === ProductId
						? { ...item, quantity: item.quantity - 1 }
						: item,
				)
				.filter((item) => item.quantity > 0),
		)
	}

	return (
		<table className='table'>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr
						key={row.id}
						className={`${data?.items.find((p) => p.id == row.getValue('id'))?.isActive ? '' : 'bg-neutral/10 line-through'}`}>
						{row.getVisibleCells().map((cell) => {
							return (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							)
						})}
						<td>
							<span className='flex w-fit gap-1'>
								<div className='join'>
									<button
										className='btn join-item'
										onClick={() => removeFromList(row.getValue('id'))}>
										-
									</button>
									<button className='btn join-item'>
										{items.find((p) => p.productId == row.getValue('id'))
											?.quantity ?? 0}
									</button>
									<button
										className='btn join-item'
										onClick={() => addToList(row.getValue('id'))}>
										+
									</button>
								</div>
							</span>
						</td>
					</tr>
				))}
				<tr>
					{table.getRowModel().rows.length === 0 && (
						<td
							className='text-center'
							colSpan={table.getAllColumns().length}>
							No results.
						</td>
					)}
				</tr>
			</tbody>
			<tfoot>
				<tr className='bg-base-300 text-2xl'>
					<td
						colSpan={table.getAllColumns().length + 1}
						className='m-1'>
						<div className='flex w-full justify-between'>
							<h1> </h1>
							<div className='join mr-20'>
								{data == null ? (
									'Loading...'
								) : (
									<>
										<button
											className='join-item btn'
											disabled={data?.pageNumber <= 1 ? true : false}
											onClick={() => setPage((old) => Math.max(old - 1, 1))}>
											«
										</button>
										<button className='join-item btn'>
											Page {data?.pageNumber}
										</button>
										<button
											className='join-item btn'
											disabled={
												data.pageSize * data.pageNumber + 1 > data.totalCount
													? true
													: false
											}
											onClick={() => setPage((old) => old + 1)}>
											»
										</button>
									</>
								)}
							</div>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default OrderProducts
