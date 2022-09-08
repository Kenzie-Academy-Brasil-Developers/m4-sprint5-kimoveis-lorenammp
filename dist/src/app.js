"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const propertiesRoutes_1 = __importDefault(require("./routes/propertiesRoutes"));
const scheduleRoutes_1 = __importDefault(require("./routes/scheduleRoutes"));
const appError_1 = require("./errors/appError");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
app.use("/login", loginRoutes_1.default);
app.use("/categories", categoriesRoutes_1.default);
app.use("/properties", propertiesRoutes_1.default);
app.use("/schedules", scheduleRoutes_1.default);
app.use((err, request, response, _) => {
    if (err instanceof appError_1.AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
exports.default = app;
