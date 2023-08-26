// Import the necessary function from the Redux Toolkit library

import { createSlice } from "@reduxjs/toolkit";

// Check if there's data in the local storage and use it as initial state for the cart, or set an empty cart as initial state
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

// Function to round a number to two decimal places
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

// Create a Redux slice named 'cartSlice'
const cartSlice = createSlice({
    name: "cart", // Name of the slice
    initialState, // Initial state of the slice
    reducers: {
        addToCart: (state, action) => {
            // Extract the payload (item) from the dispatched action
            const item = action.payload;
            
            // Check if the item already exists in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);
            
            if (existItem) {
                // If the item exists, update its information in the cart
                state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
            } else {
                // If the item is not in the cart, add it to the cart
                state.cartItems = [...state.cartItems, item];
            }
            
            // Calculate the total price of items in the cart
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
            
            // Calculate the shipping price (free if over $100, else $10)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            
            // Calculate the tax price (15% tax)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
            
            // Calculate the total price including items, shipping, and tax
            state.totalPrice = (
                Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
            ).toFixed(2);
            
            // Store the updated cart state in the local storage
            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

// Extract the 'addToCart' action from the cartSlice
export const { addToCart } = cartSlice.actions;

// Export the reducer function to be used in the Redux store
export default cartSlice.reducer;
