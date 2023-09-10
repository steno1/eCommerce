// Importing the createSlice function from Redux Toolkit

import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the Redux slice
const initialState = {
    // The 'userInfo' property is used to store user information.
    // It is initially set by retrieving data from the browser's local storage.
    // If there is 'userInfo' data in local storage, parse it as JSON and use it;
    // otherwise, set 'userInfo' to null.
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
};

// Creating a Redux slice named "auth" with a reducer function
const authSlice = createSlice({
 // The name of the Redux slice, which will be used to identify this slice in the store
    name: "auth",

// The initial state for this slice, which contains the user information
    initialState,

// Reducer functions that define how the state should be updated in response to actions
    reducers: {
  // Reducer function to set user credentials in the state and local storage
 setCredentials: (state, action) => {
  // Update the 'userInfo' property in the state with the new user credentials
  state.userInfo = action.payload;

// Store the updated 'userInfo' in the browser's local storage as a JSON string
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }
    }
});


// Exporting the setCredentials action for Redux actions
export const { setCredentials } = authSlice.actions;

// Exporting the reducer function for use in a Redux store
export default authSlice.reducer;
