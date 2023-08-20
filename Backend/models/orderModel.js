// Import the Mongoose library for MongoDB interaction

import mongoose from "mongoose";

//import products from "../data/products";

// Define a Mongoose schema for orders
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,   // Store MongoDB ObjectId for the user
        required: true, // User field is required
        ref: "User"// Reference to the 'User' collection
    },
    orderItems: [{
  name: { type: String, required: true },  // Store a string (product name)
 qty: { type: Number, required: true }, // Store a number (quantity)
 image: { type: String, required: true }, // Store a string (URL to the product image)
 price: { type: Number, required: true }, // Store a number (product price)
        product: {
            type: mongoose.Schema.Types.ObjectId, // Store MongoDB ObjectId for the product
            required: true, // Product field is required
            ref: "Product"  // Reference to the 'Product' collection
        }
    }],
    shippingAddress: {
address: { type: String, required: true },// Store a string (shipping address)
city: { type: String, required: true },// Store a string (shipping city)
 postalCode: { type: String, required: true }, // Store a string (shipping postal code)
 country: { type: String, required: true } // Store a string (shipping country)
    },
    paymentMethod: {
        type: String, // Store a string (payment method)
        required: true  // Payment method is required
    },
    paymentResult: {
 id: { type: String }, // Store a string (payment ID)
 status: { type: String }, // Store a string (payment status)
update_time: { type: String },// Store a string (payment update time)
 email_address: { type: String }// Store a string (customer's email)
    },
    itemsPrice: {
        type: Number, // Store a number (total items price)
        required: true,
        default: 0.0 // Default value if not provided
    },
    taxPrice: {
        type: Number, // Store a number (total tax price)
        required: true,
        default: 0.0 // Default value if not provided
    },
    shippingPrice: {
        type: Number, // Store a number (total shipping price)
        required: true,
        default: 0.0  // Default value if not provided
    },
    totalPrice: {
        type: Number,  // Store a number (total order price)
        required: true,
        default: 0.0   // Default value if not provided
    },
    isPaid: {
        type: Boolean,   // Store a boolean (payment status)
        required: true,
        default: false // Default value if not provided
    },
    paidAt: {
        type: Date // Store a date (payment date)
    },
    isDelivered: {
        type: Boolean // Store a boolean (delivery status)
    },
    deliveredAt: {
        type: Date // Store a date (delivery date)
    }
}, {
    timestamps: true // Enable automatic timestamp generation
});

// Create a Mongoose model named 'Order' using the 'orderSchema' schema
const Order = mongoose.model("Order", orderSchema);

// Export the 'Order' model for use in other modules
export default Order;
