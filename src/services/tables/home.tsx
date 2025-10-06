import { createColumnHelper } from '@tanstack/react-table'
import type { mostSoldProductItem, Order } from '../../types'
import Currency from 'react-currency-formatter'

const columnOrdersHelper = createColumnHelper<Order>()

export const OrderTableColumnsForHome = [
	columnOrdersHelper.accessor('id', {
		header: 'ID',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnOrdersHelper.accessor('customer_name', {
		header: 'Customer name',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnOrdersHelper.accessor('payment_method', {
		header: 'Payment',
		cell: (props) => {
			return <p className='badge badge-primary'>{props.getValue()}</p>
		},
	}),
	columnOrdersHelper.accessor('status', {
		header: 'status',
		cell: (props) => {
			return <p className='badge badge-primary'>{props.getValue()}</p>
		},
	}),
	columnOrdersHelper.accessor('order_total', {
		header: 'Total amount',
		cell: (props) => {
			return (
				<p className='text-lg'>
					<Currency quantity={props.getValue()} />
				</p>
			)
		},
	}),
]

const columnProductsHelper = createColumnHelper<mostSoldProductItem>()

export const ProductsTableColumnsForHome = [
	columnProductsHelper.accessor('product_id', {
		header: 'ID',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnProductsHelper.accessor('product_name', {
		header: 'Name',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnProductsHelper.accessor('totalSold', {
		header: 'Total',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
]
