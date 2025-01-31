// pages/api/auth/signup.js
import connectToDatabase from "../../../lib/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();

      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered." });
      }

      // Create and save the new user
      const newUser = new User({ username, password, email });
      await newUser.save();

      res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
