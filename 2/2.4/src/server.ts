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
console.log("init");
(async function () {
  const url = await ngrok.connect(PORT);
  console.log(url)
  server.use(cors({
    origin: ["http://localhost:3000",url], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  }));
  
  server.get("/getUrl",(req : Request,res : Response)=>{res.json({url : url })})
server.use(express.json(), bodyParser.json(),express.static('front'), session(sessions))


server.use("/api/v2/router",itemsRouter)

server.listen(PORT,  async () => {

  console.log("listenning")

})
})();







