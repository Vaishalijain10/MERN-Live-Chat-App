// inside this file, we will write all the routes related to our user

// importing express
const express = require("express");

// importing registerUser section from userController file from controllers folder
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
// importing a middleware to check weather the user is logged in or not
const { protect } = require("../middleware/authMiddleware");

// router is  used to create different routes
const router = express.Router();

// route for register page where registerUser is controller
// // user searching api ->route is appended with the  same end point
// project is the function in authMiddleware file. the compiler have to go through protect before moving to allUser function
// router.route("/").post(registerUser);
// router.route("/").get(protect, allUsers);
router.route("/").post(registerUser).get(protect, allUsers);

// route for login page where authUser is controller
// router.route("/login", authUser);
router.route("/login").post(authUser);

module.exports = router;
