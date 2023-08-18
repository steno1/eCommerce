// Import necessary components and libraries

import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Rating from './components/Rating';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//import products from './products';


// Define the ProductScreen functional component
const ProductScreen = () => {
const [products, setProducts]=useState([])

  // Extract the 'id' parameter from the URL using the useParams hook
  const { id: productId } = useParams();

  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get(`/api/products/${productId}`);
      setProducts(data)
    }
    fetchData();
  }, [productId])
  
  
  // Return JSX to render the product details screen
  return (
    <>
      {/* Create a link to go back to the main page */}
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      
      {/* Create a row with three columns */}
      <Row>
        {/* Column for product image */}
        <Col md={5}>
          <Image src={products.image} alt={products.name} fluid />
        </Col>
        
        {/* Column for product details */}
        <Col md={4}>
          {/* ListGroup to display product details */}
          <ListGroup variant='flush'>
            {/* Product name */}
            <ListGroup.Item>
              <h3>{products.name}</h3>
            </ListGroup.Item>
            
            {/* Product rating */}
            <ListGroup.Item>
              <Rating value={products.rating} text={`${products.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
             Description:{products.description}
            </ListGroup.Item>
            
          </ListGroup>
        </Col>
        
        {/* Column for additional product info */}
        <Col md={3}>
          {/* Card to display more product details */}
          <Card>
            <ListGroup variant='flush'>
              {/* Price */}
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>${products.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              
              {/* Availability status */}
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>${products.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              
              {/* Add to Cart button */}
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={products.countInStock === 0}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

// Export the ProductScreen component
export default ProductScreen;
