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
describe("/schedules", () => {
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
        const categories = yield (0, supertest_1.default)(app_1.default).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedCategory);
        mocks_1.mockedProperty.categoryId = categories.body.id;
        yield (0, supertest_1.default)(app_1.default).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedProperty);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /schedules -  should be able to create a schedule", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const users = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        mocks_1.mockedSchedule.propertyId = properties.body[0].id;
        mocks_1.mockedSchedule.userId = users.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedSchedule);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(201);
    }));
    test("POST /schedules -  should not be able to create a schedule that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const users = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        mocks_1.mockedSchedule.propertyId = properties.body[0].id;
        mocks_1.mockedSchedule.userId = users.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedSchedule);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /schedules -  should not be able to create a schedule with an invalid date", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const users = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        mocks_1.mockedScheduleInvalidDate.propertyId = properties.body[0].id;
        mocks_1.mockedScheduleInvalidDate.userId = users.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedScheduleInvalidDate);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /schedules -  should not be able to create a schedule with an invalid hour", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const users = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        mocks_1.mockedScheduleInvalidHour.propertyId = properties.body[0].id;
        mocks_1.mockedScheduleInvalidHour.userId = users.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedScheduleInvalidHour);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /schedules -  should not be able to create a schedule with an invalid property id", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const users = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        mocks_1.mockedScheduleInvalidPropertyId.userId = users.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedScheduleInvalidPropertyId);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
    test("POST /schedules -  should not be able to create a schedule without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const users = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        mocks_1.mockedSchedule.propertyId = properties.body[0].id;
        mocks_1.mockedSchedule.userId = users.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default).post('/schedules').send(mocks_1.mockedSchedule);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /schedules/properties/:id -  must be able to list the schedules of a property", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const response = yield (0, supertest_1.default)(app_1.default).get(`/schedules/properties/${properties.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("schedules");
        expect(response.body.schedules[0]).toHaveProperty("id");
        expect(response.body.schedules[0]).toHaveProperty("date");
        expect(response.body.schedules[0]).toHaveProperty("hour");
        expect(response.body.schedules[0]).toHaveProperty("user");
        expect(response.body.schedules).toHaveLength(1);
        expect(response.status).toBe(200);
    }));
    test("GET /schedules/properties/:id -  should not be able to list the schedules of a property with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedAdminLogin);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/schedules/properties/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
    test("GET /schedules/properties/:id -  should not be able to list the schedules of a property without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const response = yield (0, supertest_1.default)(app_1.default).get(`/schedules/properties/${properties.body[0].id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /schedules/properties/:id -  should not be able to list the schedules of a property that the user is not admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const properties = yield (0, supertest_1.default)(app_1.default).get('/properties');
        const response = yield (0, supertest_1.default)(app_1.default).get(`/schedules/properties/${properties.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
});
