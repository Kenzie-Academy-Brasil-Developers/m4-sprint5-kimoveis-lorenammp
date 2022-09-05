import AppDataSource from "../../data-source";

import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";
import { Schedules } from "../../entities/schedules.entity";
import { Properties } from "../../entities/properties.entity";
import { User } from "../../entities/user.entity";

const CreateScheduleService = async ({
  userId,
  date,
  hour,
  propertyId,
}: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const schedules = await scheduleRepository.find();

  const propertyRepository = AppDataSource.getRepository(Properties);
  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  schedules.find((schedule) => {
    if (schedule.property.id === propertyId) {
      throw new AppError(
        400,
        "Property already scheduled for this date/hour, choose a differente date/hour"
      );
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

  const newSchedule = new Schedules();

  const newDate = new Date(date);

  if (newDate.getDay() < 1 || newDate.getDay() > 5) {
    throw new AppError(400, "Invalid date, choose a weekday");
  }

  const fullSchedule = new Date(date.concat(", ", hour));

  if (fullSchedule.getHours() < 8 || fullSchedule.getHours() > 18) {
    throw new AppError(
      400,
      "Invalid time, choose an hour between 08:00h and 18:00h"
    );
  }

  newSchedule.date = date;
  newSchedule.hour = hour;
  newSchedule.property = property;
  newSchedule.user = user;

  scheduleRepository.create({
    date,
    hour,
    property: property!,
    user: user!,
  });
  await scheduleRepository.save(newSchedule);

  return "Schedule created with success!";
};

export default CreateScheduleService;
