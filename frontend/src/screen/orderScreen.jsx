import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import React from 'react'
import { useGetOrderDetailQuery } from '../slices/ordersApiSlice'

const OrderScreen = () => {
    // Extracts the 'id' parameter from the URL
    const { id: orderId } = useParams();
    
    // Calls a custom hook 'useGetOrderDetailQuery' with 'orderId'
    const { data: order, isLoading, isError, refetch } = useGetOrderDetailQuery(orderId);

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
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen
