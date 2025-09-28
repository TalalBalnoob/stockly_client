import { createFileRoute } from '@tanstack/react-router'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ProductTableColumns } from '../../services/tables/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteProduct, getProducts } from '../../services/api/products'
import NewProductDrawer from '../../components/NewProductDrawer'
import { useState } from 'react'
import { confirm } from '../../components/ConfirmDialog'
import { toast } from 'react-toastify'
import { Trash } from 'lucide-react'
import UpdateProductDrawer from '../../components/UpdateProductDrawer'
import type { Product } from '../../types'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [page, setPage] = useState(1)

	const { data, refetch } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
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
		data: data ?? [],
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
						className='input input-md ml-auto'
					/>
				</div>

				<NewProductDrawer />
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
								<td>
									<span className='flex gap-1'>
										<UpdateProductDrawer
											product={
												data?.find(
													(p) =>
														p.id ===
														(row
															.getVisibleCells()
															.find((p) => p.column.id == 'id')
															?.getValue() as number),
												) as Product
											}
										/>
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
									<h1>Table footer</h1>
									<div className='join mr-20'>
										<button className='join-item btn'>«</button>
										<button className='join-item btn'>Page 1</button>
										<button className='join-item btn'>»</button>
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
