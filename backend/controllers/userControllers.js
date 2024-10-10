// handle the logic of the routes -> userRoute.js

const asyncHandler = require("express-async-handler");
// importing user model -> to use this model to structure our database
const User = require("../Models/userModel");
// importing generate Token
const generateToken = require("../Config/generateToken");

// Register Route - handling errors in controllers
//  below function is wrapper by asyncHandler package used to handle the errors in the routes
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //   checking user entry to be valid or not
  if (!name || !email || !password) {
    res.status(400);
    throw new error("Please Enter all the Fields!");
  }
  //   mongodb query to find / fetch the email
  const userExists = await User.findOne({ email });
  //user already exists condition
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }
  // creating new user condition -> User.create -> query to database
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  // database fields matching with user input
  //   here, we are sending to user a token is also send.
  if (user) {
    try {
      const token = await generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token,
      });
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  } else {
    throw new Error("Failed to create the User. Try Again Later!");
  }
});

// Login Route -
const authUser = asyncHandler(async (req, res) => {
  //  taking input from user to login
  const { email, password } = req.body;

  // checking in database weather the user already exits or not
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password!");
  }
});

// searching all users
// we are using queries to search where "search" in the url below is the variable.
// api will looks like  -> /api/user?search=bulbul
// regex help in matching and filtering the search
// $ne is not equal -> these are operators in mongodb
// find({ _id: { $ne: req.user._id } }); -> we need to authorize the user is login or not -> middleware/auth
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log("all users controller keyword " + keyword);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  console.log("all users controller users " + users);
  res.send(users);
});

// not a default export -> just exporting the registerUser section
module.exports = { registerUser, authUser, allUsers };
