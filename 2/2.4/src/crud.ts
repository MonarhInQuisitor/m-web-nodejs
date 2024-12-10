import { Request, Response } from "express";
let fs = require(`fs`);
import { todoes } from "./dataBase";


const getItems = async (req: Request, res: Response) => {
  try {
    console.log("GET")
    if (!req.session.user) {

      res.json({ "error": "forbidden" })
    } else {

      let user = await todoes.find({}, { projection: { _id: 0 } }).toArray()

      console.log(JSON.stringify(user))

      res.json(`{"items":${JSON.stringify(user)}}`)

    }
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }

}



const createItem = async (req: Request, res: Response) => {
  try {
    console.log("POST")

    let id = fs.readFileSync("id.txt", "utf8")
    const el = { id: id++, text: req.body.text, checked: true }

    res.json(el)
    console.log(`element ${JSON.stringify(el)} added`);
    await todoes.insertOne(el)
    fs.writeFile("id.txt", id + "", (err: any) => {
      if (err) console.error(err)
    })
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }
}


const editItem = async (req: Request, res: Response) => {
  try {
    const { id, text, checked } = req.body
    console.log(typeof id, typeof text, typeof checked)
    if (typeof id === "number" && typeof text === "string" && checked === "boolean") {
      await todoes.updateOne({ id: id }, { $set: { text: text, checked: checked } })
      res.json({ "ok": true })
    } else { res.status(400).json({ "error": "type isn't correct" }); }
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
    let id = fs.readFileSync("id.txt", "utf8")
    fs.writeFile("id.txt", --id + "", (err: any) => {
      if (err) console.error(err)
    })
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }
}

export { getItems, createItem, editItem, deleteItem }