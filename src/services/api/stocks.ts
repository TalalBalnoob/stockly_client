import type { StockPage } from '../../types'
import api from '../axios'

export const getStocks = async (pageNumber: number = 1, search: string) => {
	const res = await api.get<StockPage>(
		`/stock?pageNumber=${pageNumber}${search != '' ? `&search=${search}` : ``}`,
	)
	if (res.status == 404) throw new Error('Stock not found')
	else if (res.status != 200) throw new Error('Something went wrong')

	return res.data
}
