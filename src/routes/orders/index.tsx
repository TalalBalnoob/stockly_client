import Paper from '@mui/material/Paper'
import { createFileRoute } from '@tanstack/react-router'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid'

export const Route = createFileRoute('/orders/')({
	component: RouteComponent,
})

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', flex: 0.5 },
	{ field: 'name', headerName: 'Product Name', flex: 2 },
	{ field: 'description', headerName: 'Description', flex: 2 },
	{ field: 'price', headerName: 'Price', flex: 1 },
	{ field: 'quantity', headerName: 'Quantity', flex: 1 },
	{ field: 'total', headerName: 'Total', flex: 1 },
	{ field: 'status', headerName: 'Status', flex: 1 },
	{ field: 'createdAt', headerName: 'Created At', flex: 1 },
]

// TODO: replace with actual data
const rows: GridRowsProp = [
	{
		id: 1,
		name: 'Data Grid',
		description: 'the Community version',
		price: 100,
		quantity: 1,
		total: 100,
		status: 'pending',
		createdAt: '2021-01-01',
	},
	{
		id: 2,
		name: 'Data Grid Pro',
		description: 'the Pro version',
		price: 200,
		quantity: 2,
		total: 400,
		status: 'pending',
		createdAt: '2021-01-01',
	},
	{
		id: 3,
		name: 'Data Grid Premium',
		description: 'the Premium version',
		price: 300,
		quantity: 3,
		total: 900,
		status: 'pending',
		createdAt: '2021-01-01',
	},
]

function RouteComponent() {
	return (
		<Paper sx={{ height: '100%', width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{ border: 0 }}
			/>
		</Paper>
	)
}
