import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

export const createRoom = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;
  const room = await prisma.room.create({ data: { ...req.body, restaurantId } });
  res.status(201).json(room);
};

export const createTable = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;
  const table = await prisma.diningTable.create({ data: { ...req.body, restaurantId } });
  res.status(201).json(table);
};

export const createStaff = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;
  const { fullName, phone, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { fullName, phone, passwordHash, role, restaurantId } });
  res.status(201).json(user);
};

export const upsertMenuItem = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;
  const payload = { ...req.body, restaurantId };
  const item = payload.id
    ? await prisma.menuItem.update({ where: { id: payload.id }, data: payload })
    : await prisma.menuItem.create({ data: payload });
  res.json(item);
};

export const restaurantDashboard = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;
  const [daily, monthly, payments] = await Promise.all([
    prisma.payment.aggregate({ _sum: { amountUzs: true }, where: { restaurantId, paidAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    prisma.payment.aggregate({ _sum: { amountUzs: true }, where: { restaurantId, paidAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    prisma.payment.findMany({ where: { restaurantId }, orderBy: { paidAt: "desc" }, take: 20 })
  ]);
  res.json({ dailyProfitUzs: daily._sum.amountUzs || 0, monthlyProfitUzs: monthly._sum.amountUzs || 0, paymentHistory: payments });
};
