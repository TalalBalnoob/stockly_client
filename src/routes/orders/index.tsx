import Paper from '@mui/material/Paper'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
	DataGrid,
	type GridColDef,
	type GridRenderCellParams,
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../../services/api/orders'
import { useDeferredValue, useMemo, useState } from 'react'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
	const [search, setSearch] = useState('')

	const query = useQuery({
		queryKey: ['orders'],
		queryFn: getOrders,
	})

	const deferredSearch = useDeferredValue(search)

	const filteredItems = useMemo(() => {
		const data = query.data ?? []
		const term = deferredSearch.trim().toLowerCase()
		if (term === '') return data
		return data.filter(
			(item) =>
				item.customer_Name.toLowerCase().includes(term) ||
				item.customer_Contact.toLowerCase().includes(term),
		)
	}, [query.data, deferredSearch])

	return (
		<>
			<div className='m-4 flex items-center justify-between'>
				<Typography
					className='mr-4'
					variant='h5'>
					Orders
				</Typography>
				<TextField
					variant='outlined'
					label='search'
					size='small'
					className='w-80'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
					}}
				/>

				<Link to='/orders/new'>
					<Button
						variant='contained'
						color='primary'>
						New Order
					</Button>
				</Link>
			</div>
			<Paper sx={{ width: '100%' }}>
				<DataGrid
					rows={filteredItems}
					columns={columns}
					initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
					pageSizeOptions={[5, 10]}
					loading={query.isLoading}
					checkboxSelection
					sx={{ border: 0 }}
				/>
			</Paper>
		</>
	)
}
