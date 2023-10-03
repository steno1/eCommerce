// Import the controller functions for handling requests

import { admin, protect } from "../middleware/authMiddleware.js";
import {
     createProduct,
     createProductReview,
     deleteProduct,
     getProductById,
     getProducts,
     getTopProducts,
     updateProduct
} from "../controller/productController.js";

import CheckObjectId from "../middleWare/CheckObjectId.js";
import express from "express";

// Import the express module

// Create an instance of the Express router
const router = express.Router();

// Define routes and their corresponding controller functions

// When a GET request is made to '/', the getProducts function will be called
router.route('/').get(getProducts);

// When a GET request is made to '/top', the getTopProducts function will be called
router.route("/top").get(getTopProducts);

// When a POST request is made to '/', the createProduct function will be called.
// The protect and admin middlewares are used to ensure only authenticated and authorized users can create products.
router.route("/").post(protect, admin, createProduct);

// When a GET request with an ID parameter is made to '/:id', the getProductById function will be called
router.route("/:id").get(CheckObjectId, getProductById);

// When a PUT request with an ID parameter is made to '/:id', the updateProduct function will be called.
// The protect and admin middlewares are used to ensure only authenticated and authorized users can update products.
router.route("/:id").put(protect,CheckObjectId, admin, updateProduct);

// When a DELETE request with an ID parameter is made to '/:id', the deleteProduct function will be called.
// The protect and admin middlewares are used to ensure only authenticated and authorized users can delete products.
router.route("/:id").delete(protect, CheckObjectId, admin, deleteProduct);

// When a POST request with an ID parameter is made to '/:id/reviews', the createProductReview function will be called.
// The protect middleware is used to ensure only authenticated users can create reviews.
router.route("/:id/reviews").post(protect,CheckObjectId,
     createProductReview);


// Export the router to be used in other parts of the application
export default router;
