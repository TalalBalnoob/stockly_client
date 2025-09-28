import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { CreateProductValidation } from '../../validation/Product'
import { createProduct } from '../../services/api/products'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export const Route = createFileRoute('/products/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()

	const [productName, setProductName] = useState('')
	const [productDescription, setProductDescription] = useState('')
	const [storageNote, setStorageNote] = useState('')
	const [price, setPrice] = useState(0)
	const [productQuantity, setProductQuantity] = useState(0)
	const [isProductActive, setIsProductActive] = useState(true)

	const createProductMutat = useMutation({
		mutationKey: ['newProduct'],
		mutationFn: createProduct,
		onSuccess: () => {
			setProductName('')
			setProductDescription('')
			setPrice(0)
			setProductQuantity(0)
			setStorageNote('')
			setIsProductActive(true)

			toast.success('New Product Has been Added')
			navigate({ to: '/products' })
		},
		onError: () => {
			toast.error('something went wrong :(')
		},
	})

	const submitNewProduct = () => {
		// #1 Validate Data
		try {
			CreateProductValidation.parse({
				id: 0,
				name: productName,
				description: productDescription,
				storage_Note: storageNote,
				price,
				quantity: productQuantity,
				isActive: isProductActive,
			})
		} catch {
			toast.error('something went wrong :(')
			return
		}

		// #2 Push
		createProductMutat.mutate({
			id: 0,
			name: productName,
			description: productDescription,
			storage_Note: storageNote,
			price,
			quantity: productQuantity,
			isActive: isProductActive,
		})
	}

	return (
		<div className='menu text-base-content min-h-full w-1/2 p-4'>
			<h1 className='text-2xl'>New Product</h1>
			<fieldset className='fieldset rounded-box w-full p-4'>
				<fieldset className='fieldset rounded-box w-full'>
					<legend className='fieldset-legend'>Product Name</legend>
					<input
						type='text'
						className='input w-full'
						placeholder='Name'
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>
				</fieldset>

				<fieldset className='fieldset'>
					<legend className='fieldset-legend'>Product Description</legend>
					<textarea
						className='textarea h-24 w-full'
						placeholder='Description'
						defaultValue={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}></textarea>
					<div className='label'>Optional</div>
				</fieldset>

				<fieldset className='fieldset'>
					<legend className='fieldset-legend'>Product Storage Note</legend>
					<textarea
						className='textarea h-24 w-full'
						placeholder='Description'
						defaultValue={storageNote}
						onChange={(e) => setStorageNote(e.target.value)}></textarea>
					<div className='label'>
						Optional note for how or where the product is stored
					</div>
				</fieldset>

				<fieldset className='fieldset rounded-box w-full'>
					<legend className='fieldset-legend'>Product Quantity</legend>
					<input
						type='number'
						className='input validator w-full'
						required
						placeholder=''
						min='0'
						value={productQuantity}
						onChange={(e) => setProductQuantity(Number(e.target.value))}
					/>
				</fieldset>

				<fieldset className='fieldset rounded-box w-full'>
					<legend className='fieldset-legend'>Product Price</legend>
					<input
						type='number'
						className='input validator w-full'
						required
						placeholder=''
						min='0'
						step='.01'
						id='noArrow'
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
					/>
				</fieldset>

				<fieldset className='fieldset rounded-box w-full pt-4'>
					<label className='label'>
						<input
							type='checkbox'
							className='checkbox'
							checked={isProductActive}
							onChange={(e) => setIsProductActive(e.target.checked)}
						/>
						Is Product Active for sales
					</label>
				</fieldset>

				<button
					className='btn btn-neutral mt-4'
					onClick={submitNewProduct}>
					Save Product
				</button>
				<button
					className='btn btn-error btn-outline mt-4'
					onClick={() => navigate({ to: '/products' })}>
					Cancel
				</button>
			</fieldset>
		</div>
	)
}
