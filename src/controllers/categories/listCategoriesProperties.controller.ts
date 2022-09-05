import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListCategoriesService from "../../services/categories/listCategories.service";
import ListCategoriesPropertiesService from "../../services/categories/listCategoriesProperties.service";
import ListUsersService from "../../services/users/listUsers.service";

const ListCategoriesPropertiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const propertyList = await ListCategoriesPropertiesService(id);

    return res.status(200).send(propertyList);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default ListCategoriesPropertiesController;
