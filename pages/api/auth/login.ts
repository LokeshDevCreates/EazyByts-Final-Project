import { connectToDatabase } from "../../../utils/mongodb";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Respond with success
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
