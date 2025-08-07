import {
	confirmable,
	createConfirmation,
	type ConfirmDialogProps,
} from 'react-confirm'

// eslint-disable-next-line react-refresh/only-export-components
const ConfirmDialog = ({
	show,
	proceed,
	message,
}: ConfirmDialogProps<{ message: string }, boolean>) => (
	<div
		className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${show ? '' : 'hidden'}`}>
		<div className='w-full max-w-sm rounded-lg bg-white p-6 shadow-lg'>
			<p className='mb-4 text-lg font-semibold text-gray-800'>{message}</p>
			<div className='flex justify-end gap-4'>
				<button
					onClick={() => proceed(false)}
					className='btn btn-outline btn-secondary'>
					No
				</button>
				<button
					onClick={() => proceed(true)}
					className='btn btn-primary'>
					Yes
				</button>
			</div>
		</div>
	</div>
)

export const confirm = createConfirmation(confirmable(ConfirmDialog))
