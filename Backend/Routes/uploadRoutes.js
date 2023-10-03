// Import necessary modules

import express from 'express'; // Import the Express framework
import multer from 'multer'; // Import the Multer middleware for file uploads
import path from 'path'; // Import the built-in 'path' module for working with file paths

// Create an instance of an Express Router
const router = express.Router();

// Define storage configuration for uploaded files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Specify the destination directory for uploaded files
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Define the filename for the uploaded file
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define a custom file filter function
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/; // Define allowed file extensions
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/; // Define allowed MIME types

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); // Accept the file if both conditions are met
  } else {
    cb(new Error('Images only!'), false); // Reject the file if conditions are not met
  }
}

// Create a Multer instance with defined storage and file filter
const upload = multer({ storage, fileFilter });

// Create middleware to handle a single uploaded image
const uploadSingleImage = upload.single('image');

// Define a route to handle POST requests for file uploads
router.post('/', (req, res) => {
  // Call the upload middleware to process the uploaded file
  uploadSingleImage(req, res, function (err) {
    if (err) {
      // Handle any errors that occur during the upload process
      return res.status(400).send({ message: err.message });
    }

    // If upload is successful, send a success response with the uploaded image path
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

// Export the router for use in other parts of the application
export default router;
