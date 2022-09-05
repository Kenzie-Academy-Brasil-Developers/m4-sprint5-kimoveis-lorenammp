import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListPropertiesService from "../../services/properties/listProperties.service";

const ListPropertiesController = async (req: Request, res: Response) => {
  try {
    const propertiesList = await ListPropertiesService();

    return res.status(200).send(propertiesList);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default ListPropertiesController;
