import { MongoClient } from 'mongodb';
const client: MongoClient = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('BaseForLearning');
const logins = db.collection("client");
const todoes = db.collection('tasks');

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB()
export { todoes,logins }