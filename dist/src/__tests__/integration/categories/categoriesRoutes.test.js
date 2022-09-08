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
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
describe("/categories", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUser);
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedAdmin);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /categories -  Must be able to create category", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedCategory);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("id");
        expect(response.status).toBe(201);
    }));
    test("POST /categories -  should not be able to create category that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedCategory);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /categories -  should not be able to create category without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/categories').send(mocks_1.mockedCategory);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("POST /categories -  should not be able to list users not being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post('/categories').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedCategory);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("GET /categories -  Must be able to list all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/categories');
        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    }));
    test("GET /categories/:id/properties -  Must be able to list one category properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield (0, supertest_1.default)(app_1.default).get('/categories');
        const response = yield (0, supertest_1.default)(app_1.default).get(`/categories/${category.body[0].id}/properties`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("properties");
    }));
    test("GET /categories/:id/properties -  Should not be able to list properties of a category with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/categories/13970660-5dbe-423a-9a9d-5c23b37943cf/properties`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
});
