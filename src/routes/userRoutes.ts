import { Router } from "express";
import CreateUserController from "../controllers/users/createUser.controller";
import DeleteUserController from "../controllers/users/deleteUser.controller";
import ListUsersController from "../controllers/users/listUsers.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("", CreateUserController);
routes.get("", AuthenticationMiddleware, ListUsersController);
routes.delete("/:id", AuthenticationMiddleware, DeleteUserController);

export default routes;
