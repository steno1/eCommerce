// Importing middleware and modules/packages

import { errorHandler, notFound } from "./middleWare/errorMiddleWare.js"; // Importing custom error handling middleware

import connectDB from "./config/db.js"; // Importing a function to connect to the database
import cookieParser from "cookie-parser"; // Middleware to parse cookies in incoming requests
import dotenv from "dotenv"; // Loading environment variables
import express from "express"; // Importing the Express framework
import orderRoutes from "./Routes/orderRoutes.js"; // Importing routes for orders
import path from "path"; // Importing the Node.js 'path' module for file paths
import productRoutes from "./Routes/ProductsRoutes.js"; // Importing routes for products
import products from "./data/products.js"
import uploadRoutes from "./Routes/uploadRoutes.js"; // Importing routes for uploads
import userRoutes from "./Routes/userRoute.js"; // Importing routes for users

dotenv.config(); // Load environment variables

// Define the port number on which the server will run, using the 'PORT' environment variable or default to 5000
const port = process.env.PORT || 5000;

// Invoke the 'connectDB' function to establish a connection with MongoDB
connectDB();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON and URL-encoded data in incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Set up routes for various resources (products, users, orders)
app.use(`/api/products`, productRoutes);
app.use(`/api/users`, userRoutes);
app.use(`/api/orders`, orderRoutes);
app.use(`/api/upload`, uploadRoutes);

// Set up a route to handle PayPal configuration
app.get("/api/config/paypal", (req, res) => {
    // Send PayPal client ID from environment variables
    res.send({ clientId: process.env.payPal_client_Id });
});
app.get("/api/products", (req, res)=>{
    res.json(products)
    })


app.get("/api/products/:id", (req, res)=>{
    const product=products.find((x)=>x._id===req.params.id)
    res.json(product)
})

// Get the current directory path and store it in '__dirname'
const __dirname=path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Serve static files in '/uploads' directory

if(process.env.NODE_ENV==="production"){
    // Serve static files from '/frontend/build' in production
    app.use(express.static(path.join(__dirname, "/frontend/build")))

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
// This line serves the 'index.html' file located in the 'frontend/build' directory.

} else {
    // For all other routes, respond with "Api is running..."
    app.get("/", (req, res)=>{
        res.send("Api is running...")
    })   
}

// Apply custom 'notFound' and 'errorHandler' middleware for handling errors
app.use(notFound);
app.use(errorHandler);


// Start the Express server, listening on the defined port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
