import { Router } from "express";
import { auth, permit } from "../middleware/auth.js";
import { createRestaurant, platformStats, setRestaurantBlock, setSubscriptionStatus } from "../controllers/superAdminController.js";

export const superAdminRouter = Router();
superAdminRouter.use(auth, permit("SUPER_ADMIN"));
superAdminRouter.get("/stats", platformStats);
superAdminRouter.post("/restaurants", createRestaurant);
superAdminRouter.patch("/restaurants/:id/block", setRestaurantBlock);
superAdminRouter.patch("/subscriptions/:id", setSubscriptionStatus);
