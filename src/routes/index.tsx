import { createFileRoute } from '@tanstack/react-router'
import { HandCoins, List, ShoppingCart, Truck } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getHomePageStats } from '../services/api/Home'
import StoragePieChart from '../components/home/StoargePieChart'
import SealsChart from '../components/home/SealsChart'
import OrderTable from '../components/home/OrderTable'
import ProductTable from '../components/home/ProductTable'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	const { data } = useQuery({
		queryKey: ['homeStats'],
		queryFn: getHomePageStats,
	})

	return (
		<div className='flex h-full flex-col justify-between'>
			<h1 className='m-4 mt-8 mb-0 text-4xl'>Welcome</h1>
			<div className='mx-2 mt-0 flex gap-2 p-4'>
				<State
					text='Products'
					value={data?.productsCount}
					icon={<ShoppingCart className='size-14' />}
				/>
				<State
					text='Total Orders'
					value={data?.ordersCount}
					icon={<List className='size-14' />}
				/>
				<State
					text='Payment Pending Orders'
					value={data?.pendingOrdersCount}
					icon={<HandCoins className='size-14' />}
				/>
				<State
					text='Unshipped Orders'
					value={data?.unShippedOrdersCount}
					icon={<Truck className='size-14' />}
				/>
			</div>
			<div className='flex justify-between'>
				<StoragePieChart productsStorage={data?.productsStorage} />
				<SealsChart ordersPerMonth={data?.ordersPerMonth} />
			</div>
			<div className='mx-4 flex gap-4'>
				<OrderTable latestOrders={data?.latestOrders} />
				<ProductTable mostSoldProducts={data?.mostSoldProducts} />
			</div>
		</div>
	)
}

const State = ({
	text,
	value,
	icon,
}: {
	text: string
	icon: ReactNode
	value: number | string | undefined
}) => {
	return (
		<div className='stat bg-base-100 rounded border border-gray-200/20 shadow'>
			<div className='stat-figure text-primary'>{icon}</div>
			<div className='stat-title text-xl'>{text}</div>
			<div className='stat-value text-2xl'>{value}</div>
			<div className='stat-desc'></div>
		</div>
	)
}
