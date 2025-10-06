import { createFileRoute, Link } from '@tanstack/react-router'
import { HandCoins, List, ShoppingCart, Truck } from 'lucide-react'
import { PieChart } from '@mui/x-charts/PieChart'
import { useQuery } from '@tanstack/react-query'
import { getHomePageStats } from '../services/api/Home'
import { colors } from '../assets/colors'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { OrderTableColumns } from '../services/tables/orders'

export const Route = createFileRoute('/')({
	component: Index,
})

// const pie_data = [
// 	{ label: 'Group A', value: 400, color: '#0088FE' },
// 	{ label: 'Group B', value: 300, color: '#00C49F' },
// 	{ label: 'Group C', value: 300, color: '#FFBB28' },
// 	{ label: 'Group D', value: 400, color: '#FF8042' },
// ]

const settings = {
	margin: { right: 5 },
	width: 200,
	height: 200,
	hideLegend: true,
}

function Index() {
	const { data } = useQuery({
		queryKey: ['homeStats'],
		queryFn: getHomePageStats,
	})

	const table = useReactTable({
		columns: OrderTableColumns,
		data: data?.latestOrders ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	const pie_data =
		data?.productsStorage.map((item, index) => ({
			label: item.name,
			value: item.quantity,
			color: index < colors.length ? colors[index] : '#ff8c39',
		})) ?? []

	return (
		<div className='flex h-full flex-col justify-between'>
			<h1 className='m-4 mt-8 mb-0 text-4xl'>Welcome</h1>
			<div className='mx-2 mt-0 flex gap-2 p-4'>
				<div className='stat bg-base-100 rounded border border-gray-200/20 shadow'>
					<div className='stat-figure text-primary'>
						<ShoppingCart className='size-14' />
					</div>
					<div className='stat-title text-xl'>Products</div>
					<div className='stat-value text-2xl'>{data?.productsCount}</div>
					<div className='stat-desc'></div>
				</div>
				<div className='stat bg-base-100 rounded border border-gray-200/20 shadow'>
					<div className='stat-figure text-primary'>
						<List className='size-14' />
					</div>
					<div className='stat-title text-xl'>Total Orders</div>
					<div className='stat-value text-2xl'>{data?.ordersCount}</div>
					<div className='stat-desc'></div>
				</div>
				<div className='stat bg-base-100 rounded border border-gray-200/20 shadow'>
					<div className='stat-figure text-primary'>
						<HandCoins className='size-14' />
					</div>
					<div className='stat-title text-xl'>Payment Pending Orders</div>
					<div className='stat-value text-2xl'>{data?.pendingOrdersCount}</div>
					<div className='stat-desc'></div>
				</div>
				<div className='stat bg-base-100 rounded border border-gray-200/20 shadow'>
					<div className='stat-figure text-primary'>
						<Truck className='size-14' />
					</div>
					<div className='stat-title text-xl'>Unshipped Orders</div>
					<div className='stat-value text-2xl'>
						{data?.unShippedOrdersCount}
					</div>
					<div className='stat-desc'></div>
				</div>
			</div>
			<div className='stat mx-8 mt-4 flex w-fit flex-col p-10 shadow'>
				<div className='stat-title text-xl'>Storage Composition</div>
				<div className='stat-value mt-4 text-lg'>
					<PieChart
						series={[
							{
								innerRadius: 50,
								outerRadius: 100,
								highlightScope: { fade: 'global', highlight: 'item' },
								data: pie_data,
								arcLabel: 'value',
							},
						]}
						{...settings}
					/>
				</div>
				<div className='stat-desc'></div>
			</div>
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
		</div>
	)
}
