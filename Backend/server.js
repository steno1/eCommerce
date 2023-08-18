// Import the 'connectDB' function from the 'db.js' file

import connectDB from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";

// Import the 'dotenv' library to load environment variables from '.env' file


// Import the 'express' library to create the server


// Import the 'products' data array


// Load environment variables from the '.env' file
dotenv.config();

// Define the port number on which the server will run, using the 'PORT' environment variable or default to 5000
const port = process.env.PORT || 5000;

// Invoke the 'connectDB' function to establish a connection with MongoDB
connectDB();

// Create an instance of the Express application
const app = express();

// Set up a route that responds with a simple message when the root URL is accessed
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Set up a route to handle requests for retrieving all products
app.get("/api/products", (req, res) => {
    // Respond with the 'products' data array in JSON format
    res.json(products);
});

// Set up a route to handle requests for retrieving a specific product by its ID
app.get("/api/products/:id", (req, res) => {
    // Find a product in the 'products' array that matches the provided ID
    const product = products.find((p) => p._id === req.params.id);

    // Respond with the found product in JSON format
    res.json(product);
});

// Start the Express server, listening on the defined port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
