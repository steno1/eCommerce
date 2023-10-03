// Import the 'isValidObjectId' function from the 'mongoose' package

import { isValidObjectId } from 'mongoose';

// Define a middleware function called 'CheckObjectId'
function CheckObjectId (req, res, next) {
  // Check if the provided parameter 'id' is a valid MongoDB ObjectId
  if (!isValidObjectId(req.params.id)) {
    // If 'id' is not valid, set the HTTP status to 404 (Not Found)
    res.status(404);

    // Throw an error with a message indicating the invalid ObjectId
    throw new Error(`Invalid ObjectId of: ${req.params.id}`);
  }

  // If 'id' is valid, call the 'next' function to continue with the next middleware or route handler
  next();
}

// Export the 'CheckObjectId' middleware for use in other parts of the application
export default CheckObjectId;
