import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";

const generateReceiptNo = () => `RCP-${Date.now()}`;

type ReceiptPayloadItem = { nomi: string; soni: number; narxi: number };
type OrderWithItems = Prisma.OrderGetPayload<{ include: { items: { include: { menuItem: true } }; restaurant: true } }>;

export const cashierPayOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { orderId, method } = req.body;

  const order: OrderWithItems | null = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { menuItem: true } }, restaurant: true }
  });
  if (!order) return res.status(404).json({ message: "Order topilmadi" });

  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const payment = await tx.payment.create({ data: { restaurantId: user.restaurantId, orderId, cashierId: user.id, method, amountUzs: order.totalUzs } });
    await tx.order.update({ where: { id: orderId }, data: { isPaid: true, status: "YAKUNLANDI" } });
    await tx.room.update({ where: { id: order.roomId }, data: { status: "BO_SH" } });
    await tx.diningTable.update({ where: { id: order.tableId }, data: { isActive: false } });

    const payload = {
      restoran: order.restaurant.name,
      sana: new Date().toISOString(),
      kassir: user.id,
      items: order.items.map((i: OrderWithItems["items"][number]): ReceiptPayloadItem => ({
        nomi: i.menuItem.name,
        soni: i.quantity,
        narxi: i.priceUzs
      })),
      jami: order.totalUzs
    };

    const receipt = await tx.receipt.create({
      data: { restaurantId: user.restaurantId, paymentId: payment.id, cashierId: user.id, receiptNo: generateReceiptNo(), payloadJson: payload }
    });
    return { payment, receipt };
  });

  res.json(result);
};

export const receiptHistory = async (req: Request, res: Response) => {
  const { restaurantId } = (req as any).user;
  const data = await prisma.receipt.findMany({ where: { restaurantId }, orderBy: { createdAt: "desc" }, take: 100 });
  res.json(data);
};
