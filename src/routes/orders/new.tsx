import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { Order } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createOrder } from '../../services/api/orders'

export const Route = createFileRoute('/orders/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const [newOrder, setNewOrder] = useState<Order>({
		id: 0,
		customer_Name: '',
		customer_Contact: '',
		status: 'approved',
		total_amount: 0,
		items: [],
	})

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
					</div>
					<div className='flex flex-col gap-2 pb-4'>
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
