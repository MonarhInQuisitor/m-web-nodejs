import { Request, Response } from "express";
import connection from "./dataBase"


const register = async (req: Request, res: Response) => {
    console.log("Register")
    try {
      console.log(typeof connection)
   
      const [user]:any = await (await connection).query('SELECT * FROM clients where login = ? AND pass=?',
        [req.body.login,req.body.pass]
      );
      // input SQL  [[date],[metadate]]
      if (user[0]===undefined) {

        await (await connection).query("INSERT INTO clients (login,pass) VALUE (?,?)",
          [req.body.login,req.body.pass ]
        )
        res.json({ "ok": true })
      } else {
        res.status(400).json({ error: "The login is already exist" })
      }
    } catch (err) {
      res.status(500).json({ "error": "server error" });
    }
  
  }
  
  
  const logout = (req: Request, res: Response) => {
    console.log("logout")
    if (!req.session.user) {
      console.log("User is not logged in");
      res.status(400).json({ "error": "No user logged in" });
    }
    req.session.destroy((err) => {
      // will always fire after session is destroyed
      if (!err) {
        res.clearCookie('connect.sid')
        res.json({ "ok": true })
      } else {
        res.status(500).json({ "error": err });
      }
    }
    )
    console.log("User logged out successfully");
  }
  
  
  const login = async (req: Request, res: Response) => {
    try {
      console.log("login")
  
      console.log(req.body.login)
     // let user = await logins.findOne({ login: req.body.login, pass: req.body.pass })
     //get an object witout metadate
      let [user]:[any,any] = await (await connection).query(`SELECT * FROM BaseForLearning.clients 
        where login = ? AND pass =? `,
      [req.body.login,req.body.pass])
        //pick an object without array
        user= user[0]

      if (user) {
        req.session.user = { login: user.login };
        res.json({ "ok": true, })
      } else {
        console.log("User isn't exist")
        res.status(400).json({ "error": "not found" });
      }
    } catch (err) {
      res.status(500).json({ "error": "server error" });
    }
  }
  export {login,logout,register}