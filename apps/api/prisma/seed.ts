import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const plan = await prisma.subscriptionPlan.upsert({
    where: { id: "basic-plan" },
    update: {},
    create: { id: "basic-plan", name: "Standard", monthlyUzs: 399000, isActive: true }
  });

  const superHash = await bcrypt.hash("superadmin123", 10);
  await prisma.user.upsert({
    where: { phone: "+998900000001" },
    update: { passwordHash: superHash, role: "SUPER_ADMIN" },
    create: { fullName: "Platform Super Admin", phone: "+998900000001", passwordHash: superHash, role: "SUPER_ADMIN" }
  });

  const restaurant = await prisma.restaurant.upsert({
    where: { slug: "osh-markazi" },
    update: {},
    create: { name: "Osh Markazi", slug: "osh-markazi", phone: "+998901112233", address: "Toshkent, Chilonzor" }
  });

  const ownerHash = await bcrypt.hash("admin12345", 10);
  await prisma.user.upsert({
    where: { phone: "+998901234567" },
    update: { passwordHash: ownerHash, role: "RESTAURANT_ADMIN", restaurantId: restaurant.id },
    create: { fullName: "Restoran Admin", phone: "+998901234567", passwordHash: ownerHash, role: "RESTAURANT_ADMIN", restaurantId: restaurant.id }
  });

  await prisma.subscription.create({
    data: {
      restaurantId: restaurant.id,
      subscriptionPlanId: plan.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "ACTIVE"
    }
  }).catch(() => undefined);

  const room = await prisma.room.upsert({
    where: { id: "vip-room-1" },
    update: {},
    create: { id: "vip-room-1", name: "VIP Xona", type: "VIP", restaurantId: restaurant.id }
  });

  await prisma.diningTable.upsert({
    where: { restaurantId_number: { restaurantId: restaurant.id, number: 1 } },
    update: {},
    create: { number: 1, qrCode: "https://dasturxon.uz/menu?t=1", roomId: room.id, restaurantId: restaurant.id }
  });

  const cat = await prisma.category.upsert({
    where: { restaurantId_slug: { restaurantId: restaurant.id, slug: "milliy-taomlar" } },
    update: {},
    create: { name: "Milliy taomlar", slug: "milliy-taomlar", restaurantId: restaurant.id }
  });

  const items = [
    ["Osh", 35000],
    ["Somsa", 12000],
    ["Lag'mon", 30000],
    ["Shashlik", 22000],
    ["Manti", 28000]
  ] as const;

  for (const [name, priceUzs] of items) {
    await prisma.menuItem.create({
      data: {
        name,
        description: `${name} - milliy mazali taom`,
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
        priceUzs,
        restaurantId: restaurant.id,
        categoryId: cat.id
      }
    }).catch(() => undefined);
  }
}

main().finally(async () => prisma.$disconnect());
