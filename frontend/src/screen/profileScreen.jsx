// Importing necessary components and hooks from external libraries and local files.

import { Button, Col, Form, FormControl, FormGroup, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice';
import { toast } from "react-toastify";
import { useGetMyOrderQuery } from '../slices/ordersApiSlice';
import { useProfileMutation } from '../slices/usersApi';

// Defining a functional component called ProfileScreen.
const ProfileScreen = () => {
  // Initializing state variables using the 'useState' hook.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Accessing Redux dispatch function.
  const dispatch = useDispatch();

  // Accessing userInfo from Redux store.
  const { userInfo } = useSelector((state) => state.auth);

  // Using a custom hook 'useProfileMutation' to handle profile updates.
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrderQuery();

  // Using 'useEffect' to set the name and email if userInfo is available.
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.email, userInfo.name]);

  // Handling form submission.
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    // Rendering a Bootstrap Row containing two Columns.
    <Row>
      {/* Left Column */}
      <Col md={3}>
        <h2>User Profile</h2>
        {/* Form for updating profile information. */}
        <Form onSubmit={submitHandler}>
          {/* Input field for Name */}
          <FormGroup className='my-2'>
            <label>Name</label>
            <FormControl type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>

          {/* Input field for Email */}
          <FormGroup className='my-2'>
            <label>Email Address</label>
            <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>

          {/* Input field for Password */}
          <FormGroup className='my-2'>
            <label>Password</label>
            <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>

          {/* Input field for Confirm Password */}
          <FormGroup className='my-2'>
            <label>Confirm Password</label>
            <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormGroup>

          {/* Submit button */}
          <Button type='submit' variant='primary' className='my-2'>
            Update
          </Button>

          {/* Display loader while updating profile */}
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>

      {/* Right Column */}
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? <Loader /> : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.DeliveredAt?.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

// Exporting the ProfileScreen component.
export default ProfileScreen;
