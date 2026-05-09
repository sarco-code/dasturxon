import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { io } from "../socket/io.js";

export const waiterCreateOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { roomId, tableId, items } = req.body;
  const products = await prisma.menuItem.findMany({ where: { id: { in: items.map((i: any) => i.menuItemId) }, restaurantId: user.restaurantId } });
  const map = new Map(products.map((p) => [p.id, p]));
  const prepared = items.map((i: any) => ({ menuItemId: i.menuItemId, quantity: i.quantity, priceUzs: map.get(i.menuItemId)?.priceUzs || 0 }));
  const totalUzs = prepared.reduce((s: number, i: any) => s + i.quantity * i.priceUzs, 0);

  const order = await prisma.order.create({
    data: { restaurantId: user.restaurantId, roomId, tableId, waiterId: user.id, totalUzs, items: { create: prepared } },
    include: { items: { include: { menuItem: true } }, room: true, table: true }
  });

  await prisma.room.update({ where: { id: roomId }, data: { status: "BAND" } });
  await prisma.diningTable.update({ where: { id: tableId }, data: { isActive: true } });
  io.emit("order:new", order);
  res.status(201).json(order);
};

export const kitchenTakeOrder = async (req: Request, res: Response) => {
  const chefId = (req as any).user.id;
  const { id } = req.params;
  const order = await prisma.order.update({ where: { id }, data: { chefId, status: "TAYYORLANMOQDA" } });
  io.emit("kitchen:update", order);
  res.json(order);
};

export const kitchenReadyOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.update({ where: { id }, data: { status: "TAYYOR" } });
  io.emit("waiter:notification", { orderId: id, message: "Buyurtma tayyor" });
  res.json(order);
};

export const waiterDeliverOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.update({ where: { id }, data: { status: "TOPSHIRILDI" } });
  io.emit("order:status", order);
  res.json(order);
};
