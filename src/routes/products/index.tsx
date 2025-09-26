import { createFileRoute, Link } from '@tanstack/react-router'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ProductTableColumns } from '../../services/tables/products'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/api/products'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	})

	const table = useReactTable({
		columns: ProductTableColumns,
		data: data ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<>
			<div className='m-4 flex items-center justify-between'>
				<h1 className='mr-4 text-2xl'>Orders</h1>

				<input
					type='text'
					placeholder='Search'
					className='input input-md'
				/>

				<Link to='/products'>
					<button className='btn btn-primary'>New Order</button>
				</Link>
			</div>

			<div className='overflow-x-auto'>
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
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
