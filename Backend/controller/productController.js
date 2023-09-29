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

// Define an asynchronous handler function named createProduct which takes req and res as parameters
const createProduct = asyncHandler(async (req, res) => {
    // Create a new instance of the Product model with initial values
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReview: 2,
        description: "Sample description"
    })

    // Save the newly created product to the database and assign the result to createProduct
    const createProduct = await product.save();

    // Send a response back to the client with status code 201 (created) and the created product in JSON format
    res.status(201).json(createProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  // Destructuring assignment to extract properties from req.body
  const { name, price, description, image, brand, category, countInStock } = req.body

  // Find the product in the database based on the provided ID
  const product = await Product.findById(req.params.id);

  // Check if a product with the provided ID was found
  if (product) {
      // Update the product properties with the provided values
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      // Save the updated product to the database
      const updatedProduct = await product.save();
      res.json(updatedProduct); // Send the updated product as a JSON response
  } else {
      // If the product is not found, set a 404 status
      res.status(404);

      // Throw an error to be caught by the error handling middleware
      throw new Error("Resource not found");
  }
});

// Define a controller function named deleteProduct which handles deletion of a product
const deleteProduct = asyncHandler(async (req, res) => {
    // Find the product in the database based on the provided ID
    const product = await Product.findById(req.params.id);

    // Check if a product with the provided ID was found
    if (product) {
        // If product is found, proceed with deletion
        await Product.deleteOne({
            _id: product._id // Delete the product with matching ID
        });
        
        // Send a JSON response with a 200 status code to indicate success
        res.status(200).json({
            message: "Product deleted" // Provide a success message
        });      
    } else {
        // If the product is not found, set a 404 status
        res.status(404);

        // Throw an error to be caught by the error handling middleware
        throw new Error("Product not found");  
    }
});
const createProductReview = asyncHandler(async (req, res) => {
    // Destructure 'rating' and 'comment' from the request body
    const { rating, comment } = req.body;

    // Find the product in the database based on the provided ID
    const product = await Product.findById(req.params.id);

    // Check if a product with the provided ID was found
    if (product) {
        // Check if the user has already reviewed the product
        const alreadyReviewed = product.reviews.find((review) =>
            review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed"); // Throw an error if already reviewed
        }

        // Create a new review object
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        // Add the review to the product's reviews array
        product.reviews.push(review);

        // Update the number of reviews
        product.numReviews = product.reviews.length;

        // Calculate the new average rating
        product.rating =
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length;

        // Save the updated product to the database
        await product.save();

        // Send a JSON response with a 201 status code to indicate success
        res.status(201).json({
            message: "Review added",
        });
    } else {
        // If the product is not found, set a 404 status
        res.status(404);
        throw new Error("Resource not found"); // Throw an error if product not found
    }
});


// Export the controller functions to be used in other parts of the application
export { getProductById, getProducts, 
    createProduct, updateProduct,
    deleteProduct, createProductReview};
