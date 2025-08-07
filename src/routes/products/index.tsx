import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { deleteProduct, getProducts } from '../../services/api/products'
import { confirm } from '../../components/ConfirmDialog'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()

	const query = useQuery({ queryKey: ['products'], queryFn: getProducts })
	const mutation = useMutation({
		mutationKey: ['deleteProduct'],
		mutationFn: deleteProduct,
	})

	const handleDelete = async (id: number) => {
		const result = await confirm({
			message: 'Are you sure you want to delete this item?',
		})

		if (result) {
			mutation.mutate(id, {
				onSuccess: () => {
					toast.success('Product has been deleted')
					navigate({ to: '/products' })
				},
			})
		}
	}

	return (
		<div className=''>
			<div className='rounded-box border-base-content/5 bg-base-100 overflow-x-auto border'>
				<table className='table'>
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{query.data?.map((product) => (
							<tr>
								<th>{product.id}</th>
								<td>{product.name}</td>
								<td>{product.price}$</td>
								<td>{product.quantity > 0 ? product.quantity : 'Sold out'}</td>
								<td>
									<div className='flex gap-2'>
										<Link
											to={'/products/$productId'}
											params={{ productId: product.id.toString() }}>
											<button className='btn btn-outline btn-secondary'>
												Edit
											</button>
										</Link>
										<button
											onClick={() => handleDelete(product.id)}
											className='btn btn-outline btn-warning'>
											Delete
										</button>
										<Link
											to={'/products/$productId/stock'}
											params={{ productId: product.id.toString() }}>
											<button className='btn btn-outline btn-info'>
												Set Stock
											</button>
										</Link>
									</div>
								</td>
							</tr>
						))}
						{query.isLoading && (
							<tr>
								<td
									colSpan={4}
									className='text-center'>
									Loading...
								</td>
							</tr>
						)}
						{query.isError && (
							<tr>
								<td
									colSpan={4}
									className='text-center text-red-500'>
									{query.error instanceof Error
										? query.error.message
										: 'An error occurred'}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className='mt-4 flex justify-end'>
				<Link to='/products/new'>
					<button className='btn btn-primary'>Add New Product</button>
				</Link>
			</div>
		</div>
	)
}
