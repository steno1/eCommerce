// Import necessary constants and modules

// Importing the URL constant for users

import { USERS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

// Importing the apiSlice module


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
  }),
});

// Extract the generated query and mutation hooks from usersApiSlice
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery
} = usersApiSlice;
