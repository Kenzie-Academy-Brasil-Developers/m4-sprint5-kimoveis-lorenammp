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
const appError_1 = require("../../errors/appError");
const properties_entity_1 = require("../../entities/properties.entity");
const addresses_entity_1 = require("../../entities/addresses.entity");
const categories_entity_1 = require("../../entities/categories.entity");
const CreatePropertyService = ({ value, size, address, categoryId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyRepository = data_source_1.default.getRepository(properties_entity_1.Properties);
    const addressRepository = data_source_1.default.getRepository(addresses_entity_1.Addresses);
    const categoryRepository = data_source_1.default.getRepository(categories_entity_1.Categories);
    const addresses = yield addressRepository.find();
    const propertyList = addresses.map(({ district, zipCode, number, city, state }) => ({
        district,
        zipCode,
        number,
        city,
        state,
    }));
    const checkAddress = propertyList.find((addressObj) => Object.entries(addressObj).toString() ===
        Object.entries(address).toString());
    if (checkAddress) {
        throw new appError_1.AppError(400, "This address is already associated with another property");
    }
    const categories = yield categoryRepository.find();
    const propertyCategory = categories.find((cat) => cat.id === categoryId);
    if (!propertyCategory) {
        throw new appError_1.AppError(404, "Invalid category id");
    }
    if (address.zipCode.length > 8) {
        throw new appError_1.AppError(400, "Invalid ZipCode");
    }
    if (address.state.length > 2) {
        throw new appError_1.AppError(400, "Invalid state");
    }
    const newAddress = new addresses_entity_1.Addresses();
    newAddress.district = address.district;
    newAddress.zipCode = address.zipCode;
    newAddress.number = address.number;
    newAddress.city = address.city;
    newAddress.state = address.state;
    addressRepository.create(newAddress);
    yield addressRepository.save(newAddress);
    const date = new Date();
    const property = new properties_entity_1.Properties();
    property.value = value;
    property.size = size;
    property.address = newAddress;
    property.category = propertyCategory;
    property.createdAt = date;
    property.updatedAt = date;
    propertyRepository.create(property);
    yield propertyRepository.save(property);
    return property;
});
exports.default = CreatePropertyService;
