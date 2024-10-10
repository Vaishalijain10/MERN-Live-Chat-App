// importing
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel.js");
const asyncHandler = require("express-async-handler");

// middleware have 3 parameters -> req,res,next
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   token -> bearer token -> authorizing
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // took the token to verify
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      //   this is the token we have defined in .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   User -> schema name -> decode it and find the password
      req.user = await User.findById(decoded.userId).select("-password");

      //   next to move to the next operation
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  //   if the above function does not work  than the below function will work -> like token is not there than below function will work
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
