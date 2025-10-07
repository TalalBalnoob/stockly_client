import {
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table'
import { ProductsTableColumnsForHome } from '../../services/tables/home'
import type { mostSoldProductItem } from '../../types'
import { Link } from '@tanstack/react-router'

const ProductTable = ({
	mostSoldProducts,
}: {
	mostSoldProducts: mostSoldProductItem[] | undefined
}) => {
	const productsTable = useReactTable({
		columns: ProductsTableColumnsForHome,
		data: mostSoldProducts ?? [],
		getCoreRowModel: getCoreRowModel(),
	})
	return (
		<table className='bg-base-300 table w-2/5 rounded border border-gray-300/40 shadow'>
			<thead>
				{productsTable.getHeaderGroups().map((headerGroup) => (
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
				{productsTable.getRowModel().rows.map((row) => (
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
					{productsTable.getRowModel().rows.length === 0 && (
						<td
							className='text-center'
							colSpan={productsTable.getAllColumns().length}>
							No results.
						</td>
					)}
				</tr>
			</tbody>
			<tfoot>
				<tr className='bg-base-300 text-2xl'>
					<td
						colSpan={productsTable.getAllColumns().length + 1}
						className='m-1'>
						<div className='flex w-full justify-between'>
							<h1></h1>
							<div className='join mr-4'>
								<Link
									to='/products'
									className='btn join-item btn-primary'>
									View All Products
								</Link>
							</div>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default ProductTable
