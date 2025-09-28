import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { updateProduct } from '../services/api/products'
import { CreateProductValidation } from '../validation/Product'
import { toast } from 'react-toastify'
import type { Product } from '../types'
import { Pen } from 'lucide-react'

const UpdateProductDrawer = ({ product }: { product: Product }) => {
	const [productName, setProductName] = useState(product.name)
	const [productDescription, setProductDescription] = useState(
		product.description,
	)
	const [storageNote, setStorageNote] = useState(product.storage_Note)
	const [price, setPrice] = useState(product.price)
	const [productQuantity, setProductQuantity] = useState(product.quantity)
	const [isProductActive, setIsProductActive] = useState(product.isActive)

	const updateProductMutat = useMutation({
		mutationKey: ['UpdateProduct'],
		mutationFn: updateProduct,
	})

	const submitNewProduct = () => {
		// #1 Validate Data
		try {
			CreateProductValidation.parse({
				id: product.id,
				name: productName,
				description: productDescription,
				storage_Note: storageNote,
				price,
				quantity: productQuantity,
				isActive: isProductActive,
			})
		} catch (e) {
			toast.error('something went wrong :(')
			return
		}

		// #2 Push
		updateProductMutat.mutate({
			id: product.id,
			name: productName,
			description: productDescription,
			storage_Note: storageNote,
			price,
			quantity: productQuantity,
			isActive: isProductActive,
		})
		// #3 check the state of the operation
		if (updateProductMutat.status !== 'success') {
			toast.error('something went wrong :(')
			return
		}

		// #4.2 clear the form and push a notification
		setProductName('')
		setProductDescription('')
		setPrice(0)
		setProductQuantity(0)
		setStorageNote('')
		setIsProductActive(true)

		toast.success('New Product Has been Added')
	}

	return (
		<div className='drawer'>
			<input
				id='update-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>
			<div className='drawer-content ml-auto'>
				{/* Page content here */}
				<label
					htmlFor='update-drawer'
					className='btn btn-warning btn-sm drawer-button'>
					<Pen />
				</label>
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='update-drawer'
					aria-label='close sidebar'
					className='drawer-overlay'></label>
				<div className='menu bg-base-200 text-base-content min-h-full w-1/4 p-4'>
					<h1 className='text-2xl'>Update Product</h1>
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
								onChange={(e) =>
									setProductDescription(e.target.value)
								}></textarea>
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
							Save Changes
						</button>
						{/* <button className='btn btn-error btn-outline mt-4'></button> */}
					</fieldset>
				</div>
			</div>
		</div>
	)
}

export default UpdateProductDrawer
