import { createFileRoute } from '@tanstack/react-router'
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
				<div className='flex w-full justify-between'>
					<h1 className='mr-4 text-2xl'>Products</h1>

					<input
						type='text'
						placeholder='Search'
						className='input input-md ml-auto'
					/>
				</div>

				<div className='drawer'>
					<input
						id='my-drawer'
						type='checkbox'
						className='drawer-toggle'
					/>
					<div className='drawer-content ml-auto'>
						{/* Page content here */}
						<label
							htmlFor='my-drawer'
							className='btn btn-primary drawer-button'>
							Open drawer
						</label>
					</div>
					<div className='drawer-side'>
						<label
							htmlFor='my-drawer'
							aria-label='close sidebar'
							className='drawer-overlay'></label>
						<div className='menu bg-base-200 text-base-content min-h-full w-1/4 p-4'>
							<h1 className='text-2xl'>New Product</h1>
							<fieldset className='fieldset rounded-box w-full p-4'>
								<fieldset className='fieldset rounded-box w-full'>
									<legend className='fieldset-legend'>Product Name</legend>
									<input
										type='text'
										className='input w-full'
										placeholder='Name'
									/>
								</fieldset>

								<fieldset className='fieldset'>
									<legend className='fieldset-legend'>
										Product Description
									</legend>
									<textarea
										className='textarea h-24 w-full'
										placeholder='Description'></textarea>
									<div className='label'>Optional</div>
								</fieldset>

								<fieldset className='fieldset'>
									<legend className='fieldset-legend'>
										Product Storage Note
									</legend>
									<textarea
										className='textarea h-24 w-full'
										placeholder='Description'></textarea>
									<div className='label'>
										Optional note for how or where the product is stored
									</div>
								</fieldset>

								<fieldset className='fieldset rounded-box w-full'>
									<legend className='fieldset-legend'>Product Quantity</legend>
									<input
										type='number'
										className='input validator w-full'
										required
										placeholder=''
										min='0'
									/>
								</fieldset>

								<fieldset className='fieldset rounded-box w-full'>
									<legend className='fieldset-legend'>Product Price</legend>
									<input
										type='number'
										className='input validator w-full'
										required
										placeholder=''
										min='0'
										step='.01'
										id='noArrow'
									/>
								</fieldset>

								<fieldset className='fieldset rounded-box w-full pt-4'>
									<label className='label'>
										<input
											type='checkbox'
											defaultChecked
											className='checkbox'
										/>
										Is Product Active for sales
									</label>
								</fieldset>

								<button className='btn btn-neutral mt-4'>Save Product</button>
								<button className='btn btn-error btn-outline mt-4'>
									Clear
								</button>
							</fieldset>
						</div>
					</div>
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
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
