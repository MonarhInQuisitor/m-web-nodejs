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
exports.register = exports.logout = exports.login = void 0;
const dataBase_1 = __importDefault(require("./dataBase"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Register");
    try {
        console.log(typeof dataBase_1.default);
        const [user] = yield (yield dataBase_1.default).query('SELECT * FROM clients where login = ? AND pass=?', [req.body.login, req.body.pass]);
        // input SQL  [[date],[metadate]]
        if (user[0] === undefined) {
            yield (yield dataBase_1.default).query("INSERT INTO clients (login,pass) VALUE (?,?)", [req.body.login, req.body.pass]);
            res.json({ "ok": true });
        }
        else {
            res.status(400).json({ error: "The login is already exist" });
        }
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.register = register;
const logout = (req, res) => {
    console.log("logout");
    if (!req.session.user) {
        console.log("User is not logged in");
        res.status(400).json({ "error": "No user logged in" });
    }
    req.session.destroy((err) => {
        // will always fire after session is destroyed
        if (!err) {
            res.clearCookie('connect.sid');
            res.json({ "ok": true });
        }
        else {
            res.status(500).json({ "error": err });
        }
    });
    console.log("User logged out successfully");
};
exports.logout = logout;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("login");
        console.log(req.body.login);
        // let user = await logins.findOne({ login: req.body.login, pass: req.body.pass })
        //get an object witout metadate
        let [user] = yield (yield dataBase_1.default).query(`SELECT * FROM BaseForLearning.clients 
        where login = ? AND pass =? `, [req.body.login, req.body.pass]);
        //pick an object without array
        user = user[0];
        if (user) {
            req.session.user = { login: user.login };
            res.json({ "ok": true, });
        }
        else {
            console.log("User isn't exist");
            res.status(400).json({ "error": "not found" });
        }
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.login = login;
