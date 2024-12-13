// src/types/express-session.d.ts
import { SessionData } from "express-session";
import { ObjectId } from "mongodb";

declare module "express-session" {
  interface SessionData {
    user: {
        login : String 
    }}; // або вказати точний тип для `user`, якщо є
  }
