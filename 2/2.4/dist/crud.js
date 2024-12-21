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
const dataBase_1 = require("./dataBase");
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("GET");
        console.log("req.session.user", req.session.user);
        if (!req.session.user) {
            console.log("GET 1");
            res.json({ "error": "forbidden" });
            //let todo = await todoes.find({}, { projection: { _id: 0 } }).toArray()
            //  res.json(`{"items":${JSON.stringify(todo)}}`)
        }
        else {
            console.log("GET 2");
            let todo = yield dataBase_1.todoes.find({}, { projection: { _id: 0 } }).toArray();
            res.json(`{"items":${JSON.stringify(todo)}}`);
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
        let documentId = yield dataBase_1.todoes.find({}, { projection: { id: 1, _id: 0 } }).sort({ id: -1 }).limit(1).toArray();
        console.log(documentId[0]);
        let lastId;
        if (!documentId[0]) {
            lastId = 0;
        }
        else {
            lastId = documentId[0].id;
        }
        console.log(lastId);
        const el = { id: ++lastId, text: req.body.text, checked: true };
        res.json(el);
        yield dataBase_1.todoes.insertOne(el);
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.createItem = createItem;
const editItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("update");
        const { id, text, checked } = req.body;
        if (typeof id === "number" && typeof text === "string" && typeof checked === "boolean") {
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
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.deleteItem = deleteItem;
