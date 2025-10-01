import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { CreateOrderValidation } from '../../../validation/Orders'
import { getOrder, updateOrder } from '../../../services/api/orders'
import {
	paymentMethods,
	statusOptions,
	type OrderItem,
	type PaymentMethods,
	type StatusOptions,
} from '../../../types'
import OrderProducts from '../../../components/OrderProducts'

export const Route = createFileRoute('/orders/update/$id')({
	component: RouteComponent,
})

function RouteComponent() {
	const { id } = useParams({ from: '/orders/update/$id' })

	const { data, isSuccess, status } = useQuery({
		queryKey: ['getProduct'],
		queryFn: () => getOrder(Number(id)),
	})
	const navigate = useNavigate()

	const [orderId, setOrderId] = useState(0)
	const [customerName, setCustomerName] = useState('')
	const [customerContact, setCustomerContact] = useState('')
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('None')
	const [paymentNotes, setPaymentNotes] = useState('')
	const [items, setItems] = useState<OrderItem[]>([])
	const [orderStatus, setOrderStatus] =
		useState<StatusOptions>('payment pending')

	const orderTotal = useMemo(
		() => items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
		[items],
	)

	useEffect(() => {
		if (data || isSuccess) {
			setOrderId(data.id)
			setCustomerName(data.customer_name)
			setCustomerContact(data.customer_contact)
			setPaymentMethod(data.payment_method)
			setPaymentNotes(data.payment_notes)
			setOrderStatus(data.status)
			setItems(data.items)
		}
	}, [data, isSuccess, status])

	const updateOrderMutat = useMutation({
		mutationKey: ['updateOrder'],
		mutationFn: updateOrder,
		onSuccess: () => {
			setCustomerName('')
			setCustomerContact('')
			setPaymentMethod('None')
			setPaymentNotes('')
			setOrderStatus('payment pending')
			setItems([])

			toast.success('Order Has been updated')
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
				id: orderId,
				customer_name: customerName,
				customer_contact: customerContact,
				payment_method: paymentMethod,
				payment_notes: paymentNotes,
				status: orderStatus,
			})
		} catch (e) {
			console.error(e)
			console.log(paymentMethod)
			toast.error('something went wrong :(')
			return
		}

		// #2 Push
		updateOrderMutat.mutate({
			id: orderId,
			customer_name: customerName,
			customer_contact: customerContact,
			payment_method: paymentMethod,
			payment_notes: paymentNotes,
			status: orderStatus,
			items: items,
			order_total: 0,
		})
	}

	return (
		<div className='menu text-base-content min-h-full w-full p-4'>
			<h1 className='text-2xl'>Update Order</h1>
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
							onChange={(e) => setOrderStatus(e.target.value as StatusOptions)}
							value={orderStatus}>
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
