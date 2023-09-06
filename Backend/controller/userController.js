// Importing the User model from the userModel.js file.

import { Error } from "mongoose";
import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../middleWare/asyncHandler.js";

// Importing the asyncHandler middleware from the asyncHandler.js file.

// Defining the authUser function with asyncHandler middleware.
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructuring email and password from the request body.
  const user = await User.findOne({ email }); // Finding a user in the database by their email.

  if (user && (await user.matchPassword(password))) {
 /* Checking if a user with the provided email
  exists and the password matches.*/
    const token = Jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d", // Creating a JWT token with a 30-day expiration.
      }
    );

    // Set Jwt as Http-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Setting secure flag for production.
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
    });

    // Sending a JSON response with user details (excluding password).
    res.json({
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
const registerUser = asyncHandler((req, res) => {
  res.send("register user"); // Sending a response with a message indicating user registration.
});

// Defining the logOutUser function with asyncHandler middleware.
const logOutUser = asyncHandler((req, res) => {
  res.send("logout user"); // Sending a response with a message indicating user logout.
});

// Defining the getUserProfile function with asyncHandler middleware.
const getUserProfile = asyncHandler((req, res) => {
  res.send("get user Profile"); // Sending a response with a message indicating fetching user profile.
});

// Defining the updateUserProfile function with asyncHandler middleware.
const updateUserProfile = asyncHandler((req, res) => {
  res.send("update User Profile"); // Sending a response with a message indicating updating user profile.
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
