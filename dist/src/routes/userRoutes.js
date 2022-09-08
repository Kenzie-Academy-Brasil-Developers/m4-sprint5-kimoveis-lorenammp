"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_controller_1 = __importDefault(require("../controllers/users/createUser.controller"));
const deleteUser_controller_1 = __importDefault(require("../controllers/users/deleteUser.controller"));
const listUsers_controller_1 = __importDefault(require("../controllers/users/listUsers.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const routes = (0, express_1.Router)();
routes.post("", createUser_controller_1.default);
routes.get("", authentication_middleware_1.default, listUsers_controller_1.default);
routes.delete("/:id", authentication_middleware_1.default, deleteUser_controller_1.default);
exports.default = routes;
