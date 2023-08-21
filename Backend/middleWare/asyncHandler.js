// Define a utility function called asyncHandler.
// It takes an asynchronous function (fn) as its argument.
const asyncHandler = fn => (req, res, next) => {
    // Wrap the execution of the provided asynchronous function (fn)
    // inside Promise.resolve() to ensure it returns a Promise.
    // Pass the request (req), response (res), and next middleware function (next) as arguments.
    // If fn resolves successfully, it moves to the next middleware.
    // If fn rejects (throws an error), the error is caught using catch(next).
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  // Export the asyncHandler function to be used in other parts of the application.
  export default asyncHandler;
  