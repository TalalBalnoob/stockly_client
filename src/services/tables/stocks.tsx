import { createColumnHelper } from '@tanstack/react-table'
import type { StockChange } from '../../types'

const columnHelper = createColumnHelper<StockChange>()

export const StockTableColumns = [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('productId', {
		header: 'Product Id',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('related_Order_Id', {
		header: 'Order id (optional)',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue() ?? null}</p>
		},
	}),
	columnHelper.accessor('quantity', {
		header: 'change',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
	columnHelper.accessor('reason', {
		header: 'reason',
		cell: (props) => {
			return <p className='text-lg'>{props.getValue()}</p>
		},
	}),
]
