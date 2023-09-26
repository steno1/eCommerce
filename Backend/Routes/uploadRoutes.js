// Importing required modules/packages

import express from "express"; // Imports the Express framework
import multer from "multer"; // Imports Multer, a middleware for handling multipart/form-data (file uploads)
import path from "path"; // Imports the Node.js 'path' module for working with file paths

// Creating an Express router
const router = express.Router();

// Creates a Multer storage engine to define where to store uploaded files
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/"); // Defines the destination directory for uploaded files
    },
    filename(req, file, cb) {
        // Defines the file name of the uploaded file
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        // `${file.fieldname}-${Date.now()}` creates a unique file name using the field name and current timestamp
        // `path.extname(file.originalname)` gets the file extension from the original file name
    }
});

// Function to check if the uploaded file is of a valid type
function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|bmp|svg/; // Defines a regular expression for allowed file extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Checks if the file extension is valid
    const mimetype = fileTypes.test(file.mimetype); // Checks if the file's MIME type is valid

    if (extname && mimetype) {
        return cb(null, true); // If both extension and MIME type are valid, return without an error
    } else {
        cb("Images only"); // If not valid, return an error message
    }
}

// Configuring Multer with the defined storage engine and file type validation function
const upload = multer({
 storage, // Specifies the storage engine defined above
});



// Handling a POST request to the root path
router.post("/", upload.single("image"), (req, res) => {
    // Handles the uploaded file using Multer middleware (single file with field name "image")
    res.send({
        message: "Image uploaded",
        image: `/${req.file.path}` // Sends a response with a message and the path to the uploaded image
    });
});

// Exporting the router for use in other parts of the application
export default router;
