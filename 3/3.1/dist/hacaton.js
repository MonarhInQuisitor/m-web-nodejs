"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log(4);
const express_1 = __importDefault(require("express"));
const host = '127.0.0.1';
const server = (0, express_1.default)();
const PORT = 3000;
server.use(express_1.default.static('front'), express_1.default.json());
let Enum = {
    plus: 0,
    minus: 0,
};
server.get('/123', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).type('text/plain');
    res.send('Home page');
    console.log(req.body);
}));
server.post('/123', (req, res) => {
    console.log("Received action:", req.body.action); // Виводимо дію у консоль
    switch (req.body.action) {
        case "+":
            Enum.plus++;
            break;
        case "-":
            Enum.minus++;
            break;
    }
    res.send(`Received: кнопку "+" натиснуто ${Enum.plus} разів кнопку "-" натиснуто ${Enum.minus} разів`); // Відправляємо відповідь клієнту
});
server.listen(PORT, () => console.log("listenning"));
