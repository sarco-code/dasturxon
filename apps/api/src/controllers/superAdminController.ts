import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, slug, phone, address, ownerName, ownerPhone, ownerPassword, planId } = req.body;
  const passwordHash = await bcrypt.hash(ownerPassword, 10);

  const result = await prisma.$transaction(async (tx) => {
    const restaurant = await tx.restaurant.create({ data: { name, slug, phone, address } });
    await tx.user.create({ data: { fullName: ownerName, phone: ownerPhone, passwordHash, role: "RESTAURANT_ADMIN", restaurantId: restaurant.id } });
    await tx.subscription.create({
      data: {
        restaurantId: restaurant.id,
        subscriptionPlanId: planId,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "ACTIVE"
      }
    });
    return restaurant;
  });

  res.status(201).json(result);
};

export const platformStats = async (_req: Request, res: Response) => {
  const [totalRestaurants, activeRestaurants, activeSubs, expiredSubs, dailyProfit, monthlyProfit] = await Promise.all([
    prisma.restaurant.count(),
    prisma.restaurant.count({ where: { isBlocked: false } }),
    prisma.subscription.count({ where: { status: "ACTIVE", endDate: { gte: new Date() } } }),
    prisma.subscription.count({ where: { OR: [{ status: "EXPIRED" }, { endDate: { lt: new Date() } }] } }),
    prisma.payment.aggregate({ _sum: { amountUzs: true }, where: { paidAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    prisma.payment.aggregate({ _sum: { amountUzs: true }, where: { paidAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } })
  ]);

  res.json({ totalRestaurants, activeRestaurants, activeSubs, expiredSubs, dailyProfitUzs: dailyProfit._sum.amountUzs || 0, monthlyProfitUzs: monthlyProfit._sum.amountUzs || 0 });
};

export const setRestaurantBlock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isBlocked } = req.body;
  const r = await prisma.restaurant.update({ where: { id }, data: { isBlocked } });
  res.json(r);
};

export const setSubscriptionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const s = await prisma.subscription.update({ where: { id }, data: { status } });
  res.json(s);
};
