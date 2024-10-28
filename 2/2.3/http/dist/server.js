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
const http_1 = __importDefault(require("http"));
let server = http_1.default.createServer().listen(3000);
server.on('request', function (req, res) {
    let body = "";
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        console.log("get a request");
        res.writeHead(200);
        res.end(body);
        console.log(req.socket.remoteAddress);
        getIp().then(rs => console.log(rs)); // adress of server
        console.log(body);
        console.log(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
    });
});
server.on("error", (error) => {
    console.log(error);
});
console.log('Listening on port 3000');
function getIp() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(`https://api.ipify.org?format=json`).then(res => res.json()).then(res => res.ip);
    });
}
