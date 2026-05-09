import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const restaurantAnalytics = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;

  const [daily, monthly, topFood, topWaiter, topChef] = await Promise.all([
    prisma.payment.aggregate({ _sum: { amountUzs: true }, where: { restaurantId, paidAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    prisma.payment.aggregate({ _sum: { amountUzs: true }, where: { restaurantId, paidAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    prisma.orderItem.groupBy({ by: ["menuItemId"], _sum: { quantity: true }, orderBy: { _sum: { quantity: "desc" } }, take: 1 }),
    prisma.order.groupBy({ by: ["waiterId"], _count: { id: true }, where: { restaurantId }, orderBy: { _count: { id: "desc" } }, take: 1 }),
    prisma.order.groupBy({ by: ["chefId"], _count: { id: true }, where: { restaurantId }, orderBy: { _count: { id: "desc" } }, take: 1 })
  ]);

  res.json({
    dailyProfitUzs: daily._sum.amountUzs || 0,
    monthlyProfitUzs: monthly._sum.amountUzs || 0,
    topFood,
    topWaiter,
    topChef
  });
};
