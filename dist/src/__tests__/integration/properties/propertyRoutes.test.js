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
describe("/properties", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUser);
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedAdmin);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        yield (0, supertest_1.default)(app_1.default).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedCategory);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /properties -  Must be able to create a property", () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, supertest_1.default)(app_1.default).get('/categories');
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        mocks_1.mockedProperty.categoryId = categories.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedProperty);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("value");
        expect(response.body).toHaveProperty("size");
        expect(response.body).toHaveProperty("category");
        expect(response.body).toHaveProperty("sold");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("address");
        expect(response.body.address).toHaveProperty("id");
        expect(response.body.address).toHaveProperty("district");
        expect(response.body.address).toHaveProperty("zipCode");
        expect(response.body.address).toHaveProperty("number");
        expect(response.body.address).toHaveProperty("city");
        expect(response.body.address).toHaveProperty("state");
        expect(response.status).toBe(201);
    }));
    test("POST /properties -  should not be able to create property that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, supertest_1.default)(app_1.default).get('/categories');
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        mocks_1.mockedProperty.categoryId = categories.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedProperty);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /properties -  should not be able to create property not being admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, supertest_1.default)(app_1.default).get('/categories');
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        mocks_1.mockedProperty.categoryId = categories.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedProperty);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
    test("POST /properties -  should not be able to create property without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, supertest_1.default)(app_1.default).get('/categories');
        mocks_1.mockedProperty.categoryId = categories.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').send(mocks_1.mockedProperty);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("POST /properties -  should not be able to create property with invalid categoryId", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedPropertyInvalidCategoryId);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
    test("POST /properties -  must not be able to create a property with invalid zipCode", () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, supertest_1.default)(app_1.default).get('/categories');
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        mocks_1.mockedPropertyInvalidZipCode.categoryId = categories.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedPropertyInvalidZipCode);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /properties -  must not be able to create a property with invalid state", () => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, supertest_1.default)(app_1.default).get('/categories');
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        mocks_1.mockedPropertyInvalidState.categoryId = categories.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedPropertyInvalidState);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("GET /properties -  Must be able to list all properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/properties');
        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    }));
});
