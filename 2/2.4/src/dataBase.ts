import { MongoClient } from 'mongodb';
import MongoStore from 'connect-mongo';
const client: MongoClient = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('BaseForLearning');
const logins = db.collection("client");
const todoes = db.collection('tasks');

(async function () {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})()


let sessions = {
  // store: new FileStore({ path: "./sessions" }),
   secret: 'your-secret-key',
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({
     clientPromise: client.connect(),
     dbName: 'BaseForLearning',
     collectionName: 'sessions',
   }),
   cookie: {
    httpOnly: true, // Заборонити доступ до cookie з JS на клієнті
    secure: process.env.NODE_ENV === 'production',  // Для розробки на локальному сервері можна встановити false
  },
 }

export { todoes,logins,sessions }