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
const properties_entity_1 = require("../../entities/properties.entity");
const schedules_entity_1 = require("../../entities/schedules.entity");
const appError_1 = require("../../errors/appError");
const ListPropertyScheduleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.default.getRepository(schedules_entity_1.Schedules);
    const allSchedules = yield scheduleRepository.find();
    const propertiesRepository = data_source_1.default.getRepository(properties_entity_1.Properties);
    const property = yield propertiesRepository.findOne({
        where: {
            id: id,
        },
    });
    if (!property) {
        throw new appError_1.AppError(404, "Invalid property id");
    }
    const propertyScheduleList = allSchedules.map(({ id, date, hour, user }) => ({
        id,
        date,
        hour,
        user,
    }));
    const schedulesList = {
        schedules: propertyScheduleList,
    };
    return schedulesList;
});
exports.default = ListPropertyScheduleService;
