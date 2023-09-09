import Jwt from "jsonwebtoken";

const generateToken=(res, userId)=>{
    const token = Jwt.sign(
        {
          userId
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
}

export default generateToken;