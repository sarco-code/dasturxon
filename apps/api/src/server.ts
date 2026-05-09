import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Server as IOServer } from "socket.io";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
import { superAdminRouter } from "./routes/superAdminRoutes.js";
import { restaurantAdminRouter } from "./routes/restaurantAdminRoutes.js";
import { workflowRouter } from "./routes/workflowRoutes.js";
import { cashierRouter } from "./routes/cashierRoutes.js";
import { analyticsRouter } from "./routes/analyticsRoutes.js";
import { publicRouter } from "./routes/publicRoutes.js";
import { initSocket } from "./socket/io.js";

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: env.clientUrl } });

initSocket(io);

app.use(cors({ origin: env.clientUrl }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, name: "Dasturxon SaaS API" }));
app.use("/api/auth", authRouter);
app.use("/api/public", publicRouter);
app.use("/api/super-admin", superAdminRouter);
app.use("/api/restaurant-admin", restaurantAdminRouter);
app.use("/api/workflow", workflowRouter);
app.use("/api/cashier", cashierRouter);
app.use("/api/analytics", analyticsRouter);

app.use(errorHandler);

server.listen(env.port, () => {
  console.log(`Dasturxon API: http://localhost:${env.port}`);
});
