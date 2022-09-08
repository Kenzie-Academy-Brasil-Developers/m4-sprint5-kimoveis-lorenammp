"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCategory_controller_1 = __importDefault(require("../controllers/categories/createCategory.controller"));
const listCategories_controller_1 = __importDefault(require("../controllers/categories/listCategories.controller"));
const listCategoriesProperties_controller_1 = __importDefault(require("../controllers/categories/listCategoriesProperties.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const routes = (0, express_1.Router)();
routes.post("", authentication_middleware_1.default, createCategory_controller_1.default);
routes.get("", listCategories_controller_1.default);
routes.get("/:id/properties", listCategoriesProperties_controller_1.default);
exports.default = routes;
