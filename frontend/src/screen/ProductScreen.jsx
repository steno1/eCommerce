// Importing necessary components and modules from external libraries

import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import React from 'react';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { useParams } from 'react-router-dom';

// Functional component representing the product details screen
const ProductScreen = () => {
  // Extracting the 'productId' parameter from the URL using React Router's 'useParams' hook
  const { id: productId } = useParams();

  // Fetching product details using a Redux Toolkit query
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  // Styling for the container holding product information
  const containerStyle = {
    backgroundColor: '#FAE392',
    padding: '20px',
    borderRadius: '10px',
    border: '0.1px solid #1A5D1A',
  };

  return (
    <>
      {/* Link to navigate back to the main screen */}
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {/* Conditional rendering based on loading and error states */}
      {isLoading ? (
        // Display a loading spinner if data is still being fetched
        <Loader />
      ) : error ? (
        // Display an error message if there's an error during data fetching
        <Message variant="danger">
          {/* Displaying the error message from the API response or network error */}
          {error.data.message || error.error}
        </Message>
      ) : (
        // Display product details once data is loaded
        <Row>
          <Col md={5}>
            {/* Display product image */}
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={4} style={containerStyle}>
            <ListGroup variant='flush'>
              {/* Display product name */}
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              {/* Display product rating */}
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              {/* Display product description */}
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3} style={containerStyle}>
            <Card>
              <ListGroup variant='flush'>
                {/* Display product price */}
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* Display product availability */}
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* Button to add the product to the cart */}
                <ListGroup.Item>
                  <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

// Exporting the ProductScreen component as the default export
export default ProductScreen;
