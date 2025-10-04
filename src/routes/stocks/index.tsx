import { createFileRoute, Link } from '@tanstack/react-router'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { StockTableColumns } from '../../services/tables/stocks'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { getStocks } from '../../services/api/stocks'

export const Route = createFileRoute('/stocks/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [page, setPage] = useState(1)

	const { data } = useQuery({
		queryKey: ['stocks', page],
		queryFn: () => getStocks(page),
		placeholderData: keepPreviousData,
	})

	const table = useReactTable({
		columns: StockTableColumns,
		data: data?.items ?? [],
		getCoreRowModel: getCoreRowModel(),
	})
	return (
		<>
			<div className='m-4 flex items-center justify-between'>
				<div className='flex w-full justify-between'>
					<h1 className='mr-4 text-2xl'>Stocks</h1>

					<input
						type='text'
						placeholder='Search'
						className='input input-md'
					/>

					<Link to='/products/new'>
						{/* <button className='btn bg-transparent'></button> */}
					</Link>
				</div>
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
								{/* <td>
									<span className='flex gap-1'>
										<button
											className='btn btn-sm bg-yellow-500/80'
											onClick={() => {
												const id = row
													.getVisibleCells()
													.find((p) => p.column.id == 'id')
													?.getValue() as number
												navigate({ to: `/products/update/${id}` })
											}}>
											<Pen />
										</button>
										<button
											className='btn btn-sm bg-red-500/80'
											onClick={() =>
												deleteProductSubmit(
													row
														.getVisibleCells()
														.find((p) => p.column.id == 'id')
														?.getValue() as number,
												)
											}>
											<Trash />
										</button>
									</span>
								</td> */}
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
									<h1></h1>
									<div className='join mr-20'>
										{data == null ? (
											'Loading...'
										) : (
											<>
												<button
													className='join-item btn'
													disabled={data?.pageNumber <= 1 ? true : false}
													onClick={() =>
														setPage((old) => Math.max(old - 1, 1))
													}>
													«
												</button>
												<button className='join-item btn'>
													Page {data?.pageNumber}
												</button>
												<button
													className='join-item btn'
													disabled={
														data.pageSize * data.pageNumber + 1 >
														data.totalCount
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
			</div>
		</>
	)
}
