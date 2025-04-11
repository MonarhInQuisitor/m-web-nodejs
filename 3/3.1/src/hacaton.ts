console.log(4)
import { Request, Response } from "express";
import express from "express";
const host = '127.0.0.1';
const server = express()
const PORT = 3000;
server.use(express.static('front'),express.json())
let Enum ={
  plus : 0,
  minus: 0,
};
server.get('/123', async (req: Request, res: Response)  => {
    res.status(200).type('text/plain');
    res.send('Home page');
    console.log(req.body)
});
server.post('/123', (req, res) => {
    console.log("Received action:", req.body.action); // Виводимо дію у консоль
    switch(req.body.action){
        case "+":Enum.plus++
        break;
        case "-":Enum.minus++
        break;
    }
    res.send(`Received: кнопку "+" натиснуто ${Enum.plus} разів кнопку "-" натиснуто ${Enum.minus} разів`); // Відправляємо відповідь клієнту
});
server.listen(PORT,()=>console.log("listenning"));
  