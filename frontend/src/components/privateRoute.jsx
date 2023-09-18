import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PrivateRoute = () => {
    // Defining a functional component called PrivateRoute

    const {userInfo} = useSelector(state => state.auth)
    // Using useSelector to get the 'userInfo' from the Redux store

    return (
        // Using a conditional (ternary) operator to check if 'userInfo' is truthy
        userInfo ? <Outlet/> : <Navigate to='/login' replace/>
    )
    // This is the main body of the component. It uses a ternary operator to conditionally render one of two components:
    // If `userInfo` is truthy, it renders the `Outlet` component.
    // If `userInfo` is falsy, it renders the `Navigate` component, which will redirect the user to the `/login` route.
}

export default PrivateRoute
// Exporting the PrivateRoute component as the default export of this module
