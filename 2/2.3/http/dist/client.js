"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const text = 'hello world';
const time = performance.now();
let options = {
    hostname: 'm-web-nodejs',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': text.length
    }
};
let client = http_1.default.request(options, function (res) {
    let body = "";
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('BODY:', chunk.toString());
        body = body + chunk;
    });
    res.on('end', function () {
        if (body === text) {
            console.log('The same');
        }
        else {
            console.log('not the same');
        }
        console.log(performance.now() - time);
    });
});
client.on('error', function (e) {
    console.log('Problem with request:', e.message);
});
client.write(text);
client.end();
