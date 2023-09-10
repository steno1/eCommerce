// Importing the User model from the userModel.js file.

import { Error } from "mongoose";
import User from "../models/userModel.js";
import asyncHandler from "../middleWare/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// Importing the asyncHandler middleware from the asyncHandler.js file.

// Defining the authUser function with asyncHandler middleware.
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructuring email and password from the request body.
  const user = await User.findOne({ email }); // Finding a user in the database by their email.

  if (user && (await user.matchPassword(password))) {
 /* Checking if a user with the provided email
  exists and the password matches.*/
   generateToken(res, user._id)

    // Sending a JSON response with user details (excluding password).
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // If user authentication fails, return a 401 status and throw an error.
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Defining the registerUser function with asyncHandler middleware.
const registerUser = asyncHandler(async (req, res) => {
  // Destructuring the user registration information from the request body.
  const { name, email, password } = req.body;

  // Checking if a user with the provided email already exists in the database.
  const userExist = await User.findOne({ email });

  if (userExist) {
    // If a user with the provided email already exists, respond with a 400 Bad Request status and throw an error.
    res.status(400);
    throw new Error("User already exists"); // Informing the client that the user already exists.
  }

  // If the user with the provided email does not exist, proceed with user registration.
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // If user registration is successful, generate a JWT token and set it in the response header.
    generateToken(res, user._id);

    // Responding to the client with a 201 Created status and a JSON object
// containing user information (excluding the password).
res.status(201).json({
  _id: user._id, // Unique identifier for the newly registered user.
  name: user.name,  // User's full name.
  email: user.email, // User's email address.
  isAdmin: user.isAdmin, // Indicates whether the user has administrative privileges.
});

  } else {
    // If user registration fails for any reason, respond with a 400 Bad Request status and throw an error.
    res.status(400);
    throw new Error("Invalid user data"); // Informing the client that the provided user data is invalid.
  }
});

// Defining the logOutUser function with asyncHandler middleware.
const logOutUser = asyncHandler(async(req, res) => {
  // Clearing the JWT cookie by setting it to an empty string with specific options.
  res.cookie("jwt", "", {
    httpOnly: true,// Making the cookie accessible only through HTTP requests.
    expires: new Date(0) // Setting the expiration date to a past date to delete the cookie.
  });

  // Sending a JSON response to indicate that the user has been successfully logged out.
  res.status(200).json({ message: 'Logged out successfully !' });
});


// Defining the getUserProfile function with asyncHandler middleware.
const getUserProfile = asyncHandler(async (req, res) => {
// Await a database query to find a user by their unique identifier (req.user._id).
  const user = await User.findById(req.user._id);

  // Check if a user with the specified identifier was found.
  if (user) {
    // If a user was found, set the HTTP response status to 200 (OK) and send a JSON response with user details.
    res.status(200).json({
      _id: user._id,  // Send the unique identifier of the user.
      name: user.name, // Send the user's name.
      email: user.email, // Send the user's email address.
      isAdmin: user.isAdmin // Send whether the user has administrative privileges.
    });
  } else {
    // If no user was found with the specified identifier, set the HTTP response status to 404 (Not Found) and throw an error.
    res.status(404);
    throw new Error("User not found"); // The error message indicates that the user was not found.
  }
});

// Define an asynchronous function named updateUserProfile using the asyncHandler middleware.
const updateUserProfile = asyncHandler(async (req, res) => {
  // Await a database query to find a user by their unique identifier (req.user._id).
  const user = await User.findById(req.user._id);

  // Check if a user with the specified identifier was found.
  if (user) {
 // Update the user's name and email if provided in the request body, or keep them unchanged.
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Check if a new password is provided in the request body.
    if (req.body.password) {
      user.password = req.body.password; // Update the user's password.
    }

    // Save the updated user object back to the database.
    const updatedUser = await user.save();

// Set the HTTP response status to 200 (OK) and send a JSON response with the updated user details.
    res.status(200).json({
      _id: updatedUser._id, // Send the unique identifier of the updated user.
      name: updatedUser.name, // Send the updated user's name.
      email: updatedUser.email, // Send the updated user's email address.
      isAdmin: updatedUser.isAdmin // Send whether the updated user has administrative privileges.
    });
  } else {
    // If no user was found with the specified identifier, set the HTTP response status to 404 (Not Found) and throw an error.
    res.status(404);
    throw new Error("User not found"); // The error message indicates that the user was not found.
  }
});

// Defining the getUsers function with asyncHandler middleware.
const getUsers = asyncHandler((req, res) => {
  res.send("get users"); // Sending a response with a message indicating fetching all users.
});

// Defining the getUserById function with asyncHandler middleware.
const getUserById = asyncHandler((req, res) => {
  res.send("update User Profile"); // Sending a response with a message indicating fetching a user by ID.
});

// Defining the updateUser function with asyncHandler middleware.
const updateUser = asyncHandler((req, res) => {
  res.send("update User Profile"); // Sending a response with a message indicating updating a user by ID.
});

// Defining the deleteUser function with asyncHandler middleware.
const deleteUser = asyncHandler((req, res) => {
  res.send("delete user"); // Sending a response with a message indicating user deletion.
});

// Exporting all the defined functions as part of a named export.
export {
  authUser,
  registerUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
  logOutUser
};
