// Import necessary libraries and modules

import Jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Import the User model (assuming it's defined elsewhere)
import asyncHandler from "./asyncHandler.js"; // Import an async handler utility (likely for error handling)

// Import the JSON Web Token library

// Middleware function to protect routes with authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;//initialize token variable
    token = req.cookies.jwt; // Get the jwt token from the request's cookies

    if (token) {
        try {
 // Verify the token using the JWT_SECRET stored in the environment variables
     const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by their ID, excluding the password field(s)
    req.user= await User.findById(decoded.userId).select("-password");
/* req.user, the result of the database query is
 assigned to the req.user property. This is a common pattern in
  Node.js web applications, where you attach data related to the
 authenticated user to the req object. By doing this, the user 
data is available for subsequent middleware functions or route handlers to use.*/
 // If the token is valid and the user is found, proceed to the next middleware
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        // If there's no token in the request, respond with a 401 Unauthorized error
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
});

// Middleware function to check if a user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // If the user is an admin, proceed to the next middleware
        next();
    } else {
        // If the user is not an admin, respond with a 401 Unauthorized error
        res.status(401);
        throw new Error("Not authorized as admin");
    }
};

// Export the middleware functions for use in other parts of the application
export { protect, admin };
