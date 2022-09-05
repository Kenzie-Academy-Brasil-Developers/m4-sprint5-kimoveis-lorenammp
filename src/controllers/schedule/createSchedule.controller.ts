import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateScheduleService from "../../services/schedule/createSchedule.service";

const CreateScheduleController = async (req: Request, res: Response) => {
  try {
    const { date, hour, propertyId } = req.body;
    const userId = req.userId;

    const newSchedule = await CreateScheduleService({
      userId,
      date,
      hour,
      propertyId,
    });

    return res.status(201).send({
      message: newSchedule,
    });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default CreateScheduleController;
