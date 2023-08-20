// Import necessary models and modules

import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import colors from "colors"; // Library for adding colors to console output
import connectDB from "./config/db.js"; // Custom database connection module
import dotenv from "dotenv"; // Module for loading environment variables
import mongoose from "mongoose"; // MongoDB object modeling tool
import products from "./data/products.js"; // Import product data
import users from "./data/users.js"; // Import user data

// Load environment variables from a .env file
dotenv.config();

// Connect to the database using the custom module
connectDB();

// Define an asynchronous function to import data
const importData = async () => {
    try {
        // Delete existing data in the Order, Product, and User collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert many user records into the User collection
        const createdUser = await User.insertMany(users);
        // Extract the ID of the first user (assumed to be the admin)
        const adminUser = createdUser[0]._id;

        // Create sample product records based on imported data, linking them to the admin user
        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser
            };
        });

        // Insert many product records into the Product collection
        await Product.insertMany(sampleProducts);

        // Display a success message and exit the process
        console.log("Data imported!".green.inverse);
        process.exit();
    } catch (error) {
        // Display an error message, exit with an error code
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Define an asynchronous function to destroy data
const destroyData = async () => {
    try {
        // Delete all data in the Order, Product, and User collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Display a message indicating successful data destruction and exit
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        // Display an error message, exit with an error code
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check command line arguments to determine whether to import or destroy data
if (process.argv[2] === "-d") {
    destroyData(); // If -d flag is present, destroy data
} else {
    importData(); // If no flag is present, import data
}
