import { atom } from 'jotai'
import type { Order } from '../types'
import { focusAtom } from 'jotai-optics'

const inital: Order = {
	id: 0,
	customer_Name: '',
	customer_Contact: '',
	status: 'approved',
	items: [],
	createdAt: '',
	totel_amount: 0,
}

export const orderAtom = atom<Order>(inital)

export const itemsLitsAtom = focusAtom(orderAtom, (optic) =>
	optic.prop('items'),
)
