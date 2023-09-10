// Importing the Jwt module from the "jsonwebtoken" package.

import Jwt from "jsonwebtoken";

// Defining a function named "generateToken" that generates and sets a JWT token as an HTTP-only cookie.
const generateToken = (res, userId) => {
  // Generating a JWT token with the provided "userId" payload.
  const token = Jwt.sign(
    {
      userId, // Payload: Unique user identifier (typically the user's ID).
    },
    process.env.JWT_SECRET, // Secret key used to sign the token, usually stored in environment variables.
    {
      expiresIn: "30d", // Setting the token expiration to 30 days.
    }
  );

  // Setting the generated JWT token as an HTTP-only cookie in the response.
  res.cookie("jwt", token, {
    httpOnly: true, // Making the cookie accessible only through HTTP requests for security.
    secure: process.env.NODE_ENV !== "development", // Setting the "secure" flag for production to ensure it's transmitted only over HTTPS.
    sameSite: "strict", // Specifying same-site cookie behavior for added security.
    maxAge: 30 * 24 * 60 * 60 * 1000, // Setting the maximum age of the cookie to 30 days in milliseconds (30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds).
  });
};

// Exporting the "generateToken" function as the default export of this module.
export default generateToken;
