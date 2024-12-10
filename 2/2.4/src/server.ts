import  { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
const server = express()

import cors from "cors";
import {handler} from "./router"
import session from 'express-session';
const FileStore = require('session-file-store')(session);




server.use(express.json(), bodyParser.json(), cors(), express.static('front'), session({
  store: new FileStore({}),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

server.post("/api/v2/router", (req: Request, res: Response) => {
  console.log("router")
  let action = req.query.action
  if (action && typeof action === "string") {
    console.log("1")
    handler[action](req, res)
  }
})

server.listen(3000, async () => {

  console.log("listenning")

})

