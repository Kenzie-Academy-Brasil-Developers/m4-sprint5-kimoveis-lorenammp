"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthenticationMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Missing authorization headers.",
            });
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            req.userEmail = decoded.email;
            req.isAdm = decoded.isAdm;
            req.userId = decoded.sub;
            next();
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                error: error.name,
                message: error.message,
            });
        }
    }
};
exports.default = AuthenticationMiddleware;
