import express from "express";
import bodyParser from "body-parser";
const server = express()
import itemsRouter from "./router";
import session from 'express-session';
const FileStore = require('session-file-store')(session);


server.use(express.json(), bodyParser.json(), express.static('front'), session({
  store: new FileStore({}),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))
server.use("/api/v2",itemsRouter)

server.listen(process.env.port||3000, async () => {

  console.log("listenning")

})

