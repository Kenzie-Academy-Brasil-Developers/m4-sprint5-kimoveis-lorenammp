import { Router } from "express";
import CreateScheduleController from "../controllers/schedule/createSchedule.controller";
import ListPropertyScheduleController from "../controllers/schedule/listPropertySchedule.controller";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";

const routes = Router();

routes.post("", AuthenticationMiddleware, CreateScheduleController);
routes.get(
  "/properties/:id",
  AuthenticationMiddleware,
  ListPropertyScheduleController
);

export default routes;
