import { BarChart } from '@mui/x-charts'
import type { ordersPerMonth } from '../../types'

const SealsChart = ({
	ordersPerMonth,
}: {
	ordersPerMonth: ordersPerMonth[] | undefined
}) => {
	const chartSetting = {
		yAxis: [
			{
				label: 'orders',
				width: 60,
			},
		],
		height: 300,
	}

	return (
		<BarChart
			dataset={ordersPerMonth ?? []}
			xAxis={[{ dataKey: 'month_name' }]}
			series={[{ dataKey: 'orders_count', label: 'Orders' }]}
			loading={ordersPerMonth == null}
			{...chartSetting}
		/>
	)
}

export default SealsChart
