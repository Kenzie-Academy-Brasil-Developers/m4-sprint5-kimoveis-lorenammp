"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSchedule_controller_1 = __importDefault(require("../controllers/schedule/createSchedule.controller"));
const listPropertySchedule_controller_1 = __importDefault(require("../controllers/schedule/listPropertySchedule.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const routes = (0, express_1.Router)();
routes.post("", authentication_middleware_1.default, createSchedule_controller_1.default);
routes.get("/properties/:id", authentication_middleware_1.default, listPropertySchedule_controller_1.default);
exports.default = routes;
