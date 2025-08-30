import Paper from '@mui/material/Paper'
import { createFileRoute, Link } from '@tanstack/react-router'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useDeferredValue, useMemo, useState } from 'react'
import { getProducts } from '../../services/api/products'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', flex: 0.5 },
	{ field: 'name', headerName: 'Product Name', flex: 1 },
	{ field: 'description', headerName: 'Description', flex: 1 },
	{ field: 'price', headerName: 'Price', flex: 1 },
	{ field: 'quantity', headerName: 'Quantity', flex: 1 },
	{ field: 'isActive', headerName: 'Status', flex: 1 },
]

function RouteComponent() {
	const [search, setSearch] = useState('')

	const query = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	})

	const deferredSearch = useDeferredValue(search)

	/*
	 TODO: make search per word
	 search: red candle 
	 make array of words then search using first word then search in results using second word 
	 or get two array for each word and combine them together 
	*/
	const filteredItems = useMemo(() => {
		const data = query.data ?? []
		const term = deferredSearch.trim().toLowerCase()
		if (term === '') return data
		return data.filter(
			(item) =>
				item.name.toLowerCase().includes(term) ||
				item.description.toLowerCase().includes(term),
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

				<Link to='/products/new'>
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
