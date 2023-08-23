// Import necessary modules from Redux Toolkit.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constant";

// Import the BASE_URL constant from "../constant".


// Create the base query using fetchBaseQuery and the BASE_URL.
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create the API slice using createApi.
export const apiSlice = createApi({
    baseQuery,  // Use the previously created base query.
    tagTypes: ["Product", "Order", "User"], // Define tag types for the cache.
    endpoints: (builder) => {
        // Endpoint definitions go here.
        return {}; // Empty object for now; you will define endpoints in this section.
    }
});
