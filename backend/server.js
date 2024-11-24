import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes); // User-related routes

// Default error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
