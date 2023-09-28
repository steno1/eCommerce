// Importing necessary components and styles from 'react-bootstrap' and 'react-icons'.

import { Button, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import React from 'react'
import { useGetUsersQuery } from '../../slices/usersApi'

// Importing 'LinkContainer' from 'react-router-bootstrap' for navigation.


// Importing custom components 'Loader' and 'Message' from their respective paths.



// Importing React for creating functional components.


// Importing the 'useGetUsersQuery' hook from 'usersApi' slice for fetching user data.


// Functional component 'UserListScreen'.
const UserListScreen = () => {
  
  // Destructuring 'data', 'isLoading', 'error', and 'refetch' from the result of 'useGetUsersQuery'.
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  // Event handler for deleting a user.
  const deleteHandler = (id) => {
    console.log(Object)
  }
  
  return (
    <>
      <h1>Users</h1>

      {/* Conditional rendering based on the loading and error states. */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping over 'users' array to render user data in rows. */}
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {/* Rendering a checkmark (FaCheck) if user is an admin, otherwise a cross (FaTimes). */}
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {/* Buttons for editing and deleting a user. */}
                  <LinkContainer to={`admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
