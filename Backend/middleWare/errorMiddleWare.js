// Middleware to handle 404 (Not Found) errors.
// This middleware is executed when no route matches the requested URL.
const notFound = (req, res, next) => {
    // Create a new error instance with a descriptive message.
    const error = new Error(`Not found - ${req.originalUrl}`);
    
    // Set the response status code to 404 (Not Found).
    res.status(404);
    
    // Pass the error to the next middleware in the stack.
    next(error);
  };
  
  // Global error handler middleware.
  // This middleware handles errors that occur during request processing.
  const errorHandler = (err, req, res, next) => {
    // Determine the appropriate status code for the response.
    // If the response status is already 200, set it to 500 (Internal Server Error).
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Extract the error message from the error object.
    let message = err.message;
  
  
    // Set the response status code and send a JSON response with error details.
    res.status(statusCode).json({
      message,
      stack: process.env.Node_Env === "production" ? "😱" : err.stack,
    });
  };
  
  // Export the defined middleware functions to be used in other parts of the application.
  export { notFound, errorHandler };
  