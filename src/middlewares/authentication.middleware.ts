import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const AuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Missing authorization headers.",
      });
    }

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        req.userEmail = decoded.email;
        req.isAdm = decoded.isAdm;
        req.userId = decoded.sub;
        next();
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default AuthenticationMiddleware;
