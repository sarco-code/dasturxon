import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

export const authRouter = Router();
authRouter.post("/login", login);
authRouter.get("/me", auth, me);
