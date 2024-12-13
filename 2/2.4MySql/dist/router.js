"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crud_1 = require("./crud");
const authorization_1 = require("./authorization");
const router = express_1.default.Router();
router.all("/router", (req, res) => {
    console.log("router");
    let action = req.query.action;
    if (action && typeof action === "string") {
        handler[action](req, res);
    }
    else {
        res.status(400).json({ error: "input error" });
    }
});
const handler = {
    getItems: crud_1.getItems,
    login: authorization_1.login,
    logout: authorization_1.logout,
    editItem: crud_1.editItem,
    deleteItem: crud_1.deleteItem,
    createItem: crud_1.createItem,
    register: authorization_1.register
};
exports.default = router;
