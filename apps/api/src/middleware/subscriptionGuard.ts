import { Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "./auth.js";

export const subscriptionGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === "SUPER_ADMIN") return next();
  if (!req.user?.restaurantId) return res.status(403).json({ message: "Restoran topilmadi" });

  const active = await prisma.subscription.findFirst({
    where: {
      restaurantId: req.user.restaurantId,
      status: "ACTIVE",
      endDate: { gte: new Date() }
    }
  });

  if (!active) return res.status(402).json({ message: "Obuna muddati tugagan" });
  next();
};
