import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'; // Importing necessary components from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'; // Importing 'Link' and 'useParams' from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'; // Importing PayPal components and hooks
import {
useGetOrderDetailQuery,
useGetPayPalClientIdQuery,
usePayOrderMutation
} from '../slices/ordersApiSlice';

import Loader from '../components/Loader'; // Importing 'Loader' component
import Message from '../components/Message'; // Importing 'Message' component
import React from 'react'; // Importing React
import { toast } from 'react-toastify'; // Importing 'toast' for displaying notifications
import { useEffect } from 'react'; // Importing 'useEffect' from React
import { useSelector } from 'react-redux/es/hooks/useSelector'; // Importing Redux hooks for selecting state

// Importing custom hooks for fetching order details, PayPal client ID, and paying order

const OrderScreen = () => {
    // Extracts the 'id' parameter from the URL
    const { id: orderId } = useParams(); // Destructuring 'id' parameter from URL using 'useParams'
    
    // Calls a custom hook 'useGetOrderDetailQuery' with 'orderId'
    const { data: order, isLoading, isError, refetch } = useGetOrderDetailQuery(orderId); // Fetching order details using custom hook

    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation(); // Destructuring 'payOrder' mutation and 'loadingPay' flag
    const [{isPending}, payPalDispatch]=usePayPalScriptReducer(); // Destructuring state and dispatch from PayPal script reducer
    const {userInfo}=useSelector((state)=>state.auth); // Selecting 'userInfo' from Redux store
    const {data:paypal,
        isLoading:loadingPayPal,
         error:errorPayPal}
    =useGetPayPalClientIdQuery(); // Fetching PayPal client ID using custom hook

   // Conditionally load PayPal script if necessary
useEffect(() => {
    // Check if there are no PayPal errors, PayPal is not currently loading, and we have a PayPal client ID
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        
        // Define a function to load the PayPal script
        const loadPayPalScript = async () => {
            // Dispatch an action to reset PayPal options with client ID and currency
            payPalDispatch({
                type:"resetOptions",
                value:{
                    "client-id":paypal.clientId,
                    currency:"USD"
                }
            });

            // Dispatch an action to set the loading status of PayPal to 'pending'
            payPalDispatch({
                type:"setLoadingStatus",
                value:"pending"
            })
        }

        // Check if we have order information and the order hasn't been paid yet
        if (order && !order.isPaid) {
            // Check if the PayPal object is not already available in the window
            if (!window.paypal) {
                // Load the PayPal script
                loadPayPalScript();
            }
        }
    }
}, [order, paypal, payPalDispatch, loadingPayPal, errorPayPal]);
// Conditionally load PayPal script if necessary
// Function called when the payment is approved
function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
        try {
            // Call payOrder with orderId and payment details
            await payOrder({orderId, details});
            // Fetch order details again after successful payment
            refetch();
            // Show a success toast message
            toast.success("Payment Successful");
        } catch (error) {
            // If there's an error, show an error toast message
            toast.error(error?.data?.message || error.message);
        }
    });
}

// Function for a test scenario where payment is approved
async function onApproveTest(){
    // Simulate paying an order with orderId and empty payer details
    await payOrder({orderId, details:{payer:{}}});
    // Fetch order details again after successful payment
    refetch();
    // Show a success toast message
    toast.success("Payment Successful");
}

// Function called when an error occurs during payment
function onError(error){
    // Show an error toast message with the error message
    toast.error(error.message);
}

// Function to create an order for PayPal
function createOrder(data, actions){
    return actions.order.create({
        purchase_units:[
            {
                amount:{
                    // Set the value of the order to the total price
                    value:order.totalPrice
                }
            }
        ]
    }).then((orderId)=>{
        // Return the orderId after creating the order
        return orderId;
    });
}


    // Conditional rendering based on loading state and error state
    return isLoading ? <Loader /> : isError ? <Message variant='danger' /> : (
        <>
            <h1>
                Order {order._id}
            </h1>

            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroupItem>
                            <h2>Shipping</h2>

                            {/* Display user information */}
                            <p>
                                <strong>Name:</strong>
                                {" "}{order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                {" "}{order.user.email}
                            </p>
                            <p>
                                <strong>Address</strong>
                                {" "}{order.shippingAddress.address},{" "}
                                {order.shippingAddress.city}{" "}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingAddress.country}
                            </p>

                            {/* Display delivery status */}
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>

                            {/* Display payment method */}
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>

                            {/* Display payment status */}
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Paid
                                </Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>

                            {/* Map over order items and display details */}
                            {order.orderItems.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty}x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>

                            {/* Display order summary details */}
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Items
                                    </Col>
                                    <Col>
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        Tax
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                  {!order.isPaid && (
                    <ListGroupItem>

                        {loadingPay && <Loader/>}
                        {isPending? <Loader/>:(
                            <div>
            <Button onClick={onApproveTest} style={{marginBottom:"10px"}}>
                                    Test Pay Order
                                    </Button>
                                    <div>
        
                                    <PayPalButtons 
                     createOrder={createOrder}
                     onApprove={onApprove}
                     onError={onError}
                     > </PayPalButtons>
                     
                                    </div>
                    
                            </div>
                        )}
                    </ListGroupItem>
                  )}          
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
