import { PieChart } from '@mui/x-charts'
import { colors } from '../../assets/colors'
import type { ProductsStorage } from '../../types'

const StoragePieChart = ({
	productsStorage,
}: {
	productsStorage: ProductsStorage[] | undefined
}) => {
	const settings = {
		margin: { right: 5 },
		width: 200,
		height: 200,
		hideLegend: true,
	}

	const pie_data =
		productsStorage?.map((item, index) => ({
			label: item.name,
			value: item.quantity,
			color: index < colors.length ? colors[index] : '#ff8c39',
		})) ?? []

	return (
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
	)
}

export default StoragePieChart
