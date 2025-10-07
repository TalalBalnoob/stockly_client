import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { OrderTableColumnsForHome } from '../../services/tables/home'
import type { Order } from '../../types'
import { Link } from '@tanstack/react-router'

const OrderTable = ({
	latestOrders,
}: {
	latestOrders: Order[] | undefined
}) => {
	const ordersTable = useReactTable({
		columns: OrderTableColumnsForHome,
		data: latestOrders ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<table className='bg-base-300 table w-3/5 rounded border border-gray-300/40 shadow'>
			<thead>
				{ordersTable.getHeaderGroups().map((headerGroup) => (
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
				{ordersTable.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => {
							return (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							)
						})}
					</tr>
				))}
				<tr>
					{ordersTable.getRowModel().rows.length === 0 && (
						<td
							className='text-center'
							colSpan={ordersTable.getAllColumns().length}>
							No results.
						</td>
					)}
				</tr>
			</tbody>
			<tfoot>
				<tr className='bg-base-300 text-2xl'>
					<td
						colSpan={ordersTable.getAllColumns().length + 1}
						className='m-1'>
						<div className='flex w-full justify-between'>
							<h1></h1>
							<div className='join mr-4'>
								<Link
									to='/orders'
									className='btn join-item btn-primary'>
									View All Orders
								</Link>
							</div>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default OrderTable
