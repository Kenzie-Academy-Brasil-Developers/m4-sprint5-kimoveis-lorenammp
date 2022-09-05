import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListPropertyScheduleService from "../../services/schedule/listPropertySchedule.service";

const ListPropertyScheduleController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const propertyList = await ListPropertyScheduleService(id);

    if (!req.isAdm) {
      return res.status(403).send({
        message: "You don't have permission to view all users.",
      });
    }

    return res.status(200).send(propertyList);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default ListPropertyScheduleController;
