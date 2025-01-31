// pages/api/auth/signup.js
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

const signup = async (req, res) => {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password are required' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default signup;
