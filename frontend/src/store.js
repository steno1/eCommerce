// Import necessary modules and slices

import { apiSlice } from "./slices/apiSlice";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cardSlice";
import { configureStore } from "@reduxjs/toolkit";

// Configure the Redux store using 'configureStore' function.
const store = configureStore({
    // Define the reducers for the store.
    reducer: {
        // Associate the reducer from 'apiSlice' with a specific path in the store.
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Include the 'cartSlice' and 'authSlice' reducers in the store.
        cart: cartSlice,
        auth: authSlice
    },
    // Configure middleware for the store.
    middleware: (getDefaultMiddleware) =>
        // Include the middleware from 'apiSlice' in the middleware stack.
        getDefaultMiddleware().concat(apiSlice.middleware),
    // Enable Redux DevTools for debugging.
    devTools: true
});

// Export the configured Redux store as the default export.
export default store;
