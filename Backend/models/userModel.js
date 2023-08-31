// Import the Mongoose library for MongoDB interaction

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

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

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
// Create a Mongoose model named 'User' using the 'userSchema' schema
const User = mongoose.model("User", userSchema);

// Export the 'User' model for use in other modules
export default User;
