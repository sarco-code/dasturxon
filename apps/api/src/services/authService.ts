import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";

export const loginService = async (phone: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw new Error("Foydalanuvchi topilmadi");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("Parol noto'g'ri");

  const token = jwt.sign({ id: user.id, role: user.role, restaurantId: user.restaurantId }, env.jwtSecret, { expiresIn: "7d" });
  return { token, user: { id: user.id, fullName: user.fullName, role: user.role, restaurantId: user.restaurantId } };
};
