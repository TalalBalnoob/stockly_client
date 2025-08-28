import Paper from '@mui/material/Paper'
import { createFileRoute } from '@tanstack/react-router'
import {
	DataGrid,
	type GridColDef,
	type GridRenderCellParams,
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../../services/api/orders'
import { useEffect, useState } from 'react'
import type { Order } from '../../types'
import Chip from '@mui/material/Chip'

export const Route = createFileRoute('/orders/')({
	component: RouteComponent,
})

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', flex: 0.5 },
	{ field: 'customer_Name', headerName: 'Customer Name', flex: 1 },
	{ field: 'customer_Contact', headerName: 'Customer Contact', flex: 1 },
	{ field: 'total_amount', headerName: 'Total Amount', flex: 1 },
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		renderCell: (params: GridRenderCellParams) => {
			if (params.value == null) {
				return ''
			}
			return (
				<Chip
					label={params.value}
					color='primary'
				/>
			)
		},
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		flex: 1,
	},
]

function RouteComponent() {
	const [items, setItems] = useState<Order[]>([])

	const query = useQuery({
		queryKey: ['orders'],
		queryFn: getOrders,
	})

	useEffect(() => {
		if (query.data && query.isSuccess) {
			setItems(query.data)
		}
	}, [query.data, query.isSuccess])

	if (query.isLoading) return <div>Loading...</div>

	return (
		<Paper sx={{ height: '100%', width: '100%' }}>
			<DataGrid
				rows={items}
				columns={columns}
				initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{ border: 0 }}
			/>
		</Paper>
	)
}
