import { Router } from "express";
import { auth, requireRestaurant } from "../middleware/auth.js";
import { subscriptionGuard } from "../middleware/subscriptionGuard.js";
import { restaurantAnalytics } from "../controllers/analyticsController.js";

export const analyticsRouter = Router();
analyticsRouter.get("/restaurant", auth, requireRestaurant, subscriptionGuard, restaurantAnalytics);
