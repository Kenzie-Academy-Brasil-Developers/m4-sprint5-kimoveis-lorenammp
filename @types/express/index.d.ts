import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userEmail: string;
      isAdm: boolean;
      userId: string;
    }
  }
}
