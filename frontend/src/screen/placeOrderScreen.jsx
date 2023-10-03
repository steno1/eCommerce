// Importing necessary components and hooks from external libraries and files

import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import CheckOutStep from '../components/checkOutStep'
import Loader from '../components/Loader'
import Message from '../components/Message'
import React from 'react'
import { clearCartItem } from '../slices/cardSlice'
import {toast} from "react-toastify"
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PlaceOrderScreen = () => {
    // Initializing hooks
    const navigate=useNavigate();  // React Router's navigation function
    const dispatch=useDispatch();  // Redux dispatch function
    const cart=useSelector((state)=>state.cart);  // Selecting cart state from Redux store
    const [createOrder, {isLoading, error}]=useCreateOrderMutation();  // Mutation function and its loading and error states

    // useEffect to handle navigation based on cart state
    useEffect(()=>{
        if(!cart.shippingAddress.address){  // If no shipping address is set
            navigate("/shipping");  // Navigate to shipping page
        } else if(!cart.paymentMethod){  // If no payment method is set
            navigate("/payment");  // Navigate to payment page
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    // Function to handle placing an order
    const placeOrderHandler=async()=>{
        try {
            
      const res=await createOrder({  // Calling createOrder mutation
        orderItems:cart.cartItems,  // Extracting cart items
       shippingAddress:cart.shippingAddress,  // Extracting shipping address
     paymentMethod:cart.paymentMethod,  // Extracting payment method
     itemsPrice:cart.itemsPrice,  // Extracting items price
     shippingPrice:cart.shippingPrice,  // Extracting shipping price
    taxPrice:cart.taxPrice,  // Extracting tax price
     totalPrice:cart.totalPrice  // Extracting total price
            }).unwrap();  // Unwrap the result from createOrder mutation
            dispatch(clearCartItem());  // Dispatching action to clear cart
            navigate(`/order/${res._id}`);  // Navigating to order details page
        } catch (error) {
            toast.error(error);  // Displaying error message if an error occurs
        }
    }

    return (
        <>
            <CheckOutStep step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
    <strong>Address:</strong>
    {cart.shippingAddress.address} {/* Displaying shipping address */}
    {cart.shippingAddress.city} {" "} {/* Displaying city */}
    {cart.shippingAddress.postalCode}{" "} {/* Displaying postal code */}
    {cart.shippingAddress.country} {/* Displaying country */}
</p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
           {cart.paymentMethod}  {/* Displaying payment method */}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
         {cart.cartItems.length===0 ? (  // Checking if cart is empty
       <Message>Your Cart is empty</Message>  // Displaying a message if cart is empty
                            ) : (
                                <ListGroup variant="flush">
          {cart.cartItems.map((item, index)=>(  // Mapping through cart items
                            <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
       <Image src={item.image} alt={item.name} fluid rounded />  {/* Displaying item image */}
                                                </Col>
                                                <Col>
         <Link to={`/products/${item.product}`}>{item.name}</Link>  {/* Link to product details */}
                                                </Col>
                                                <Col md={4}>
     {item.qty}x ${item.price}={item.qty*item.price}  {/* Displaying quantity, price, and total */}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
            ${cart.itemsPrice}  {/* Displaying items price */}
                                    </Col>
                                </Row>
                 {/* (Similar code for Shipping, Tax, and Total) */}
                            </ListGroupItem>
                            <ListGroupItem>
                 {error && <Message variant='danger'>{error.data.message}</Message>}  {/* Displaying an error message if there is an error */}
                            </ListGroupItem>
                            <ListGroupItem>
                      <Button type='button' className='btn-block'
                            disabled={cart.cartItems.length===0}
                            onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
 {isLoading && <Loader/>}  {/* Displaying loader while placing order */}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
