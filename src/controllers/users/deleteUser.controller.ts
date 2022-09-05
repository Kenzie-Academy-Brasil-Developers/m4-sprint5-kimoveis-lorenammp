import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import DeleteUserService from "../../services/users/deleteUser.service";

const DeleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.userId;

    if (!req.isAdm) {
      return res.status(403).send({
        message: "You don't have permission to delete users.",
      });
    }

    const userList = await DeleteUserService({ id });

    return res.status(204).send(userList);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default DeleteUserController;
