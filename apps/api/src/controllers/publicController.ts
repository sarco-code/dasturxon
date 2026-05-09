import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const publicMenu = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });
  if (!restaurant) return res.status(404).json({ message: "Restoran topilmadi" });

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    include: { menuItems: { where: { isAvailable: true } } },
    orderBy: { name: "asc" }
  });

  res.json({ restaurant, categories });
};
