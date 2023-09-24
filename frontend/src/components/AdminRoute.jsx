import { Navigate, Outlet } from 'react-router-dom' // Importing necessary components

import React from 'react' // Importing React
import { useSelector } from 'react-redux/es/hooks/useSelector' // Importing Redux hook

const AdminRoute = () => { // Defining the AdminRoute component
 const {userInfo} = useSelector(state => state.auth)
  // Getting userInfo from Redux store

    return ( // Returning JSX
        userInfo && userInfo.isAdmin? <Outlet/> :
         <Navigate to='/login' replace/> 
     // Conditional rendering based on userInfo.isAdmin
 // If true, render Outlet component. Otherwise, navigate to '/login'
    )
}

export default AdminRoute // Exporting AdminRoute as the default export
