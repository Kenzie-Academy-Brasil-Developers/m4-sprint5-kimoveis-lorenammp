import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateCategoryService from "../../services/categories/createCategory.service";

const CreateCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!req.isAdm) {
      return res.status(403).send({
        message: "You don't have permission to register new categories.",
      });
    }

    const newCategory = await CreateCategoryService({ name });

    return res.status(201).send(newCategory);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default CreateCategoryController;
