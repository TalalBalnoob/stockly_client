import { createFileRoute } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'
import { PieChart } from '@mui/x-charts/PieChart'

export const Route = createFileRoute('/')({
	component: Index,
})

const data = [
	{ label: 'Group A', value: 400, color: '#0088FE' },
	{ label: 'Group B', value: 300, color: '#00C49F' },
	{ label: 'Group C', value: 300, color: '#FFBB28' },
	{ label: 'Group D', value: 400, color: '#FF8042' },
]

const settings = {
	margin: { right: 5 },
	width: 200,
	height: 200,
	hideLegend: true,
}

function Index() {
	return (
		<>
			<div className='stats mx-4 flex gap-4 p-4 shadow'>
				<div className='stat'>
					<div className='stat-figure text-primary'>
						<ShoppingCart className='size-14' />
					</div>
					<div className='stat-title text-xl'>Products</div>
					<div className='stat-value text-2xl'>8</div>
					<div className='stat-desc'></div>
				</div>
				<div className='stat'>
					<div className='stat-figure text-primary'>
						<ShoppingCart className='size-14' />
					</div>
					<div className='stat-title text-xl'>Total Orders</div>
					<div className='stat-value text-2xl'>20</div>
					<div className='stat-desc'></div>
				</div>
				<div className='stat'>
					<div className='stat-figure text-primary'>
						<ShoppingCart className='size-14' />
					</div>
					<div className='stat-title text-xl'>Undelivered Orders</div>
					<div className='stat-value text-2xl'>8</div>
					<div className='stat-desc'></div>
				</div>
				<div className='stat'>
					<div className='stat-figure text-primary'>
						<ShoppingCart className='size-14' />
					</div>
					<div className='stat-title text-xl'>Payment Pending Orders</div>
					<div className='stat-value text-2xl'>8</div>
					<div className='stat-desc'></div>
				</div>
			</div>
			<div className='stat mx-4 mt-4 flex w-fit flex-col p-14 shadow'>
				<div className='stat-title text-xl'>Storage Composition</div>
				<div className='stat-value flex flex-row items-center gap-5 text-lg'>
					<h1>
						<span className='font-normal'>
							total products <br />
							in storage:
						</span>
						43440
					</h1>
					<PieChart
						series={[
							{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' },
						]}
						{...settings}
					/>
				</div>
				<div className='stat-desc'></div>
			</div>
		</>
	)
}
