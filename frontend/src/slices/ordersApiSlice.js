// Importing constant ORDERS_URL from "../constant"

import { ORDERS_URL, PAYPAL_URL } from "../constant";

import { apiSlice } from "./apiSlice";

// Importing apiSlice from "./apiSlice"


// Defining a new API slice for managing orders
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Creating a mutation for creating an order
    createOrder: builder.mutation({
      query: (order) => ({
        // Defining the URL and method for the request
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }, // Sending the order data in the request body
      }),
    }),

    // Creating a query for getting order details
    getOrderDetail: builder.query({
      query: (orderId) => ({
        // Constructing the URL for fetching specific order details
        url: `${ORDERS_URL}/${orderId}`,
      }),

      // Setting a cache policy to keep unused data for 5 seconds
      keepUnusedDataFor: 5,
    }),

    // Creating a mutation for paying an order
    payOrder: builder.mutation({
      query: ({orderId, details}) => ({
        // Defining the URL and method for the request
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),

    // Creating a query for getting PayPal client ID
    getPayPalClientId: builder.query({
      query: () => ({
        // Defining the URL for fetching PayPal client ID
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5, // Cache data for 5 seconds
    }),

  }),
});

// Exporting hooks generated by the API slice for usage in components
export const {
  useCreateOrderMutation,
  useGetPayPalClientIdQuery,
  useGetOrderDetailQuery,
  usePayOrderMutation
} = ordersApiSlice;
