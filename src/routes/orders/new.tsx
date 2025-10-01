import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import {
	paymentMethods,
	statusOptions,
	type OrderItem,
	type PaymentMethods,
	type StatusOptions,
} from '../../types'
import { createOrder } from '../../services/api/orders'
import { CreateOrderValidation } from '../../validation/Orders'
import OrderProducts from '../../components/OrderProducts'

export const Route = createFileRoute('/orders/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()

	const [customerName, setCustomerName] = useState('')
	const [customerContact, setCustomerContact] = useState('')
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('None')
	const [paymentNotes, setPaymentNotes] = useState('')
	const [items, setItems] = useState<OrderItem[]>([])
	const [status, setStatus] = useState<StatusOptions>('payment pending')
	const orderTotal = useMemo(
		() => items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
		[items],
	)

	const createOrderMutat = useMutation({
		mutationKey: ['newOrder'],
		mutationFn: createOrder,
		onSuccess: () => {
			setCustomerName('')
			setCustomerContact('')
			setPaymentMethod('None')
			setPaymentNotes('')
			setItems([])
			// setOrderTotal(0)
			setStatus('payment pending')

			toast.success('New Order Has been Added')
			navigate({ to: '/orders' })
		},
		onError: () => {
			toast.error('something went wrong :(')
		},
	})

	const submitNewOrder = () => {
		// #1 Validate Data
		try {
			CreateOrderValidation.parse({
				id: 0,
				customer_name: customerName,
				customer_contact: customerContact,
				payment_method: paymentMethod,
				payment_notes: paymentNotes,
				status: status,
			})
		} catch {
			toast.error('something went wrong :(')
			return
		}

		// #2 Push
		createOrderMutat.mutate({
			id: 0,
			customer_name: customerName,
			customer_contact: customerContact,
			payment_method: paymentMethod,
			payment_notes: paymentNotes,
			status: status,
			items: items,
			order_total: orderTotal,
		})
	}

	return (
		<div className='menu text-base-content min-h-full w-full p-4'>
			<h1 className='text-2xl'>New Product</h1>
			<div className='flex flex-row gap-4 pt-4'>
				<fieldset className='fieldset rounded-box w-1/2 p-4'>
					<fieldset className='fieldset rounded-box w-full'>
						<legend className='fieldset-legend'>Customer Name</legend>
						<input
							type='text'
							className='input w-full'
							placeholder='Name'
							value={customerName}
							onChange={(e) => setCustomerName(e.target.value)}
						/>
					</fieldset>

					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Customer Contact</legend>
						<input
							type='text'
							className='input w-full'
							placeholder='Name'
							value={customerContact}
							onChange={(e) => setCustomerContact(e.target.value)}
						/>
					</fieldset>

					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Order Status</legend>
						<select
							defaultValue='Pick Order Status'
							className='select'
							onChange={(e) => setStatus(e.target.value as StatusOptions)}
							value={status}>
							<option disabled={true}>Order Status</option>
							{statusOptions.map((state) => (
								<option key={state}>{state}</option>
							))}
						</select>
					</fieldset>

					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Payment Method</legend>
						<select
							defaultValue='Pick Payment Method'
							className='select'
							onChange={(e) =>
								setPaymentMethod(e.target.value as PaymentMethods)
							}
							value={paymentMethod}>
							<option disabled={true}>Payment Methods</option>
							{paymentMethods.map((state) => (
								<option key={state}>{state}</option>
							))}
						</select>
						<span className='label'>Optional</span>
					</fieldset>

					<fieldset className='fieldset rounded-box w-full'>
						<legend className='fieldset-legend'>Payment Note</legend>
						<input
							type='text'
							className='input validator w-full'
							placeholder=''
							value={paymentNotes}
							onChange={(e) => setPaymentNotes(e.target.value)}
						/>
						<span className='label'>Payment number or identifier</span>
					</fieldset>
					<fieldset className='fieldset rounded-box w-full'>
						<legend className='fieldset-legend'>Order Total</legend>
						<input
							type='text'
							disabled
							className='input w-full disabled:text-black/80'
							placeholder=''
							value={orderTotal}
						/>
					</fieldset>

					<button
						className='btn btn-neutral mt-4'
						onClick={submitNewOrder}>
						Save Product
					</button>
					<button
						className='btn btn-error btn-outline mt-4'
						onClick={() => navigate({ to: '/orders' })}>
						Cancel
					</button>
				</fieldset>
				<OrderProducts
					items={items}
					setItems={setItems}
				/>
			</div>
		</div>
	)
}
