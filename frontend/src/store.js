/* Import the 'apiSlice' and 'configureStore'
 from respective modules.*/

import { apiSlice } from "./slices/apiSlice";
import cartSlice from "./slices/cardSlice";
import { configureStore } from "@reduxjs/toolkit";

// Configure the Redux store using 'configureStore' function.
const store = configureStore({
    // Define the reducers for the store.
    reducer: {
[apiSlice.reducerPath]: apiSlice.reducer,
 /* Use the reducer from 'apiSlice' under a specific path.*/
 cart:cartSlice
    },
    // Configure middleware for the store.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), 
        /* Include the middleware from 'apiSlice'.*/
    // Enable Redux DevTools for debugging.
    devTools: true
});

// Export the configured Redux store as the default export.
export default store;
