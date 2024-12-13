import express, { Request, Response } from "express";


import { getItems, createItem, editItem, deleteItem } from "./crud";
import {login,logout,register} from "./authorization"

const router = express.Router();
router.all("/router", (req: Request, res: Response) => {
  console.log("router")
  let action = req.query.action
  if (action && typeof action === "string") {
    handler[action](req,res)
  }else{
    res.status(400).json({error:"input error"})
  }
})
const handler: Record<string, any> = {
    getItems: getItems,
    login: login,
    logout: logout,
   editItem: editItem,
    deleteItem: deleteItem,
    createItem: createItem,
    register: register
  }
  
  export default router;