import { Router } from "express";
import CreateCategoryController from "../controllers/categories/createCategory.controller";
import ListCategoriesController from "../controllers/categories/listCategories.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("", AuthenticationMiddleware, CreateCategoryController);
routes.get("", ListCategoriesController);

export default routes;
