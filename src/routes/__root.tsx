import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify'

export const Route = createRootRoute({
	component: () => (
		<>
			<div className='flex gap-2 p-2'>
				<Link
					to='/'
					className='[&.active]:font-bold'>
					Home
				</Link>{' '}
				<Link
					to='/about'
					className='[&.active]:font-bold'>
					About
				</Link>
			</div>
			<hr />
			<section className='container mx-auto p-4'>
				<Outlet />
			</section>
			<ToastContainer position='bottom-right' />
			<TanStackRouterDevtools />
		</>
	),
})
