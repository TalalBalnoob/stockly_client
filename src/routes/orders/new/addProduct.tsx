import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getProducts } from '../../../services/api/products'
import { useAtom } from 'jotai'
import { itemsLitsAtom } from '../../../atoms/orderAtom'
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { useDeferredValue, useMemo, useState } from 'react'

export const Route = createFileRoute('/orders/new/addProduct')({
	component: RouteComponent,
})

function RouteComponent() {
	const [itemList, setItemList] = useAtom(itemsLitsAtom)
	const [search, setSearch] = useState('')

	const { data } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	})

	const deferredSearch = useDeferredValue(search)

	const filteredItems = useMemo(() => {
		const list = data ?? []
		const term = deferredSearch.trim().toLowerCase()
		if (term === '') return list
		return list.filter(
			(item) =>
				item.name.toLowerCase().includes(term) ||
				item.description.toLowerCase().includes(term),
		)
	}, [data, deferredSearch])

	const total = useMemo(() => {
		let price = 0
		itemList.forEach((item) => {
			price += item.unitPrice * item.quantity
		})
		return price
	}, [itemList])

	return (
		<>
			<div className='m-4 flex items-center justify-between'>
				<Typography
					className='mr-4'
					variant='h5'>
					Products
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
				<div>
					<Typography className='flex items-baseline justify-center gap-4'>
						{itemList.length} Selected : Total Price {total}${' '}
						<Link to='/orders/new'>
							<Button variant='contained'>Done</Button>
						</Link>
					</Typography>
				</div>
			</div>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell align='right'>Product Name</TableCell>
							<TableCell align='right'>Description</TableCell>
							<TableCell align='right'>price</TableCell>
							<TableCell align='right'>quantity</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredItems.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell>{row.id}</TableCell>
								<TableCell align='right'>{row.name}</TableCell>
								<TableCell align='right'>{row.description}</TableCell>
								<TableCell align='right'>{row.price}</TableCell>
								<TableCell align='right'>{row.quantity}</TableCell>
								<TableCell align='right'>
									<div className='flex justify-center'>
										{itemList.find((item) => item.productId === row.id) ? (
											<>
												<Button
													onClick={() => {
														setItemList((prev) => {
															const productQuantity = prev.find(
																(item) => item.productId === row.id,
															)?.quantity
															if (productQuantity === 1) {
																return prev.filter(
																	(item) => item.productId !== row.id,
																)
															}

															return prev.map((item) => {
																if (item.productId === row.id) {
																	return {
																		...item,
																		quantity: item.quantity - 1,
																	}
																}
																return item
															})
														})
													}}>
													down
												</Button>
												<Typography className='flex items-center justify-center'>
													{
														itemList.find((item) => item.productId === row.id)
															?.quantity
													}
												</Typography>
												<Button
													onClick={() => {
														setItemList((prev) => {
															if (row.quantity === 1) return prev

															return prev.map((item) => {
																if (item.productId === row.id) {
																	return {
																		...item,
																		quantity: item.quantity + 1,
																	}
																}
																return item
															})
														})
													}}>
													up
												</Button>
											</>
										) : (
											<Button
												variant='contained'
												onClick={() =>
													setItemList((prev) => [
														...prev,
														{
															id: 0, // Generate a unique ID
															productId: row.id,
															unitPrice: row.price,
															quantity: 1,
														},
													])
												}>
												Add
											</Button>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
