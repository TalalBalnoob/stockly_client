import { createColumnHelper } from '@tanstack/react-table'
import type { Product } from '../../types'
import Currency from 'react-currency-formatter'

const columnHelper = createColumnHelper<Product>()

export const ProductTableColumns = [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: (props) => props.getValue(),
	}),
	columnHelper.accessor('name', {
		header: 'Product Name',
		cell: (props) => props.getValue(),
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: (props) => props.getValue(),
	}),
	columnHelper.accessor('price', {
		header: 'Price',
		cell: (props) => {
			return <Currency quantity={props.getValue()} />
		},
	}),
	columnHelper.accessor('quantity', {
		header: 'Quantity',
		cell: (props) => props.getValue(),
	}),
]
