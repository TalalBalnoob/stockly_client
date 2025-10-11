import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
} from '@tanstack/react-table'
import type { Dispatch, ReactNode } from 'react'

const Table = ({
	tableColumns,
	columnData,
	addedCols,

	setPage,
}: {
	tableColumns: ColumnDef<unknown>[]
	columnData: {
		items: []
		totalCount: number
		pageNumber: number
		pageSize: number
	}
	addedCols: ReactNode[]
	setPage: Dispatch<React.SetStateAction<number>>
}) => {
	const table = useReactTable({
		columns: tableColumns,
		data: columnData.items ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

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
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => {
							return (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							)
						})}
						{addedCols.map((node) => node)}
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
								{columnData == null ? (
									'Loading...'
								) : (
									<>
										<button
											className='join-item btn'
											disabled={columnData?.pageNumber <= 1 ? true : false}
											onClick={() => setPage((old) => Math.max(old - 1, 1))}>
											«
										</button>
										<button className='join-item btn'>
											Page {columnData?.pageNumber}
										</button>
										<button
											className='join-item btn'
											disabled={
												columnData.pageSize * columnData.pageNumber + 1 >
												columnData.totalCount
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

export default Table
