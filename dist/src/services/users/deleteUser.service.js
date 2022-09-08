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
const data_source_1 = __importDefault(require("../../data-source"));
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const DeleteUserService = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const users = yield userRepository.find();
    const userById = users.find((user) => user.id === id);
    if (!userById) {
        throw new appError_1.AppError(404, "User id does not exists");
    }
    if (!userById.isActive) {
        throw new appError_1.AppError(400, "User is already innactive");
    }
    userById.isActive = false;
    yield userRepository.save(userById);
    const updatedUser = (({ id, name, email, isAdm, isActive, updatedAt, createdAt, }) => ({
        id,
        name,
        email,
        isAdm,
        isActive,
        updatedAt,
        createdAt,
    }))(userById);
    return updatedUser;
});
exports.default = DeleteUserService;
