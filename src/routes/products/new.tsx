import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { Product } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '../../services/api/products'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/products/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const [newProduct, setNewProduct] = useState<Product>({
		id: 0,
		name: '',
		description: '',
		isActive: true,
		price: 0,
		quantity: 0,
		imageUrl: '',
	})

	const mutat = useMutation({
		mutationFn: createProduct,
	})

	const createNewProduct = () => {
		mutat.mutate(newProduct, {
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
							value={newProduct.name}
							onChange={(e) => {
								setNewProduct((prev) => {
									return { ...prev, name: e.target.value }
								})
							}}
							label='Product Name'
						/>
						<TextField
							multiline
							rows={4}
							label='Product Description'
							value={newProduct.description}
							onChange={(e) => {
								setNewProduct((prev) => {
									return { ...prev, description: e.target.value }
								})
							}}
						/>
						<div className='flex w-full items-baseline gap-4'>
							<FormControl sx={{ flex: 1 }}>
								<InputLabel htmlFor='outlined-adornment-amount'>
									Price
								</InputLabel>
								<OutlinedInput
									id='outlined-adornment-amount'
									startAdornment={
										<InputAdornment position='start'>$</InputAdornment>
									}
									label='Price'
									value={newProduct.price}
									onChange={(e) => {
										if (Number.isNaN(Number(e.target.value)))
											return newProduct.price
										setNewProduct((prev) => {
											return { ...prev, price: Number(e.target.value) }
										})
									}}
								/>
							</FormControl>
							<TextField
								className='flex-1'
								label='Quantity'
								value={newProduct.quantity}
								onChange={(e) => {
									if (Number.isNaN(Number(e.target.value)))
										return newProduct.quantity
									setNewProduct((prev) => {
										return { ...prev, q: Number(e.target.value) }
									})
								}}
							/>
						</div>
						<FormControlLabel
							control={
								<Checkbox
									value={newProduct.isActive}
									onChange={(e) => {
										setNewProduct((prev) => {
											return { ...prev, isActive: e.target.checked }
										})
									}}
									defaultChecked
								/>
							}
							label='Is Product Available'
						/>
					</div>
					<div className='flex flex-col gap-2 pb-4'>
						<Button
							variant='contained'
							color='success'
							size='large'
							className='mx-4 flex-1'
							onClick={createNewProduct}>
							Save Product
						</Button>
						<Link
							className='mx-4 flex-1'
							to='/products'>
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
