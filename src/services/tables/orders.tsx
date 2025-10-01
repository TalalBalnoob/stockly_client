import { createColumnHelper } from '@tanstack/react-table'
import type { Order } from '../../types'
import Currency from 'react-currency-formatter'

const columnHelper = createColumnHelper<Order>()

export const OrderTableColumns = [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('customer_name', {
		header: 'Customer name',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('customer_contact', {
		header: 'Customer contact',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('payment_method', {
		header: 'Payment',
		cell: (props) => {
			return <p className='badge badge-primary'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('status', {
		header: 'status',
		cell: (props) => {
			return <p className='badge badge-primary'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('order_total', {
		header: 'Total amount',
		cell: (props) => {
			return (
				<p className='text-lg'>
					<Currency quantity={props.getValue()} />
				</p>
			)
		},
	}),
	columnHelper.accessor('items', {
		header: 'Items',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue().length}</p>
		},
	}),
	// columnHelper.accessor('id', {
	// 	header: 'Actions',
	// 	id: 'action',
	// 	cell: (props) => {
	// 		return (
	// 			<span className='flex gap-1'>
	// 				<button
	// 					className='btn btn-sm bg-yellow-400'
	// 					onClick={() => console.log(props.getValue())}>
	// 					<Pen />
	// 					{/* Edit */}
	// 				</button>
	// 				<button
	// 					className='btn btn-sm bg-red-500/80'
	// 					onClick={() => console.log()}>
	// 					<Trash />
	// 					{/* Delete */}
	// 				</button>
	// 			</span>
	// 		)
	// 	},
	// }),
]
