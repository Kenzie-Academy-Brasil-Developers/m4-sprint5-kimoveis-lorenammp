import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreatePropertyService from "../../services/properties/createProperty.service";

const CreatePropertyController = async (req: Request, res: Response) => {
  try {
    if (!req.isAdm) {
      return res.status(403).send({
        message: "You don't have permission to register new properties.",
      });
    }

    const { value, size, address, categoryId } = req.body;

    const newProperty = await CreatePropertyService({
      value,
      size,
      address,
      categoryId,
    });

    return res.status(201).send(newProperty);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default CreatePropertyController;
