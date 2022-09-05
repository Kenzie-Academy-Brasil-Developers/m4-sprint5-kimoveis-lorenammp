import { Router } from "express";
import CreateCategoryController from "../controllers/categories/createCategory.controller";
import ListCategoriesController from "../controllers/categories/listCategories.controller";
import ListCategoriesPropertiesController from "../controllers/categories/listCategoriesProperties.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("", AuthenticationMiddleware, CreateCategoryController);
routes.get("", ListCategoriesController);
routes.get("/:id/properties", ListCategoriesPropertiesController);

export default routes;
