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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.createItem = exports.getItems = void 0;
let fs = require(`fs`);
const dataBase_1 = require("./dataBase");
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("GET");
        if (!req.session.user) {
            res.json({ "error": "forbidden" });
        }
        else {
            let user = yield dataBase_1.todoes.find({}, { projection: { _id: 0 } }).toArray();
            console.log(JSON.stringify(user));
            res.json(`{"items":${JSON.stringify(user)}}`);
        }
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.getItems = getItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("POST");
        let id = fs.readFileSync("id.txt", "utf8");
        const el = { id: id++, text: req.body.text, checked: true };
        res.json(el);
        console.log(`element ${JSON.stringify(el)} added`);
        yield dataBase_1.todoes.insertOne(el);
        fs.writeFile("id.txt", id + "", (err) => {
            if (err)
                console.error(err);
        });
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.createItem = createItem;
const editItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, text, checked } = req.body;
        console.log(typeof id, typeof text, typeof checked);
        if (typeof id === "number" && typeof text === "string" && checked === "boolean") {
            yield dataBase_1.todoes.updateOne({ id: id }, { $set: { text: text, checked: checked } });
            res.json({ "ok": true });
        }
        else {
            res.status(400).json({ "error": "type isn't correct" });
        }
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.editItem = editItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("DELETE");
        let id1 = req.body.id;
        res.json({ "ok": true });
        console.log({ "ok": true });
        yield dataBase_1.todoes.deleteOne({ id: id1-- });
        yield dataBase_1.todoes.updateMany({ id: { $gt: id1 } }, { $inc: { id: -1 } });
        let id = fs.readFileSync("id.txt", "utf8");
        fs.writeFile("id.txt", --id + "", (err) => {
            if (err)
                console.error(err);
        });
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.deleteItem = deleteItem;
