// Import necessary constants and modules

import { USERS_URL } from "../constant"; // Importing the URL constant for products
import { apiSlice } from "./apiSlice"; // Importing the apiSlice module

// Create a usersApiSlice using apiSlice.injectEndpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define an endpoint to handle user login
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // The URL for sending a POST request for user login
        method: "POST", // HTTP method for the request
        body: data, // The request body containing user login data
      }),
    }),
   // Define an endpoint to handle user logout
   logout: builder.mutation({
    query: (data) => ({
      url: `${USERS_URL}/logout`, // The URL for sending a POST request for user logout
      method: "POST", // HTTP method for the request (POST in this case)
      body: data, // The request body containing user logout data
    }),
  }),

  register:builder.mutation({
    query:(data)=>({
      url:`${USERS_URL}`,
      method:"POST",
      body:data
    })
  })
  }),
});

// Extract the generated query hook from usersApiSlice
export const { useLoginMutation,
   useLogoutMutation, useRegisterMutation} = usersApiSlice;
