// Importing necessary components and modules

import { Button, Col, Row, Table } from 'react-bootstrap'; // Importing specific components from react-bootstrap
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing specific icons from react-icons
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlice'; // Importing hooks for creating products and getting products from the product API slice

import { LinkContainer } from 'react-router-bootstrap'; // Importing a container for links
import Loader from '../../components/Loader'; // Importing a loader component
import Message from '../../components/Message'; // Importing a message component
import React from 'react'; // Importing the React library
import { toast } from "react-toastify"; // Importing a library for displaying toasts

const ProductListScreen = () => {
    // Using the useGetProductsQuery hook to get data about products
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    // Using the useCreateProductMutation hook to create a new product
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct, {isLoading:loadingDelete}]=useDeleteProductMutation();
    // Handler for deleting a product
    const deleteHandler = async(id) => {
      if(window.confirm("Are sure you want to delete the product?")){
try {
    await deleteProduct(id);
    refetch();
} catch (err) {
    toast.error(err?.data?.message || err.error)
}
      }
    }

    // Handler for creating a new product
    const createProductHandler = async () => {
        // Display a confirmation dialog
 if (window.confirm("Are you sure you want to create a new product?"))
  { // If confirmed, try to create the product
            try {
                await createProduct();
                // After creating, refresh the product list
                refetch();
            } catch (error) {
                // If an error occurs, display an error toast
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    // Rendering JSX elements
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    {/* Button to trigger createProductHandler */}
      <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit/> Create Product
                    </Button>
                </Col>
            </Row>
            {/* Conditional rendering based on loadingCreate */}
            {loadingCreate && <Loader/>}
              {/* Conditional rendering based on loadingDelete*/}
            {loadingDelete && <Loader/>}
            

            {/* Conditional rendering based on isLoading */}
            {isLoading ? (
                <Loader/>
            ) : error ? (
                // Display an error message if there's an error
                <Message variant="danger">
                    {error}
                </Message>
            ) : (
                // If there's no error, display the product table
                <>
              <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>DESCRIPTION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
          {/* Map through products and render a row for each */}
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.description}</td>
                                    <td>
                  {/* Buttons for editing and deleting a product */}
             <LinkContainer to={`/admin/product/${product._id}/edit`}>
                <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit/>
                                            </Button>
                                        </LinkContainer>
 <Button variant='danger'
  className='btn-sm' onClick={() => 
    deleteHandler(product._id)}>
     <FaTrash style={{ color: "white" }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
}

export default ProductListScreen; // Exporting the ProductListScreen component
