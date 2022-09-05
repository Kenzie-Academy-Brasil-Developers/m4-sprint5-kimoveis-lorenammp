import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListCategoriesService from "../../services/categories/listCategories.service";
import ListUsersService from "../../services/users/listUsers.service";

const ListCategoriesController = async (req: Request, res: Response) => {
  try {
    const categoryList = await ListCategoriesService();

    return res.status(200).send(categoryList);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default ListCategoriesController;
