import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cookieParser  from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());  
app.use(cors({origin:"*", credentials:true}))
app.disable("x-powered-by"); //less hacker know about our stack


// Routes
// default rout
app.get("/",(req,res) => {
  return res.status(200).json({
    status:"success",
    statusCode:200,
    message:"Welcome to Bclics API"
  })
})

app.use("/api/users", userRoutes); // User-related routes



// Default error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});


// NOT FOUND ROUTE
app.use("*",(req,res) => {
  res.status(400).json({
    status:"error",
    statusCode:400,
    message:"Page Not Found"
  })
})

// Start Server
const PORT = process.env.PORT || 5000;

export const start = async() => {
  // Connect to MongoDB
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
  );
  
}