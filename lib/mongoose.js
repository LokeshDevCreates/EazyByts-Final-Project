// lib/mongoose.js
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    console.log("Connecting to MongoDB URI:", process.env.MONGODB_URI);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectToDatabase;
