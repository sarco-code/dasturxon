import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: { id: string; role: string; restaurantId?: string | null };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token topilmadi" });

  try {
    req.user = jwt.verify(token, env.jwtSecret) as { id: string; role: string; restaurantId?: string | null };
    next();
  } catch {
    res.status(401).json({ message: "Token yaroqsiz" });
  }
};

export const permit = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: "Ruxsat yo'q" });
  next();
};

export const requireRestaurant = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.restaurantId) return res.status(400).json({ message: "Restoran konteksti topilmadi" });
  next();
};
