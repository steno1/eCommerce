// Import necessary components and modules from external libraries

import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import React, { useState } from 'react'; // Import useState hook
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch hook
import { useNavigate, useParams } from 'react-router-dom'; // Import necessary hooks

import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cardSlice'; // Import the addToCart action from Redux slice
import {toast} from "react-toastify"
import { useCreateReviewMutation } from '../slices/productApiSlice';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';

// Functional component representing the product details screen
const ProductScreen = () => {
  // Extracting the 'productId' parameter from the URL using React Router's 'useParams' hook
  const { id: productId } = useParams();

  // Initializing Redux's dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Initializing the navigate function to handle navigation
  const navigate = useNavigate();

  // Using useState to manage the quantity selected by the user
  const [qty, setQty] = useState(1);
  const [rating, setRating]=useState(0);
  const [comment, setComment]=useState("")


  // Fetching product details using a Redux Toolkit query
  const { data: product,
     isLoading, 
     refetch,
     error } = useGetProductDetailsQuery(productId);
const [createReview, {isLoading:loadingProductReview}]=
useCreateReviewMutation();
const {userInfo}=useSelector((state)=>state.auth)
  // Styling for the container holding product information
  const containerStyle = {
    backgroundColor: '#FAE392',
    padding: '20px',
    borderRadius: '10px',
    border: '0.1px solid #1A5D1A',
  };

  // Function to handle adding a product to the cart
  const addToCartHandler = () => {
    /* Dispatching the addToCart action with product
     details and selected quantity*/
    dispatch(addToCart({
       ...product,
       qty }));

    // Navigating to the cart page
    navigate('/cart');
  };

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("")
    } catch (error) {
    toast.error(error?.data?.message || error.error)  
    }
  }
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
          {error.data?.message || error.error}
        </Message>
      ) : product ? ( // Check if 'product' is defined
        // Display product details once data is loaded
       
      <>
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
                {/* Display product quantity selection */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
  <Form.Control
      as="select" // Render as a select dropdown
 value={qty} // Set the selected value to the current state value 'qty'
  onChange={(e) => setQty(Number(e.target.value))} // Update 'qty' state when value changes
         >
{/* Generate options for available quantity based on 'countInStock' */}
{/* Loop through each number up to 'countInStock' and create an option */}
     {([...Array(product.countInStock).keys()]).map((x) => (
// Set a unique 'key' attribute for React's tracking
 // Set the 'value' attribute to the number (starting from 1)
      <option key={x + 1} value={x + 1}>
        {x + 1} {/* Display the quantity number */}
        </option>
        ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                {/* Button to add the product to the cart */}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler} // Call the addToCartHandler function on button click
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className='review'>
          <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length ===0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
{product.reviews.map((review)=>(
  <ListGroupItem key={review._id}>
    <strong>{review.name}</strong>
    <Rating value={review.rating}/>
    <p>{review.createdAt.substring(0, 10)}</p>
    <p>{review.comment}</p>

  </ListGroupItem>
))}
<ListGroupItem >
<h2>Write a Customer review</h2>
{loadingProductReview && <Loader/>}
{userInfo?(
  <Form onSubmit={submitHandler}>
    <FormGroup controlId='rating' className='my-2'>
<FormLabel>
  Rating
</FormLabel>
<FormControl as="select" value={rating} 
onChange={(e)=>setRating(Number(e.target.value))}>
<option value=''>Select...</option>
<option value="1">1 - Poor</option>
<option value="2">2 - Fair</option>
<option value="3">3 - Good</option>
<option value="4">4 - Very Good</option>
<option value="5">5 - Excellent</option>
</FormControl>
    </FormGroup>
    <FormGroup controlId='comment' className='my-2'>
      <FormLabel>Comment</FormLabel>
       <FormControl as="textarea" rows="3"
        value={comment} onChange={(e)=>setComment(e.target.value)}>

       </FormControl>
    </FormGroup>
    <Button disabled={loadingProductReview} type='submit'
     variant='primary' >
      Submit

    </Button>
  </Form>
):(
  <Message>
    Please <Link to="/login"> Sign in</Link> to write a review
  </Message>
)}

</ListGroupItem>
          </ListGroup>
          
          </Col>


        </Row>
        </>


      ) : null}
    </>
  );
};

// Exporting the ProductScreen component as the default export
export default ProductScreen;
