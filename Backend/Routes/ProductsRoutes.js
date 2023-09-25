// Import the controller functions for handling requests

import { admin, protect } from "../middleWare/AuthMiddleWare.js";
import { createProduct, getProductById, getProducts, updateProduct } from "../controller/productController.js";

import express from "express";

// Import the express module


// Create an instance of the Express router
const router = express.Router();

// Define routes and their corresponding controller functions

// When a GET request is made to '/', the getProducts function will be called
router.route('/').get(getProducts);

// When a GET request with an ID parameter is made to '/:id', the getProductById function will be called
router.route("/:id").get(getProductById);

// When a POST request is made to '/', the createProduct function will be called.
// The protect and admin middlewares are used to ensure only authenticated and authorized users can create products.
router.route("/").post(protect, admin, createProduct);

// When a PUT request with an ID parameter is made to '/:id', the updateProduct function will be called.
// The protect and admin middlewares are used to ensure only authenticated and authorized users can update products.
router.route("/:id").put(protect, admin, updateProduct);

// Export the router to be used in other parts of the application
export default router;
