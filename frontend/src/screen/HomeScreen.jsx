// Import necessary components and functions from external libraries and files

import { Col, Row } from "react-bootstrap"; // Importing layout components from react-bootstrap for grid structure

import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product"; // Importing the Product component
import React from 'react'; // Importing the React library for building UI components
import { useGetProductsQuery } from "../slices/productApiSlice"; // Importing a custom query hook for fetching product data
import { useParams } from "react-router-dom";

// Define the HomeScreen component
const HomeScreen = () => {
  const {pageNumber}=useParams();
  // Use the custom query hook to fetch product data from the API
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});

  // Render the component's UI
  return (
    <>
      {/* Check if the data is still loading */}
      {isLoading ? (
        <Loader/>
      ) : error ? (
        // Check if an error occurred while fetching data
        <Message variant="danger">
{error.data.message || error.error}
        </Message>
       
      ) : (
        <>
          {/* If data is loaded and no error, display the list of products */}
          <h1>Latest Products</h1>
          <Row>
            {/* Map through the products array and render each product */}
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* Render the Product component with the current product */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page}/>
        </>
      )}
    </>
  );
}

// Export the HomeScreen component to be used in other parts of the application
export default HomeScreen;
