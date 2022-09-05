import { Router } from "express";
import UserLoginController from "../controllers/login/userLogin.controller";

const routes = Router();

routes.post("", UserLoginController);

export default routes;
