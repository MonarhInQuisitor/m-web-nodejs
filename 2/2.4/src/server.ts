import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
const server = express()
import itemsRouter from "./router";
import {sessions} from "./dataBase"

import cors from "cors";
import session from 'express-session';
const PORT = 3000;

import ngrok from 'ngrok';
(async function () {
  const url = await ngrok.connect(3000);
  console.log(url)
  server.use(cors({
    origin: ["http://localhost:3000",url], // Дозволений домен
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Дозволені методи
    allowedHeaders: ['Content-Type', 'Authorization'], // Дозволені заголовки
    credentials: true, // Дозволяємо передачу куків
  }));
  
  server.get("/getUrl",(req : Request,res : Response)=>{res.json({url : url })})
server.use(express.json(), bodyParser.json(),express.static('front'), session(sessions))


server.use("/api/v2/router",itemsRouter)

server.listen(PORT,  async () => {

  console.log("listenning")

})
})();







