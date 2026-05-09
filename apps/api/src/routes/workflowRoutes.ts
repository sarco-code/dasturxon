import { Router } from "express";
import { auth, permit, requireRestaurant } from "../middleware/auth.js";
import { subscriptionGuard } from "../middleware/subscriptionGuard.js";
import { kitchenReadyOrder, kitchenTakeOrder, waiterCreateOrder, waiterDeliverOrder } from "../controllers/workflowController.js";

export const workflowRouter = Router();
workflowRouter.use(auth, requireRestaurant, subscriptionGuard);
workflowRouter.post("/waiter/orders", permit("OFITSIANT"), waiterCreateOrder);
workflowRouter.patch("/kitchen/orders/:id/take", permit("OSHPAZ"), kitchenTakeOrder);
workflowRouter.patch("/kitchen/orders/:id/ready", permit("OSHPAZ"), kitchenReadyOrder);
workflowRouter.patch("/waiter/orders/:id/deliver", permit("OFITSIANT"), waiterDeliverOrder);
