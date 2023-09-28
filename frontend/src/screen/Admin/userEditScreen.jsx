// Importing necessary components and functions from external libraries and files.

import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
 useGetUserDetailsQuery,
 useUpdateUserMutation,
} from '../../slices/usersApi'

import FormContainer from '../../components/formContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import React from 'react'
import {toast} from "react-toastify"

const UserEditScreen = () => {
    // Extracting 'id' parameter from URL using 'useParams' hook.
    const { id: userId } = useParams();

    // Setting up state variables for different form fields.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    // Fetching product details based on 'productId'.
    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId)

    // Mutation for updating product details.
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    // Function to navigate to a different page.
    const navigate = useNavigate();

    // useEffect to populate form fields when product data is available.
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            
        }
    }, [user])

    // Function to handle form submission.
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({
                userId,
                name,
                email,
                 isAdmin
            })
            toast.success("User updated successfully")
            refetch();
            navigate(`/admin/userlist`)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    

    // Rendering the component.
    return (
        <>
            {/* Link to go back to the product list page. */}
            <Link to="/admin/userlist" className='btn btn-light my-3'>
                Go Back
            </Link>
            {/* Container for the form. */}
            <FormContainer>
                <h1>Edit User</h1>
                {/* Displaying a loader while updating the product. */}
                {loadingUpdate && <Loader />}
                {/* Displaying loader or error message while fetching product data. */}
                {isLoading ? <Loader /> : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    // Rendering the product edit form.
                    <Form onSubmit={submitHandler}>
                        {/* Form fields for editing product details. */}
                        {/* Each field has a label, input, and onChange handler. */}
                        {/* The value of each input is controlled by state variables. */}
                        <FormGroup controlId='name' className='my-2'>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='email' className='my-2'>
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </FormControl>
                        </FormGroup>
             <FormGroup controlId='isAdmin' className='my-2'>
                    <FormCheck type='checkbox' label="Is Admin"
                    checked={isAdmin} 
                    onChange={(e)=>setIsAdmin(e.target.checked)}>

                    </FormCheck>
                            </FormGroup>
                              
                        {/* Button to submit the form. */}
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
