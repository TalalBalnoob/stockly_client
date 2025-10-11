import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ProductTableColumns } from '../../services/tables/products'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { deleteProduct, getProducts } from '../../services/api/products'
import { confirm } from '../../components/ConfirmDialog'
import { toast } from 'react-toastify'

import { Pen, Trash } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const [page, setPage] = useState(1)

	const { data, refetch } = useQuery({
		queryKey: ['products', page],
		queryFn: () => getProducts(page),
		placeholderData: keepPreviousData,
	})

	const deleteProductMutat = useMutation({
		mutationKey: ['deleteProduct'],
		mutationFn: deleteProduct,
		onSuccess: () => {
			toast.success('Product has been deleted')
			refetch()
		},
		onError: () => {
			toast.error('Something went wrong!!!')
		},
	})

	const table = useReactTable({
		columns: ProductTableColumns,
		data: data?.items ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	const deleteProductSubmit = async (id: number) => {
		const isConfirm = await confirm({
			message: 'Are you sure you want to delete this product',
		})

		if (!isConfirm) return

		deleteProductMutat.mutate(id)
	}

	return (
		<>
			<div className='m-4 flex items-center justify-between'>
				<div className='flex w-full justify-between'>
					<h1 className='mr-4 text-2xl'>Products</h1>

					<input
						type='text'
						placeholder='Search'
						className='input input-md'
					/>

					<Link to='/products/new'>
						<button className='btn btn-primary'>Create new</button>
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
							<tr
								key={row.id}
								className={`${data?.items.find((p) => p.id == row.getValue('id'))?.isActive ? '' : 'bg-neutral/10 line-through'}`}>
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
								<td>
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
											{/* Delete */}
										</button>
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
