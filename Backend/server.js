// Import the 'connectDB' function from the 'db.js' file

import { errorHandler, notFound } from "./middleWare/errorMiddleWare.js";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import orderRoutes from "./Routes/orderRoutes.js";
import productRoutes from "./Routes/ProductsRoutes.js";
import userRoutes from "./Routes/userRoute.js";

// Load environment variables from the '.env' file
dotenv.config();

// Define the port number on which the server will run, using the 'PORT' environment variable or default to 5000
const port = process.env.PORT || 5000;

// Invoke the 'connectDB' function to establish a connection with MongoDB
connectDB();

// Create an instance of the Express application
const app = express();

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//cookie parser middleware
app.use(cookieParser())

// Set up a route that responds with a simple message when the root URL is accessed
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use(`/api/products`, productRoutes)
app.use(`/api/users`, userRoutes)
app.use(`/api/orders`, orderRoutes)
app.use(notFound);
app.use(errorHandler)

// Start the Express server, listening on the defined port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
