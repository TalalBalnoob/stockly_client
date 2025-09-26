import { createColumnHelper } from '@tanstack/react-table'
import type { Product } from '../../types'
import Currency from 'react-currency-formatter'
import { Pen, Trash } from 'lucide-react'

const columnHelper = createColumnHelper<Product>()

export const ProductTableColumns = [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('name', {
		header: 'Product Name',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('price', {
		header: 'Price',
		cell: (props) => {
			return (
				<p className='text-lg'>
					<Currency quantity={props.getValue()} />
				</p>
			)
		},
	}),
	columnHelper.accessor('quantity', {
		header: 'Quantity',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('id', {
		header: 'Actions',
		id: 'action',
		cell: (props) => {
			return (
				<span className='flex gap-1'>
					<button
						className='btn btn-sm bg-yellow-400'
						onClick={() => console.log(props.getValue())}>
						<Pen />
						{/* Edit */}
					</button>
					<button
						className='btn btn-sm bg-red-500/80'
						onClick={() => console.log(props.getValue())}>
						<Trash />
						{/* Delete */}
					</button>
				</span>
			)
		},
	}),
]
