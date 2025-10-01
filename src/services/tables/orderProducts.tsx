import { createColumnHelper } from '@tanstack/react-table'
import type { Product } from '../../types'
import Currency from 'react-currency-formatter'

const columnHelper = createColumnHelper<Product>()

export const OrderProductsTableColumns = [
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
]
