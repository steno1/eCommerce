// Import necessary components and modules from libraries

import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../slices/cardSlice';
import { useDispatch, useSelector } from 'react-redux';

import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import React from 'react';

const CartScreen = () => {
    const navigate = useNavigate(); 
    // A hook for programmatic navigation
    const dispatch = useDispatch();
     // A hook for dispatching Redux actions

    // Access the 'cart' state from the Redux store
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart; 
    /* Destructure cartItems from the 'cart' state*/

    // Function to handle adding items to the cart
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty })); 
/* Dispatch the addToCart action with the selected product and quantity*/
    };
 
      const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id)); 
    };

    const checkOutHandler=()=>{
        navigate("/login?redirect=/shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>
                    Shopping Cart
                </h1>
                {/* Display a message when the cart is empty */}
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty<Link to="/"> Go Back</Link>
                    </Message>
                ) : (
                    // Display the list of items in the cart
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                              {/* Display the product image */}
        
          <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                         {/* Link to the product's details page */}
                 <Link to={`/products/${item._id}`}>{item.name}</Link>
                                 </Col>
                                <Col md={2}>
                        {/* Display the product price */}
                             ${item.price}
                                    </Col>
                                    <Col md={2}>
                           {/* Dropdown to select quantity */}
                                  <Form.Control
                                            as="select"
                                            value={item.qty}
       onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                        >
      {/* Generate options for quantities based on available stock */}
              {([...Array(item.countInStock).keys()]).map((x) => (
                              <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                         </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                        {/* Button to remove item from cart */}
                      <span className='trashSpan' 
                      onClick={()=>removeFromCartHandler(item._id)}>
                                            <FaTrash />
                                        </span >
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                {/* Display the cart summary */}
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
  Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
     {/* Calculate and display the total price of items in the cart */}
      ${cartItems.reduce((acc, item) =>
       acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
              {/* Button to proceed to checkout */}
     <Button type='button' className='btn-block'
      disabled={cartItems.length === 0} onClick={checkOutHandler}>
                 Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;
