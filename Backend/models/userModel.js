// Import the Mongoose library for MongoDB interaction

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Import the bcrypt library for password hashing
   // Import the mongoose library for defining and working with MongoDB schemas and models

// Define a Mongoose schema for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,      // Store a string (user's name)
        required: true   // Name field is required
    },
    email: {
        type: String,     // Store a string (user's email)
        required: true,   // Email field is required
        unique: true  // Email must be unique
    },
    password: {
        type: String,  // Store a string (user's password)
        required: true // Password field is required
    },
    isAdmin: {
        type: Boolean, // Store a boolean (user's admin status)
        required: true, // isAdmin field is required
        default: false  // Default value if not provided
    }
}, {
    timestamps: true  // Enable automatic timestamp generation
});

// Define a custom method for the userSchema to compare an entered password with the user's stored hashed password.
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Use bcrypt's compare function to compare the enteredPassword with the user's stored hashed password.
    // This function returns a promise, so we use 'await' to wait for the result.
    return await bcrypt.compare(enteredPassword, this.password);
}

// Define a pre-save middleware for the userSchema to hash the user's password before saving it.
userSchema.pre("save", async function (next) {
    // Check if the password field has not been modified (e.g., during an update).
    if (!this.isModified("password")) {
        next(); // If not modified, proceed to the next middleware or save operation.
    }

    // Generate a salt using bcrypt with a cost factor of 10 (controls the computation time).
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using the generated salt.
    this.password = await bcrypt.hash(this.password, salt);
});

// Create a Mongoose model named 'User' using the 'userSchema' schema
const User = mongoose.model("User", userSchema);

// Export the 'User' model for use in other modules
export default User;
