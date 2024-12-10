"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const crud_1 = require("./crud");
const authorization_1 = require("./authorization");
const handler = {
    getItems: crud_1.getItems,
    login: authorization_1.login,
    logout: authorization_1.logout,
    editItem: crud_1.editItem,
    deleteItem: crud_1.deleteItem,
    createItem: crud_1.createItem,
    register: authorization_1.register
};
exports.handler = handler;
