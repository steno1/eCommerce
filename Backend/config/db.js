// Import the 'mongoose' library for interacting with MongoDB

import mongoose from "mongoose";

// Define an asynchronous function called 'connectDB'
const connectDB = async () => {
    try {
        // Attempt to establish a connection to the MongoDB database using the provided URI
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If the connection is successful, log a message indicating the successful connection
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // If an error occurs during connection, catch the error and handle it
        console.log(`Error: ${error.message}`);

        // Exit the Node.js process with a non-zero status code (indicating an error)
        process.exit(1);
    }
}

// Export the 'connectDB' function so that it can be used in other parts of the application
export default connectDB;
