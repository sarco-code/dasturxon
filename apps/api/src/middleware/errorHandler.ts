import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: "Server xatosi", detail: err.message });
};
