// Importing necessary components and functions from external libraries and files.

import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import FormContainer from '../../components/formContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import React from 'react'
import {toast} from "react-toastify"
import { useGetProductDetailsQuery } from '../../slices/productApiSlice'
import { useUpdateProductMutation } from '../../slices/productApiSlice'
import { useUploadProductImageMutation } from '../../slices/productApiSlice'

const ProductEditScreen = () => {
    // Extracting 'id' parameter from URL using 'useParams' hook.
    const { id: productId } = useParams();

    // Setting up state variables for different form fields.
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("")
    const [description, setDescription] = useState("")

    // Fetching product details based on 'productId'.
    const { data: product, isLoading, error} = useGetProductDetailsQuery(productId)

    // Mutation for updating product details.
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    // Mutation for uploading product image.
    const [uploadProductImage, {isLoading:loadingUpload}]=useUploadProductImageMutation();

    // Function to navigate to a different page.
    const navigate = useNavigate();

    // useEffect to populate form fields when product data is available.
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description)
        }
    }, [product])

    // Function to handle form submission.
    const submitHandler = async (e) => {
        e.preventDefault();

        // Creating an object with updated product details.
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }

        // Calling the 'updateProduct' mutation function.
        const result = await updateProduct(updatedProduct);

        // Handling the response from the mutation.
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Product updated")
            navigate("/admin/productlist")
        }
    }

   // Function to handle file upload.
const uploadFileHandler = async (e) => {
    // Creating a new FormData object to handle file uploads.
    const formData = new FormData();

    // Appending the selected file to the FormData object with the key "image".
    formData.append("image", e.target.files[0])

    try {
        // Making an asynchronous call to upload the product image using 'uploadProductImage' mutation function.
        const res = await uploadProductImage(formData).unwrap();
        
        // If the upload is successful, display a success message.
        toast.success(res.message);
        
        // Set the uploaded image URL in the component state.
        setImage(res.image)
    } catch (error) {
        // If there is an error during the upload, display an error message.
        // Check if there is a specific error message in the response data, otherwise display a generic error message.
        toast.error(error?.data?.message || error.error);
    }
}


    // Rendering the component.
    return (
        <>
            {/* Link to go back to the product list page. */}
            <Link to="/admin/productlist" className='btn btn-light my-3'>
                Go Back
            </Link>
            {/* Container for the form. */}
            <FormContainer>
                <h1>Edit Product</h1>
                {/* Displaying a loader while updating the product. */}
                {loadingUpdate && <Loader />}
                {/* Displaying loader or error message while fetching product data. */}
                {isLoading ? <Loader /> : error ? (
                    <Message variant="danger">{error.data.message}</Message>
                ) : (
                    // Rendering the product edit form.
                    <Form onSubmit={submitHandler}>
                        {/* Form fields for editing product details. */}
                        {/* Each field has a label, input, and onChange handler. */}
                        {/* The value of each input is controlled by state variables. */}
                        <FormGroup controlId='name' className='my-2'>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='price' className='my-2'>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type="number"
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='image' className='my-2'>
                            <FormLabel>Image</FormLabel>
                            <FormControl
                                type="text"
                                placeholder='Enter image url'
                                value={image}
                     onChange={(e) => setImage(e.target.value)}>
                            </FormControl>

                            <FormControl
                                type='file' label="Choose file"
                                onChange={uploadFileHandler}>
                            </FormControl>
                        </FormGroup>
                        {loadingUpload && <Loader/>}
                        <FormGroup controlId='brand' className='my-2'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type="text"
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='category' className='my-2'>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                type="text"
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='countInStock' className='my-2'>
                            <FormLabel>Count In Stock</FormLabel>
                            <FormControl
                                type="number"
                                placeholder='Count in stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='description' className='my-2'>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type="text"
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </FormControl>
                        </FormGroup>       

                        {/* Button to submit the form. */}
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
