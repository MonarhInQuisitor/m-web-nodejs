import { Request, Response } from "express";
import { todoes } from "./dataBase";


const getItems = async (req: Request, res: Response) => {
  try {
    console.log("GET")
    console.log("req.session.user",req.session.user)
    if (!req.session.user) {
      console.log("GET 1")
      res.json({ "error": "forbidden" })
      //let todo = await todoes.find({}, { projection: { _id: 0 } }).toArray()
    //  res.json(`{"items":${JSON.stringify(todo)}}`)
    } else {
      console.log("GET 2")
      let todo = await todoes.find({}, { projection: { _id: 0 } }).toArray()
      res.json(`{"items":${JSON.stringify(todo)}}`)

    }
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }

}



const createItem = async (req: Request, res: Response) => {
  try {
    console.log("POST")
    let documentId = await todoes.find({}, { projection: {id : 1, _id : 0} }).sort({id:-1}).limit(1).toArray()
   console.log(documentId[0])
     let lastId : number;
    if(!documentId[0]){
      lastId=0
    }else{
      lastId =  documentId[0].id
    }
    console.log(lastId)
    const el = { id: ++lastId, text: req.body.text, checked: true }
    res.json(el)
    await todoes.insertOne(el)
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }
}


const editItem = async (req: Request, res: Response) => {
  try {
    console.log("update")
    const { id, text, checked } = req.body
    if (typeof id === "number" && typeof text === "string" && typeof checked === "boolean") {
      await todoes.updateOne({ id: id }, { $set: { text: text, checked: checked } })
      res.json({ "ok": true })
    } else { 
      res.status(400).json({ "error": "type isn't correct" }); }
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }

}

const deleteItem = async (req: Request, res: Response) => {
  try {
    console.log("DELETE")
    let id1: number = req.body.id
    res.json({ "ok": true })
    console.log({ "ok": true });
    await todoes.deleteOne({ id: id1-- })
    await todoes.updateMany({ id: { $gt: id1 } }, { $inc: { id: -1 } })
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }
}

export { getItems, createItem, editItem, deleteItem }