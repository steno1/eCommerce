// Import the Mongoose library for MongoDB interaction

import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Store MongoDB ObjectId for user
        required: true, // Field is required
        ref: "User" // Reference to the 'User' collection
    },
    name: {
        type: String, // Store a string for review name
        required: true  // Field is required
    },
    rating: {
        type: Number,    // Store a number for review rating
        required: true  // Field is required
    },
    comment: {
        type: String,  // Store a string for review comment
        required: true // Field is required
    }
}, 
{
    timestamps: true    // Enable automatic timestamp generation
});

// Define a Mongoose schema for the 'products' collection in the database
const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,   // Field stores MongoDB ObjectId
        required: true,  // Field is required
        ref: "User"     // Reference to the 'User' collection
    },
    name: {
        type: String,   // Field stores a string
        required: true  // Field is required
    },
    image: {
        type: String,  // Field stores a string (URL to the image)
        required: true // Field is required
    },
    category: {
        type: String, // Field stores a string (category of the product)
        required: true // Field is required
    },
    reviews: [reviewSchema], // // Store an array of 'reviewSchema' instances
    rating: {
        type: Number,  // Field stores a number (product rating)
        required: true, // Field is required
        default: 0    // Default value if not provided
    },
    numReviews: {
        type: Number, // Field stores a number (number of reviews)
        required: true, // Field is required
        default: 0      // Default value if not provided
    },
    price: {
        type: Number,  // Field stores a number (product price)
        required: true, // Field is required
        default: 0      // Default value if not provided
    },
    countInStock: {
        type: Number,   // Field stores a number (quantity in stock)
        required: true, // Field is required
        default: 0      // Default value if not provided
    }
}, {
    timestamps: true   // Enable automatic timestamp generation
});

// Create a Mongoose model named 'Product' using the 'productSchema' schema
const Product = mongoose.model("Product", productSchema);

// Export the 'Product' model for use in other modules
export default Product;
