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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = (0, express_1.default)();
exports.server = server;
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const express_session_1 = __importDefault(require("express-session"));
const FileStore = require('session-file-store')(express_session_1.default);
server.use(express_1.default.json(), body_parser_1.default.json(), (0, cors_1.default)(), express_1.default.static('front'), (0, express_session_1.default)({
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));
server.post("/api/v2/router", (req, res) => {
    console.log("router");
    let action = req.query.action;
    if (action && typeof action === "string") {
        console.log("1");
        router_1.handler[action](req, res);
    }
});
server.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("listenning");
}));
