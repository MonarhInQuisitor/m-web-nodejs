import { Request, Response } from "express";
import  connection from "./dataBase";


const getItems = async (req: Request, res: Response) => {
  try {
    console.log("GET")

    if (!req.session.user) {

      res.json({ "error": "forbidden" })
    } else {
     
     let [todo] = await (await connection).query("SELECT * FROM BaseForLearning.tasks")
     res.json(`{"items":${JSON.stringify(todo)}}`)

    }
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }

}



const createItem = async (req: Request, res: Response) => {
  try {
    console.log("POST")
    //id:1 for frontend
    const el = { id:1, text: req.body.text, checked: false }
 
    res.json(el)
    await (await connection).query(`
      INSERT INTO tasks (text, checked) VALUES (?, ?)`,
        [req.body.text, 0]
    );
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }
}


const editItem = async (req: Request, res: Response) => {
  try {
    console.log("update")
    const { id, text, checked } = req.body
    if (typeof id === "number" && typeof text === "string" && typeof Boolean(Number(checked)) == "boolean") {
     await (await connection).query(`UPDATE tasks SET text = ? WHERE id = ?`,
      [text,id]
     )
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

    console.log(id1);
    await (await connection).query(`DELETE FROM tasks where id = ?`,
      [id1]
    )
    //number of tasks
    const [count]:any  = await (await connection).query(
      `SELECT COUNT(*) AS count FROM tasks`
    );
    if(count[0].count!==0){
      console.log("id1!==1")
    await (await connection).query(
      `UPDATE tasks SET id = id - 1 WHERE id > ?`,
      [id1]
    );
   const [newId]:any= await (await connection).query(
      `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`
    );
      await (await connection).query(
      `ALTER TABLE tasks AUTO_INCREMENT = ?`,
      [newId[0].id]
    );
  }else{
    await (await connection).query(
      `ALTER TABLE tasks AUTO_INCREMENT = ?`,
      [1]
    );
  }
    res.json({ "ok": true })
  } catch (err) {
    res.status(500).json({ "error": "server error" });
  }
}

export { getItems, createItem, editItem, deleteItem }