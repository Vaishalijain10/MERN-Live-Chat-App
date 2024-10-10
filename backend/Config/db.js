// importing mongoose
const mongoose = require("mongoose");

// connecting with database -> it is an asynchronous function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //   useNewParser: true,
    //   useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
