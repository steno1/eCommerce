// Importing necessary components and modules from various sources.

import { Button, Col, Form, Row } from 'react-bootstrap'; // Importing Bootstrap components for styling the form.
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importing React Router components for navigation.
import { Toast, toast } from 'react-toastify'; // Importing Toast components from react-toastify for displaying notifications.
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks for state management.
import { useEffect, useState } from 'react'; // Importing the useState hook from React for managing component state.

import FormContainer from '../components/formContainer'; // Importing a custom component for creating a structured form layout.
import Loader from '../components/Loader'; // Importing a custom Loader component for displaying loading indicators.
import React from 'react'; // Importing the React library for creating functional components.
import { setCredentials } from '../slices/authSlice'; // Importing an action creator from the Redux authSlice.
import { useRegisterMutation } from '../slices/usersApi'; // Importing a mutation function from Redux Toolkit API for user registration.

// Defining a functional component called "RegisterScreen."
const RegisterScreen = () => {
  // Defining and initializing state variables for email, password, name, and confirmPassword using the useState hook.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch(); // Redux dispatch function for dispatching actions.
  const navigate = useNavigate(); // React Router navigation function for programmatic navigation.

  const [register, { isLoading }] = useRegisterMutation(); // Redux Toolkit mutation function for user registration.

  const { userInfo } = useSelector((state) => state.auth); // Selecting user information from the Redux store.

  const { search } = useLocation(); // Accessing the current URL location.
  const sp = new URLSearchParams(search); // Parsing search parameters from the URL.
  const redirect = sp.get("redirect") || "/"; // Getting a redirect path from URL parameters or defaulting to "/".

  // useEffect hook to handle redirection when the user is already logged in.
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirect the user to a specified path if user info exists.
    }
  }, [userInfo, redirect, navigate]);

  // Event handler for the form submission.
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Check if the entered password and confirmPassword match.
    if (password !== confirmPassword) {
      toast.error("Passwords do not match"); // Display an error toast notification.
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
        }).unwrap(); // Send a registration request and unwrap the response.

        dispatch(setCredentials({ ...res })); // Dispatch an action to store user credentials.
        navigate(redirect); // Redirect the user to a specified path.
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Display an error message using toast.
      }
    }
  };

  // Rendering the UI for the registration form.
  return (
    <FormContainer>
      <h1>Sign Up</h1> {/* Heading for the registration form. */}
      <Form onSubmit={submitHandler}>
        {/* Creating a form with the "submitHandler" function as the onSubmit event handler. */}
        
        {/* Form Group for entering the user's name. */}
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* Form Group for entering the user's email address. */}
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='red-email-input' // Adding a custom class for styling.
          />
        </Form.Group>

        {/* Form Group for entering the user's password. */}
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Form Group for confirming the user's password. */}
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>   

        {/* Button for submitting the form. */}
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={isLoading}
        >
          Register
        </Button>

        {isLoading && <Loader />} {/* Display a loader if the form is submitting. */}
      </Form>

      <Row className='py-3'>
        <Col>
          {/* Link to the login page for existing customers. */}
          Already have an Account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

// Exporting the "RegisterScreen" component as the default export.
export default RegisterScreen;
