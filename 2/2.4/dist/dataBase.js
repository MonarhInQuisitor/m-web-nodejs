"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.logins = exports.todoes = void 0;
const mongodb_1 = require("mongodb");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const client = new mongodb_1.MongoClient('mongodb://127.0.0.1:27017');
const db = client.db('BaseForLearning');
const logins = db.collection("client");
exports.logins = logins;
const todoes = db.collection('tasks');
exports.todoes = todoes;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB");
        }
        catch (err) {
            console.error("MongoDB connection error:", err);
        }
    });
}
connectDB();
let sessions = {
    // store: new FileStore({ path: "./sessions" }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        clientPromise: client.connect(),
        dbName: 'BaseForLearning',
        collectionName: 'sessions',
    }),
    cookie: {
        httpOnly: true, // Заборонити доступ до cookie з JS на клієнті
        secure: process.env.NODE_ENV === 'production', // Для розробки на локальному сервері можна встановити false
    },
};
exports.sessions = sessions;
