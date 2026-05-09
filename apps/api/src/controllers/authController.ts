import { Request, Response } from "express";
import { z } from "zod";
import { loginService } from "../services/authService.js";
import { prisma } from "../config/prisma.js";

const schema = z.object({ phone: z.string().regex(/^\+998\d{9}$/), password: z.string().min(6) });

export const login = async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Noto'g'ri format" });

  try {
    const data = await loginService(parsed.data.phone, parsed.data.password);
    res.json(data);
  } catch (e) {
    res.status(401).json({ message: e instanceof Error ? e.message : "Login xatosi" });
  }
};

export const me = async (req: any, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

  if (user.role !== "SUPER_ADMIN" && user.restaurantId) {
    const active = await prisma.subscription.findFirst({
      where: { restaurantId: user.restaurantId, status: "ACTIVE", endDate: { gte: new Date() } }
    });
    if (!active) return res.status(402).json({ message: "Obuna muddati tugagan" });
  }

  res.json({ id: user.id, fullName: user.fullName, phone: user.phone, role: user.role, restaurantId: user.restaurantId });
};
