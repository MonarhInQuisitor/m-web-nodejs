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
exports.deleteItem = exports.editItem = exports.createItem = exports.getItems = void 0;
const dataBase_1 = __importDefault(require("./dataBase"));
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("GET");
        if (!req.session.user) {
            res.json({ "error": "forbidden" });
        }
        else {
            let [todo] = yield (yield dataBase_1.default).query("SELECT * FROM BaseForLearning.tasks");
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
        //id:1 for frontend
        const el = { id: 1, text: req.body.text, checked: false };
        res.json(el);
        yield (yield dataBase_1.default).query(`
      INSERT INTO tasks (text, checked) VALUES (?, ?)`, [req.body.text, 0]);
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
        if (typeof id === "number" && typeof text === "string" && typeof Boolean(Number(checked)) == "boolean") {
            yield (yield dataBase_1.default).query(`UPDATE tasks SET text = ? WHERE id = ?`, [text, id]);
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
        console.log(id1);
        yield (yield dataBase_1.default).query(`DELETE FROM tasks where id = ?`, [id1]);
        //number of tasks
        const [count] = yield (yield dataBase_1.default).query(`SELECT COUNT(*) AS count FROM tasks`);
        if (count[0].count !== 0) {
            console.log("id1!==1");
            yield (yield dataBase_1.default).query(`UPDATE tasks SET id = id - 1 WHERE id > ?`, [id1]);
            const [newId] = yield (yield dataBase_1.default).query(`SELECT * FROM tasks ORDER BY id DESC LIMIT 1`);
            yield (yield dataBase_1.default).query(`ALTER TABLE tasks AUTO_INCREMENT = ?`, [newId[0].id]);
        }
        else {
            yield (yield dataBase_1.default).query(`ALTER TABLE tasks AUTO_INCREMENT = ?`, [1]);
        }
        res.json({ "ok": true });
    }
    catch (err) {
        res.status(500).json({ "error": "server error" });
    }
});
exports.deleteItem = deleteItem;
