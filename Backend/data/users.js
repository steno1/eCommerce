// Import the 'bcrypt' library for password hashing

import bcrypt from "bcryptjs";

//const { hashSync } = bcrypt;

// Define an array of user objects, including name, email, hashed password, and isAdmin status
const users = [
    {
        name: "Admin user",// User's name
        email: "admin@gmail.com", // User's email
        password: bcrypt.hashSync("123456", 10), // Hashed password using bcrypt
        isAdmin: true // User is an admin
    },
    {
        name: "john", // User's name
        email: "john@gmail.com", // User's email
        password: bcrypt.hashSync("123456", 10), // Hashed password using bcrypt
        isAdmin: false // User is not an admin
    },
    {
        name: "Toochukwu",// User's name
        email: "Toochukwu@gmail.com",// User's email
        password: bcrypt.hashSync("123456", 10), // Hashed password using bcrypt
        isAdmin: false // User is not an admin
    }
];

// Export the 'users' array for use in other modules
export default users;
