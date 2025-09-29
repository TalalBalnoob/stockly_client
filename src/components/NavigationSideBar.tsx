import { Files, Home, ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const NavigationSideBar = () => {
	return (
		<nav className='flex w-1/6 flex-col bg-gray-900 px-4 text-white'>
			<h1 className='m-4 text-4xl'>Stockly</h1>
			<div className='mt-10 flex flex-col items-start gap-3'>
				<Link
					className='w-full'
					to='/'>
					<Item
						text='Home'
						icon={<Home />}
					/>
				</Link>
				<Link
					className='w-full'
					to='/products'>
					<Item
						text='Products'
						icon={<ShoppingCart />}
					/>
				</Link>
				<Link
					className='w-full'
					to='/orders'>
					<Item
						text='Orders'
						icon={<Files />}
					/>
				</Link>
			</div>
		</nav>
	)
}

const Item = ({ icon, text }: { icon: ReactNode; text: string }) => {
	return (
		<div className='flex w-full cursor-pointer items-center gap-2 rounded p-4 text-start text-white hover:bg-gray-100/5'>
			{icon} {text}
		</div>
	)
}

export default NavigationSideBar
