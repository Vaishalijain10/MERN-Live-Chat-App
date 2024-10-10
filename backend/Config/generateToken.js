// importing jwt
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// load environment variables
dotenv.config();

// create generate token function
// const generateToken = async (id) => {

function generateToken(userId) {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(`generated token ${token}`); // Optional logging for verification
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error; // Re-throw for handling in the controller
  }
}

module.exports = generateToken;
