import { Router } from "express";
import CreatePropertyController from "../controllers/properties/createProperty.controller";
import ListPropertiesController from "../controllers/properties/listProperties.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("", AuthenticationMiddleware, CreatePropertyController);
routes.get("", ListPropertiesController);

export default routes;
