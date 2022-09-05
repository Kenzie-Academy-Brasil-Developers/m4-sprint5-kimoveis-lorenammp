import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import UserLoginService from "../../services/login/userLogin.service";

const UserLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await UserLoginService({ email, password });

    return res.status(200).send({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default UserLoginController;
