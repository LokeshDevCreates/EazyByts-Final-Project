import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI || 'mongodb+srv://lokesh:eazybyts@cluster0.tdbz6.mongodb.net/login?retryWrites=true&w=majority';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Ensure the MongoClient instance is reused to prevent multiple connections
if (!global._mongoClientPromise) {
  client = new MongoClient(uri); // No additional options are required
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db('login'); // Replace 'login' with your database name
  return { db, client };
};
