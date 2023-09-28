// Importing necessary components and styles from 'react-bootstrap' and 'react-icons'.

import { Button, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApi'

import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import React from 'react'
import {toast} from "react-toastify"

// Functional component 'UserListScreen'.
const UserListScreen = () => {
  
  // Destructuring 'data', 'isLoading', 'error', and 'refetch' from the result of 'useGetUsersQuery'.
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

const [deleteUser, {isLoading:loadingDeleteUser}]=useDeleteUserMutation();
  // Event handler for deleting a user.
  const deleteHandler = async(id) => {
    if(window.confirm('Are sure you want to delete this user?')){

    
      try {
        // This begins a 'try' block, which is used for error handling. It contains the code that might throw an error.
    
     await deleteUser(id);
 // This line uses the 'deleteUser' function, to delete a user with the given 'id'.
   // 'await' is used because 'deleteUser' is an asynchronous function and we want to wait for it to complete.
    
        toast.success("User deleted")
 // If the deletion is successful, a success toast notification is displayed using 'toast.success'.
    
        refetch();
// 'refetch' is a function provided by 'useGetUsersQuery' that fetches the user data again.
 // This is done to update the user list after a successful deletion.
    
      } catch (error) {
        // If an error occurs in the 'try' block, the code inside the 'catch' block is executed.
    
   toast.error(error?.data?.message || error.error)
    // This line displays an error toast notification using 'toast.error'.
 // The expression 'error?.data?.message' tries to access the 'message' property of the 'data' object within 'error'.
 // If any of the intermediate properties are undefined, it gracefully handles it (no error is thrown).
 // If 'error?.data?.message' is undefined, it falls back to accessing 'error.error'.
      }
    }
    
  }
  
  return (
    <>
      <h1>Users</h1>
{loadingDeleteUser && <Loader/>}
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
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
