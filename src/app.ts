import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";

import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import categoryRoutes from "./routes/categoriesRoutes";
import propertyRoutes from "./routes/propertiesRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";

import { AppError } from "./errors/appError";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoryRoutes);
app.use("/properties", propertyRoutes);
app.use("/schedules", scheduleRoutes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
