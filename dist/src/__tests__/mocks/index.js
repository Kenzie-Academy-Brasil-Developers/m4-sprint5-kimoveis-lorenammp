"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedScheduleInvalidHour = exports.mockedScheduleInvalidDate = exports.mockedScheduleInvalidPropertyId = exports.mockedSchedule = exports.mockedPropertyInvalidCategoryId = exports.mockedPropertyInvalidState = exports.mockedPropertyInvalidZipCode = exports.mockedProperty = exports.mockedCategory = exports.mockedAdminLogin = exports.mockedUserLogin = exports.mockedAdmin = exports.mockedUser = void 0;
exports.mockedUser = {
    name: "Joana",
    email: "joana@mail.com",
    isAdm: false,
    password: "123456"
};
exports.mockedAdmin = {
    name: "Felipe",
    email: "felipe@mail.com",
    isAdm: true,
    password: "123456"
};
exports.mockedUserLogin = {
    email: "joana@mail.com",
    password: "123456"
};
exports.mockedAdminLogin = {
    email: "felipe@mail.com",
    password: "123456"
};
exports.mockedCategory = {
    name: "Apartamento"
};
exports.mockedProperty = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "18150000",
        number: "67",
        city: "Piedade",
        state: "SP"
    },
    categoryId: ""
};
exports.mockedPropertyInvalidZipCode = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "1815000033",
        number: "67",
        city: "Piedade",
        state: "SP"
    },
    categoryId: ""
};
exports.mockedPropertyInvalidState = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "18150000",
        number: "67",
        city: "Piedade",
        state: "SPGO"
    },
    categoryId: ""
};
exports.mockedPropertyInvalidCategoryId = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "18150000",
        number: "68",
        city: "Piedade",
        state: "SP"
    },
    categoryId: "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4"
};
exports.mockedSchedule = {
    date: "2022/08/12",
    hour: "10:30",
    propertyId: "",
    userId: ""
};
exports.mockedScheduleInvalidPropertyId = {
    date: "2022/08/12",
    hour: "10:30",
    propertyId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
    userId: ""
};
exports.mockedScheduleInvalidDate = {
    date: "2022/08/20",
    hour: "10:30",
    propertyId: "",
    userId: ""
};
exports.mockedScheduleInvalidHour = {
    date: "2022/08/17",
    hour: "5:30",
    propertyId: "",
    userId: ""
};
