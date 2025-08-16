import { atom } from 'jotai'
import type { Order } from '../types'
import { focusAtom } from 'jotai-optics'

export const initial: Order = {
	id: 0,
	customer_Name: '',
	customer_Contact: '',
	status: 'approved',
	items: [],
	totel_amount: 0,
}

export const orderAtom = atom<Order>(initial)

export const itemsLitsAtom = focusAtom(orderAtom, (optic) =>
	optic.prop('items'),
)
