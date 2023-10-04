// Importing necessary components and hooks from external libraries/modules

import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CheckOutStep from '../components/checkOutStep'
import FormContainer from '../components/formContainer'
import React from 'react'
import { saveShippingAddress } from '../slices/cardSlice.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Define a functional component named ShippingScreen
const ShippingScreen = () => {

    // Using the useSelector hook to get data from Redux store
    const cart = useSelector((state) => state.cart) 

    // Destructuring the shippingAddress object from the cart
    const { shippingAddress } = cart;

    // Initializing state variables and setting their initial values based on shippingAddress (if available)
    const [address, setAddress] = useState(shippingAddress.address) || "" ;
    const [city, setCity] = useState(shippingAddress.city) || "";
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode) || ""
    const [country, setCountry] = useState(shippingAddress.country) || "";
    
    // Using the useNavigate hook to get a navigation function
    const navigate = useNavigate();

    // Using the useDispatch hook to get a reference to the Redux dispatch function
    const dispatch = useDispatch();

    // Define a function to handle form submission
    const submitHandler = (e) => {
        // Prevent the default behavior of form submission (page refresh)
        e.preventDefault();
        
        // Dispatch an action to save the shipping address to the Redux store
        dispatch(saveShippingAddress({
            address,
            city,
            postalCode,
            country
        }));

        // Navigate to the next step (in this case, the payment screen)
        navigate("/payment")
    }

    // Return the JSX for rendering the component
    return (
        <FormContainer>
            <CheckOutStep step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                {/* Form controls for Address */}
                <FormGroup controlId='address' className='my-2'>
                    <FormLabel>
                        Address
                    </FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Address' 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </FormGroup>

                {/* Form controls for City */}
                <FormGroup controlId='city' className='my-2'>
                    <FormLabel>
                        City
                    </FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Address' 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </FormGroup>

                {/* Form controls for Postal Code */}
                <FormGroup controlId='postalCode' className='my-2'>
                    <FormLabel>
                        Postal Code
                    </FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Postal Code' 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </FormGroup>

                {/* Form controls for Country */}
                <FormGroup controlId='country' className='my-2'>
                    <FormLabel>
                        Country
                    </FormLabel>
                    <FormControl 
                        type='text' 
                        placeholder='Enter Country' 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </FormGroup>

                {/* Button to submit the form */}
         <Button type='submit' variant='primary' className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

// Export the ShippingScreen component as the default export of this module
export default ShippingScreen
