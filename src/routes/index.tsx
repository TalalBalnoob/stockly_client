import Button from '@mui/material/Button'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className='p-2'>
			<h3>Welcome Home!</h3>
			<Button
				onClick={() => {
					toast.success('hello world')
				}}
				variant='contained'>
				Hello world
			</Button>
		</div>
	)
}
