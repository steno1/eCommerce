// Importing necessary components and modules from external libraries

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import React from 'react';

// Functional component representing a product card
const Product = ({ product }) => {
  // Styling for the product card
  const cardStyle = {
    backgroundColor: "#FAE392", 
    margin: '10px',
    padding: '10px',
    borderRadius: '60px',
  };

  return (
    // Render the product card using React Bootstrap's Card component
    <Card style={cardStyle} className='my-3 p-3 rounded'>
      {/* Link to navigate to the product details screen */}
      <Link to={`/products/${product._id}`}> 
        {/* Display product image */}
        <Card.Img src={product.image} variant="top"/>
      </Link>
      <Card.Text as="div">
        {/* Display product rating */}
        <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
      </Card.Text>
      <Card.Body>
        {/* Link to navigate to the product details screen */}
        <Link to={`/products/${product._id}`}>
          {/* Display product name */}
          <Card.Title as="div" className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* Display product price */}
        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Exporting the Product component as the default export
export default Product;
