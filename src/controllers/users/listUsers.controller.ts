import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListUsersService from "../../services/users/listUsers.service";

const ListUsersController = async (req: Request, res: Response) => {
  try {
    const userList = await ListUsersService();

    if (!req.isAdm) {
      return res.status(403).send({
        message: "You don't have permission to view all users.",
      });
    }

    return res.status(201).send(userList);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default ListUsersController;
