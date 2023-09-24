import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import React from 'react'
import { useGetProductsQuery } from '../../slices/productApiSlice'

const ProductListScreen = () => {
    const {data:products, isLoading, error}=useGetProductsQuery();
    

  return (
    <>
    <Row className='align-items-center'>
<Col>
<h1>Products</h1>
</Col>
<Col className='text-end'>
<Button className='btn-sm m-3'>
<FaEdit/> Create Product
</Button>
</Col>

    </Row>
    {isLoading? <Loader/>:error?<Message variant="danger">
        {error}
    </Message>:(
        <>
          <Table striped hover responsive className='table-sm'>
            
            </Table>
        </>

      
    )}
    
    </>
  )
}

export default ProductListScreen
