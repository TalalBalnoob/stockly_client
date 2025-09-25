import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className='p-2'>
			<h3>Welcome Home!</h3>
			<button
				className='btn btn-primary'
				onClick={() => {
					toast.success('hello world')
				}}>
				Hello world
			</button>
		</div>
	)
}
