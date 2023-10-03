// Importing the User model from the userModel.js file.

import { Error } from "mongoose";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
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
const getUsers = asyncHandler(async(req, res) => {
  const users= await User.find({}) // Fetch all users from the database.
  if(users){
    res.status(200).json(users) // If users are found, respond with a JSON array of users with a 200 status.
  }else{
    res.status(404).json("Users not found") // If no users are found, respond with a 404 status and a message.
  }
});

// Defining the getUserById function with asyncHandler middleware.
const getUserById = asyncHandler(async(req, res) => {
  const user=await User.findById(req.params.id).select("-password") // Find a user by their unique ID, excluding their password.
  if(user){
    res.status(200).json(user) // If user is found, respond with a JSON object of the user with a 200 status.
  }else{
    res.status(404); // If user is not found, set a 404 status.
    throw new Error("User not found") // Throw an error to indicate that the user was not found.
  }
});

// Defining the updateUser function with asyncHandler middleware.
const updateUser = asyncHandler(async(req, res) => {
  const user=await User.findById(req.params.id) // Find a user by their unique ID.
  if(user){
    user.name=req.body.name || user.name; // Update user's name with the provided value, or keep it unchanged.
    user.email=req.body.email || user.email; // Update user's email with the provided value, or keep it unchanged.
    user.isAdmin=Boolean(req.body.isAdmin); // Update user's isAdmin status with the provided value.

   const updatedUser = await user.save(); // Save the updated user object back to the database.

res.status(200).json({
  _id: updatedUser._id, // Respond with a JSON object of the updated user details.
  name: updateUser.name, // Include the updated user's name.
  email: updateUser.email, // Include the updated user's email.
  isAdmin: updatedUser.isAdmin // Include the updated user's isAdmin status.
});

  }else{
    res.status(404); // If user is not found, set a 404 status.
    throw new Error("User not found") // Throw an error to indicate that the user was not found.
  }
});

// Defining the deleteUser function with asyncHandler middleware.
const deleteUser = asyncHandler(async(req, res) => {
  const user=await User.findById(req.params.id) // Find a user by their unique ID.
  if(user){
    if(user.isAdmin){
      res.status(400);
      throw new Error("Cannot delete admin user") // If user is an admin, respond with a 400 status and a message.
    }
    await User.deleteOne({_id:user._id}) // Delete the user from the database.
    res.status(200).json({message:"User deleted successfully"}) // Respond with a message indicating successful deletion.
  }else{
    res.status(404); // If user is not found, set a 404 status.
    throw new Error("User not found") // Throw an error to indicate that the user was not found.
  }
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
