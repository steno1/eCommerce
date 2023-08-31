// Importing necessary functions from the userController.js file.

import {
     authUser,
     deleteUser,
     getUserById,
     getUserProfile,
     getUsers,
     logOutUser,
     registerUser,
     updateUser,
     updateUserProfile
} from "../controller/userController.js";

import express from "express";

// Importing the Express framework.


// Creating an instance of the Express router.
const router = express.Router();

// Defining routes and corresponding HTTP methods using the router.

// Handling POST and GET requests at the base URL ("/").
router.route("/")
    .post(registerUser) // When a POST request is made, it will call the registerUser function from the userController.
    .get(getUsers);     // When a GET request is made, it will call the getUsers function from the userController.

// Handling a POST request at the "/logout" URL.
router.post("/logout", logOutUser); // Calls the logOutUser function from the userController.

// Handling a POST request at the "/login" URL.
router.post("/login", authUser); // Calls the authUser function from the userController.

// Handling GET and PUT requests at the "/profile" URL.
router.route("/profile")
    .get(getUserProfile) // When a GET request is made, it will call the getUserProfile function from the userController.
    .put(updateUserProfile); // When a PUT request is made, it will call the updateUserProfile function from the userController.

// Handling DELETE and GET requests at the "/:id" URL. The ":id" is a parameter that will be replaced by an actual user ID.
router.route("/:id")
    .delete(deleteUser) // When a DELETE request is made, it will call the deleteUser function from the userController.
    .get(getUserById)  // When a GET request is made, it will call the getUserById function from the userController.
    .put(updateUser); // When a PUT request is made, it will call the updateUser function from the userController.

// Exporting the configured router to be used in other parts of the application.
export default router;
