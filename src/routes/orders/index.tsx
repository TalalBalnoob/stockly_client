import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getOrders } from '../../services/api/orders'

export const Route = createFileRoute('/orders/')({
	component: RouteComponent,
})

function RouteComponent() {
	const query = useQuery({ queryKey: ['orders'], queryFn: getOrders })

	return (
		<div className=''>
			<div className='rounded-box border-base-content/5 bg-base-100 overflow-x-auto border'>
				<table className='table'>
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Status</th>
							<th>Price</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{query.data?.map((order) => (
							<tr>
								<th>{order.id}</th>
								<td>{order.customer_Name}</td>
								<td>
									<div className='badge badge-primary'>{order.status}</div>
								</td>
								<td>{order.totel_amount}$</td>
								<td>
									<div className='flex gap-2'>
										<button className='btn btn-outline btn-secondary'>
											Edit
										</button>
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
				<Link to='/orders/new'>
					<button className='btn btn-primary'>Add New Order</button>
				</Link>
			</div>
		</div>
	)
}
