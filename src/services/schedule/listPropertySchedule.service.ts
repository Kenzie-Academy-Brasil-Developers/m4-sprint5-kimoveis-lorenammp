import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../errors/appError";

const ListPropertyScheduleService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);

  const allSchedules = await scheduleRepository.find();

  const propertiesRepository = AppDataSource.getRepository(Properties);
  const property = await propertiesRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!property) {
    throw new AppError(404, "Invalid property id");
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
};

export default ListPropertyScheduleService;
