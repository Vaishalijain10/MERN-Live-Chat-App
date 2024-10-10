const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

// Environment variables configuration
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

// Connect to the database
connectDB();

const app = express();
app.use(express.json());
// Enable CORS for both development and production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-frontend-domain.onrender.com" // Replace with your production frontend URL
        : "http://localhost:3000", // Frontend for local development
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// It is used to tell the app to accept the data in JSON format
app.use(express.json());

// API - Health check route for testing
// app.get("/", (req, res) => {
//   res.send("hehe!! --> API is Running Successfully!");
// });

// API routes for user, chat, and messages
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------
// Serve static files and React frontend in production
const __dirname1 = path.resolve(); // Get the root directory

if (process.env.NODE_ENV === "production") {
  console.log("Serving React app from build directory.");
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  // Handle all GET requests to serve the React app
  app.get("*", (req, res) =>
    // console.log("Routing to index.html");
    res.sendFile(
      path.resolve(__dirname1, "..", "frontend", "build", "index.html")
    )
  );
} else {
  // In development, serve a simple message for the API
  app.get("/", (req, res) => {
    res.send("API is Running Successfully!");
  });
}

// --------------------------deployment------------------------------

// Initialize an HTTP server
const server = http.createServer(app);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Log errors in the console for debugging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Create port and listen for incoming requests
const PORT = process.env.PORT;

const serverListen = server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.green.bold`);
});

// Socket.io Configuration
const io = socketIo(serverListen, {
  pingTimeout: 60000,
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-frontend-domain.onrender.com" // Replace with your production frontend URL
        : "http://localhost:3000", // Local frontend for development
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  // Setup socket room for user
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`User with ID: ${userData._id} connected`);
    socket.emit("connected");
  });

  // Join chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // Typing indicators
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle new message
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });

  // Off event for setup
  socket.off("setup", (userData) => {
    if (userData) {
      console.log(`USER DISCONNECTED: ${userData._id}`);
      socket.leave(userData._id);
    }
  });
});
