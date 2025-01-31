import connectToDatabase from '../../../../lib/mongoose';

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: 'Database connected successfully' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
}
