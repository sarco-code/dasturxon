import { Router } from "express";
import { auth, permit, requireRestaurant } from "../middleware/auth.js";
import { subscriptionGuard } from "../middleware/subscriptionGuard.js";
import { cashierPayOrder, receiptHistory } from "../controllers/cashierController.js";

export const cashierRouter = Router();
cashierRouter.use(auth, permit("KASSIR", "RESTAURANT_ADMIN"), requireRestaurant, subscriptionGuard);
cashierRouter.post("/pay", cashierPayOrder);
cashierRouter.get("/receipts", receiptHistory);
