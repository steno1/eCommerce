// Import the controller functions for handling requests

import { getProductById, getProducts } from "../controller/productController.js";

import express from "express";

// Import the express module


// Create an instance of the Express router
const router = express.Router();

// Define routes and their corresponding controller functions
// When a GET request is made to '/', the getProducts function will be called
router.route('/').get(getProducts);

// When a GET request with an ID parameter is made to '/:id', the getProductById function will be called
router.route("/:id").get(getProductById);

// Export the router to be used in other parts of the application
export default router;
