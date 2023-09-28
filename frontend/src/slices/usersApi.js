// Import necessary constants and modules

import { USERS_URL } from "../constant"; // Importing the URL constant for users
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

    // Define an endpoint to handle user registration
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // The URL for sending a POST request for user registration
        method: "POST", // HTTP method for the request
        body: data, // The request body containing user registration data
      }),
    }),

    // Define an endpoint to handle updating user profile
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`, // The URL for sending a PUT request for updating user profile
        method: "PUT", // HTTP method for the request (PUT in this case)
        body: data, // The request body containing user profile data
      }),
    }),

    // Define an endpoint to fetch all users
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL, // The URL for fetching all users
      }),
      providesTags: ["Users"], // Cache tag for users data
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),

    // Define an endpoint to delete a user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`, // The URL for sending a DELETE request to delete a user
        method: "DELETE", // HTTP method for the request
      }),
    }),

    // Define an endpoint to get user details
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`, // The URL for fetching user details
      }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),

    // Define an endpoint to update user information
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`, // The URL for sending a PUT request to update user information
        method: "PUT", // HTTP method for the request
        body: data, // The request body containing updated user data
      }),
      invalidatesTags: ['User'] // Invalidate cache for 'User' after update
    })

  }),
});

// Extract the generated query and mutation hooks from usersApiSlice
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = usersApiSlice;
