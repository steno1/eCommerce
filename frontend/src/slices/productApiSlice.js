// Import necessary constants and modules

import { PRODUCTS_URL } from "../constant"; // Importing the URL constant for products
import { apiSlice } from "./apiSlice"; // Importing the apiSlice module

// Create a productsApiSlice using apiSlice.injectEndpoints
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define an endpoint to get products
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL, // The URL for fetching products
      }),
      keepUnusedDataFor: 5, // Keep unused data in cache for 5 minutes
    }),
    getProductDetails:builder.query({
      query:(productId)=>({
        url:`${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor:5
    })
  }),
});

// Extract the generated query hook from productsApiSlice
export const { useGetProductDetailsQuery, useGetProductsQuery } = productsApiSlice;
