import { Router } from "express";
import { auth, permit, requireRestaurant } from "../middleware/auth.js";
import { subscriptionGuard } from "../middleware/subscriptionGuard.js";
import { createRoom, createStaff, createTable, restaurantDashboard, upsertMenuItem } from "../controllers/restaurantAdminController.js";

export const restaurantAdminRouter = Router();
restaurantAdminRouter.use(auth, permit("RESTAURANT_ADMIN"), requireRestaurant, subscriptionGuard);
restaurantAdminRouter.get("/dashboard", restaurantDashboard);
restaurantAdminRouter.post("/rooms", createRoom);
restaurantAdminRouter.post("/tables", createTable);
restaurantAdminRouter.post("/staff", createStaff);
restaurantAdminRouter.post("/menu-items", upsertMenuItem);
