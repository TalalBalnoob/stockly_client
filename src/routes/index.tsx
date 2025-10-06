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
import {
	OrderTableColumnsForHome,
	ProductsTableColumnsForHome,
} from '../services/tables/home'
import { BarChart } from '@mui/x-charts'

export const Route = createFileRoute('/')({
	component: Index,
})

function valueFormatter(value: number | null) {
	return `${value}`
}

const chartSetting = {
	yAxis: [
		{
			label: 'orders',
			width: 60,
		},
	],
	height: 300,
}

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

	const ordersTable = useReactTable({
		columns: OrderTableColumnsForHome,
		data: data?.latestOrders ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	const productsTable = useReactTable({
		columns: ProductsTableColumnsForHome,
		data: data?.mostSoldProducts ?? [],
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
			<div className='flex justify-between'>
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
				<BarChart
					dataset={data ? data.ordersPerMonth : []}
					xAxis={[{ dataKey: 'month_name' }]}
					series={[
						{ dataKey: 'orders_count', label: 'Orders', valueFormatter },
					]}
					loading={data == null}
					{...chartSetting}
				/>
			</div>
			<div className='mx-4 flex gap-4'>
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
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
			</div>
		</div>
	)
}
