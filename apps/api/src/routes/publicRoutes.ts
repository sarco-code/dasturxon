import { Router } from "express";
import { publicMenu } from "../controllers/publicController.js";

export const publicRouter = Router();
publicRouter.get("/menu/:slug", publicMenu);
