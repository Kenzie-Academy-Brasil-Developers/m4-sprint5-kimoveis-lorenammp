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
const schedules_entity_1 = require("../../entities/schedules.entity");
const properties_entity_1 = require("../../entities/properties.entity");
const user_entity_1 = require("../../entities/user.entity");
const CreateScheduleService = ({ userId, date, hour, propertyId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.default.getRepository(schedules_entity_1.Schedules);
    const schedules = yield scheduleRepository.find();
    const propertyRepository = data_source_1.default.getRepository(properties_entity_1.Properties);
    const property = yield propertyRepository.findOneBy({
        id: propertyId,
    });
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({
        id: userId,
    });
    if (!property) {
        throw new appError_1.AppError(404, "Property not found");
    }
    schedules.find((schedule) => {
        if (schedule.property.id === propertyId) {
            throw new appError_1.AppError(400, "Property already scheduled for this date/hour, choose a differente date/hour");
            // const newDateFormat = date.split("/").join("-");
            // if (
            //   schedule.date.toString() === newDateFormat &&
            //   schedule.hour === hour.concat(":00")
            // ) {
            //   throw new AppError(
            //     400,
            //     "Property already scheduled for this date/hour, choose a differente date/hour"
            //   );
            // }
        }
    });
    const newSchedule = new schedules_entity_1.Schedules();
    const newDate = new Date(date);
    if (newDate.getDay() < 1 || newDate.getDay() > 5) {
        throw new appError_1.AppError(400, "Invalid date, choose a weekday");
    }
    const fullSchedule = new Date(date.concat(", ", hour));
    if (fullSchedule.getHours() < 8 || fullSchedule.getHours() > 18) {
        throw new appError_1.AppError(400, "Invalid time, choose an hour between 08:00h and 18:00h");
    }
    newSchedule.date = date;
    newSchedule.hour = hour;
    newSchedule.property = property;
    newSchedule.user = user;
    scheduleRepository.create({
        date,
        hour,
        property: property,
        user: user,
    });
    yield scheduleRepository.save(newSchedule);
    return "Schedule created with success!";
});
exports.default = CreateScheduleService;
