// Import the Product model from the specified path

import Product from "../models/productModel.js";
import asyncHandler from "../middleWare/asyncHandler.js";

// Import the asyncHandler middleware for handling asynchronous operations


// Controller function to get all products
const getProducts = asyncHandler(async (req, res) => {
    // Fetch all products from the database
    const products = await Product.find({});
    
    // Send the retrieved products as a JSON response
    res.json(products);
});

// Controller function to get a product by its ID
const getProductById = asyncHandler(async (req, res) => {
    // Find a product in the database based on the provided ID
    const product = await Product.findById(req.params.id);

    if (product) {
        // If the product is found, send it as a JSON response
        res.json(product);
    } else {
        // If the product is not found, set a 404 status and throw an error
        res.status(404);
        throw new Error("Resource not found");
    }
});

// Export the controller functions to be used in other parts of the application
export { getProductById, getProducts };
