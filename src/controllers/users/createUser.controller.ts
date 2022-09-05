import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateUserService from "../../services/users/createUser.service";

const CreateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdm, password } = req.body;

    const newUser = await CreateUserService({ name, email, isAdm, password });

    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default CreateUserController;
