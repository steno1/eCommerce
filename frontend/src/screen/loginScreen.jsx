// Importing necessary components and modules from various sources.

import { Button, Col, Form, Row } from 'react-bootstrap'; // Importing Bootstrap components.
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importing the Link component from React Router.
import { Toast, toast } from 'react-toastify'; // Importing Toast components from react-toastify.
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks.
import { useEffect, useState } from 'react'; // Importing the useState hook from React.

import FormContainer from '../components/formContainer'; // Importing a custom component.
import Loader from '../components/Loader'; // Importing a Loader component.
import React from 'react'; // Importing the React library.
import { setCredentials } from '../slices/authSlice'; // Importing an action creator from Redux slice.
import { useLoginMutation } from '../slices/usersApi'; // Importing a mutation function from Redux Toolkit API.

// Defining a functional component called "LoginScreen."
const LoginScreen = () => {
  // Defining and initializing state variables for email and password using the useState hook.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); // Redux dispatch function.
  const navigate = useNavigate(); // React Router navigation function.

  const [login, { isLoading }] = useLoginMutation(); // Redux Toolkit mutation function.

  const { userInfo } = useSelector((state) => state.auth); // Selecting data from Redux store.

  const { search } = useLocation(); // Accessing the current URL location.
  const sp = new URLSearchParams(search); // Parsing search parameters.
  const redirect = sp.get("redirect") || "/"; // Getting a redirect path from URL parameters.

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirect to a specified path if user info exists.
    }
  }, [userInfo, redirect, navigate]);

  // Event handler for the form submission.
const submitHandler = async (e) => {
  e.preventDefault(); // Prevents the default form submission behavior.
  try {
    const res = await login({
      email,
      password,
    }).unwrap(); // Sending a login request and unwrapping the response.
    dispatch(setCredentials({ ...res })); // Dispatching an action to store user credentials.
    navigate(redirect); // Redirecting the user to a specified path.
  } catch (err) {
    toast.error(err?.data?.message || err.error); // Displaying an error message using toast.
  }
};

  return (
    // Rendering a custom "FormContainer" component to provide a structured layout.
    <FormContainer>
      <h1>Sign In</h1> {/* Heading for the login form. */}
      {/* Creating a form with the "submitHandler" function as the onSubmit event handler. */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          {/* Form Group: This is a container for grouping form elements related to the email input. */}
          <Form.Label>Email Address</Form.Label>
          {/* Form Label: This label provides a description for the email input field. */}
          {/* Input field for entering the email address with value and onChange handlers. */}
          <Form.Control
            type='email'
            // Input Type: This specifies that the input field is for entering an email address.
            placeholder='Enter email'
            // Placeholder: This text appears in the input field before the user starts typing.
            value={email}
            // Value: This binds the input field's value to the 'email' state variable, ensuring it reflects the current value.
            onChange={(e) => setEmail(e.target.value)}
            // onChange Event: This function is called whenever the user types in the input field.
            // It updates the 'email' state variable with the new value entered by the user.
            className='red-email-input'
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          {/* Input field for entering the password with value and onChange handlers. */}
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Button for submitting the form. */}
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        {/* Row: This is a Bootstrap component for creating a horizontal row within the layout. */}
        {/* The 'py-3' class adds padding to the top and bottom of the row. */}
        <Col>
          {/* Column: This is a Bootstrap component for creating a column within the row. */}
          {/* In this case, it takes up the full width of the row. */}
          {/* Link to the registration page for new customers. */}
          New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
          {/* This line includes a text "New Customer?" followed by a Link component. */}
          {/* The Link component is used to create a hyperlink to the '/register' route. */}
        </Col>
      </Row>
    </FormContainer>
  );
};

// Exporting the "LoginScreen" component as the default export.
export default LoginScreen;
