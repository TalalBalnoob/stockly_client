import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getProducts } from '../../services/api/products'

export const Route = createFileRoute('/products/')({
	component: RouteComponent,
})

function RouteComponent() {
	const query = useQuery({ queryKey: ['products'], queryFn: getProducts })

	if (query.isError)
		return (
			<div>
				<h1>{query.error.message}</h1>
			</div>
		)

	return (
		<div>
			{query.data?.map((product) => (
				<h1>{product.name}</h1>
			))}
		</div>
	)
}
