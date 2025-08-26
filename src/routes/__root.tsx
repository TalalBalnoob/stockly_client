import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify'
import NavigationSideBar from '../components/NavigationSideBar'

export const Route = createRootRoute({
	component: () => (
		<>
			<div className='flex h-screen w-screen'>
				<NavigationSideBar />
				<section className='mx-auto w-5/6 bg-gray-100'>
					<Outlet />
				</section>
			</div>
			<ToastContainer position='bottom-right' />
			<TanStackRouterDevtools />
		</>
	),
})
