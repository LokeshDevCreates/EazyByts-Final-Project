// pages/api/auth/login.js
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

const login = async (req, res) => {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // User is authenticated
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default login;
