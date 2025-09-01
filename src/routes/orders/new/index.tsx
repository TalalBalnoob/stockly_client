import {
	Button,
	Container,
	Divider,
	FormControl,
	InputLabel,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { itemsLitsAtom, orderAtom } from '../../../atoms/orderAtom'
import { createOrder } from '../../../services/api/orders'
import { statusOptions, type Order, type OrderItem } from '../../../types'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useAtom } from 'jotai'

export const Route = createFileRoute('/orders/new/')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const [newOrder, setNewOrder] = useAtom<Order>(orderAtom)
	const [orderItems] = useAtom<OrderItem[]>(itemsLitsAtom)

	// useEffect(() => {
	// 	setNewOrder((prev) => {
	// 		return {
	// 			...prev,
	// 			total_amount: prev.items.reduce(
	// 				(acc, item) => acc + item.unitPrice * item.quantity,
	// 				0,
	// 			),
	// 		}
	// 	})
	// }, [newOrder.items])

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', flex: 0.5 },
		{ field: 'productId', headerName: 'Product Id', flex: 1 },
		{ field: 'unitPrice', headerName: 'Price', flex: 1 },
		{ field: 'quantity', headerName: 'Quantity', flex: 1 },
	]

	const mutat = useMutation({
		mutationFn: createOrder,
	})

	const createNewOrder = () => {
		mutat.mutate(newOrder, {
			onSuccess: () => {
				toast.success('New Product Has Been added')
				navigate({ to: '/products' })
			},
			onError: () => {
				toast.error('Something went wrong!!!')
				navigate({ to: '.' })
			},
		})
	}

	return (
		<>
			<Container className='mt-10'>
				<Paper className='rounded'>
					<Typography
						variant='h4'
						className='mx-4 pt-4'>
						Create Product
					</Typography>
					<Divider variant='middle' />
					<div className='m-4 flex flex-col gap-4'>
						<TextField
							value={newOrder.customer_Name}
							onChange={(e) => {
								setNewOrder((prev) => {
									return { ...prev, customer_Name: e.target.value }
								})
							}}
							label='Customer Name'
						/>
						<TextField
							label='Customer Contact'
							value={newOrder.customer_Contact}
							onChange={(e) => {
								setNewOrder((prev) => {
									return { ...prev, customer_Contact: e.target.value }
								})
							}}
						/>
						<FormControl>
							<InputLabel id='demo-simple-select-label'>Status</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={newOrder.status}
								label='status'
								onChange={(e) => {
									setNewOrder((prev) => {
										return { ...prev, status: e.target.value }
									})
								}}>
								{statusOptions.map((state) => (
									<MenuItem value={state}>{state}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<Paper
						elevation={2}
						className='m-4'>
						<DataGrid
							rows={orderItems}
							columns={columns}
							hideFooter
							checkboxSelection
							sx={{ border: 0 }}
						/>
						<div className='flex w-full justify-end p-4'>
							<Button
								variant='contained'
								color='primary'
								size='medium'>
								Add Product
							</Button>
						</div>
					</Paper>
					<div className='flex flex-col gap-2 pt-8 pb-4'>
						<Button
							variant='contained'
							color='success'
							size='large'
							className='mx-4 flex-1'
							onClick={createNewOrder}>
							Save Order
						</Button>
						<Link
							className='mx-4 flex-1'
							to='/orders'>
							<Button
								variant='outlined'
								color='error'
								size='large'
								className='w-full'>
								Cancel
							</Button>
						</Link>
					</div>
				</Paper>
			</Container>
		</>
	)
}
