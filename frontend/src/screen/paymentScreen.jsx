// Importing necessary components and functions from libraries and files

import { Button, Col, Form, FormCheck, FormGroup, FormLabel } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckOutStep from '../components/checkOutStep'
import FormContainer from '../components/formContainer'
import { savePaymentMethod } from '../slices/cardSlice'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
    // Setting up state for payment method, initializing with "PayPal"
    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    // Getting dispatch function from Redux
    const dispatch=useDispatch();

    // Getting navigate function from React Router
    const navigate=useNavigate();

    // Accessing shippingAddress from the Redux store's cart
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart; 

    // Effect to redirect if shippingAddress is not set
    useEffect(()=>{
        if(!shippingAddress){
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])

    // Function to handle form submission
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod)); // Dispatching an action to save payment method
        navigate("/placeorder") // Redirecting to "/placeorder" route
    }

    return (
        // JSX code for the PaymentScreen component
        <FormContainer>
            <CheckOutStep step1 step2 step3/> {/* Component for checkout steps */}
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}> {/* Form with submit handler */}
                <FormGroup>
                    <FormLabel as="legend">Select Method</FormLabel>
                    <Col>
                        <FormCheck 
                            type='radio' 
                            className='my-2' 
                            label="PayPal or Credit Card"
                            id="PayPal" 
                            name="paymentMethod" 
                            value='PayPal' 
                            checked // The radio button is checked by default
             onChange={(e) => setPaymentMethod(e.target.value)} // Function to update payment method state
                        />
                    </Col>
                </FormGroup>
         <Button type='submit' variant='primary'>Continue</Button> {/* Submit button */}
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen // Exporting the PaymentScreen component
