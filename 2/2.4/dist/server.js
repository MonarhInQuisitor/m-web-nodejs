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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = (0, express_1.default)();
const router_1 = __importDefault(require("./router"));
const dataBase_1 = require("./dataBase");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const PORT = 3000;
const ngrok_1 = __importDefault(require("ngrok"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield ngrok_1.default.connect(3000);
        console.log(url);
        server.use((0, cors_1.default)({
            origin: ["http://localhost:3000", url], // Дозволений домен
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Дозволені методи
            allowedHeaders: ['Content-Type', 'Authorization'], // Дозволені заголовки
            credentials: true, // Дозволяємо передачу куків
        }));
        server.get("/getUrl", (req, res) => { res.json({ url: url }); });
        server.use(express_1.default.json(), body_parser_1.default.json(), express_1.default.static('front'), (0, express_session_1.default)(dataBase_1.sessions));
        server.use("/api/v2/router", router_1.default);
        server.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
            console.log("listenning");
        }));
    });
})();
