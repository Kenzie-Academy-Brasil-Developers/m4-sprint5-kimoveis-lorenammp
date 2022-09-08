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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const CreateUserService = ({ name, email, isAdm, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const users = yield userRepository.find();
    const checkEmail = users.find((user) => user.email === email);
    if (checkEmail) {
        throw new appError_1.AppError(400, "Email already exists");
    }
    const date = new Date();
    const user = new user_entity_1.User();
    user.name = name;
    user.email = email;
    user.password = bcrypt_1.default.hashSync(password, 10);
    user.isAdm = isAdm;
    user.updatedAt = date;
    user.createdAt = date;
    userRepository.create(user);
    yield userRepository.save(user);
    const newUser = (({ id, name, email, isAdm, isActive, updatedAt, createdAt, }) => ({
        id,
        name,
        email,
        isAdm,
        isActive,
        updatedAt,
        createdAt,
    }))(user);
    return newUser;
});
exports.default = CreateUserService;
