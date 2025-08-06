import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getProducts } from '../../services/api/products'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

function RouteComponent() {
	const query = useQuery({ queryKey: ['products'], queryFn: getProducts })

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
									<Link
										to={'/products/$productId'}
										params={{ productId: product.id.toString() }}>
										<button className='btn btn-outline btn-secondary'>
											Edit
										</button>
									</Link>
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
