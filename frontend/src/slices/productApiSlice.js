// Import necessary constants and modules

// Importing the URL constant for products

import { PRODUCTS_URL, UPLOADS_URL } from "../constant";

import { apiSlice } from "./apiSlice";

// Importing the apiSlice module


// Create a productsApiSlice using apiSlice.injectEndpoints
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define an endpoint to get products
    getProducts: builder.query({
      query: ({pageNumber, keyWord}) => ({
        url: PRODUCTS_URL, // The URL for fetching products
        params:{
          pageNumber,
          keyWord
        }
      }),
      providesTags:["Product"], // This endpoint provides data with the "Product" tag
      keepUnusedDataFor: 5, // Keep unused data in cache for 5 minutes
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}` // The URL for fetching details of a specific product
      }),
      keepUnusedDataFor: 5 // Keep unused data in cache for 5 minutes
    }),

    // Define an endpoint to create a product
    createProduct: builder.mutation({
      // Define the API request configuration for creating a product
      query: () => ({
        url: PRODUCTS_URL, // The URL for making the POST request to create a product
        method: "POST" // The HTTP method used for the request
      }),

      // Specify which cache tags should be invalidated after a successful product creation
      invalidatesTags: ["Product"] // This invalidates data with the "Product" tag after creation
    }),

    // Define an endpoint to update a product
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`, // The URL for updating a specific product
        method: "PUT", // The HTTP method used for the request
        body: data, // The data to be sent in the request body
      }),

      invalidatesTags: ["Product"] // This invalidates data with the "Product" tag after update
    }),
    uploadProductImage:builder.mutation({
query:(data)=>({
  url:`${UPLOADS_URL}`,
  method:"POST",
  body:data
})

    }),
    deleteProduct:builder.mutation({
      query:(productId)=>({
        url:`${PRODUCTS_URL}/${productId}`,
        method:"DELETE"
      
      })
    }),
    createReview:builder.mutation({
      query:(data)=>({
        url:`${PRODUCTS_URL}/${data.productId}/reviews`,
        method:'POST',
        body:data
      }),
      invalidatesTags:['Product']
    })
  }),
  
});

// Extract the generated query hook from productsApiSlice
export const {
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
   useUploadProductImageMutation,
   useDeleteProductMutation, useCreateReviewMutation
} = productsApiSlice;
